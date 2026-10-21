
import { FlatList, Text } from 'react-native';

import { styles } from '../Items.styles';
import type { ItemListProps } from '../types/Items.types';
import ItemCard from './ItemCard';

export default function ItemList({
  items,
  onLoadMore,
  onItemPress,
}: ItemListProps) {
  return (
    <FlatList
      data={items}
      keyExtractor={(item, index) => {
        const uniqueId = item.id ? item.id.toString() : 'item';
        return `${uniqueId}-${index}`;
      }}
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
      
      initialNumToRender={10}
      maxToRenderPerBatch={5}
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.5}
      windowSize={5}
      removeClippedSubviews={true}
    />
  );
}
