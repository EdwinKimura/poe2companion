
import { Pressable, Text, TextInput, View } from 'react-native';

import { COLORS, styles } from '../Items.styles';
import type {
  ItemsFilterPanelProps,
} from '../types/Items.types';

export default function ItemsFilterPanel({
  minLevel,
  maxLevel,
  onMinLevelChange,
  onMaxLevelChange,
  onApply,
  onClear,
}: ItemsFilterPanelProps) {
  return (
    <View style={styles.filterPanel}>
      <View>
        <Text style={styles.filterLabel}>
          Nível do item
        </Text>

        <View style={{ flexDirection: 'row', gap: 8 }}>
          <TextInput
            value={minLevel}
            onChangeText={onMinLevelChange}
            placeholder="Mínimo"
            placeholderTextColor={COLORS.muted}
            keyboardType="number-pad"
            style={[styles.filterInput, { flex: 1 }]}
          />

          <TextInput
            value={maxLevel}
            onChangeText={onMaxLevelChange}
            placeholder="Máximo"
            placeholderTextColor={COLORS.muted}
            keyboardType="number-pad"
            style={[styles.filterInput, { flex: 1 }]}
          />
        </View>
      </View>

      <View style={styles.filterActions}>
        <Pressable
          onPress={onClear}
          style={styles.clearButton}
        >
          <Text style={styles.clearButtonText}>
            Limpar
          </Text>
        </Pressable>

        <Pressable
          onPress={onApply}
          style={styles.applyButton}
        >
          <Text style={styles.applyButtonText}>
            Aplicar filtros
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
