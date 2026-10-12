
import { Pressable, Text, View } from 'react-native';

import WikiImage from '@/components/wiki-image';
import { styles } from '../Items.styles';
import type { ItemCardProps } from '../types/Items.types';

export default function ItemCard({
  item,
  onPress,
}: ItemCardProps) {
  
  return (
    <Pressable
      onPress={() => onPress?.(item)}
      style={styles.itemCard}
    >
      <View style={styles.itemImagePlaceholder}>
        <WikiImage fileName={item.itemImage} size={80} />
      </View>

      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>
          {item.name}
        </Text>

        <Text style={styles.itemBase}>
          {item.base}
        </Text>

        <Text style={styles.itemMeta}>
          {"Requires Level: " + item.required_level}
        </Text>
      </View>

      <Text style={styles.chevron}>›</Text>
    </Pressable>
  );
}
