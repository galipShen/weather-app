
import { StyleSheet, Text, View, } from 'react-native';
import SearchBox from "./SearchBox";
import {
    responsiveHeight,
} from "react-native-responsive-dimensions";

export default function Error({ message, orient, input, setInput, setCity, }) {
    return (
        <View style={styles.container}>
            <SearchBox setCity={setCity} setInput={setInput} input={input} orient={orient} />
            <Text style={styles.text}>{message}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "blue",
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        color: "red",
        fontSize: 32,
        textAlign: "center"
    },
    connection: {
        position: "absolute",
        bottom: 0,
        backgroundColor: "red",
        width: "100%",
        height: responsiveHeight(5),
        justifyContent: "center"
    },
    connectionText: {
        color: "white",
        textAlign: "center",
    }
});
