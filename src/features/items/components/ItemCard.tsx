
import { Pressable, Text, View } from 'react-native';

import HtmlContent from '@/components/html-content';
import WikiImage from '@/components/wiki-image';
import { styles } from '../Items.styles';
import type { ItemCardProps, ItemRarity } from '../types/Items.types';

import { useTheme } from '@/hooks/use-theme';

const RARITIES: ItemRarity[] = [
  {id: 'All', label: 'Todos'},
  {id: 'Normal', label: 'Normal'},
  {id: 'Magic', label: 'Mágico'},
  {id: 'Rare', label: 'Raro'},
  {id: 'Unique', label: 'Único'}
];

export default function ItemCard({
  item,
  onPress,
}: ItemCardProps) {

  const theme = useTheme();
  
  return (
    <Pressable
      onPress={() => onPress?.(item)}
      style={styles.itemCard}
    >
      <View style={styles.itemImagePlaceholder}>
        <WikiImage fileName={item.inventory_icon} size={80} />
      </View>

      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>
          <HtmlContent value={item.name} styleText={{color: theme.gold, hasFont: true}}/>
        </Text>

        <Text style={styles.itemBase}>
          {
            RARITIES[RARITIES.findIndex((rarity) => rarity.id === item.rarity)].label
          }
        </Text>

        <Text style={styles.itemMeta}>
          {"Requires Level: " + item.required_level}
        </Text>
      </View>

      <Text style={styles.chevron}>›</Text>
    </Pressable>
  );
}
