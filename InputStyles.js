import React, { useState, useEffect, Component } from "react";
import {
  View,
  PixelRatio,
  TextInput,
  StyleSheet,
  Button,
  Text,
  TouchableOpacity,
  Keyboard,
  ImagePropTypes,
} from "react-native";
import { FadeInText } from "./AnimatedComponents";

var _this;

const WatchedKeyboard = (props) => {
  const setKeyboardVisible = props.setKeyboardVisible;
  console.log(props);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        props.setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        props.setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <TextInput
      autoFocus
      style={styles.invisible}
      onChangeText={(text) => props.onNumberChange(text)}
      editable
      keyboardType="numeric"
      value={props.inputValue}
      onBlur={Keyboard.dismiss}
      blurOnSubmit={false}
    />
  );
};

export const InputStyle = (props) => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  function keyboardVisibility(value) {
    setKeyboardVisible(value);
    console.log("Set kb to " + value);
  }

  if (props.reciting) {
    if (!isKeyboardVisible) {
      return (
        <View>
          <TouchableOpacity
            style={[styles.hidden]}
            onPress={() => {
              setKeyboardVisible(true);
            }}
          >
            <Text style={{ fontSize: 28, textAlign: "center", margin: 10 }}>
              Open Keyboard
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View>
          <WatchedKeyboard
            inputValue={props.inputValue}
            onNumberChange={props.onNumberChange}
            setKeyboardVisible={keyboardVisibility}
          />
        </View>
      );
    }
  } else {
    return (
      <View
        style={{
          flexDirection: "row",
          flex: 1,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={styles.nextButtonView}>
          {/* Thinking of no onLongPress so that someone can try in their head first, then see if they are right. */}
          <TouchableOpacity
            style={[styles.prevButton]}
            onPress={props.decrement}
          >
            <FadeInText
              style={{ fontSize: 28, textAlign: "center", margin: 10 }}
            >
              ←
            </FadeInText>
          </TouchableOpacity>
        </View>
        <View style={styles.nextButtonView}>
          <TouchableOpacity
            style={[styles.nextButton]}
            onPress={props.increment}
          >
            <FadeInText
              style={{ fontSize: 28, textAlign: "center", margin: 10 }}
            >
              →
            </FadeInText>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
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
