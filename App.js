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
  const digits =
    props.text || pi.substring(props.digit - numWidth, props.digit);

  const a = (
    <View style={styles.row}>
      {digits.split("").map((char, i) => (
        <StackedDigits char={char} key={i} />
      ))}
    </View>
  );
  return a;
};

const FadeInText = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      useNativeDriver: true,
      duration: 10000,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.Text // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim, // Bind opacity to animated value
      }}
    >
      {props.children}
    </Animated.Text>
  );
};

const numWidth = 3;

pad = function (text, length) {
  text = text || "";
  var output = text.toString();

  while (output.length < length) {
    output = output + "_";
  }

  return output;
};

const memrise = () => {
  const [index, setIndex] = useState(numWidth);
  const [inputValue, setInputValue] = useState("");
  const [displayedValue, setDisplayedValue] = useState("");

  paddedIncrement = function (text) {
    text = text.toString();

    var input = text,
      display;

    if (text.length > numWidth) {
      input = text.substring(numWidth, numWidth + 1);
    }
    display = pad(input, numWidth);

    setInputValue(input);
    setDisplayedValue(display);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.score}>
        <Text style={styles.score}>Score: {index}</Text>
        <TouchableOpacity
          style={[styles.prevButton]}
          onPress={() => setIndex(0)}
        >
          <FadeInText style={{ fontSize: 28, textAlign: "center", margin: 10 }}>
            RESET
          </FadeInText>
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <View style={styles.digitsRow}>
          <PreviousDigit digit={index - numWidth} />
          <MainDigit
            digit={index}
            text={displayedValue}
            style={styles.mainDigit}
          />
        </View>
        <View style={styles.buttonRow}>
          <TextInput
            autoFocus
            style={styles.invisible}
            onChangeText={(text) => paddedIncrement(text)}
            editable
            keyboardType="numeric"
            value={inputValue}
          />
          {/* <View style={styles.nextButtonView}>
            <TouchableOpacity
              style={[styles.prevButton]}
              onPress={() => setIndex(index - numWidth)}
            >
              <FadeInText
                style={{ fontSize: 28, textAlign: "center", margin: 10 }}
              >
                ←
              </FadeInText>
            </TouchableOpacity>
          </View> */}
          {/* <View style={styles.nextButtonView}>
            <TouchableOpacity
              style={[styles.nextButton]}
              onPress={() => setIndex(index + numWidth)}
            >
              <FadeInText
                style={{ fontSize: 28, textAlign: "center", margin: 10 }}
              >
                →
              </FadeInText> 
            </TouchableOpacity>
          </View>*/}
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
