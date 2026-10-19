import { getCachedImageUri } from '@/services/imageCacheService';
import { Image } from 'expo-image';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

interface WikiImageProps {
  fileName?: string | null;
  size?: number;
}

export default function WikiImage({ fileName, size = 60 }: WikiImageProps) {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(Boolean(fileName));

  useEffect(() => {
    let cancelled = false;
    setImageUri(null);

    if (!fileName?.trim()) {
      setIsLoading(false);
      return () => { cancelled = true; };
    }

    setIsLoading(true);
    getCachedImageUri(fileName)
      .then((uri) => {
        if (!cancelled) setImageUri(uri || null);
      })
      .catch((error) => {
        if (!cancelled) {
          setImageUri(null);
          console.warn('[WikiImage] Falha ao carregar imagem.', error);
        }
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => { cancelled = true; };
  }, [fileName]);

  return (
    <View style={[{ width: size, height: size }, styles.container]}>
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={StyleSheet.absoluteFill} contentFit="contain" cachePolicy="memory-disk" transition={0} />
      ) : null}
      {isLoading ? (
        <View style={styles.loaderContainer}><ActivityIndicator size="small" color="#888" /></View>
      ) : !imageUri ? (
        <View style={styles.placeholder} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { justifyContent: 'center', alignItems: 'center', overflow: 'hidden' },
  loaderContainer: { ...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center' },
  placeholder: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(128, 128, 128, 0.08)' },
});
