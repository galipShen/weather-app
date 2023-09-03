import { StyleSheet, Text, View, Image } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

export default function Days({ data, orient }) {

    return (
        <View style={[styles.day,]}>
            <View style={[styles.dateShort,]}>
                <Text style={[styles.dayShort, { fontSize: orient == "portrait" ? responsiveFontSize(3) : responsiveFontSize(2) }]}>{data?.dayName?.slice(0, 3)}</Text>
                <Text style={[styles.dateText, { fontSize: orient == "portrait" ? responsiveFontSize(3) : responsiveFontSize(2) }]}>{data?.date}</Text>
            </View>
            <Image
                style={styles.iconSmall}
                source={{
                    uri:
                        data?.weatherIcon ?
                            `https://openweathermap.org/img/wn/${data?.weatherIcon.replace("n", "d")}@2x.png`
                            : null
                }} />
            <View style={styles.maxminBox}>
                <Text style={{
                    color: "indianred",
                    fontSize: orient == "portrait" ? responsiveFontSize(4) : responsiveFontSize(3)
                }}>{Math.round(data.max)}
                    <Text style={null} > &#186;
                    </Text>
                </Text>
                <Text style={{
                    color: "white",
                    fontSize: orient == "portrait" ? responsiveFontSize(3) : responsiveFontSize(2),
                }}> / {Math.round(data.min)}
                    <Text style={[styles.degreeText]} > &#186;
                    </Text>
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    day: {
        flex: 1,
        borderBottomWidth: 2,
        borderBottomColor: "gray",
        paddingHorizontal: responsiveWidth(5),
        paddingVertical: responsiveHeight(1),
        flexDirection: "row",
    },
    dateShort: {
        flex: 1,
        justifyContent: "center",
    },
    dayShort: {
        fontWeight: "bold",
        color: "white",
    },
    dateText: {
        color: "gray",
    },
    iconSmall: {
        width: responsiveWidth(10),
        height: responsiveHeight(10),
        resizeMode: "contain",
        alignSelf: "center"
    },
    maxminBox: {
        flexDirection: "row",
        alignItems: "center"
    },
});
