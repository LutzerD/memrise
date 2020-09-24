import React, { useState } from "react";
import { Text, View, Button, Dimensions, StyleSheet } from "react-native";
const pi = require("./pi.json").value;

const MajorSystem = {
  0: "/s/,/z/",
  1: "/t/,/d/",
  2: "/n/",
  3: "/m/",
  4: "/r/",
  5: "/L/",
  6: "/cz/,/ch/",
  7: "/k/,/g/",
  8: "/f/,/v/",
  9: "/p/,/b/",
};

const PreviousDigit = (props) => {
  const val =
    props.digit > 0 ? pi.substring(props.digit - numWidth, props.digit) : "";
  return (
    <View style={styles.previous}>
      <Text>{val}</Text>
    </View>
  );
};

const MainDigit = (props) => {
  const digits = pi.substring(props.digit - numWidth, props.digit);
  const a = (
    <View style={styles.focused}>
      <Text>
        {digits.split("").map((char) => (
          <View style={styles.col}>
            <Text>{MajorSystem[char]}</Text>
            <Text>{char}</Text>
          </View>
        ))}
      </Text>
    </View>
  );
  return a;
};
const numWidth = 3;
const memrise = () => {
  const [index, setIndex] = useState(numWidth);
  return (
    <View>
      <View style={styles.score}>
        <text>hi</text>
      </View>
    </View>
  );
};
const { width } = Dimensions.get("window");
const parentFontSizeStyle = width / 7;
const previousFontSizeStyle = (width / 7) * 3;
export default memrise;
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 16,
    color: "rgb(255, 0, 0)",
  },
  score: {
    alignItems: "center",
  },
  col: {
    flexDirection: "column",
    alignItems: "flex-end",
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  navigationButtons: {},
  previous: {
    flex: 3,
    fontSize: 20,
  },
  focused: {
    flex: 3,
    fontSize: 20,
  },
  concealed: {
    flex: 1,
    fontSize: 20,
  },
});
