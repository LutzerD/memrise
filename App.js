import React, { useState } from "react";
import {
  Text,
  View,
  Button,
  Dimensions,
  StyleSheet,
  SafeAreaView,
} from "react-native";
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
const StackedDigits = (props) => {
  return (
    <View style={styles.col}>
      <Text>{MajorSystem[props.char]}</Text>
      <Text>{props.char}</Text>
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
      <View>
        <View style={styles.score}>
          <Text>{index}</Text>
        </View>
        <View style={styles.digitsRow}>
          <PreviousDigit
            digit={index - numWidth}
            style={styles.previousDigit}
          />
          <MainDigit digit={index} style={styles.mainDigit} />
        </View>
      </View>
      <View style="nextButton">
        <Button title="Next" onPress={() => setIndex(index + numWidth)} />
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
  },
  col: {
    flexDirection: "column",
    alignItems: "flex-end",
  },
  digitsRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  navigationButtons: {},
  previousDigit: {
    flex: 3,
    fontSize: 20,
  },
  mainDigit: {
    flex: 3,
    fontSize: 20,
  },
});
