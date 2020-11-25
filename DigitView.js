import React from "react";
import { Text, View, StyleSheet, PixelRatio } from "react-native";
import { normalizeFont } from "./utilities";

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
        <StackedDigits
          majorSystem={props.majorSystem}
          digitStyle={[
            styles.pd,
            props.failedDigit == props.digit - numWidth + i
              ? styles.failedStyle
              : {},
          ]}
          char={char}
          key={i}
        />
      ))}
    </View>
  );
};

const StackedDigits = (props) => {
  if (props.majorSystem) {
    return (
      <View style={[styles.col, styles.outlined, styles.centered]}>
        <Text style={styles.majorSystem}>{MajorSystem[props.char]}</Text>
        <Text style={props.digitStyle}>{props.char}</Text>
      </View>
    );
  } else {
    return (
      <View style={[styles.col, styles.outlined, styles.centered]}>
        <Text style={props.digitStyle}>{props.char}</Text>
      </View>
    );
  }
};

export const MainDigit = (props) => {
  const digits =
    props.text || pi.substring(props.digit - numWidth, props.digit);

  const a = (
    <View style={styles.row}>
      {digits.split("").map((char, i) => (
        <StackedDigits
          majorSystem={props.majorSystem}
          digitStyle={[
            styles.mainDigit,
            props.failedDigit == props.digit + i - numWidth
              ? styles.failedStyle
              : {},
          ]}
          char={char}
          key={i}
        />
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
    fontSize: normalizeFont(10),
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
  failedStyle: {
    backgroundColor: "white",
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
    fontSize: normalizeFont(50),
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
    fontSize: normalizeFont(20),
  },
  pd: {
    fontSize: normalizeFont(30),
  },
  mainDigit: {
    fontSize: normalizeFont(70),
  },
});
