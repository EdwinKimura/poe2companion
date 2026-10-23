import HtmlContent from '@/components/html-content';
import Divider from '@/components/html-divider';
import WikiImage from '@/components/wiki-image';
import { Fonts } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
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
    const acquisition = formatValue(item.drop_text);
    const attributesArmour = {
        'armour': formatValue(item.armour_range_text),
        'evasion': formatValue(item.evasion_range_text),
        'energyShield': formatValue(item.energy_shield_range_text),
        'moveSpeed': formatValue(item.movement_speed),
        'ward': formatValue(item.ward_range_text),
    };
    const attributesWeapon = {
        'atkSpeed': formatValue(item.attack_speed_range_text),
        'chaosDmg': formatValue(item.chaos_damage_min_range_text),
        'coldDmg': formatValue(item.cold_dps_range_text),
        'critChance': formatValue(item.critical_strike_chance_range_text),
        'dpsRange': formatValue(item.dps_range_text),
        'elemDpsRange': formatValue(item.elemental_dps_range_text),
        'fireDmg': formatValue(item.fire_dps_range_text),
        'lightDmg': formatValue(item.lightning_dps_range_text),
        'physicalDmg': formatValue(item.physical_dps_range_text),
        'poisonDmg': formatValue(item.poison_dps_range_text),
        'reloadTime': formatValue(item.reload_time_range_text),
        'spiritRange': formatValue(item.spirit_range_text),
        'weaponRang': formatValue(item.weapon_range_range_text),
    };

    const excludedFields = new Set([
        'name',
        '_pageTitle',
        'class',
        'rarity',
        'description',
        'explicit_stat_text',
        'implicit_stat_text',
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
            <Image
                style={styles.backgroundImage}
                source={require('@/assets/images/backgrounds/item/background_item.png')}
                resizeMode="cover"
            />
            <View style={styles.containerBackButton}>
                <Pressable
                    onPress={handleGoBack}
                    style={styles.headerButton}
                    accessibilityLabel="Voltar"
                >
                    <Text style={styles.headerButtonText}>‹</Text>
                </Pressable>

                <View>
                    <Text style={[styles.headerTitle, { color: theme.unique, fontFamily: fonts.cinzel.medium }]}>
                        {name}
                    </Text>
                    <Text style={[{ color: theme.unique, fontFamily: fonts.cinzel.medium, fontSize: 8 }]}>{baseItem}</Text>
                </View>

                <View style={styles.headerButton} />
            </View>
            <Divider color={'gold'} spaceVertical={0} spaceHorizontal={0} widthDivider={'80%'} align={'flex-start'} />

            <ScrollView style={styles.container} contentContainerStyle={styles.content}>
                <View style={styles.itemContainer}>
                    <Text style={{ marginTop: -10, marginBottom: 12 }}>
                        <HtmlContent
                            value={`"${flavourText}"`}
                            styleText={{
                                color: theme.unique,
                                isBold: true,
                                textAlign: 'left',
                                fontSize: 10,
                            }}
                        />
                    </Text>

                    <Text style={[styles.attributes]}>{
                        `${'Requires Level ' + requiredLevel}` +
                        `${requiredIntelligence !== '0' ? ', ' + requiredIntelligence + ' Int' : ''}` +
                        `${requiredStrength !== '0' ? ', ' + requiredStrength + ' Str' : ''}` +
                        `${requiredDexterity !== '0' ? ', ' + requiredDexterity + ' Dex' : ''}`
                    }
                    </Text>

                    <View style={styles.itemAttrContainer}>
                        <View style={styles.imageItemContainer}>
                            <Image
                                style={styles.itemFrame}
                                source={require('@/assets/images/backgrounds/item/frame_item.png')}
                                resizeMode="contain"
                            />
                            <WikiImage fileName={item.inventory_icon} size={100} />
                        </View>
                        <View style={styles.statsItemContainer}>
                            <View style={styles.statsContainer}>
                                <Text style={attributesArmour.armour && attributesArmour.armour !== '0' ? [styles.attributes] : [styles.attrNone]}>{`Armour: `}
                                    <Text style={[styles.attrValue, { color: theme.statsLink }]}>{attributesArmour.armour}</Text>
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

                                <Text style={attributesWeapon.physicalDmg && attributesWeapon.physicalDmg !== '0' ? [styles.attributes] : [styles.attrNone]}>{`Physical DMG: `}
                                    <Text style={[styles.attrValue]}>{attributesWeapon.physicalDmg}</Text>
                                </Text>
                                <Text style={
                                    attributesWeapon.fireDmg && attributesWeapon.fireDmg !== '0' ||
                                        attributesWeapon.coldDmg && attributesWeapon.coldDmg !== '0' ||
                                        attributesWeapon.lightDmg && attributesWeapon.lightDmg !== '0' ||
                                        attributesWeapon.chaosDmg && attributesWeapon.chaosDmg !== '0' ||
                                        attributesWeapon.poisonDmg && attributesWeapon.poisonDmg !== '0' ?
                                        [styles.attributes] :
                                        [styles.attrNone]
                                }
                                >{`Elemental DMG: `}</Text>
                                <Text
                                    style={
                                        attributesWeapon.fireDmg && attributesWeapon.fireDmg !== '0' ?
                                            [styles.attrValue] :
                                            [styles.attrNone]
                                    }
                                >- Fire: <Text style={{ color: 'red' }}>{attributesWeapon.fireDmg}</Text>
                                </Text>
                                <Text
                                    style={
                                        attributesWeapon.coldDmg && attributesWeapon.coldDmg !== '0' ?
                                            [styles.attrValue] :
                                            [styles.attrNone]
                                    }
                                >- Cold: <Text style={{ color: theme.statsLink }}>{attributesWeapon.coldDmg}</Text>
                                </Text>
                                <Text
                                    style={
                                        attributesWeapon.lightDmg && attributesWeapon.lightDmg !== '0' ?
                                            [styles.attrValue] :
                                            [styles.attrNone]
                                    }
                                >- Lightning: <Text style={{ color: 'yellow' }}>{attributesWeapon.lightDmg}</Text>
                                </Text>
                                <Text
                                    style={
                                        attributesWeapon.chaosDmg && attributesWeapon.chaosDmg !== '0' ?
                                            [styles.attrValue] :
                                            [styles.attrNone]
                                    }
                                >- Chaos: <Text style={{ color: 'purple' }}>{attributesWeapon.chaosDmg}</Text>
                                </Text>
                                <Text
                                    style={
                                        attributesWeapon.poisonDmg && attributesWeapon.poisonDmg !== '0' ?
                                            [styles.attrValue] :
                                            [styles.attrNone]
                                    }
                                >- Poison: <Text style={{ color: 'green' }}>{attributesWeapon.poisonDmg}</Text>
                                </Text>
                                <Text style={attributesWeapon.critChance && attributesWeapon.critChance !== '0' ? [styles.attributes] : [styles.attrNone]}>{`Critical Chance: `}
                                    <Text style={[styles.attrValue]}>{attributesWeapon.critChance}</Text>
                                </Text>
                                <Text style={attributesWeapon.atkSpeed && attributesWeapon.atkSpeed !== '0' ? [styles.attributes] : [styles.attrNone]}>{`Attack Speed: `}
                                    <Text style={[styles.attrValue]}>{attributesWeapon.atkSpeed}</Text>
                                </Text>
                                <Text style={attributesWeapon.critChance && attributesWeapon.reloadTime !== '0' ? [styles.attributes] : [styles.attrNone]}>{`Reload Speed: `}
                                    <Text style={[styles.attrValue]}>{attributesWeapon.reloadTime}</Text>
                                </Text>

                            </View>
                        </View>
                    </View>
                    <View>

                        {implicitStats ? (
                            <View style={styles.card}>
                                <Text style={{color: theme.gold, fontFamily: fonts.cinzel.bold, fontSize: 14}}>Implicity Stats</Text>
                                <Divider color={'gold'} spaceVertical={4} spaceHorizontal={0} widthDivider={'80%'} align={'center'} />
                                <Text>
                                    <HtmlContent
                                        value={implicitStats}
                                        styleText={{
                                            color: theme.stats
                                        }}
                                    />
                                </Text>
                            </View>
                        ) : null}

                        {explicitStats ? (
                            <>
                                <View style={styles.containerExplicityStats}>
                                    <Text style={{color: theme.gold, fontFamily: fonts.cinzel.bold, fontSize: 14}}>Explicity Stats</Text>
                                    <Divider color={'gold'} spaceVertical={4} spaceHorizontal={0} widthDivider={'80%'} align={'center'} />
                                    <Text>
                                        <HtmlContent
                                            value={explicitStats}
                                            styleText={{
                                                color: theme.stats,
                                                isBold: true,
                                                textAlign: 'center'
                                            }}
                                        />
                                    </Text>
                                </View>
                            </>
                        ) : null}

                    </View>

                </View>

                <View style={[styles.itemCard]}>

                    {acquisition ? (
                        <>
                            <Text style={styles.acquisitionLabel}>Drops</Text>
                            <View style={styles.containerAcquisitionText}>
                                <Text>
                                    <HtmlContent
                                        value={acquisition}
                                        styleText={{
                                            color: theme.stats,
                                            isBold: true,
                                            textAlign: 'center'
                                        }}
                                    />
                                </Text>
                            </View>
                        </>
                    ) : (
                        <Text>

                        </Text>
                    )}

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