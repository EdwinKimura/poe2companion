
import {
  Image,
  ImageSourcePropType,
  Pressable,
  ScrollView,
  Text,
  View
} from 'react-native';

import { styles } from '../craft.styles';
import type {
  ItemCategory,
  ItemCategoryBarProps,
} from '../types/Items.types';

function getIcon(icon: string): ImageSourcePropType {
  const icons: Record<string, ImageSourcePropType> = {
    gem: require('@/assets/icons/gems_button.png'),
    swords1h: require('@/assets/icons/sword1h_button.png'),
    swords2h: require('@/assets/icons/sword2h_button.png'),
    armour: require('@/assets/icons/armour_button.png'),
    shield: require('@/assets/icons/shield_button.png'),
    belt: require('@/assets/icons/belt_button.png'),
    amulet: require('@/assets/icons/amulet_button.png'),
    flask: require('@/assets/icons/flask_button.png'),
    coins: require('@/assets/icons/coin_button.png'),
    map: require('@/assets/icons/map_button.png'),
    jewel: require('@/assets/icons/jewel_button.png'),
    boxes: require('@/assets/icons/box_button.png'),
  };

  return icons[icon] ?? require('@/assets/icons/box_button.png');
}

export default function ItemCategoryBar({
  categories,
  selectedId,
  onSelect,
}: ItemCategoryBarProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.categoryBar}
      contentContainerStyle={styles.categoryContent}
    >
      {categories.map((category: ItemCategory) => {
        const selected = category.id === selectedId;

        return (
          <Pressable
            key={category.id}
            onPress={() => onSelect(category)}
            style={[
              styles.categoryButton,
              selected && styles.categorySelected,
            ]}
          >
            <View style={styles.categoryIcon}>
              <Image 
                source={require('@/assets/images/backgrounds/button/frameItem.png')}
                style={styles.categoryImageFrame}
                resizeMode='cover'
              />
              <Image 
                source={getIcon(category.icon)}
                style={styles.categoryImage}
                resizeMode='cover'
              />
            </View>

            <View style={styles.labelContainer}>
              <Text style={styles.categoryLabel}>
                {category.label}
              </Text>
            </View>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
