import HtmlContent from '@/components/html-content';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Image,
    Pressable,
    ScrollView,
    Text,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import WikiImage from '../../components/wiki-image';
import { getDatabase } from '../../database/database';
import { getItemById } from '../../database/repositories/ItemsRepository';
import { COLORS, styles } from './ItemDetail.styles';

type ItemData = Record<string, unknown>;

interface ItemDetailScreenProps {
    id?: string | string[];
}

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
        .replace(/^_/, '')
        .replace(/_/g, ' ')
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export default function ItemDetailScreen({ id, }: ItemDetailScreenProps) {
    const [item, setItem] = useState<ItemData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    function handleGoBack() {
        if (router.canGoBack()) {
            router.back();
        } else {
            router.replace('/(tabs)');
        }
    }

    useEffect(() => {
        let cancelled = false;

        async function loadItem() {
            setIsLoading(true);
            setError(null);
            setItem(null);

            try {
                const parsedId = Number(
                    Array.isArray(id) ? id[0] : id,
                );

                if (!id || !Number.isInteger(parsedId) || parsedId <= 0) {
                    throw new Error('ID do item inválido.');
                }

                const database = await getDatabase();
                const result = await getItemById(database, parsedId);

                if (cancelled) {
                    return;
                }

                if (!result) {
                    setError('Item não encontrado no banco de dados.');
                    return;
                }

                setItem(result);
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

        void loadItem();

        return () => {
            cancelled = true;
        };
    }, [id]);

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
                    color={COLORS.gold}
                />
                <Text style={styles.message}>
                    Carregando item...
                </Text>
            </View>
        );
    }

    if (error || !item) {
        return (
            <View style={styles.container}>
                <Text style={[styles.message, styles.error]}>
                    {error ?? 'Item não encontrado.'}
                </Text>
            </View>
        );
    }

    const name = formatValue(item.name) || formatValue(item._pageTitle) || 'Item sem nome';
    const baseItem = formatValue(item.base_item) || formatValue(item.base_item_page);
    const itemClass = formatValue(item.class);
    const rarity = formatValue(item.rarity);
    const flavourText = formatValue(item.flavour_text);
    const description = formatValue(item.description);
    const explicitStats = formatValue(item.explicit_stat_text);
    const implicitStats = formatValue(item.implicit_stat_text);
    const requiredLevel = formatValue(item.required_level);
    const requiredIntelligence = formatValue(item.required_intelligence);
    const requiredStrength = formatValue(item.required_strength);
    const requiredDexterity = formatValue(item.required_dexterity);
    const acquisition = formatValue(item.drop_text)

    const excludedFields = new Set([
        'name',
        '_pageTitle',
        'class',
        'rarity',
        'description',
        'explicit_stat_text',
        'implicit_stat_text',
        'html',
        'infobox_html',
        'metabox_html',
        'drop_areas_html',
        'required_level_html',
        'required_strength_html',
        'required_dexterity_html',
        'required_intelligence_html',
    ]);

    const remainingFields = Object.entries(item).filter(
        ([key, value]) =>
            !excludedFields.has(key) &&
            value !== null &&
            value !== undefined &&
            value !== '',
    );

    return (
        <SafeAreaView style={styles.container} edges={['top', 'bottom', 'left', 'right']}>
            <Pressable onPress={handleGoBack} style={{ flexDirection: 'row', alignItems: 'center', padding: 16, }}>
                <Text style={styles.backButton}>Voltar</Text>
            </Pressable>

            <ScrollView style={styles.container} contentContainerStyle={styles.content}>
                <View style={[styles.itemCard]}>
                    <View style={styles.header}>
                        <Image
                            style={[styles.titleBackground, {flex: 1}]}
                            source={require('@/assets/images/backgrounds/item/Item_UI_header_double_unique_left.png')}
                            resizeMode="stretch"
                        />
                        <Image
                            style={[styles.titleBackground, {flex: 4}]}
                            source={require('@/assets/images/backgrounds/item/Item_UI_header_double_unique_middle.png')}
                            resizeMode="stretch"
                            
                        />
                        <Image
                            style={[styles.titleBackground, {flex: 1}]}
                            source={require('@/assets/images/backgrounds/item/Item_UI_header_double_unique_right.png')}
                            resizeMode="stretch"
                        />
                        <View style={styles.titleContainer}>
                            <Text style={[styles.titleItem, {marginTop: 'auto', marginBottom: 0}]}>{name}</Text>
                            <Text style={[styles.titleItem, {marginTop: 0, marginBottom: 'auto'}]}>{baseItem}</Text>
                        </View>                       
                    </View>

                    <View style={[styles.divider, {experimental_backgroundImage: 'radial-gradient(circle, '+ COLORS.unique +', transparent)',}]}/>

                    <View style={styles.attributesContainer}>
                        <Text style={[styles.attributes]}>{
                            `${'Requires Level ' + requiredLevel }` +
                            `${requiredIntelligence !== '0' ? ', ' + requiredIntelligence + ' Int' : ''}` +
                            `${requiredStrength !== '0' ? ', ' + requiredStrength + ' Str' : ''}` +
                            `${requiredDexterity !== '0' ? ', ' + requiredDexterity + ' Dex' : ''}` 
                            }
                        </Text>
                    </View>

                    <View style={[styles.divider, {experimental_backgroundImage: 'radial-gradient(circle, '+ COLORS.unique +', transparent)',}]} />
                    
                    {implicitStats ? (
                        <View style={styles.card}>
                            <Text style={styles.sectionTitle}>
                                Atributos implícitos
                            </Text>
                            <Text>
                                <HtmlContent 
                                    value={implicitStats} 
                                    styleText={{
                                        color: COLORS.stats
                                    }}
                                />
                            </Text>
                        </View>
                    ) : null}

                    {explicitStats ? (
                        <View style={styles.containerExplicityStats}>
                            <Text>
                                <HtmlContent 
                                    value={explicitStats}
                                    styleText={{
                                        color: COLORS.stats,
                                        isBold: true,
                                        textAlign: 'center'
                                    }}
                                />
                            </Text>
                        </View>
                    ) : null}

                    <View style={[styles.divider, {experimental_backgroundImage: 'radial-gradient(circle, '+ COLORS.unique +', transparent)',}]} />
                    
                    <View style={styles.containerExplicityStats}>
                        <Text>
                            <HtmlContent 
                                value={flavourText} 
                                styleText={{
                                    color: COLORS.unique,
                                    isBold: true,
                                    textAlign: 'center',
                                }}
                            />
                        </Text>
                    </View>

                    <View style={{ alignItems: 'center', marginBottom: 16 }}>
                        <WikiImage fileName={item.inventory_icon} size={120} />
                    </View>
                </View>

                <View style={[styles.itemCard]}>

                    <Text style={styles.acquisitionLabel}>Acquisition</Text>

                    <View style={styles.containerAcquisitionText}>
                        <Text>
                            <HtmlContent 
                                value={acquisition}
                                styleText={{
                                    color: COLORS.stats,
                                    isBold: true,
                                    textAlign: 'center'
                                }}
                            />
                        </Text>
                    </View>

                    <View style={[styles.divider, {experimental_backgroundImage: 'radial-gradient(circle, '+ COLORS.unique +', transparent)',}]} />

                    <Text style={styles.acquisitionLabel}>Metadata</Text>
                    
                    <View style={styles.containerAcquisitionText}>
                        {itemClass ? (
                            <Text style={styles.metadata}>
                                Item Class: {itemClass}
                            </Text>
                        ) : null}

                        {rarity ? (
                            <Text style={styles.metadata}>
                                Rarity: {rarity}
                            </Text>
                        ) : null}

                        {requiredLevel ? (
                            <Text style={styles.metadata}>
                                Requires Level: {requiredLevel}
                            </Text>
                        ) : null}
                    </View>

                </View>

                {description ? (
                    <View style={styles.card}>
                        <Text style={styles.sectionTitle}>
                            Descrição
                        </Text>
                        <Text style={styles.fieldValue}>
                            {description}
                        </Text>
                    </View>
                ) : null}

                

                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>
                        Todos os dados
                    </Text>

                    {remainingFields.map(([key, value]) => (
                        <View key={key} style={styles.field}>
                            <Text style={styles.fieldLabel}>
                                {formatLabel(key)}
                            </Text>

                            <Text style={styles.fieldValue}>
                                <HtmlContent value={value} />
                            </Text>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}