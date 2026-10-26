import { Fonts } from '@/constants/theme';
import { StyleSheet } from 'react-native';
import { COLORS } from '../home/home.styles';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        padding: 16,
        paddingBottom: 32,
    },

    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        flex: 1
    },
    containerBackButton: {
        height: 56,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    backButton: {
        width: 36,
        justifyContent: 'center',
    },
    backButtonText: {
        color: COLORS.gold,
        fontSize: 48,
        lineHeight: 48,
        marginBottom: 8
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 5
    },

    itemContainer: {
        width: "100%",
        paddingHorizontal: 4
    },

    attributes: {
        color: 'gray',
        fontSize: 12,
        fontWeight: 600,
        fontFamily: Fonts.cinzel.medium
    },
    itemAttrContainer: {
        width: "100%",
        paddingHorizontal: 4,
        alignItems: 'center'
    },
    statsItemContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    statsContainer: {
        width: '100%',
        alignItems: 'center',
        paddingVertical: 2,
        paddingHorizontal: 8,
        marginHorizontal: 4,
        backgroundImage: 'linear-gradient(to right, #000 75%, transparent 100%)'
    },
    attrValue: {
        fontSize: 14,
        color: '#6575d1',
        fontWeight: 400,
        fontFamily: Fonts.cinzel.medium
    },
    attrNone: {
        display: 'none',
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

    outerBorder: {
        borderWidth: 2,
        borderColor: '#A17B49',
        padding: 3,
    },
    innerBorder: {
        borderWidth: 1,
        borderColor: '#59432D',
        padding: 12,
    },


    containerInfo: {
        width: '100%', 
        marginTop: 8
    },

    infoLabel: {
        color: COLORS.stats,
    },

});