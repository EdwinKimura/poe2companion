
import Divider from '@/components/html-divider';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    Image,
    Pressable,
    ScrollView,
    StatusBar,
    Text,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme } from '@/hooks/use-theme';
import { styles } from './craft.styles';
import { ITEM_CATEGORIES } from './data/itemCategories';

import ItemCategoryBar from './components/ItemCategoryBar';
import ItemSubcategoryList from './components/ItemSubcategoryList';


import type {
    ItemCategory,
    ItemSubcategory,
} from './types/Items.types';


export default function CraftScreen() {
    const router = useRouter();
    const theme = useTheme();

    const [category, setCategory] = useState<ItemCategory | null>(null);
    const [subcategory, setSubcategory] = useState<ItemSubcategory | null>(null);

    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    useEffect(() => {
        setSubcategory(null);
    })

    useEffect(() => {
        async function routeCraftMenu() {
            router.push({
                pathname: `/item/craft/[subcategory]`,
                params: {subcategory: subcategory?.id}
            });
        }

        if (subcategory) {
            routeCraftMenu();
        }
    }, [selectedCategory, subcategory]);

    function selectCategory(item: ItemCategory) {
        setCategory(item);
        setSubcategory(null);
    }

    function selectSubcategory(item: ItemSubcategory) {
        setSelectedCategory(item.id)
        setSubcategory(item);
    }

    function goBack() {
        if (subcategory) {
            setSubcategory(null);
        } else if (category) {
            setCategory(null);
        } else {
            router.back();
        }
    }

    return (
        <SafeAreaView
            style={styles.screen}
            edges={['top', 'bottom', 'left', 'right']}
        >
            <Image
                style={styles.backgroundImage}
                source={require('@/assets/images/backgrounds/item/background_item.png')}
                resizeMode="cover"
            />

            <StatusBar
                barStyle="light-content"
                backgroundColor={theme.background}
            />

            <View style={styles.header}>
                <Pressable
                    onPress={goBack}
                    style={styles.headerButton}
                    accessibilityLabel="Voltar"
                >
                    <Text style={styles.headerButtonText}>‹</Text>
                </Pressable>

                <Text style={styles.headerTitle}>
                    {subcategory?.label ?? category?.label ?? 'Craft'}
                </Text>

                <View style={styles.headerButton} />
            </View>
            <Divider color={'gold'} spaceVertical={0} spaceHorizontal={0} widthDivider={'100%'} align={'flex-start'} />

            <ItemCategoryBar
                categories={ITEM_CATEGORIES}
                selectedId={category?.id ?? null}
                onSelect={selectCategory}
            />

            <Divider color={'gold'} spaceVertical={0} spaceHorizontal={0} widthDivider={'100%'} align={'flex-start'} />

            {!category && (
                <ScrollView style={styles.containerList}>
                    <View style={styles.content}>
                        <View style={styles.contentPadding}>
                            <Text style={styles.sectionTitle}>
                                Categorias
                            </Text>

                            {ITEM_CATEGORIES.map(item => (
                                <Pressable
                                    key={item.id}
                                    onPress={() => selectCategory(item)}
                                    style={styles.subcategory}
                                >
                                    <Text style={styles.subcategoryTitle}>
                                        {item.label}
                                    </Text>
                                    <Text style={styles.chevron}>›</Text>
                                </Pressable>
                            ))}
                        </View>
                    </View>
                </ScrollView>
            )}

            {category && (
                <ScrollView style={styles.containerList}>
                    <View style={styles.content}>
                        <View style={styles.contentPadding}>
                            <ItemSubcategoryList
                                category={category}
                                onSelect={selectSubcategory}
                            />
                        </View>
                    </View>
                </ScrollView>
            )}
        </SafeAreaView>
    );
}
