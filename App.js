import React, { useState } from "react";
import {
  Text,
  View,
  PixelRatio,
  Button,
  Dimensions,
  StyleSheet,
  SafeAreaView,
} from "react-native";
const pi = require("./pi.json").value;

const MajorSystem = {
  0: "s,z",
  1: "t,d",
  2: "n",
  3: "m",
  4: "r",
  5: "L",
  6: "cz,ch",
  7: "k,g",
  8: "f,v",
  9: "p,b",
};

const PreviousDigit = (props) => {
  const val =
    props.digit > 0 ? pi.substring(props.digit - numWidth, props.digit) : "";
  return (
    <View style={styles.pd}>
      <Text style={styles.pd}>{val}</Text>
    </View>
  );
};
const StackedDigits = (props) => {
  return (
    <View style={[styles.col, styles.outlined, styles.centered]}>
      <Text style={styles.majorSystem}>{MajorSystem[props.char]}</Text>
      <Text style={styles.mainDigit}>{props.char}</Text>
    </View>
  );
};

const MainDigit = (props) => {
  const digits = pi.substring(props.digit - numWidth, props.digit);
  const a = (
    <View style={styles.row}>
      {digits.split("").map((char, i) => (
        <StackedDigits char={char} key={i} />
      ))}
    </View>
  );
  return a;
};
const numWidth = 3;
const memrise = () => {
  const [index, setIndex] = useState(numWidth);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.score}>
        <Text style={styles.score}>{index}</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.digitsRow}>
          <PreviousDigit digit={index - numWidth} />
          <MainDigit digit={index} style={styles.mainDigit} />
        </View>

        <View style={styles.nextButton}>
          <Button title="Next" onPress={() => setIndex(index + numWidth)} />
        </View>
      </View>
    </SafeAreaView>
  );
};
const { width } = Dimensions.get("window");
const parentFontSizeStyle = width / 7;
const previousFontSizeStyle = (width / 7) * 3;
export default memrise;
const styles = StyleSheet.create({
  container: {
    margin: "10%",
    flex: 1,
  },
  score: {
    alignItems: "center",
    fontSize: 10 * PixelRatio.get(),
  },
  col: {
    flexDirection: "column",
    alignItems: "flex-end",
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
  body: {
    flexDirection: "column",
    justifyContent: "flex-end",
    flex: 1,
    height: "100%",
    backgroundColor: "#5A9BD4",
  },
  nextButton: {
    width: "100%",
  },
  outlined: {
    borderRightColor: "red",
    borderRightWidth: StyleSheet.hairlineWidth,
  },
  digitsRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    flex: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  majorSystem: {
    fontSize: 10 * PixelRatio.get(),
  },
  pd: {
    fontSize: 20 * PixelRatio.get(),
  },
  mainDigit: {
    fontSize: 40 * PixelRatio.get(),
  },
});
