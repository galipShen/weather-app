import 'react-native-gesture-handler';
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, StatusBar, } from "react-native";
// COMPONENTS
import SearchBox from "./src/components/SearchBox";
import Loading from "./src/components/Loading";
import Now from "./src/components/Now";
import Days from "./src/components/Days";
import InvalidCity from "./src/components/InvalidCity";
import Error from './src/components/Error';
import { days } from "./src/components/Now";
import NetInfo from '@react-native-community/netinfo';

/////ORIENTATION  & RERSPONSIVENESS
import { responsiveHeight, } from "react-native-responsive-dimensions";

export default function App() {

  const [fetching, setFetching] = useState()
  const [city, setCity] = useState('Bursa');
  const [input, setInput] = useState("Bursa")
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null)

  // CONNECTION
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected)
    });
    return () => {
      unsubscribe();
    }
  }, [])

  /////ORIENTATION  & RERSPONSIVENESS

  const [orient, setOrient] = useState("portrait")

  const isPortrait = () => {
    const dim = Dimensions.get("window");
    return dim.height >= dim.width
  }

  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      "change",
      () => {
        setOrient(isPortrait() ? "portrait" : "landscape")
      })
    return () => subscription?.remove();
  })

  // FUNCTIONS
  /*
  tempsFunc() gives min and max temps of first five days---> 0 to 4
  USAGE: tempsFunc(4) means 5th day ---->  [21.47, 34.75]
  Ex: tempsFunc(4)[0] --->min temp
  Ex: tempsFunc(4)[0] --->max temp
  */
  const tempsFunc = (num) => {
    let allTemps = []
    for (let i = 0; i < 40; i++) {
      let dt = fetching?.list?.[i]?.dt;
      let d = new Date(dt * 1000);
      let todayDate = d.getDate();
      let temp = fetching?.list?.[i]?.main?.temp;
      allTemps.push({ temp, todayDate });
    }
    const getTempsOfADay = (nthDay) => {
      const actualToday = new Date().getDate();
      let todayAllTemps = allTemps
        .filter((days) => days.todayDate === actualToday + nthDay)
        .map((x) => x.temp)
      return todayAllTemps;
    }
    const getMinMaxOfADay = () => {
      const day = [];
      for (let i = 0; i < 5; i++) {
        day.push(getTempsOfADay(i));
      }
      return [
        Math.min(...day[num]), Math.max(...day[num])
      ];
    }
    return getMinMaxOfADay(num)
  }
  /*
   showIcon FUNC
  fetching array consists of 40 elements,
  and each data interval is 3 hours
  so that
  num 0 is for now , num = 8 is after 24 hours
  */

  const showIcon = (num) => {
    return fetching?.list?.[num].weather?.[0]?.icon
  }

  //FETCHING
  const getData = async (city) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=a96208472a2e1815c14649bd8fd47b61&units=metric&lang=en`
      )
        .then((res) => res.json())
        .then((data) => setFetching(data))
        .finally(() => setLoading(false));
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  };
  useEffect(() => {
    getData(city);
  }, [city]);

  //NOW
  const nowData = {
    dateNow: fetching?.list?.[0]?.dt,
    temperatureNow: fetching?.list?.[0]?.main?.temp,
    humidityNow: fetching?.list?.[0]?.main?.humidity,
    descriptionNow: fetching?.list?.[0].weather[0].description,
    maxTempNow: fetching?.list?.[0]?.main?.temp_max,
    minTempNow: fetching?.list?.[0]?.main?.temp_min,
    city: city,
    weatherIcon: showIcon(0)
  }

  ///DATES
  const dateNow = fetching?.list?.[0]?.dt;
  const d = new Date(dateNow * 1000)
  const nthOfMonth = d.getDate()
  const monthToWeek = d.setDate(nthOfMonth)
  const nthOfWeek = new Date(monthToWeek).getDay()
  const dayName = (num) => days[(nthOfWeek + num) % 7]

  // 5 DAYS
  const daysData = {
    firstDay: {
      date: nthOfMonth,
      dayName: dayName(0),
      min: tempsFunc(0)[0],
      max: tempsFunc(0)[1],
      weatherIcon: showIcon(0)
    },
    secondDay: {
      date: nthOfMonth + 1,
      dayName: dayName(1),
      min: tempsFunc(1)[0],
      max: tempsFunc(1)[1],
      weatherIcon: showIcon(10)
    },
    thirdDay: {
      date: nthOfMonth + 2,
      dayName: dayName(2),
      min: tempsFunc(2)[0],
      max: tempsFunc(2)[1],
      weatherIcon: showIcon(20)
    },
    fourthDay: {
      date: nthOfMonth + 3,
      dayName: dayName(3),
      min: tempsFunc(3)[0],
      max: tempsFunc(3)[1],
      weatherIcon: showIcon(30)
    },
    fifthDay: {
      date: nthOfMonth + 4,
      dayName: dayName(4),
      min: tempsFunc(4)[0],
      max: tempsFunc(4)[1],
      weatherIcon: showIcon(39)
    }
  }

  if (loading) {
    return <Loading text="LOADING..." />;
  }

  if (error) {
    return <Error message={error} setCity={setCity} setInput={setInput} input={input} orient={orient} />
  }

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="black"
        barStyle={'default'}
      />
      <SearchBox setCity={setCity} setInput={setInput} input={input} orient={orient} />
      {nowData.temperatureNow !== undefined ?
        <><Now data={nowData} orient={orient} />
          <Days data={daysData.firstDay} orient={orient} />
          <Days data={daysData.secondDay} orient={orient} />
          <Days data={daysData.thirdDay} orient={orient} />
          <Days data={daysData.fourthDay} orient={orient} />
          <Days data={daysData.fifthDay} orient={orient} />
        </>
        : <InvalidCity />}

      {!isConnected &&
        <View style={[styles.connection, { backgroundColor: "red" }]}>
          <Text style={styles.connectionText}>NO INTERNET</Text>
        </View>
      }
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
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
