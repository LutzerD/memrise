import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  TextInput,
  CheckBox,
} from "react-native";
import { Button } from "react-native-elements";

import Icon from "react-native-vector-icons/FontAwesome";

export function SettingsMenu(props) {
  const [modalVisible, setModalVisible] = useState(props.ModalVisible || false);
  const [isSelected, setSelection] = useState(false);
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            padding: 0,
            backgroundColor: "red",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              marginBottom: 20,
              alignItems: "center",
            }}
          >
            <CheckBox
              value={props.isChecked}
              onValueChange={props.checked}
              style={styles.checkbox}
            />
            <Text>Major System</Text>
          </View>
          <TouchableHighlight
            style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <Text style={styles.textStyle}>Close</Text>
          </TouchableHighlight>
        </View>
      </Modal>

      <View style={{ padding: 0, margin: 0, flexDirection: "row-reverse" }}>
        <Button
          icon={<Icon name="cog" size={15} color="white" />}
          iconRight
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {},
  modalView: {
    position: "absolute",
    margin: 0,
    height: 140,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
