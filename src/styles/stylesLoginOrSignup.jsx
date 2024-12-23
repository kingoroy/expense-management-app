import { StyleSheet } from "react-native"
import Colors from "./Colors"
import cssUtils from "../constants/cssUtils"

export default loginOrSignupStyles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: Colors.moodyBlack,
        paddingTop: 160,
        paddingBottom: 40,
        paddingHorizontal: 40,
    },
    container: {
        alignItems: 'center',
        flex: 1,
        textAlign: 'center',
        gap: 20,
    },
    titleTextsWrapper: {
        gap: 20,
    },
    titleText: {
        color: Colors.primary,
        fontSize: cssUtils.mediumTextSize,
        textAlign: 'center',
        fontWeight: cssUtils.mediumBold
    },
    verifyText: {
        color: Colors.white,
        fontSize: cssUtils.smallTextSize,
        textAlign: 'center',
    },
    buttonWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
    }
})