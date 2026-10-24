import RenderHTML from '@native-html/render';
import * as he from 'he';
import { useMemo } from 'react';
import {
    Linking,
    Text,
    useWindowDimensions,
} from 'react-native';

import { Fonts } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

interface HtmlContentProps {
    value: unknown;
    styleText?: {
        color?: string,
        textAlign?: "left" | "center" | "right" | "justify",
        isBold?: boolean,
        fontSize?: number,
        hasFont?: boolean
    };
}

function escapeHtml(value: string): string {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function wikiLinksToHtml(value: string): string {
    return value.replace(
        /\[\[([^\[\]]+)\]\]/g,
        (_match, content: string) => {
            const [targetValue, labelValue] = content.split('|');

            const target = targetValue.trim();
            const label = (labelValue ?? target).trim();

            if (!target) {
                return escapeHtml(label);
            }

            const page = target.replace(/ /g, '_');
            const url =
                `https://www.poe2wiki.net/wiki/${encodeURIComponent(page)}`;

            return (
                `<a href="${url}">` +
                `${escapeHtml(label)}` +
                `</a>`
            );
        },
    );
}

export default function HtmlContent({ value, styleText }: HtmlContentProps) {
    const { width } = useWindowDimensions();
    const theme = useTheme();
     const fonts = Fonts;

    const content = useMemo(() => {
        if (value === null || value === undefined) {
            return '';
        }

        // Primeiro decodifica entidades HTML armazenadas no banco.
        const decoded = he.decode(String(value));

        // Depois transforma os wikilinks em links HTML.
        return wikiLinksToHtml(decoded);
    }, [value]);

    const containsHtml = /<\/?[a-z][^>]*>/i.test(content);

    if (!content) {
        return null;
    }

    if (!containsHtml) {
        return (
            <Text
                style={{
                    color: styleText?.color ? styleText?.color : theme.text,
                    fontSize: styleText?.fontSize ? styleText?.fontSize : 14,
                    textAlign: styleText?.textAlign ? styleText?.textAlign : 'left',
                    fontFamily: styleText?.hasFont ? fonts.cinzel.medium : fonts.inter.Light
                }}
            >
                {content}
            </Text>
        );
    }

    return (
        <RenderHTML
            contentWidth={width - 64}
            source={{ html: content }}
            renderersProps={{
                a: {
                    onPress: (_event, href) => {
                        void Linking.openURL(href);
                    },
                },
            }}
            tagsStyles={{
                body: {
                    color: styleText?.color ? styleText?.color : theme.text,
                    fontSize: styleText?.fontSize ? styleText?.fontSize : 14,
                    lineHeight: 20,
                    textAlign: styleText?.textAlign ? styleText?.textAlign : 'left',
                    fontFamily: styleText?.hasFont ? fonts.cinzel.medium : fonts.inter.Light
                },
                p: {
                    color: styleText?.color ? styleText?.color : theme.text,
                    marginTop: 0,
                    marginBottom: 8,
                    textAlign: styleText?.textAlign ? styleText?.textAlign : 'left',
                    fontFamily: styleText?.hasFont ? fonts.cinzel.medium : fonts.inter.Light
                },
                span: {
                    color: styleText?.color ? styleText?.color : theme.text,
                    textAlign: styleText?.textAlign ? styleText?.textAlign : 'left',
                    fontFamily: styleText?.hasFont ? fonts.cinzel.medium : fonts.inter.Light
                },
                em: {
                    color: styleText?.color ? styleText?.color : theme.gold,
                    textAlign: styleText?.textAlign ? styleText?.textAlign : 'left',
                    fontFamily: styleText?.hasFont ? fonts.cinzel.medium : fonts.inter.Light
                },
                strong: {
                    color: styleText?.color ? styleText?.color : theme.text,
                    textAlign: styleText?.textAlign ? styleText?.textAlign : 'left',
                    fontFamily: styleText?.hasFont ? fonts.cinzel.bold : fonts.inter.bold
                },
                a: {
                    color: theme.gold,
                    textDecorationLine: 'underline',
                    textAlign: styleText?.textAlign ? styleText?.textAlign : 'left',
                    fontFamily: styleText?.hasFont ? fonts.cinzel.medium : fonts.inter.Light
                },
                h1: {
                    color: styleText?.color ? styleText?.color : theme.text,
                    fontSize: 20,
                    textAlign: styleText?.textAlign ? styleText?.textAlign : 'left',
                    fontFamily: styleText?.hasFont ? fonts.cinzel.medium : fonts.inter.Light
                },
                h2: {
                    color: styleText?.color ? styleText?.color : theme.text,
                    fontSize: 18,
                    textAlign: styleText?.textAlign ? styleText?.textAlign : 'left',
                    fontFamily: styleText?.hasFont ? fonts.cinzel.medium : fonts.inter.Light
                },
                h3: {
                    color: styleText?.color ? styleText?.color : theme.text,
                    fontSize: 16,
                    textAlign: styleText?.textAlign ? styleText?.textAlign : 'left',
                    fontFamily: styleText?.hasFont ? fonts.cinzel.medium : fonts.inter.Light
                },
                li: {
                    color: styleText?.color ? styleText?.color : theme.text,
                    marginBottom: 4,
                    textAlign: styleText?.textAlign ? styleText?.textAlign : 'left',
                    fontFamily: styleText?.hasFont ? fonts.cinzel.medium : fonts.inter.Light
                },
            }}
        />
    );
}