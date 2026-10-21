
export interface ItemSubcategory {
    id: string;
    label: string;
}

export interface ItemCategory {
    id: string;
    label: string;
    icon: string;
    subcategories: ItemSubcategory[];
}

export interface ItemRarity {
    id: string;
    label: string;
}

export interface Item {
    id: string | number;
    name: string;
    base: string;
    rarity: string;
    category: string;
    subcategoryId: string;
    required_level: number;
    inventory_icon?: string | null;
}

export type RarityFilter = ItemRarity;

export interface ItemCategoryBarProps {
    categories: ItemCategory[];
    selectedId: string | null;
    onSelect: (category: ItemCategory) => void;
}

export interface ItemSubcategoryListProps {
    category: ItemCategory | null;
    onSelect: (subcategory: ItemSubcategory) => void;
}

export interface ItemsToolbarProps {
    search: string;
    onSearchChange: (value: string) => void;
    rarity: RarityFilter;
    onRarityChange: (value: RarityFilter) => void;
    onToggleFilters: () => void;
}

export interface ItemsFilterPanelProps {
    minLevel: string;
    maxLevel: string;
    onMinLevelChange: (value: string) => void;
    onMaxLevelChange: (value: string) => void;
    onApply: () => void;
    onClear: () => void;
}

export interface ItemCardProps {
    item: Item;
    onPress?: (item: Item) => void;
}

export interface ItemListProps {
    items: Item[];
    onLoadMore: any;
    onItemPress: (item: Item) => void;
}
