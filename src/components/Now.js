import { StyleSheet, Text, View, Image, } from 'react-native';
import { responsiveHeight, responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';

export const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
export const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default function Now({ data, orient }) {
    const d = new Date(data.dateNow * 1000)

    const dayMonth = `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]}`

    return (
        <View style={{ flex: orient == "portrait" ? 7 : 3 }} >
            <View style={styles.dayMonth}>
                <Text style={[{
                    fontSize: orient == "portrait" ?
                        responsiveFontSize(4) : responsiveFontSize(2)
                }, styles.dayMonthText
                ]}>
                    {dayMonth}
                </Text>
            </View>
            <View style={styles.tempBox}>
                <View style={styles.tempNow}>
                    <Text style={[{
                        fontSize: orient == "portrait" ?
                            responsiveFontSize(12) : responsiveFontSize(6)
                    }, styles.tempText]} >{Math.round(data.temperatureNow)}
                        <Text style={{
                            fontSize: orient == "portrait" ?
                                responsiveFontSize(6) : responsiveFontSize(3)
                        }
                        } > &#186;C</Text>
                    </Text>
                </View>
                <View style={styles.descriptionNowBox}>
                    <Image
                        style={styles.descIcon}
                        source={{ uri: `https://openweathermap.org/img/wn/${data.weatherIcon}@2x.png` }} />
                    <Text style={[{
                        fontSize: orient == "portrait" ?
                            responsiveFontSize(4) : responsiveFontSize(2)
                    }, styles.descText]}>{data.descriptionNow}</Text>
                </View >
            </View >
            <Text style={[{
                fontSize: orient == "portrait" ?
                    responsiveFontSize(4) : responsiveFontSize(2)
            }, styles.humidityText]}>
                humidity : {data.humidityNow} %
            </Text>
        </View >
    );
}

const styles = StyleSheet.create({
    dayMonth: {
        flex: 2,
        alignItems: "center",
        justifyContent: "center",
    },
    dayMonthText: {
        color: "white",
    },
    tempBox: {
        flex: 5,
        flexDirection: "row",
    },
    tempNow: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    tempText: {
        color: "indianred"
    },
    descriptionNowBox: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    descIcon: {
        flex: 2,
        width: responsiveWidth(50),
        height: responsiveHeight(100),
        resizeMode: "contain",
    },
    descText: {
        flex: 1.5,
        textTransform: "capitalize",
        color: "white",
        textAlign: "center",
    },
    humidityText: {
        flex: 2,
        color: "white",
        textTransform: "capitalize",
        textAlign: "center",
        textAlignVertical: "center",
    },
});
