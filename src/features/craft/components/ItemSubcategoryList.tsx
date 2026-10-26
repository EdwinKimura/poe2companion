
import { Pressable, Text, View } from 'react-native';

import { styles } from '../craft.styles';
import type {
  ItemSubcategoryListProps,
} from '../types/Items.types';

export default function ItemSubcategoryList({
  category,
  onSelect,
}: ItemSubcategoryListProps) {
  if (!category) return null;

  return (
    <View>
      <Text style={styles.sectionTitle}>
        {category.label}
      </Text>

      {category.subcategories.map(subcategory => (
        <Pressable
          key={subcategory.id}
          onPress={() => onSelect(subcategory)}
          style={styles.subcategory}
        >
          <Text style={styles.subcategoryTitle}>
            {subcategory.label}
          </Text>

          <Text style={styles.chevron}>›</Text>
        </Pressable>
      ))}
    </View>
  );
}
