import { StyleSheet } from 'react-native';
import { COLORS } from '../home/home.styles';

export { COLORS };

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    content: {
        padding: 16,
        paddingBottom: 32,
    },
    backButton: {
        color: COLORS.text, 
        fontSize: 16, 
        marginLeft: 8,
        borderWidth: 1,
        borderColor: COLORS.gold,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    title: {
        color: COLORS.text,
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 8,
    },
    subtitle: {
        color: COLORS.gold,
        fontSize: 14,
    },
    card: {
        backgroundColor: COLORS.surface,
        borderColor: COLORS.border,
        borderWidth: 1,
        borderRadius: 10,
        padding: 14,
        marginBottom: 14,
        display: 'none'
    },
    sectionTitle: {
        color: COLORS.gold,
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 12,
    },
    field: {
        paddingVertical: 9,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    fieldLabel: {
        color: COLORS.gold,
        fontSize: 12,
        marginBottom: 5,
    },
    message: {
        color: COLORS.gold,
        fontSize: 15,
        textAlign: 'center',
        marginTop: 32,
    },
    error: {
        color: COLORS.green,
    },

    itemCard: {
        backgroundColor: '#000',
        borderColor: COLORS.unique,
        borderWidth: 1,
        marginVertical: 5
    },
    header: {
        flex: 1,
        height: 65,
        overflow: 'hidden',
        flexDirection: 'row',
        marginBottom: 5,
        position: 'relative',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    },
    titleContainer: {
        flex: 1,
        height: '100%',
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    },
    titleItem: {
        color: COLORS.unique,
        fontSize: 14,
        fontWeight: '500',
        alignSelf: 'center',
    },
    titleBackground: {
        height: '100%',
    },

    divider: {
        height: 1,
        experimental_backgroundPosition: 'center',
        experimental_backgroundRepeat: 'no-repeat',
        experimental_backgroundSize: '100% 100%',
        width: '50%',
        marginVertical: 4,
        alignSelf: 'center'
    },

    attributesContainer: {
        alignItems: 'center',
        marginTop: 4,
        marginBottom: 4
    },
    attributes: {
        color: 'gray',
    },

    containerExplicityStats: {
        alignItems: 'center',
        marginTop: 4,
        marginBottom: 4
    },

    fieldValue: {
        color: COLORS.text,
        fontSize: 14,
        lineHeight: 20,
    },

    acquisitionLabel: {
        color: COLORS.muted,
        fontSize: 18,
        textAlign: 'center',
        marginVertical: 5
    },

    containerAcquisitionText: {
        alignItems: 'center',
        marginTop: 4,
        marginBottom: 4
    },

    metadata: {
        color: COLORS.muted
    }
});