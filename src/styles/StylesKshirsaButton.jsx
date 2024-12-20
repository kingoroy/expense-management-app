import { StyleSheet } from "react-native";
import Colors from "./Colors";

const kshirsaButtonStyles = StyleSheet.create({
    container: {
        backgroundColor: Colors.primary,
        paddingVertical: 10,
        paddingHorizontal: 40,
        alignItems: 'center',
        // width: 200,
        borderRadius: 50,
    },
    text: {
        color: Colors.white,
        fontSize: 20,
    },
})

export default kshirsaButtonStyles