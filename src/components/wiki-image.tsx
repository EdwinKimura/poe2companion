// src/components/wiki-image.tsx
import { getCachedImageUri } from '@/services/imageCacheService';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, View } from 'react-native';

interface WikiImageProps {
    fileName: unknown;
    size?: number;
}

export default function WikiImage({
    fileName,
    size = 100,
}: WikiImageProps) {
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    if (typeof fileName !== 'string' || !fileName.trim()) {
        return null;
    }

    useEffect(() => {
        let isMounted = true;

        async function resolveImage() {
            try {
                setIsLoading(true);
                const uri = await getCachedImageUri(fileName as string);
                if (isMounted) {
                    setImageUri(uri);
                }
            } catch (error) {
                console.warn('[WikiImage] Erro ao resolver imagem:', error);
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        }

        void resolveImage();

        return () => {
            isMounted = false;
        };
    }, [fileName]);

    return (
        <View style={[styles.container, { width: size, height: size }]}>
            {isLoading && !imageUri ? (
                <ActivityIndicator size="small" color="#888" />
            ) : (
                <Image
                    source={{ uri: imageUri || '' }}
                    style={{ width: size, height: size }}
                    resizeMode="contain"
                    onError={(error) => {
                        console.warn(
                            '[WikiImage] Erro ao renderizar:',
                            fileName,
                            error.nativeEvent.error,
                        );
                    }}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
})