
import { FlatList, Text } from 'react-native';

import { styles } from '../Items.styles';
import type { ItemListProps } from '../types/Items.types';
import ItemCard from './ItemCard';

export default function ItemList({
  items,
  onItemPress,
}: ItemListProps) {
  return (
    <FlatList
      data={items}
      keyExtractor={item => String(item.id)}
      renderItem={({ item }) => (
        <ItemCard
          item={item}
          onPress={onItemPress}
        />
      )}
      contentContainerStyle={{ paddingBottom: 24 }}
      keyboardShouldPersistTaps="handled"
      ListEmptyComponent={
        <Text style={styles.emptyText}>
          Nenhum item encontrado.
        </Text>
      }
    />
  );
}
