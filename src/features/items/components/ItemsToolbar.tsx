
import {
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';

import { COLORS, styles } from '../Items.styles';
import type {
  ItemsToolbarProps,
  RarityFilter,
} from '../types/Items.types';

const RARITIES: RarityFilter[] = [
  'Todos',
  'Normal',
  'Magic',
  'Rare',
  'Unique',
];

export default function ItemsToolbar({
  search,
  onSearchChange,
  rarity,
  onRarityChange,
  onToggleFilters,
}: ItemsToolbarProps) {
  return (
    <View style={styles.toolbar}>
      <View style={styles.searchRow}>
        <TextInput
          value={search}
          onChangeText={onSearchChange}
          placeholder="Buscar itens..."
          placeholderTextColor={COLORS.muted}
          style={styles.searchInput}
          returnKeyType="search"
          clearButtonMode="while-editing"
          accessibilityLabel="Buscar itens"
        />

        <Pressable
          onPress={onToggleFilters}
          style={styles.filterButton}
          accessibilityLabel="Abrir filtros avançados"
        >
          <Text style={styles.filterButtonText}>☷</Text>
        </Pressable>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipRow}
      >
        {RARITIES.map(option => {
          const selected = rarity === option;

          return (
            <Pressable
              key={option}
              onPress={() => onRarityChange(option)}
              style={[
                styles.chip,
                selected && styles.chipSelected,
              ]}
            >
              <Text
                style={[
                  styles.chipText,
                  selected && styles.chipTextSelected,
                ]}
              >
                {option}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}
