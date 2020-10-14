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
} from "react-native";
import { FadeInText } from "./AnimatedComponents";

var _this;
var hiddenStyle = { display: "none" };
function hideStyle() {
  return hiddenStyle;
}

export class InputStyle extends Component {
  constructor(props) {
    super(props);
    this.btnRef = React.createRef();
    _this = this;
  }

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this._keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this._keyboardDidHide
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow() {
    hiddenStyle.display = "none";
    console.log("Refreshed?");
  }

  _keyboardDidHide() {
    hiddenStyle.display = "flex";

    if (_this.btnRef.current) {
      _this.btnRef.current.focus();
    }

    console.log("Closed");
  }

  render() {
    if (this.props.isLapped) {
      return (
        <View>
          <TextInput
            autoFocus
            style={styles.invisible}
            onChangeText={(text) => this.props.onNumberChange(text)}
            editable
            keyboardType="numeric"
            value={this.props.inputValue}
            ref={this.btnRef}
            onBlur={Keyboard.dismiss}
            blurOnSubmit={false}
          />
          <TouchableOpacity
            style={[styles.hidden, hideStyle()]}
            onPress={() => {
              this.btnRef.current.blur();
              this.btnRef.current.focus();
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
              onPress={this.props.decrement}
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
              onPress={this.props.increment}
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
  }
}

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
