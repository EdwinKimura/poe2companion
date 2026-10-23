
import Divider from '@/components/html-divider';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Image,
    Linking,
    Pressable,
    ScrollView,
    StatusBar,
    Text,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Fonts, SVGColors } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { styles } from './home.styles';

import { forceResetAppVersion, getAppVersion, getDatabase } from '../../database/database';

import {
    isSyncInProgress,
    subscribeSyncStatus
} from '../../services/sync/syncData';

import Anvil from '@/assets/icons/anvil.svg';
import Cogs from '@/assets/icons/cogs.svg';
import Diamond from '@/assets/icons/diamond-duotone.svg';
import DoubleSwordIcon from '@/assets/icons/double-sword.svg';
import Dwarf from '@/assets/icons/dwarf.svg';
import { useRouter } from 'expo-router';

import { getVersions } from '@/database/repositories/VersionRepository';

const FEATURES = [
    {
        id: 'items',
        symbol: <DoubleSwordIcon width="24px" height="24px" color={SVGColors.gold} />,
        title: 'Itens',
        description: 'Equipamentos, bases e atributos',
        enabled: true
    },
    {
        id: 'crafting',
        symbol: <Anvil width="24px" height="24px" color={SVGColors.gold} />,
        title: 'Crafting',
        description: 'Modificadores e bases',
        enabled: false
    },
    {
        id: 'classes',
        symbol: <Dwarf width="24px" height="24px" color={SVGColors.gold} />,
        title: 'Classes',
        description: 'Personagens e ascensões',
        enabled: false
    },
    {
        id: 'skills',
        symbol: <Diamond width="24px" height="24px" color={SVGColors.gold} />,
        title: 'Habilidades',
        description: 'Gemas, efeitos e suportes',
        enabled: false
    },
    {
        id: 'mechanics',
        symbol: <Cogs width="24px" height="24px" color={SVGColors.gold} />,
        title: 'Mecânicas',
        description: 'Mecânicas dos eventos',
        enabled: false
    },
];

async function handleTriggerReset() {
    await forceResetAppVersion();
    console.log('Pronto! Reinicie o app para disparar o wipe do banco.');
}

export default function HomeScreen() {
    const router = useRouter();
    const theme = useTheme();
    const fonts = Fonts;
    const url = 'https://www.poe2wiki.net/wiki/';

    const [version, setVersion] = useState('0.0.0');
    const [databaseStatus, setDatabaseStatus] = useState('Verificando...');
    const [isSyncing, setIsSyncing] = useState(isSyncInProgress());
    const [releaseVersion, setReleaseVersion] = useState<string | null>(null);
    const [poeVersion, setPoeVersion] = useState<string | null>(null);

    useEffect(() => {
        return subscribeSyncStatus(setIsSyncing);
    }, []);

    /**
     * Load app version
     */
    useEffect(() => {
        async function loadDatabaseStatus() {
            const appVersion = await getAppVersion();
            if (appVersion) {
                setVersion(`${appVersion.major}.${appVersion.minor}.${appVersion.patch}`)
            }
        }

        void loadDatabaseStatus();
    }, []);

    /**
     * Load POE version for news 
     */
    useEffect(() => {
        async function loadVersionPoe() {
            const database = await getDatabase();
            const poeVersion = await getVersions(database);
            if (poeVersion) {
                setReleaseVersion(poeVersion.pageName);
                setPoeVersion(poeVersion.version)
            }
        }

        void loadVersionPoe();
    }, []);

    async function handleOpenRelease() {
        const targetUrl = url + releaseVersion;
        try {
            const supported = await Linking.canOpenURL(targetUrl);
            if (supported) {
                await Linking.openURL(targetUrl);
            } else {
                console.error(`Não foi possível abrir a URL: ${targetUrl}`);
            }
        } catch (error) {
            console.error('Erro ao tentar abrir o link:', error);
        }
    }

    return (
        <SafeAreaView
            style={[styles.screen, { backgroundColor: theme.background, }]}
            edges={['top', 'bottom', 'left', 'right']}
        >
            <StatusBar
                barStyle="light-content"
                backgroundColor={theme.background}
            />

            <ScrollView
                contentContainerStyle={styles.content}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.header}>
                    <View>
                        <Text style={[styles.eyebrow, { color: theme.gold, fontFamily: fonts.cinzel.semiBold }]}>PATH OF EXILE II</Text>
                        <Text style={[styles.logo, { color: theme.text, fontFamily: fonts.cinzel.medium }]}>
                            COMPANION
                        </Text>
                    </View>
                </View>

                <View style={[styles.hero, { backgroundColor: theme.surface, borderColor: theme.border }]}>
                    <View style={styles.heroBackgroundContainer}>
                        <Image
                            source={require('@/assets/images/backgrounds/app/banner.webp')}
                            resizeMode='cover'
                            style={styles.heroBackgroundImage}
                        />

                        <View style={styles.heroTextContainer}>
                            <View style={styles.heroCalltoAction}>
                                <Text style={[styles.heroEyebrow, { color: theme.text, fontFamily: fonts.inter.extraLight }]}>
                                    Liga Atual
                                </Text>

                                <Text style={[styles.heroTitle, { color: theme.gold, fontFamily: fonts.cinzel.semiBold }]}>
                                    Return
                                </Text>
                                <Text style={[styles.heroTitle, { color: theme.gold, fontFamily: fonts.cinzel.semiBold, fontSize: 12 }]}>
                                    of the
                                </Text>
                                <Text style={[styles.heroTitle, { color: theme.gold, fontFamily: fonts.cinzel.semiBold }]}>
                                    Ancients
                                </Text>

                                <Divider color={'gold'} spaceVertical={8} spaceHorizontal={20} align={'flex-start'} />

                                <Text style={[styles.heroDescription, { color: theme.text, fontFamily: fonts.cinzel.regular }]}>
                                    Descubra as novidades,{'\n'}
                                    mecânicas e recompensas.
                                </Text>

                                <View style={[styles.releaseButton, { backgroundColor: theme.background, borderColor: theme.border }]}>
                                    {
                                        releaseVersion !== null ? (
                                            <Pressable onPress={handleOpenRelease}>
                                                <Text style={[styles.releaseText, { color: theme.gold }]}>
                                                    {'Release ' + poeVersion}
                                                </Text>
                                            </Pressable>
                                        ) : (
                                            <ActivityIndicator size="small" color={theme.gold} />
                                        )
                                    }

                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                {/* END HERO CARD */}

                <Divider color={'gold'} widthDivider={'80%'} spaceVertical={20} fade={'100% 100%'} spaceHorizontal={0} align={'center'} />

                <View>
                    <Text style={[styles.sectionTitle, { color: theme.text, fontFamily: fonts.cinzel.semiBold }]}>
                        Explore Wraeclast
                    </Text>

                    <Text style={[styles.sectionDescription, { color: theme.muted, fontFamily: fonts.inter.extraLight }]}>
                        Acesse seu guia
                    </Text>

                    <View style={styles.featureList}>
                        {
                            isSyncing ? (
                                <View
                                    style={[
                                        styles.syncLoadingCard,
                                        { backgroundColor: theme.surface, borderColor: theme.border },
                                    ]}
                                    accessibilityRole="progressbar"
                                    accessibilityLabel="Sincronizando dados"
                                >
                                    <ActivityIndicator size="small" color={theme.gold} />
                                    <View>
                                        <Text
                                            style={[
                                                styles.syncLoadingText,
                                                { color: theme.text, fontFamily: fonts.inter.regular, marginLeft: 8, fontWeight: 'bold' },
                                            ]}
                                        >
                                            Sincronizando banco de dados...
                                        </Text>
                                        <Text
                                            style={[
                                                styles.syncLoadingText,
                                                { color: theme.text, fontFamily: fonts.inter.regular, marginLeft: 8, fontWeight: 'bold' },
                                            ]}
                                        >
                                            {databaseStatus}
                                        </Text>
                                    </View>
                                </View>
                            ) : (
                                FEATURES.map((feature) => (
                                    <Pressable
                                        key={feature.id}
                                        disabled={!feature.enabled}
                                        onPress={() => {
                                            if (feature.id === 'items') {
                                                router.push('/items');
                                                return;
                                            }
                                        }}
                                        style={({ pressed }) => [
                                            styles.featureCard,
                                            !feature.enabled && { opacity: 0.5 },
                                            pressed && feature.enabled && { backgroundColor: theme.surfaceLight, opacity: 0.8 },
                                            { backgroundColor: theme.surface, borderColor: theme.border }
                                        ]}
                                    >
                                        <View style={[styles.featureIcon, { backgroundColor: theme.surfaceLight }]}>
                                            <Text style={[styles.featureSymbol, { color: theme.gold }]}>
                                                {feature.symbol}
                                            </Text>
                                        </View>

                                        <View style={styles.featureInfo}>
                                            <Text style={[styles.featureTitle, { color: theme.text }]}>
                                                {feature.title}
                                            </Text>

                                            <Text style={[styles.featureDescription, { color: theme.muted }]}>
                                                {feature.description}
                                            </Text>
                                        </View>

                                        <Text style={[styles.chevron, { color: theme.gold }]}>›</Text>
                                    </Pressable>
                                ))
                            )
                        }
                    </View>
                </View>

                <Divider color={'gold'} widthDivider={'80%'} spaceVertical={20} fade={'100% 100%'} spaceHorizontal={0} align={'center'} />

                <View style={[styles.databaseCard, { backgroundColor: theme.surface, borderColor: theme.border }]}>
                    <View style={styles.databaseHeader}>
                        <Text style={[styles.databaseTitle, { color: theme.text }]}>
                            <Text style={[styles.databaseIcon, { color: theme.gold }]}>▤</Text>  Banco de dados local
                        </Text>
                        <View style={styles.dataBaseInfo}>
                            <View style={[styles.pendingDot, isSyncing ? { backgroundColor: theme.gold } : { backgroundColor: theme.green }]} />
                            <Text style={[styles.databaseStatusText, { color: theme.muted }]}>
                                {isSyncing ? 'Sincronizando...' : 'Sincronizado'}
                            </Text>
                        </View>
                    </View>

                </View>

                <Text style={[styles.footer, { color: theme.disabled }]}>
                    DADOS PLANEJADOS A PARTIR DA POE 2 WIKI
                    {/* <Pressable onPress={handleTriggerReset}>
                        <Text style={[styles.databaseVersion, { color: theme.gold }]}>{`  v${version}`}</Text>
                    </Pressable> */}
                    <Text style={[styles.databaseVersion, { color: theme.gold }]}>{`  v${version}`}</Text>
                </Text>
            </ScrollView>
        </SafeAreaView >
    );
}
