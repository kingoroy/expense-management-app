import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import Colors from "../styles/Colors";

export default function KshirsaFloatingBtn() {
    const { visible, icon, btnStyles, onPress } = useSelector(
        (state) => state.floatingButtonReducer
    );
    if (!visible) return null; // Don't render if the button is not visible

    return (
        <TouchableOpacity
            style={[styles.button, btnStyles]}
            onPress={onPress}
        >
            <FontAwesome6 name={icon} size={24} color="white" />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        position: "absolute",
        width: 60,
        height: 60,
        borderRadius: 50,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: Colors.secondary,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
        zIndex: 1,
    },
});
