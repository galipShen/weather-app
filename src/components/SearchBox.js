import React from "react";
import { View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import {
    responsiveHeight,
    responsiveFontSize
} from "react-native-responsive-dimensions";
import { Ionicons } from '@expo/vector-icons';

export default function SearchBox({ orient, input, setInput, setCity, }) {

    return (
        <View style={styles.searchBox} >
            <TextInput
                placeholder="Enter City"
                placeholderTextColor={"blue"}
                style={[styles.input, { fontSize: orient == "portrait" ? responsiveFontSize(4) : responsiveFontSize(2) }]}
                value={input}
                onChangeText={text => setInput(text)}
                returnKeyType="go"
                onEndEditing={() => setCity(input)}
            />
            <TouchableOpacity style={styles.searchIcon}
                onPress={() => { setCity(input) }} >
                <Ionicons name="search" size={responsiveHeight(4)} color="blue" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    searchBox: {
        flex: 1,
        flexDirection: "row",
    },
    input: {
        flex: 3,
        fontSize: 24,
        color: "#fff",
        textAlign: "center",
        textTransform: "capitalize",
    },
    searchIcon: {
        flex: 2,
        alignItems: "center",
        justifyContent: "center",
    },
});
