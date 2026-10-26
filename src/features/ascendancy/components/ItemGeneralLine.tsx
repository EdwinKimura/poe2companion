import HtmlContent from '@/components/html-content';
import { Fonts } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { Text, View } from "react-native";

interface itemData {
    item: { key: string, value: string };
    isHtmlContent?: boolean;
    styleLabel?: {
        color?: string;
        hasFont?: boolean;
        lineHeight?: number;
        fontSize?: number;
        paddingVertical?: number;
    };
    styleStats?: {
        color?: string;
        hasFont?: boolean;
        lineHeight?: number;
        fontSize?: number;
        paddingVertical?: number;
    };
}

export default function ItemGeneralLine({
    item,
    isHtmlContent = false,
    styleLabel,
    styleStats
}: itemData) {
    const theme = useTheme();
    const fonts = Fonts;
    const stylesLabel = {
        color: styleLabel?.color ? styleLabel.color : theme.stats,
        fontFamily: styleLabel?.hasFont ? fonts.cinzel.regular : fonts.inter.Light,
        fontSize: styleLabel?.fontSize ? styleLabel.fontSize : 14,
        paddingVertical: styleLabel?.paddingVertical ? styleLabel.paddingVertical : 4,
        lineHeight: styleLabel?.lineHeight ? styleLabel.lineHeight : 14,
    }
    const stylesStats = {
        color: styleStats?.color ? styleStats.color : theme.stats,
        fontFamily: styleStats?.hasFont ? fonts.cinzel.regular : fonts.inter.Light,
        fontSize: styleStats?.fontSize ? styleStats.fontSize : 14,
        paddingVertical: styleStats?.paddingVertical ? styleStats.paddingVertical : 4,
        lineHeight: styleStats?.lineHeight ? styleStats.lineHeight : 14,
    }

    return (
        <View style={[{ flexDirection: 'row', width: '100%' }]}>

            <Text style={[{ width: '35%' }, stylesLabel]}>
                {item.key}:
            </Text>


            {
                isHtmlContent ?
                    (
                        <Text style={{ maxWidth: '65%' }}>
                            <HtmlContent
                                value={item.value}
                                styleText={{
                                    color: styleStats?.color ? styleStats.color : theme.stats
                                }}
                            />
                        </Text>
                    ) :
                    (
                        <Text style={[{ maxWidth: '65%' }, stylesStats]}>
                            {item.value}
                        </Text>
                    )
            }

        </View>
    )
}