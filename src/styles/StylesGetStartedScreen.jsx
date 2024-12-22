import { StyleSheet } from "react-native";
import Colors from "./Colors";
import { getFonts } from '../constants/fonts'
export const GetStartedScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: Colors.moodyBlack,
        alignItems: 'center',
        paddingVertical: 40,
    },
    header: {
        backgroundColor: 'green',
        height: 40,
        width: 40,
    },
    body: {
       alignItems: 'center',
       color: Colors.primary,
       textAlign: 'center',
    },
    logoImage: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
        alignItems: 'center',
        textAlign: 'center',
    },
    logoText: {
        color: Colors.primary,
        fontSize: 30,
        fontWeight: 'bold',
        // alignItems: 'center',
        textAlign: 'center',
        width: 200,
        fontFamily: getFonts.CinzeRegular,
    },
    footer: {
       alignItems: 'center',
       gap: 20,
       justifyContent: 'center',
    },
    oneLinerWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '70%',
    },
    oneLinerText: {
        color: Colors.primary,
        fontSize: 30,
        alignItems: 'center',
        textAlign: 'center',
        fontWeight: "bold",
    }
 })