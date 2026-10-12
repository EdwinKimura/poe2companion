import {
    StyleSheet,
    View
} from 'react-native';

import { useTheme } from '@/hooks/use-theme';

export default function Divider({
    color,
    spaceVertical = 0,
    spaceHorizontal = 0,
    spaceTop = null,
    spaceRight = null,
    spaceBottom = null,
    spaceLeft = null,
    widthDivider = '50%',
    fade = '100% 100%',
    align = 'center'
}: any) {
    const theme = useTheme();

    const COLORS = {
        'backgroundElement': theme.backgroundElement,
        'backgroundSelected': theme.backgroundSelected,
        'textSecondary': theme.textSecondary,
        'background': theme.background,
        'surface': theme.surface,
        'surfaceLight': theme.surfaceLight,
        'border': theme.border,
        'text': theme.text,
        'muted': theme.muted,
        'gold': theme.gold,
        'green': theme.green,
        'unique': theme.unique,
        'stats': theme.stats,
        'statsLink': theme.statsLink,
        'disabled': theme.disabled,
    }

    type ColorName = keyof typeof COLORS;

    function getColor(colorName: ColorName){
        return COLORS[colorName]
    }

    return (
        <View style={[
            styles.divider, 
            {
                experimental_backgroundImage: 'radial-gradient(circle, '+ getColor(color) +', transparent)',
                experimental_backgroundSize: fade,
                marginVertical: spaceVertical,
                marginHorizontal: spaceHorizontal,
                alignSelf: align,
                width: widthDivider,
            },
            spaceTop ? { marginBottom: spaceTop } : {},
            spaceRight ? { marginBottom: spaceRight } : {},
            spaceBottom ? { marginBottom: spaceBottom } : {},
            spaceLeft ? { marginBottom: spaceLeft } : {},
        ]}/>
    )
}

export const styles = StyleSheet.create({
    divider: {
        height: 1,
        experimental_backgroundPosition: 'center',
        experimental_backgroundRepeat: 'no-repeat',
    }
})