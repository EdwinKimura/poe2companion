import Divider from '@/components/html-divider';
import { Fonts } from '@/constants/theme';
import { getDatabase } from '@/database/database';
import { ModsSearchResult, getModsByClassItem } from '@/database/repositories/ModSpawnWeightRepository';
import { useTheme } from '@/hooks/use-theme';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Image,
    Pressable,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ItemGeneralLine from '../components/ItemGeneralLine';
import { styles } from './crafttag.styles';

type ItemData = Record<string, unknown>;

function formatValue(value: unknown): string {
    if (value === null || value === undefined || value === '') {
        return '';
    }

    if (typeof value === 'boolean') {
        return value ? 'Sim' : 'Não';
    }

    if (Array.isArray(value)) {
        return value.map((item) => String(item)).join(', ');
    }

    if (typeof value === 'object') {
        return JSON.stringify(value);
    }

    return String(value);
}

function formatLabel(key: string): string {
    return key
        .replace(/&amp;#0*39;/gi, "'")
        .replace(/&#0*39;|&apos;/gi, "'")
        .replace(/&amp;quot;|&quot;/gi, '"')
        .replace(/&amp;lt;|&lt;/gi, '<')
        .replace(/&amp;gt;|&gt;/gi, '>')
        .replace(/&amp;/gi, '&');
}

function removeHtmlEntities(key: string): string {
    return key
        .replace(/<br>|<br\/>|<\/br>/gi, "\n")
        .replace(/<p>|<\/p>/gi, "")
        .replace(/<h1>|<\/h1>/gi, '')
        .replace(/<h2>|<\/h2>/gi, '')
        .replace(/<h3>|<\/h3>/gi, '')
        .replace(/<strong>|<\/strong>/gi, '')
}

export default function CraftTagScreen({ subcategory }: any | string) {
    const theme = useTheme();
    const fonts = Fonts;
    const [mod, setMod] = useState<ModsSearchResult[][] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const router = useRouter();

    function handleGoBack() {
        if (router.canGoBack()) {
            router.back();
        }
    }

    useEffect(() => {
        let cancelled = false;

        async function loadMods() {
            setIsLoading(true);
            setError(null);
            setMod(null);

            try {
                const database = await getDatabase();
                const result = await getModsByClassItem(database, subcategory);

                if (cancelled) {
                    return;
                }

                if (!result) {
                    setError('Mods não encontrados no banco de dados.');
                    return;
                }
                setMod(result);
            } catch (err) {
                if (!cancelled) {
                    setError(
                        err instanceof Error
                            ? err.message
                            : 'Não foi possível carregar o item.',
                    );
                }
            } finally {
                if (!cancelled) {
                    setIsLoading(false);
                }
            }
        }

        void loadMods();

        return () => {
            cancelled = true;
        };
    }, [subcategory]);

    if (isLoading) {
        return (
            <View
                style={[
                    styles.container,
                    {
                        justifyContent: 'center',
                        alignItems: 'center',
                    },
                ]}
            >
                <ActivityIndicator
                    size="large"
                    color={theme.gold}
                />
                <Text style={styles.message}>
                    Carregando item...
                </Text>
            </View>
        );
    }

    if (error || !mod) {
        return (
            <View style={styles.container}>
                <Text style={[styles.message, styles.error]}>
                    {error ?? 'Item não encontrado.'}
                </Text>
            </View>
        );
    }

    // const name = formatLabel(formatValue(mod.na)) || formatLabel(formatValue(mod._pageTitle)) || 'Item sem nome';

    return (
        <SafeAreaView style={styles.container} edges={['top', 'bottom', 'left', 'right']}>
            <Image
                style={styles.backgroundImage}
                source={require('@/assets/images/backgrounds/item/background_item.png')}
                resizeMode="contain"
            />
            <View style={styles.containerBackButton}>
                <Pressable
                    onPress={handleGoBack}
                    style={styles.backButton}
                    accessibilityLabel="Voltar"
                >
                    <Text style={styles.backButtonText}>‹</Text>
                </Pressable>

                <View>
                    <Text style={{ color: theme.stats, fontFamily: fonts.cinzel.medium, fontSize: 16 }}>
                        {subcategory}
                    </Text>
                </View>

                <View style={styles.backButton} />
            </View>
            <Divider color={'gold'} spaceVertical={0} spaceHorizontal={0} widthDivider={'80%'} align={'flex-start'} />

            <ScrollView style={styles.container} contentContainerStyle={styles.content}>
                <View style={styles.itemContainer}>

                    {
                        mod.map((group, index) => {
                            const isExpanded = expandedIndex === index;
                            return (
                                <View key={index}>
                                    <View style={[styles.itemAttrContainer, styles.outerBorder, { borderColor: theme.gold, backgroundColor: '#00000080'}]}>

                                        <TouchableOpacity
                                            onPress={() => setExpandedIndex(isExpanded ? null : index)}
                                            activeOpacity={0.8}
                                            style={{ width: '100%' }}
                                        >
                                            <View style={[styles.itemAttrContainer, styles.innerBorder, { borderColor: theme.stats, paddingHorizontal: 12 }]}>
                                                <Text style={{ color: theme.gold, fontFamily: fonts.cinzel.semiBold, width: '100%' }}>
                                                    {isExpanded ? '▼ ' : '▶ '} {group[0].mod_type?.replace(/([A-Z])/g, ' $1').trim()}
                                                </Text>
                                            </View>
                                        </TouchableOpacity>

                                        {isExpanded && (
                                            <View style={{ width: '100%' }}>
                                                <View style={styles.containerInfo}>
                                                    {group.map((item, itemIndex) => {
                                                        let match = item.modifier?.match(/\d+$/);
                                                        let tier = match ? match[0] : '';
                                                        return (
                                                            <View key={itemIndex} style={[styles.itemAttrContainer, styles.innerBorder, { borderColor: theme.stats, paddingHorizontal: 12, marginTop: 4 }]}>
                                                                <ItemGeneralLine item={{ key: 'Mod Type', value: item.mod_type ? item.mod_type : '' }} isHtmlContent={true} />
                                                                <ItemGeneralLine item={{ key: 'Name', value: item.name ? item.name : '' }} isHtmlContent={true} />
                                                                <ItemGeneralLine item={{ key: 'Modifier', value: item.modifier ? tier : '' }} isHtmlContent={true} />
                                                                <ItemGeneralLine item={{ key: 'Required Level', value: item.required_level ? item.required_level : '' }} isHtmlContent={true} />
                                                                <ItemGeneralLine item={{ key: 'Stat', value: item.stat_text_raw ? item.stat_text_raw : '' }} isHtmlContent={true} />
                                                            </View>
                                                        )
                                                    })}
                                                </View>
                                            </View>
                                        )}
                                    </View>
                                    <Divider color={'gold'} spaceVertical={16} spaceHorizontal={0} widthDivider={'100%'} align={'center'} />
                                </View>
                            )
                        })
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}