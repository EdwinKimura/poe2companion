import { StyleSheet } from 'react-native';
import { COLORS } from '../home/home.styles';

export { COLORS };

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        padding: 16,
        paddingBottom: 32,
    },
    containerBackButton: {
        height: 56,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: "100%",
        height: "100%"
    },
    headerButton: {
        width: 36,
        justifyContent: 'center',
    },
    headerButtonText: {
        color: COLORS.gold,
        fontSize: 48,
        lineHeight: 48
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 5
    },

    itemContainer: {
        width: "100%",
        height: 300,
        flexDirection: 'row'
    },
    imageItemContainer: {
        justifyContent: 'center', 
        alignItems: 'center', 
        width: '40%', 
        height: 200
    },
    itemFrame: {
        position: "absolute",
        width: '100%',
        height: 200
    },
    statsItemContainer: {
        justifyContent: 'center', 
        alignItems: 'center', 
        width: '60%', 
        height: 200
    },
    titleContainer: {
        flex: 1,
        width: '100%',
        height: 200,
        paddingVertical: 14,
        paddingHorizontal: 8
    },
    titleItem: {
        color: COLORS.unique,
        fontSize: 14,
        fontWeight: '500',
    },
    attributesContainer: {
        alignItems: 'flex-start',
        marginTop: 4,
        marginBottom: 4
    },
    attributes: {
        color: 'gray',
        fontSize: 12,
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