import { StyleSheet } from "react-native";
import Colors from "./Colors";
import cssUtils from "../constants/cssUtils";

const balanceSummaryCardStyles = StyleSheet.create({
    container: {
       backgroundColor: Colors.secondary,
       height: 200,
        width: 350,
        borderRadius: 20,
        padding: 20, borderColor: Colors.lightGrey,
        borderWidth: 1,
        justifyContent: 'space-between',
    },
    smallContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    balanceTextWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    balanceDropdown: {
        flexDirection: 'row',
        // alignItems: 'center',
        gap: 10,
    },
    balanceText: {
        fontSize: cssUtils.mediumBigTextSize,
        fontWeight: cssUtils.mediumBold,
        color: Colors.primaryText,
        paddingBottom: 5,
    },
    smallBalanceText: {
        fontSize: cssUtils.mediumTextSize,
        fontWeight: cssUtils.mediumBold,
        color: Colors.white,
        paddingBottom: 5,
    },
    balanceTitle: {
        color: Colors.primaryText,
        fontSize: cssUtils.smallTextSize,
        fontWeight: cssUtils.bold,
    },
    arrowStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        borderColor: Colors.lightGrey,
        borderWidth: 1,
        padding: 5,
        borderRadius: 20,
        backgroundColor: Colors.redOverlay,
    },
    smallBalanceTitle: {
        color: Colors.primaryText,
        fontSize: cssUtils.smallTextSize,
        fontWeight: cssUtils.bold,
    },
    balanceTitleWwrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
        flexDirection: 'row',
    }
    });

export default balanceSummaryCardStyles;