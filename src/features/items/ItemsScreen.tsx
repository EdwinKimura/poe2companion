
import { useRouter } from 'expo-router';
import { Fragment, useEffect, useMemo, useState } from 'react';
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

import ItemCategoryBar from './components/ItemCategoryBar';
import ItemList from './components/ItemList';
import ItemsFilterPanel from './components/ItemsFilterPanel';
import ItemsToolbar from './components/ItemsToolbar';
import ItemSubcategoryList from './components/ItemSubcategoryList';

import { getDatabase } from '@/database/database';
import { getItemsByCategory } from '@/database/repositories/ItemsRepository';

import { clearImageCacheQueue } from '@/services/imageCacheService';

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
  const [rarity, setRarity] = useState<RarityFilter>({id: 'All', label: 'Todos'});
  const [showFilters, setShowFilters] = useState(false);

  const [minLevel, setMinLevel] = useState('');
  const [maxLevel, setMaxLevel] = useState('');
  const [appliedMinLevel, setAppliedMinLevel] = useState('');
  const [appliedMaxLevel, setAppliedMaxLevel] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);
  const LIMIT = 20;

  useEffect(() => {
    return () => {
      clearImageCacheQueue();
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      clearImageCacheQueue();
      setDebouncedSearch(search);
    }, 600);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    async function loadFilteredItems() {
      setLoading(true);
      try {

        const database = await getDatabase();

        const data = await getItemsByCategory(
          database,
          selectedCategory,
          LIMIT,
          0,
          debouncedSearch
        );
        setItems(data);
        setOffset(LIMIT);
      } catch (error) {
        console.error('Erro ao carregar itens filtrados:', error);
      } finally {
        setLoading(false);
      }
    }

    if (subcategory) {
      loadFilteredItems();
    }
  }, [selectedCategory, debouncedSearch, subcategory]);

  const loadMoreItems = async () => {
    if (loading) return;
    try {
      const database = await getDatabase();
      const moreData = await getItemsByCategory(
        database,
        selectedCategory,
        LIMIT,
        offset,
        debouncedSearch
      );
      if (moreData.length > 0) {
        setItems(prev => [...prev, ...moreData]);
        setOffset(prev => prev + LIMIT);
      }
    } catch (error) {
      console.error('Erro ao carregar mais itens:', error);
    }
  };

  function selectCategory(item: ItemCategory) {
    clearImageCacheQueue();
    setCategory(item);
    setSubcategory(null);
    setSearch('');
    setRarity({id: 'All', label: 'Todos'});
    setShowFilters(false);
    setOffset(0);
    setItems([]);
  }

  function selectSubcategory(item: ItemSubcategory) {
    clearImageCacheQueue();
    setSelectedCategory(item.id)
    setSubcategory(item);
    setSearch('');
    setRarity({id: 'All', label: 'Todos'});
    setShowFilters(false);
    setMinLevel('');
    setMaxLevel('');
    setAppliedMinLevel('');
    setAppliedMaxLevel('');
    setItems([]);
    setOffset(0);
  }

  function goBack() {
    if (subcategory) {
      setSubcategory(null);
      setShowFilters(false);
      clearImageCacheQueue();
    } else if (category) {
      setCategory(null);
      clearImageCacheQueue();
    } else {
      clearImageCacheQueue();
      router.back();
    }
  }

  function clearFilters() {
    setMinLevel('');
    setMaxLevel('');
    setAppliedMinLevel('');
    setAppliedMaxLevel('');
    setSearch('');
    setRarity({id: 'All', label: 'Todos'});
  }

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      if (rarity.id !== 'All' && item.rarity !== rarity.id) {
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
    items,
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
              <Text style={styles.categoryLabel}>{category.label} {'>'} {subcategory.label}</Text>
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
              onLoadMore={loadMoreItems}
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
