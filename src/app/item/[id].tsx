import { useLocalSearchParams } from 'expo-router';

import ItemDetailScreen from '../../features/itemDetail/ItemDetailScreen';

export default function ItemDetailRoute() {
    const { id } = useLocalSearchParams<{ id: string }>();

    return <ItemDetailScreen id={id} />;
}