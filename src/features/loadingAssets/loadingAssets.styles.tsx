import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1
    },

    loadBackgroundImage: {
        width: '100%',
        height: "100%",
        position: 'absolute'
    },
    iconSplashScreen: {
        width: '80%',
        height: '75%',
        marginHorizontal: 'auto'
    },
    progressBarContainer:{
        width: '100%',
        height: '25%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    progressBar: {
        width: '80%',
        height: '100%',
        marginTop: 8,
        marginHorizontal: 'auto',
        position:'absolute',
        zIndex: 2
    },
    progressText:{
        color: '#FFF',
        position: 'absolute',
        zIndex: 3,
        fontSize:8
    },
    progressLoading: {
        bottom: "20%",
        position: 'absolute',
    },
    bar: {
        position: 'absolute',
        borderRadius: 10,
        height: 10,
        alignSelf: 'flex-start',
        marginLeft: '12%'
    }
})