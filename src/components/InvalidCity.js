import { StyleSheet, Text, View } from 'react-native';

export default function InvalidCity() {
    return (
        <View style={styles.container}>
            <Text style={styles.text} >Invalid City </Text>
            <Text style={[styles.text, { color: "blue" }]} >Please Search Again</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#000"
    },
    text: {
        color: "orangered",
        fontSize: 32,
        textAlign: "center"
    }
});
