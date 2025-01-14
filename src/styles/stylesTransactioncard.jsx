import { StyleSheet } from "react-native";
import Colors from "./Colors";
import cssUtils from "../constants/cssUtils";

const transactionCardStyles = StyleSheet.create({
    container: {
        backgroundColor: Colors.normalInputBg,
        borderRadius: 20,
        paddingVertical: 20,
        paddingHorizontal: 10,
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rightContainer: {
        alignItems: 'flex-end',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 14,
        color: Colors.lightGrey,
    },
    amount: {
        // fontWeight: cssUtils.mediumBold,
        fontSize: cssUtils.mediumTextSize,
        color: Colors.white,
    },
});

export default transactionCardStyles;