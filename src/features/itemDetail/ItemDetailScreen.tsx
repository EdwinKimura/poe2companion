import HtmlContent from '@/components/html-content';
import Divider from '@/components/html-divider';
import WikiImage from '@/components/wiki-image';
import { Fonts } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { clearImageCacheQueue } from '@/services/imageCacheService';
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
import { getDatabase } from '../../database/database';
import { getItemById } from '../../database/repositories/ItemsRepository';
import { styles } from './ItemDetail.styles';
import ItemGeneralLine from './components/ItemGeneralLine';

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

export default function ItemDetailScreen({ id, }: ItemDetailScreenProps) {
    const theme = useTheme();
    const fonts = Fonts;
    const [item, setItem] = useState<ItemData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    function handleGoBack() {
        if (router.canGoBack()) {
            router.back();
        }
    }

    useEffect(() => {
        let cancelled = false;

        async function loadItem() {
            setIsLoading(true);
            setError(null);
            setItem(null);
            clearImageCacheQueue();

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
                    color={theme.gold}
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

    const name = formatLabel(formatValue(item.name)) || formatLabel(formatValue(item._pageTitle)) || 'Item sem nome';
    const baseItem = formatValue(item.base_item) || formatValue(item.base_item_page);
    const itemClass = formatValue(item.class);
    const itemClassID = formatValue(item.class_id);
    const rarity = formatValue(item.rarity);
    const frameType = formatValue(item.frame_type);
    const flavourText = removeHtmlEntities(formatLabel(formatValue(item.flavour_text)));
    const description = formatLabel(formatValue(item.description));
    const explicitStats = formatValue(item.explicit_stat_text);
    const implicitStats = formatValue(item.implicit_stat_text);
    const requiredLevel = formatValue(item.required_level);
    const requiredIntelligence = formatValue(item.required_intelligence);
    const requiredStrength = formatValue(item.required_strength);
    const requiredDexterity = formatValue(item.required_dexterity);
    const acquisition = formatLabel(formatValue(item.drop_text));
    const dropAreas = formatLabel(formatValue(item.drop_areas));
    const attributesArmour = {
        'armour': formatValue(item.armour_range_text),
        'evasion': formatValue(item.evasion_range_text),
        'energyShield': formatValue(item.energy_shield_range_text),
        'moveSpeed': formatValue(item.movement_speed),
        'ward': formatValue(item.ward_range_text),
    };
    const attributesWeapon = {
        'atkSpeed': formatValue(item.attack_speed_range_text),
        'hasChaos':
            item.chaos_damage_min_range_minimum && item.chaos_damage_min_range_minimum !== '0' ||
            item.chaos_damage_min_range_maximum && item.chaos_damage_min_range_maximum !== '0' ||
            item.chaos_damage_max_range_minimum && item.chaos_damage_max_range_minimum !== '0' ||
            item.chaos_damage_max_range_maximum && item.chaos_damage_max_range_maximum !== '0',
        'chaosDmg': formatValue(`(${item.chaos_damage_min_range_minimum} - ${item.chaos_damage_min_range_maximum}) to (${item.chaos_damage_max_range_minimum} - ${item.chaos_damage_max_range_maximum})`),
        'hasCold':
            item.cold_damage_max_range_minimum && item.cold_damage_max_range_minimum !== '0' ||
            item.cold_damage_max_range_maximum && item.cold_damage_max_range_maximum !== '0' ||
            item.cold_damage_min_range_minimum && item.cold_damage_min_range_minimum !== '0' ||
            item.cold_damage_min_range_maximum && item.cold_damage_min_range_maximum !== '0',
        'coldDmg': formatValue(`(${item.cold_damage_min_range_minimum} - ${item.cold_damage_min_range_maximum}) to (${item.cold_damage_max_range_minimum} - ${item.cold_damage_max_range_maximum})`),
        'hasFire':
            item.fire_damage_min_range_minimum && item.fire_damage_min_range_minimum !== '0' ||
            item.fire_damage_min_range_maximum && item.fire_damage_min_range_maximum !== '0' ||
            item.fire_damage_max_range_minimum && item.fire_damage_max_range_minimum !== '0' ||
            item.fire_damage_max_range_maximum && item.fire_damage_max_range_maximum !== '0',
        'fireDmg': formatValue(`(${item.fire_damage_min_range_minimum} - ${item.fire_damage_min_range_maximum}) to (${item.fire_damage_max_range_minimum} - ${item.fire_damage_max_range_maximum})`),
        'hasLightning':
            item.lightning_damage_min_range_minimum && item.lightning_damage_min_range_minimum !== '0' ||
            item.lightning_damage_min_range_maximum && item.lightning_damage_min_range_maximum !== '0' ||
            item.lightning_damage_max_range_minimum && item.lightning_damage_max_range_minimum !== '0' ||
            item.lightning_damage_max_range_maximum && item.lightning_damage_max_range_maximum !== '0',
        'lightDmg': formatValue(`(${item.lightning_damage_min_range_minimum} - ${item.lightning_damage_min_range_maximum}) to (${item.lightning_damage_max_range_minimum} - ${item.lightning_damage_max_range_maximum})`),
        'hasPhysical':
            item.physical_damage_min_range_text && item.physical_damage_min_range_text !== '0' ||
            item.physical_damage_max_range_text && item.physical_damage_max_range_text !== '0',
        'physicalDmg': formatValue(`${item.physical_damage_min_range_text} - ${item.physical_damage_max_range_text}`),
        'hasPoison':
            item.poison_dps_range_minimum && item.poison_dps_range_minimum !== '0' ||
            item.poison_dps_range_maximum && item.poison_dps_range_maximum !== '0',
        'poisonDmg': formatValue(`(${item.poison_dps_range_minimum} - ${item.poison_dps_range_maximum})`),
        'critChance': formatValue(item.critical_strike_chance_range_text),
        'dpsRange': formatValue(item.dps_range_text),
        'elemDpsRange': formatValue(item.elemental_dps_range_text),
        'reloadTime': formatValue(item.reload_time_range_text),
        'spiritRange': formatValue(item.spirit_range_text),
        'weaponRang': formatValue(item.weapon_range_range_text),
    };

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
                    <Text style={frameType === 'unique' ? { color: theme.unique, fontFamily: fonts.cinzel.medium, fontSize: 16 } : { color: theme.stats, fontFamily: fonts.cinzel.medium, fontSize: 16 }}>
                        {name}
                    </Text>
                    {
                        baseItem ?
                            (
                                <Text style={frameType === 'unique' ? { color: theme.unique, fontFamily: fonts.cinzel.medium, fontSize: 8 } : { color: theme.stats, fontFamily: fonts.cinzel.medium, fontSize: 8 }}>
                                    {baseItem}
                                </Text>
                            ) :
                            null
                    }

                </View>

                <View style={styles.backButton} />
            </View>
            <Divider color={'gold'} spaceVertical={0} spaceHorizontal={0} widthDivider={'80%'} align={'flex-start'} />

            <ScrollView style={styles.container} contentContainerStyle={styles.content}>
                <View style={styles.itemContainer}>

                    <View style={
                        frameType === 'unique' ?
                            [styles.itemAttrContainer, styles.outerBorder, { borderColor: theme.unique, backgroundColor: '#00000080' }] :
                            [styles.itemAttrContainer, styles.outerBorder, { borderColor: theme.stats, backgroundColor: '#00000080' }]
                    }>
                        <View style={
                            frameType === 'unique' ?
                                [styles.itemAttrContainer, styles.innerBorder, { borderColor: theme.unique, paddingHorizontal: 12 }] :
                                [styles.itemAttrContainer, styles.innerBorder, { borderColor: theme.stats, paddingHorizontal: 12 }]
                        }>
                            <Text style={{ color: theme.gold, fontFamily: fonts.cinzel.semiBold, width: '100%' }}>
                                General Information
                            </Text>

                            <View style={styles.containerInfo}>
                                <View>
                                    <ItemGeneralLine item={{key: 'Name', value: name}} styleStats={frameType === 'unique' ? { color: theme.unique } : { color: theme.stats }}/>
                                    <ItemGeneralLine item={{key: 'Base Item', value: baseItem}} styleStats={frameType === 'unique' ? { color: theme.unique } : { color: theme.stats }}/>
                                    <ItemGeneralLine item={{key: 'Class', value: itemClass}} styleStats={frameType === 'unique' ? { color: theme.unique } : { color: theme.stats }}/>
                                    <ItemGeneralLine item={{key: 'Rarity', value: rarity}} styleStats={frameType === 'unique' ? { color: theme.unique } : { color: theme.stats }}/>
                                    <ItemGeneralLine item={{key: 'Description', value: description}} isHtmlContent={true} styleStats={frameType === 'unique' ? { color: theme.unique } : { color: theme.stats }}/>
                                </View>
                            </View>
                        </View>

                        <View style={
                            frameType === 'unique' ?
                                [styles.itemAttrContainer, styles.innerBorder, { borderColor: theme.unique, paddingHorizontal: 12, marginTop: 4 }] :
                                [styles.itemAttrContainer, styles.innerBorder, { borderColor: theme.stats, paddingHorizontal: 12, marginTop: 4 }]
                        }>
                            <Text style={{ color: theme.gold, fontFamily: fonts.cinzel.semiBold, width: '100%' }}>
                                Drop Information
                            </Text>

                            <View style={styles.containerInfo}>
                                <View>
                                    <ItemGeneralLine item={{key: 'Acquisition', value: acquisition ? acquisition : itemClassID === 'Microtransaction' ? "Buy in " + itemClassID : "Normal Drop"}} isHtmlContent={true} />
                                    <ItemGeneralLine item={{key: 'Drop Areas', value: dropAreas}} isHtmlContent={true} />
                                </View>
                            </View>
                        </View>
                    </View>

                    <Divider color={'gold'} spaceVertical={16} spaceHorizontal={0} widthDivider={'100%'} align={'center'} />

                    <View style={
                        frameType === 'unique' ?
                            [styles.itemAttrContainer, styles.outerBorder, { borderColor: theme.unique, backgroundColor: '#00000080' }] :
                            [styles.itemAttrContainer, styles.outerBorder, { borderColor: theme.stats, backgroundColor: '#00000080' }]
                    }>
                        <View style={
                            frameType === 'unique' ?
                                [styles.itemAttrContainer, styles.innerBorder, { borderColor: theme.unique }] :
                                [styles.itemAttrContainer, styles.innerBorder, { borderColor: theme.stats }]
                        }>
                            <View>
                                <WikiImage fileName={item.inventory_icon} size={150} />
                            </View>

                            <Text style={[styles.attributes, { marginTop: 8 }]}>{
                                `${'Requires Level ' + requiredLevel}` +
                                `${requiredIntelligence && requiredIntelligence !== '0' ? ', ' + requiredIntelligence + ' Int' : ''}` +
                                `${requiredStrength && requiredStrength !== '0' ? ', ' + requiredStrength + ' Str' : ''}` +
                                `${requiredDexterity && requiredDexterity !== '0' ? ', ' + requiredDexterity + ' Dex' : ''}`
                            }
                            </Text>


                            <Divider color={'gold'} spaceVertical={8} spaceHorizontal={0} widthDivider={'80%'} align={'center'} />

                            <View style={styles.statsItemContainer}>
                                <View style={styles.statsContainer}>
                                    <Text style={attributesArmour.armour && attributesArmour.armour !== '0' ? [styles.attributes] : [styles.attrNone]}>{`Armour: `}
                                        <Text style={[styles.attrValue]}>{attributesArmour.armour}</Text>
                                    </Text>
                                    <Text style={attributesArmour.evasion && attributesArmour.evasion !== '0' ? [styles.attributes] : [styles.attrNone]}>{`Evasion: `}
                                        <Text style={[styles.attrValue]}>{attributesArmour.evasion}</Text>
                                    </Text>
                                    <Text style={attributesArmour.energyShield && attributesArmour.energyShield !== '0' ? [styles.attributes] : [styles.attrNone]}>{`Energy Shield: `}
                                        <Text style={[styles.attrValue]}>{attributesArmour.energyShield}</Text>
                                    </Text>
                                    <Text style={attributesArmour.moveSpeed && attributesArmour.moveSpeed !== '0' ? [styles.attributes] : [styles.attrNone]}>{`Move Speed: `}
                                        <Text style={[styles.attrValue]}>{attributesArmour.moveSpeed}</Text>
                                    </Text>
                                    <Text style={attributesArmour.ward && attributesArmour.ward !== '0' ? [styles.attributes] : [styles.attrNone]}>{`Ward: `}
                                        <Text style={[styles.attrValue]}>{attributesArmour.ward}</Text>
                                    </Text>

                                    <Text style={attributesWeapon.hasPhysical ? [styles.attributes] : [styles.attrNone]}>{`Physical DMG: `}
                                        <Text style={[styles.attrValue]}>{attributesWeapon.physicalDmg}</Text>
                                    </Text>
                                    <Text
                                        style={
                                            attributesWeapon.hasFire ?
                                                [styles.attributes, { color: theme.fire }] :
                                                [styles.attrNone]
                                        }
                                    >Fire: <Text style={[styles.attrValue, { color: theme.fire }]}>{attributesWeapon.fireDmg}</Text>
                                    </Text>
                                    <Text
                                        style={
                                            attributesWeapon.hasCold ?
                                                [styles.attributes, { color: theme.cold }] :
                                                [styles.attrNone]
                                        }
                                    >Cold: <Text style={[styles.attrValue, { color: theme.cold }]}>{attributesWeapon.coldDmg}</Text>
                                    </Text>
                                    <Text
                                        style={
                                            attributesWeapon.hasLightning ?
                                                [styles.attributes, { color: theme.lightning }] :
                                                [styles.attrNone]
                                        }
                                    >Lightning: <Text style={[styles.attrValue, { color: theme.lightning }]}>{attributesWeapon.lightDmg}</Text>
                                    </Text>
                                    <Text
                                        style={
                                            attributesWeapon.hasChaos ?
                                                [styles.attributes, { color: theme.chaos }] :
                                                [styles.attrNone]
                                        }
                                    >Chaos: <Text style={[styles.attrValue, { color: theme.chaos }]}>{attributesWeapon.chaosDmg}</Text>
                                    </Text>
                                    <Text
                                        style={
                                            attributesWeapon.hasPoison ?
                                                [styles.attributes, { color: theme.poison }] :
                                                [styles.attrNone]
                                        }
                                    >Poison: <Text style={[styles.attrValue, { color: theme.poison }]}>{attributesWeapon.poisonDmg}</Text>
                                    </Text>
                                    <Text style={attributesWeapon.critChance && attributesWeapon.critChance !== '0' ? [styles.attributes] : [styles.attrNone]}>{`Critical Chance: `}
                                        <Text style={[styles.attrValue]}>{attributesWeapon.critChance}</Text>
                                    </Text>
                                    <Text style={attributesWeapon.atkSpeed && attributesWeapon.atkSpeed !== '0' ? [styles.attributes] : [styles.attrNone]}>{`Attack Speed: `}
                                        <Text style={[styles.attrValue]}>{attributesWeapon.atkSpeed}</Text>
                                    </Text>
                                    <Text style={attributesWeapon.reloadTime && attributesWeapon.reloadTime !== '0.00' ? [styles.attributes] : [styles.attrNone]}>{`Reload Speed: `}
                                        <Text style={[styles.attrValue]}>{attributesWeapon.reloadTime}</Text>
                                    </Text>

                                </View>
                            </View>

                            {implicitStats ? (
                                <>
                                    <Divider color={'gold'} spaceVertical={8} spaceHorizontal={0} widthDivider={'80%'} align={'center'} />
                                    <Text>
                                        <HtmlContent
                                            value={implicitStats}
                                            styleText={{
                                                color: theme.stats
                                            }}
                                        />
                                    </Text>
                                </>
                            ) : null}

                            {explicitStats ? (
                                <>
                                    <Divider color={'gold'} spaceVertical={8} spaceHorizontal={0} widthDivider={'80%'} align={'center'} />
                                    <Text>
                                        <HtmlContent
                                            value={explicitStats}
                                            styleText={{
                                                color: theme.statsItem,
                                                textAlign: 'center',
                                                hasFont: true
                                            }}
                                        />
                                    </Text>
                                </>
                            ) : null}

                        </View>
                    </View>

                    {
                        flavourText ?
                            (
                                <View>
                                    <Divider color={'gold'} spaceVertical={12} spaceHorizontal={0} widthDivider={'100%'} align={'center'} />

                                    <Text style={
                                        frameType === 'unique' ?
                                            [{ color: theme.unique, fontSize: 8, textAlign: 'center', fontFamily: fonts.cinzel.regular }] :
                                            [{ color: theme.stats, fontSize: 8, textAlign: 'center', fontFamily: fonts.cinzel.regular }]
                                    }>
                                        {flavourText}
                                    </Text>

                                    <Divider color={'gold'} spaceVertical={12} spaceHorizontal={0} widthDivider={'100%'} align={'center'} />
                                </View>
                            ) :
                            null
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}