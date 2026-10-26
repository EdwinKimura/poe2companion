
import type { ItemCategory } from '../types/Items.types';

export const ITEM_CATEGORIES: ItemCategory[] = [
  {
    id: 'one_hand',
    label: 'Armas 1M',
    icon: 'swords1h',
    subcategories: [
      { id: 'Claw', label: 'Garras' },
      { id: 'Dagger', label: 'Adagas' },
      { id: 'Wand', label: 'Varinhas' },
      { id: 'One Hand Sword', label: 'Espadas' },
      { id: 'One Hand Axe', label: 'Machados' },
      { id: 'One Hand Mace', label: 'Maças' },
      { id: 'Sceptre', label: 'Cetros' },
      { id: 'Spear', label: 'Lanças' },
      { id: 'Flail', label: 'Manguals' },
    ],
  },
  {
    id: 'two_hand',
    label: 'Armas 2M',
    icon: 'swords2h',
    subcategories: [
      { id: 'Bow', label: 'Arcos' },
      { id: 'Staff', label: 'Cajados' },
      { id: 'Two Hand Sword', label: 'Espadas' },
      { id: 'Two Hand Axe', label: 'Machados' },
      { id: 'Two Hand Mace', label: 'Maças' },
      { id: 'Quarterstaff', label: 'Bastões' },
      { id: 'Crossbow', label: 'Bestas' },
      { id: 'Trap', label: 'Armadilhas' },
      { id: 'Talisman', label: 'Talismãs' },
    ],
  },
  {
    id: 'off_hand',
    label: 'Off-hand',
    icon: 'shield',
    subcategories: [
      { id: 'Quiver', label: 'Aljavas' },
      { id: 'Shield', label: 'Escudos' },
      { id: 'Buckler', label: 'Broquéis' },
      { id: 'Focus', label: 'Focos' },
    ],
  },
  {
    id: 'armour',
    label: 'Armaduras',
    icon: 'armour',
    subcategories: [
      { id: 'Gloves', label: 'Luvas' },
      { id: 'Boots', label: 'Botas' },
      { id: 'Body Armour', label: 'Peitorais' },
      { id: 'Helmet', label: 'Elmos' },
    ],
  },
  {
    id: 'accessories',
    label: 'Pedrarias',
    icon: 'amulet',
    subcategories: [
      { id: 'Amulet', label: 'Amuletos' },
      { id: 'Ring', label: 'Anéis' },
      { id: 'Belt', label: 'Cintos' }
    ],
  },
];
