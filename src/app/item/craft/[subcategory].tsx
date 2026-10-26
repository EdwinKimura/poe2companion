import CraftTagScreen from '@/features/craft/feature/CraftTagScreen';
import { useLocalSearchParams } from 'expo-router';

export default function CraftTagRoute() {
    const { subcategory } = useLocalSearchParams<{ subcategory: string }>();

    return <CraftTagScreen subcategory={subcategory} />
}