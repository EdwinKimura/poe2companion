import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    DimensionValue,
    Image,
    Text,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Fonts } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { styles } from './loadingAssets.styles';

import { getAllDatabaseTables } from '@/database/repositories/DataRepository';
import { router } from 'expo-router';
import { getDatabase } from '../../database/database';
import {
    isSyncInProgress,
    syncLocalData
} from '../../services/sync/syncData';

type TableProgressInfo = {
    tableName: string;
    status: string;
    saved: number;
    total: number;
};

export default function LoadingAssets() {
    const theme = useTheme();
    const fonts = Fonts;
    const [load, setLoad] = useState();
    const [isSyncing, setIsSyncing] = useState(isSyncInProgress());
    const [databaseStatus, setDatabaseStatus] = useState('Verificando...');
    const [progressBar, setProgressBar] = useState<DimensionValue>("0%");
    const [tableProgressList, setTableProgressList] = useState<TableProgressInfo[]>([]);

    useEffect(() => {
        void executeImport();
    }, []);

    async function executeImport() {
        if (isSyncInProgress()) return;

        try {
            const database = await getDatabase();
            const tables = await getAllDatabaseTables(database);

            // Inicializa a lista com as tabelas do banco e contagens atuais
            const initialList: TableProgressInfo[] = tables.map(t => ({
                tableName: t,
                status: 'pending',
                saved: 0,
                total: 0
            }));

            setTableProgressList(initialList);
            setDatabaseStatus('Importando dados locais...');

            const result = await syncLocalData(
                setProgressBar,
                {
                    onDatasetProgress: (dataset, saved, total) => {
                        setDatabaseStatus(`${dataset.replace('_', ' ')}: ${saved}/${total}`);
                        setTableProgressList(prev =>
                            prev.map(item => {
                                if (item.tableName === dataset) {
                                    return {
                                        ...item,
                                        status: saved >= total && total > 0 ? 'completed' : 'syncing',
                                        saved,
                                        total
                                    };
                                }
                                return item;
                            })
                        );
                    }
                });

            console.log('[Import] Tabelas importadas com sucesso:', result.synchronized);
            setDatabaseStatus('Banco de dados atualizado!');
            setProgressBar("76%");
        } catch (error) {
            console.error('[Import] Erro na importação:', error);
            setDatabaseStatus('Falha na importação dos dados');
        } finally {
            router.replace('/home');
        }
    }

    return (
        <SafeAreaView
            style={[{ backgroundColor: theme.background }, styles.container]}
            edges={['top', 'bottom', 'left', 'right']}
        >
            <View style={{ width: "100%", height: "100%", flex: 1, justifyContent: 'flex-start' }}>
                <Image
                    source={require('@/assets/images/backgrounds/app/splashScreen.png')}
                    resizeMode='cover'
                    style={styles.loadBackgroundImage}
                />
                <Image
                    source={require('@/assets/images/icon.png')}
                    resizeMode='contain'
                    style={styles.iconSplashScreen}
                />

                <View style={styles.progressBarContainer}>
                    <Image
                        source={require('@/assets/images/backgrounds/app/progressBar.png')}
                        resizeMode='contain'
                        style={[styles.progressBar]}
                    />
                    <ActivityIndicator size="large" color={theme.gold} style={styles.progressLoading} />
                    <Text style={styles.progressText}>{databaseStatus}</Text>
                    <View style={[styles.bar, { width: progressBar, backgroundColor: '#b41515', zIndex: 1 }]}></View>
                    <View style={[styles.bar, { width: "76%", backgroundColor: '#000', zIndex: 0 }]}></View>
                </View>

            </View>

        </SafeAreaView>
    )
}