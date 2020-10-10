import React, { useState, setState, useRef } from "react";
import {
  Text,
  View,
  PixelRatio,
  Button,
  Dimensions,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Animated,
} from "react-native";

import { FadeInText } from "./AnimatedComponents";
import { InputStyle } from "./InputStyles";
import { PreviousDigit, MainDigit } from "./DigitView";

const numWidth = 3;

pad = function (text, length) {
  text = text || "";

  var output = text.toString();

  while (output.length < length) {
    output = output + "_";
  }

  return output;
};

const rehearseColor = "blue",
  reciteColor = "red";

const memrise = () => {
  const [index, setIndex] = useState(numWidth);
  const [inputValue, setInputValue] = useState("");
  const [displayedValue, setDisplayedValue] = useState("");
  const [isLapped, setLapped] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState(rehearseColor);

  resetGame = function (lapped) {
    paddedIncrement("reset");
    if (!isLapped) {
      setIndex(numWidth);
    } else {
      setIndex(0);
    }
  };

  toggleMode = function () {
    setLapped(!isLapped);
    resetColor();
    resetGame();
  };

  resetColor = function () {
    if (isLapped) {
      setBackgroundColor(reciteColor);
    } else {
      setBackgroundColor(rehearseColor);
    }
  };

  incrementIndex = function (amount) {
    return function () {
      setIndex(index + amount);
    };
  };

  decrementIndex = function (amount) {
    return function () {
      if (index - amount > 0) {
        setIndex(index - amount);
      }
    };
  };

  //called when number entered
  paddedIncrement = function (text) {
    if (text == "reset") {
      setIndex(0);
      setInputValue("");
      setDisplayedValue(undefined);
      return;
    }
    var input = text.toString().replace(/[^0-9]/g, "");

    if (input == text.toString()) {
      setIndex(index + 1);
    }

    var display;
    if (input.length > numWidth) {
      //truncate
      input = text.substring(numWidth, numWidth + 1);
    }
    display = pad(input, numWidth);

    setInputValue(input);
    setDisplayedValue(display);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.score}>
        <Text style={styles.score}>
          {isLapped ? "High-Score: " : "Score: "} {index}
        </Text>
        <TouchableOpacity
          style={[styles.prevButton, { backgroundColor: backgroundColor }]}
          onPress={() => resetGame()}
          onLongPress={() => toggleMode()}
        >
          <FadeInText style={{ fontSize: 28, textAlign: "center", margin: 10 }}>
            RESET
          </FadeInText>
        </TouchableOpacity>
      </View>
      <View style={[styles.body, { backgroundColor: backgroundColor }]}>
        <View style={styles.digitsRow}>
          <PreviousDigit
            digit={Math.floor(index - 1 - ((index - 1) % numWidth))}
          />
          <MainDigit
            digit={index}
            text={displayedValue}
            style={styles.mainDigit}
          />
        </View>
        <View style={styles.buttonRow}>
          <InputStyle
            isLapped={isLapped}
            inputValue={inputValue}
            onNumberChange={paddedIncrement}
            increment={incrementIndex(numWidth)}
            decrement={decrementIndex(numWidth)}
            background={"yellow"}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

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
