import * as he from 'he';
import { useMemo } from 'react';
import {
    Linking,
    Text,
    useWindowDimensions,
} from 'react-native';
import RenderHTML from 'react-native-render-html';

import { COLORS } from '../features/itemDetail/ItemDetail.styles';

interface HtmlContentProps {
    value: unknown;
    styleText?: {
        color?: string,
        textAlign?: "left" | "center" | "right" | "justify",
        isBold?: boolean,
        fontSize?: number,
        
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
                    color: COLORS.text,
                    fontSize: 14,
                    lineHeight: 20,
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
                    color: styleText?.color ? styleText?.color : COLORS.text,
                    fontSize: styleText?.fontSize ? styleText?.fontSize : 14,
                    lineHeight: 20,
                    fontWeight: styleText?.isBold ? '700' : 'normal',
                    textAlign: styleText?.textAlign ? styleText?.textAlign : 'left',
                },
                p: {
                    color: styleText?.color ? styleText?.color : COLORS.text,
                    marginTop: 0,
                    marginBottom: 8,
                    fontWeight: styleText?.isBold ? '700' : 'normal',
                    textAlign: styleText?.textAlign ? styleText?.textAlign : 'left',
                },
                span: {
                    color: styleText?.color ? styleText?.color : COLORS.text,
                    fontWeight: styleText?.isBold ? '700' : 'normal',
                    textAlign: styleText?.textAlign ? styleText?.textAlign : 'left',
                },
                em: {
                    color: styleText?.color ? styleText?.color : COLORS.gold,
                    fontStyle: 'normal',
                    textAlign: styleText?.textAlign ? styleText?.textAlign : 'left',
                },
                strong: {
                    color: styleText?.color ? styleText?.color : COLORS.text,
                    fontWeight: '700',
                    textAlign: styleText?.textAlign ? styleText?.textAlign : 'left',
                },
                a: {
                    color: COLORS.gold,
                    textDecorationLine: 'underline',
                    fontWeight: styleText?.isBold ? '700' : 'normal',
                    textAlign: styleText?.textAlign ? styleText?.textAlign : 'left',
                },
                h1: {
                    color: styleText?.color ? styleText?.color : COLORS.text,
                    fontSize: 20,
                    fontWeight: styleText?.isBold ? '700' : 'normal',
                    textAlign: styleText?.textAlign ? styleText?.textAlign : 'left',
                },
                h2: {
                    color: styleText?.color ? styleText?.color : COLORS.text,
                    fontSize: 18,
                    fontWeight: styleText?.isBold ? '700' : 'normal',
                    textAlign: styleText?.textAlign ? styleText?.textAlign : 'left',
                },
                h3: {
                    color: styleText?.color ? styleText?.color : COLORS.text,
                    fontSize: 16,
                    fontWeight: styleText?.isBold ? '700' : 'normal',
                    textAlign: styleText?.textAlign ? styleText?.textAlign : 'left',
                },
                li: {
                    color: styleText?.color ? styleText?.color : COLORS.text,
                    marginBottom: 4,
                    fontWeight: styleText?.isBold ? '700' : 'normal',
                    textAlign: styleText?.textAlign ? styleText?.textAlign : 'left',
                },
            }}
        />
    );
}