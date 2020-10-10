import React from "react";
import { Text, View, PixelRatio, StyleSheet } from "react-native";

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
const numWidth = 3;

const pi = require("./pi.json").value;

export const PreviousDigit = (props) => {
  const val =
    props.digit >= numWidth
      ? pi.substring(props.digit - numWidth, props.digit)
      : "";
  return (
    <View style={styles.row}>
      {val.split("").map((char, i) => (
        <StackedDigits digitStyle={styles.pd} char={char} key={i} />
      ))}
    </View>
  );
};

const StackedDigits = (props) => {
  return (
    <View style={[styles.col, styles.outlined, styles.centered]}>
      <Text style={styles.majorSystem}>{MajorSystem[props.char]}</Text>
      <Text style={props.digitStyle}>{props.char}</Text>
    </View>
  );
};

export const MainDigit = (props) => {
  const digits =
    props.text || pi.substring(props.digit - numWidth, props.digit);

  const a = (
    <View style={styles.row}>
      {digits.split("").map((char, i) => (
        <StackedDigits digitStyle={styles.mainDigit} char={char} key={i} />
      ))}
    </View>
  );
  return a;
};

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
  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  invisible: {
    opacity: 0,
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
  nextButtonView: {
    flex: 1,
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
  button: {
    textAlign: "center",

    textAlignVertical: "center",
  },
  arrowText: {
    fontSize: 50 * PixelRatio.get(),
    textAlignVertical: "center",
    textAlign: "center",
  },
  prevButton: {
    backgroundColor: "#fafafa",
  },
  nextButton: {
    backgroundColor: "red",
    color: "black",
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
