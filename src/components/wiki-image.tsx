import { Image, StyleSheet, View } from 'react-native';

interface WikiImageProps {
    fileName: unknown;
    size?: number;
}

const WIKI_FILE_URL =
    'https://www.poe2wiki.net/wiki/Special:FilePath/';

export default function WikiImage({
    fileName,
    size = 100,
}: WikiImageProps) {
    if (typeof fileName !== 'string' || !fileName.trim()) {
        return null;
    }

    const normalizedName = fileName
        .trim()
        .replace(/^File:/i, '');

    const imageUrl =
        WIKI_FILE_URL + encodeURIComponent(normalizedName);

    return (
        <View
            style={[
                styles.container,
                { width: size, height: size },
            ]}
        >
            <Image
                source={{ uri: imageUrl }}
                style={{ width: size, height: size }}
                resizeMode="contain"
                onError={(error) => {
                    console.warn(
                        '[WikiImage] Erro ao carregar imagem:',
                        normalizedName,
                        error.nativeEvent.error,
                    );
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});