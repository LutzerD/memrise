import React, { useState } from "react";
import {
  View,
  PixelRatio,
  TextInput,
  StyleSheet,
  Button,
  Text,
  TouchableOpacity,
} from "react-native";
import { FadeInText } from "./AnimatedComponents";

const NumberInput = function (props) {
  var inputValue = props.inputValue;
  return (
    <TextInput
      autoFocus
      style={styles.invisible}
      onChangeText={(text) => props.onNumberChange(text)}
      editable
      keyboardType="numeric"
      value={inputValue}
    />
  );
};
//←
const NextPrevButtons = function (props) {
  const [ioio, setInputValue] = useState("");

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
        <TouchableOpacity style={[styles.prevButton]} onPress={props.decrement}>
          <FadeInText style={{ fontSize: 28, textAlign: "center", margin: 10 }}>
            ←
          </FadeInText>
        </TouchableOpacity>
      </View>
      <View style={styles.nextButtonView}>
        <TouchableOpacity style={[styles.nextButton]} onPress={props.increment}>
          <FadeInText style={{ fontSize: 28, textAlign: "center", margin: 10 }}>
            →
          </FadeInText>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View>
      <View style={styles.nextButtonView}>
        <TouchableOpacity onPress={props.increment}>
          <Text style={{ backgroundColor: "red" }}>Hi</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  {
    /*  */
  }
};

export const InputStyle = function (props) {
  if (props.isLapped) {
    return NumberInput(props);
  } else {
    return NextPrevButtons(props);
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
