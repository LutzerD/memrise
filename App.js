import React, { useState, setState, useRef, useEffect } from "react";
import {
  Text,
  View,
  PixelRatio,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  AsyncStorage,
} from "react-native";
import GestureRecognizer, {
  swipeDirections,
} from "react-native-swipe-gestures";

import { FadeInText } from "./AnimatedComponents";
import { InputStyle } from "./InputStyles";
import { PreviousDigit, MainDigit } from "./DigitView";
const pi = require("./pi.json").value;

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

const config = {
  velocityThreshold: 0.3,
  directionalOffsetThreshold: 80,
};

const memrise = () => {
  const [index, setIndex] = useState(numWidth);
  const [inputValue, setInputValue] = useState("");
  const [displayedValue, setDisplayedValue] = useState(undefined);
  const [reciting, setReciting] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState(rehearseColor);
  const [failedIndex, setFailedIndex] = useState(undefined);
  const [highScore, setHighScore] = useState(0);

  _storeData = async (key, value) => {
    if (!key && !value) return;
    console.log("Storing " + value + " at " + key);
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      // Error saving data
      console.log("Error Saving: " + error);
    }
  };

  getHighscore = async () => {
    try {
      const value = await AsyncStorage.getItem("highscore");

      if (value !== null && !value.includes("object Undefined")) {
        console.log("Got hs: " + value);
        setHighScore(value);
      }
    } catch (error) {
      // Error retrieving data
      console.log("Error Retrieving: " + error);
    }
  };

  resetGame = function (resetScore, reciter) {
    setInputValue("");
    if (resetScore) {
      reciter ? setIndex(0) : setIndex(numWidth);
      setFailedIndex(undefined);
    }
    if (reciter) {
      setDisplayedValue(undefined);
    }
  };

  resetColor = function () {
    if (reciting) {
      setBackgroundColor(reciteColor);
    } else {
      setBackgroundColor(rehearseColor);
    }
  };

  toggleMode = function (resetScore) {
    if (!highScore) {
      getHighscore();
    }

    var temp = !reciting;
    setReciting(temp);
    resetGame(resetScore, temp);
    resetColor();
  };

  useEffect(() => {
    resetColor();
  });

  function incrementIndex() {
    if (displayedValue != undefined) {
      setDisplayedValue(undefined);
    }
    let temp = index + numWidth;
    setIndex(temp - (temp % numWidth));
  }

  function decrementIndex() {
    if (displayedValue != undefined) {
      setDisplayedValue(undefined);
    }
    if (index - numWidth > 0) {
      setIndex(index - numWidth);
    }
  }

  function score(input) {
    setIndex(index + 1); //add a score

    var display;
    display = pad(input, numWidth);

    setInputValue(input);
    setDisplayedValue(display);
    console.log("index, score " + index + "," + highScore);
    if (index > highScore) {
      _storeData("highscore", "" + index);
    }
  }

  failed = function () {
    setFailedIndex(index);
    setInputValue("");
    toggleMode(false);
  };

  onSwipeLeft = function (state) {
    if (!reciting) {
      incrementIndex();
    }
  };

  onSwipeRight = function (state) {
    if (!reciting) {
      decrementIndex();
    }
  };

  //called when number entered
  validateText = function (text) {
    text = text.toString();
    var input = text.replace(/[^0-9]/g, "");

    if (input != text) {
      //if they entered a non numeric character, skip
      return;
    } else if (input.slice(-1) != pi[index]) {
      //Wrong new character
      failed();
      return;
    } else {
      if (input.length > numWidth) {
        //truncate
        input = text.substring(numWidth, numWidth + 1);
      }
      score(input);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <GestureRecognizer
        style={{ flex: 1 }}
        onSwipeLeft={(state) => onSwipeLeft(state)}
        onSwipeRight={(state) => onSwipeRight(state)}
        config={config}
      >
        <View style={[styles.score, { flexDirection: "column" }]}>
          <Text style={styles.score}>
            {reciting && highScore ? "High-Score: " + highScore : ""}
          </Text>
          <Text style={styles.score}>
            {reciting ? "Score: " : "Digit: "} {index}
          </Text>
          <TouchableOpacity
            style={[styles.prevButton, { backgroundColor: backgroundColor }]}
            onPress={() => resetGame(true, true)}
            onLongPress={() => toggleMode(true)}
          >
            <FadeInText
              style={{ fontSize: 28, textAlign: "center", margin: 10 }}
            >
              RESET
            </FadeInText>
          </TouchableOpacity>
        </View>
        <View style={[styles.body, { backgroundColor: backgroundColor }]}>
          <View style={styles.digitsRow}>
            <PreviousDigit
              digit={Math.floor(index - 1 - ((index - 1) % numWidth))}
              failedDigit={failedIndex}
            />
            <MainDigit
              digit={index}
              text={displayedValue}
              style={styles.mainDigit}
              failedDigit={failedIndex}
            />
          </View>
          <View style={styles.buttonRow}>
            <InputStyle
              reciting={reciting}
              inputValue={inputValue}
              onNumberChange={validateText}
              increment={incrementIndex}
              decrement={decrementIndex}
              background={"green"}
            ></InputStyle>
          </View>
        </View>
      </GestureRecognizer>
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
