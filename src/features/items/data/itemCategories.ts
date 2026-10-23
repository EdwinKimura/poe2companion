
import type { ItemCategory } from '../types/Items.types';

export const ITEM_CATEGORIES: ItemCategory[] = [
  {
    id: 'gems',
    label: 'Gemas',
    icon: 'gem',
    subcategories: [
      { id: 'Skill Gem', label: 'Gemas de habilidades' },
      { id: 'Support Gem', label: 'Gemas de suporte' },
      { id: 'Meta Skill Gem', label: 'Gemas de habilidades meta' },
      { id: 'Uncut Skill Gem', label: 'Gemas Brutas de habilidades' },
      { id: 'Uncut Support Gem', label: 'Gemas Brutas de suporte' },
      { id: 'Uncut Spirit Gem', label: 'Gemas Brutas espirituais' },
    ],
  },
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
  {
    id: 'flasks',
    label: 'Frascos',
    icon: 'flask',
    subcategories: [
      { id: 'Life Flask', label: 'Frascos de vida' },
      { id: 'Mana Flask', label: 'Frascos de mana' },
      { id: 'Charm', label: 'Patuás' },
    ],
  },
  {
    id: 'currency',
    label: 'Monetários',
    icon: 'coins',
    subcategories: [
      { id: 'Currency Item', label: 'Monetários' },
      { id: 'Augment', label: 'Runas' },
      { id: 'Omen', label: 'Presságios' },
      { id: 'Incubator', label: 'Incubadores' },
      { id: 'Wombgift', label: 'Dádivas de Fenda' },
      { id: 'Pinnacle Key', label: 'Fragmentos de Pinnacle Boss' },
    ],
  },
  {
    id: 'maps',
    label: 'Mapas',
    icon: 'map',
    subcategories: [
      { id: 'Waystone', label: 'Mapas' },
      { id: 'Map Fragment', label: 'Fragmentos de mapa' },
      { id: 'Inscribed Ultimatum', label: 'Ultimatum inscrito' },
      { id: 'Tablet', label: 'Tábuas' },
      { id: 'Trial Coin', label: 'Moeda de Barya' },
      { id: 'Expedition Logbook', label: 'Diário de expedição' },
    ],
  },
  {
    id: 'jewels',
    label: 'Joias',
    icon: 'jewel',
    subcategories: [{ id: 'Jewel', label: 'Joias' }],
  },
  {
    id: 'other',
    label: 'Outros',
    icon: 'boxes',
    subcategories: [
      { id: 'Vault Key', label: 'Chaves do crepúsculo' },
      { id: 'Breachstone', label: 'Pedra de Fenda' },
      { id: 'Relic', label: 'Relíquias' },
      { id: 'Divination Card', label: 'Cartas de adivinhação' },
      { id: 'Hideout Cosmetic', label: 'Cosméticos de refúgios' },
      { id: 'Cosmetic Item', label: 'Cosméticos (microtransação)' },
    ],
  },
];
