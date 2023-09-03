import { StyleSheet, Text, View } from 'react-native';

export default function Loading({ text }) {
    return (
        <View style={styles.container}>
            <Text> {text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
