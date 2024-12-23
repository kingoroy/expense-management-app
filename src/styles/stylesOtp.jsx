import { StyleSheet } from "react-native";
import Colors from "./Colors";
import cssUtils from "../constants/cssUtils";

export const otpStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Colors.moodyBlack,
        paddingVertical: 20
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        padding: 20,
        gap:5,
    },
    headerText: {
        color: Colors.white,
    },
    body: {
        justifyContent: 'center',
        alignItems: 'center',
        gap:20
    },
    otpTexts: {
        color: Colors.white,
        fontSize: cssUtils.smallTextSize
    },
    footer: {
        height:60
    }
})