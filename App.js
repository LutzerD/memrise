import React, { useState, setState, useRef, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  PixelRatio,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import GestureRecognizer, {
  swipeDirections,
} from "react-native-swipe-gestures";
import { InputStyle } from "./InputStyles";
import { PreviousDigit, MainDigit } from "./DigitView";
import { normalizeFont } from "./utilities";
import { CompareSharp, Reddit } from "@material-ui/icons";
const pi = require("./pi.json").value;
const numWidth = 3;
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { SettingsMenu } from "./SettingsMenu";

keys = {
  majorSystem: "@major",
};

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

//A 2.0 would be to run through all of keys and fill some initial object with each key's retrieved value
// const initialMajorSystemState = _getData(keys.majorSystem);

_getData = async (key, callback) => {
  try {
    const ww = await AsyncStorage.getItem(key);
    if (callback) callback(ww);
    else return ww;
  } catch (error) {
    console.log("Error Retrieving: " + error);
    if (callback) callback(null);
    else return null;
  }
};
const memrise = () => {
  const [index, setIndex] = useState(numWidth);
  const [inputValue, setInputValue] = useState("");
  const [displayedValue, setDisplayedValue] = useState(undefined);
  const [reciting, setReciting] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState(rehearseColor);
  const [failedIndex, setFailedIndex] = useState(undefined);
  const [highScore, setHighScore] = useState(0);
  const [majorSystem, setMajorSystem] = useState(false);

  _storeData = async (key, value) => {
    if (!key && !value) return;
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

  toggleMajorSystem = function (bool) {
    _storeData("@major_system", bool === true ? "true" : "false");
    setMajorSystem(bool);
  };

  _getData("@major_system", (ww) => {
    setMajorSystem(ww === "true" ? true : false);
  });

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
      <View>
        <SettingsMenu
          checked={toggleMajorSystem}
          isChecked={majorSystem}
        ></SettingsMenu>
      </View>

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
          <View
            style={[
              styles.score,
              { flexDirection: "row", margin: 1, padding: 1 },
            ]}
          >
            <TouchableOpacity
              style={[
                styles.prevButton,
                { backgroundColor: backgroundColor, margin: 1 },
              ]}
              onPress={() => resetGame(true, true)}
            >
              <Text
                style={{
                  fontSize: normalizeFont(28),
                  textAlign: "center",
                  margin: 10,
                }}
              >
                RESET
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.prevButton,
                { backgroundColor: backgroundColor, margin: 1 },
              ]}
              onPress={() => toggleMode(true)}
            >
              <Text
                style={{
                  fontSize: normalizeFont(28),
                  textAlign: "center",
                  margin: 10,
                }}
              >
                MODE
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.body, { backgroundColor: backgroundColor }]}>
          <View style={styles.digitsRow}>
            <PreviousDigit
              digit={Math.floor(index - 1 - ((index - 1) % numWidth))}
              failedDigit={failedIndex}
              majorSystem={majorSystem}
            />
            <MainDigit
              digit={index}
              text={displayedValue}
              style={styles.mainDigit}
              failedDigit={failedIndex}
              majorSystem={majorSystem}
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
    fontSize: normalizeFont(20),
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
  pd: {
    fontSize: normalizeFont(20),
  },
  mainDigit: {
    fontSize: normalizeFont(40),
  },
});
