
import { useRouter } from 'expo-router';
import { Fragment, useMemo, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ITEM_CATEGORIES } from './data/itemCategories';
import { COLORS, styles } from './Items.styles';

import { ItemBreadcrumb } from './components/ItemBreadcrumb';
import ItemCategoryBar from './components/ItemCategoryBar';
import ItemList from './components/ItemList';
import ItemsFilterPanel from './components/ItemsFilterPanel';
import ItemsToolbar from './components/ItemsToolbar';
import ItemSubcategoryList from './components/ItemSubcategoryList';


import type {
  Item,
  ItemCategory,
  ItemSubcategory,
  RarityFilter,
} from './types/Items.types';

const MOCK_ITEMS: Item[] = [
  {
    id: 1,
    name: 'Elmo de Ferro',
    base: 'Helmets',
    rarity: 'Normal',
    category: 'Armaduras',
    subcategoryId: 'Helmets',
    required_level: 10,
  },
  {
    id: 2,
    name: 'Elmo Reforçado',
    base: 'Helmets',
    rarity: 'Magic',
    category: 'Armaduras',
    subcategoryId: 'Helmets',
    required_level: 25,
  },
  {
    id: 3,
    name: 'Coroa de Guerra',
    base: 'Helmets',
    rarity: 'Rare',
    category: 'Armaduras',
    subcategoryId: 'Helmets',
    required_level: 40,
  },
  {
    id: 4,
    name: 'Anel de Ferro',
    base: 'Ring',
    rarity: 'Normal',
    category: 'Pedrarias',
    subcategoryId: 'Rings',
    required_level: 5,
  },
];

export default function ItemsScreen() {
  const router = useRouter();

  const [category, setCategory] =
    useState<ItemCategory | null>(null);

  const [subcategory, setSubcategory] =
    useState<ItemSubcategory | null>(null);

  const [search, setSearch] = useState('');
  const [rarity, setRarity] = useState<RarityFilter>('Todos');
  const [showFilters, setShowFilters] = useState(false);

  const [minLevel, setMinLevel] = useState('');
  const [maxLevel, setMaxLevel] = useState('');
  const [appliedMinLevel, setAppliedMinLevel] = useState('');
  const [appliedMaxLevel, setAppliedMaxLevel] = useState('');

  function selectCategory(item: ItemCategory) {
    setCategory(item);
    setSubcategory(null);
    setSearch('');
    setRarity('Todos');
    setShowFilters(false);
  }

  function selectSubcategory(item: ItemSubcategory) {
    setSubcategory(item);
    setSearch('');
    setRarity('Todos');
    setShowFilters(false);
    setMinLevel('');
    setMaxLevel('');
    setAppliedMinLevel('');
    setAppliedMaxLevel('');
  }

  function goBack() {
    if (subcategory) {
      setSubcategory(null);
      setShowFilters(false);
    } else if (category) {
      setCategory(null);
    } else {
      router.back();
    }
  }

  function clearFilters() {
    setMinLevel('');
    setMaxLevel('');
    setAppliedMinLevel('');
    setAppliedMaxLevel('');
    setSearch('');
    setRarity('Todos');
  }

  const filteredItems = useMemo(() => {
    return MOCK_ITEMS.filter(item => {
      if (subcategory && item.subcategoryId !== subcategory.id) {
        return false;
      }

      if (
        category &&
        !subcategory &&
        !category.subcategories.some(
          sub => sub.id === item.subcategoryId,
        )
      ) {
        return false;
      }

      if (
        search.trim() &&
        !item.name?.toLowerCase().includes(search.trim().toLowerCase())
      ) {
        return false;
      }

      if (rarity !== 'Todos' && item.rarity !== rarity) {
        return false;
      }

      if (
        appliedMinLevel !== '' &&
        item.required_level < Number(appliedMinLevel)
      ) {
        return false;
      }

      if (
        appliedMaxLevel !== '' &&
        item.required_level > Number(appliedMaxLevel)
      ) {
        return false;
      }

      return true;
    });
  }, [
    category,
    subcategory,
    search,
    rarity,
    appliedMinLevel,
    appliedMaxLevel,
  ]);

  return (
    <SafeAreaView
      style={styles.screen}
      edges={['top', 'bottom', 'left', 'right']}
    >
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.background}
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
          {subcategory?.label ?? category?.label ?? 'Itens'}
        </Text>

        <View style={styles.headerButton} />
      </View>

      {!subcategory && (
        <ItemCategoryBar
          categories={ITEM_CATEGORIES}
          selectedId={category?.id ?? null}
          onSelect={selectCategory}
        />
      )}

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

      {category && !subcategory && (
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

      {category && subcategory && (
        <Fragment>
          <View style={styles.content}>
            <View style={styles.breadcrumbContainer}>
              <ItemBreadcrumb
                category={category.label}
                starting={true}
              />
              <ItemBreadcrumb
                category={subcategory.label}
              />
            </View>

            <ItemsToolbar
              search={search}
              onSearchChange={setSearch}
              rarity={rarity}
              onRarityChange={setRarity}
              onToggleFilters={() =>
                setShowFilters(current => !current)
              }
            />

            {showFilters && (
              <ItemsFilterPanel
                minLevel={minLevel}
                maxLevel={maxLevel}
                onMinLevelChange={setMinLevel}
                onMaxLevelChange={setMaxLevel}
                onApply={() => {
                  setAppliedMinLevel(minLevel);
                  setAppliedMaxLevel(maxLevel);
                  setShowFilters(false);
                }}
                onClear={clearFilters}
              />
            )}

            <ItemList
              items={filteredItems}
              onItemPress={item => {
                router.push({
                  pathname: '/item/[id]',
                  params: { id: String(item.id) },
                });
              }}
            />
          </View>
        </Fragment>
      )}
    </SafeAreaView>
  );
}
