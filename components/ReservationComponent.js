import * as Animatable from "react-native-animatable";

import {
  Alert,
  Button,
  Modal,
  Picker,
  Platform,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import React, { Component, useState } from "react";

import DateTimePicker from "@react-native-community/datetimepicker";
import { Icon } from "react-native-elements";
import Moment from "moment";
import { STYLES } from "../shared/styles";

//
class Reservation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      guests: 1,
      smoking: false,
      date: new Date(),
      show: false,
      mode: "date",
      showModal: false,
    };
  }

  //
  toggleModal() {
    this.setState(prevState => {
      return {
        showModal: !prevState.showModal
      }
    });
    console.log('showModal: ', this.state.showModal);
  }

  //
  resetForm() {
    this.setState({
      guests: 1,
      smoking: false,
      date: new Date(),
      show: false,
      mode: "date",
      showModal: false,
    });
  }

  //
  static navigationOptions = {
    title: "Reserve Table",
  };

  //
  handleReservation() {
    console.log(JSON.stringify(this.state));
    //this.toggleModal();

    let dataMessage = "\n\nNumber of Guests: " + this.state.guests + "\n\n";
    dataMessage += "Smoking: " + (this.state.smoking ? "True" : "False") + "\n\n";
    dataMessage += "Date and Time: " + this.state.date.toISOString() + "\n\n";

    // show alert
    if (Platform.OS !== "web") {
      Alert.alert(
        "Is your reservation Ok?", dataMessage,
        [
          {
            text: "Cancel",
            onPress: () => {
              console.log("Cancel Pressed");
              this.resetForm();
            },
            style: "cancel",
          },
          {
            text: "OK",
            onPress: () => {
              console.log("Ok Pressed");
              this.resetForm();
            },
          },
        ],
        { cancelable: false }
      );
    }
    else {
      let isOk = confirm("Is your reservation Ok?" + dataMessage);
      console.log(isOk);
      this.resetForm();
    }
  }

  //
  render() {
    return (
      <ScrollView>
        <Animatable.View
          animation="zoomIn"
          duration={2000}
          delay={1000}
        >
          {/* guests */}
          <View style={STYLES.formRow}>
            <Text style={STYLES.formLabel}>Number of Guests</Text>
            <Picker
              style={STYLES.formItem}
              selectedValue={this.state.guests}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({
                  guests: itemValue,
                })
              }
            >
              <Picker.Item label="1" value="1" />
              <Picker.Item label="2" value="2" />
              <Picker.Item label="3" value="3" />
              <Picker.Item label="4" value="4" />
              <Picker.Item label="5" value="5" />
              <Picker.Item label="6" value="6" />
            </Picker>
          </View>
          {/* -- /guests */}
          {/* smoking */}
          <View style={STYLES.formRow}>
            <Text style={STYLES.formLabel}>Smoking/Non-Smoking?</Text>
            <Switch
              style={STYLES.formItem}
              value={this.state.smoking}
              onTintColor="#512da8"
              onValueChange={(value) =>
                this.setState({
                  smoking: value,
                })
              }
            ></Switch>
          </View>
          {/* /smoking */}
          {/* date and time */}
          {/* // error sobre datepicker: */}
          {/* // https://www.coursera.org/learn/react-native/discussions/weeks/2/threads/X4_8u6wNTKWP_LusDRyl6g */}
          <View style={STYLES.formRow}>
            <Text style={STYLES.formLabel}>Date and Time</Text>
            <TouchableOpacity
              style={STYLES.formItem}
              style={{
                padding: 7,
                borderColor: "#512DA8",
                borderWidth: 2,
                flexDirection: "row",
              }}
              onPress={() => this.setState({ show: true, mode: "date" })}
            >
              <Icon type="font-awesome" name="calendar" color="#512DA8" />
              <Text>
                {" " + Moment(this.state.date).format("DD-MMM-YYYY h:mm A")}
              </Text>
            </TouchableOpacity>

            {this.state.show && (
              <DateTimePicker
                value={this.state.date}
                mode={this.state.mode}
                minimumDate={new Date()}
                minuteInterval={30}
                onChange={(event, date) => {
                  if (date === undefined) {
                    this.setState({ show: false });
                  } else {
                    this.setState({
                      show: this.state.mode === "time" ? false : true,
                      mode: "time",
                      date: new Date(date),
                    });
                  }
                }}
              />
            )}
          </View>
          {/* /date and time */}
          <View style={STYLES.formRow}>
            <Button
              title="Reserve"
              color="#512da8"
              onPress={() => this.handleReservation()}
              accessibilityLabel="learn more about this"
            />
          </View>
          {/* modal */}
          <Modal animationType={"slide"} transparent={false} visible={this.state.showModal}>
            <View style={STYLES.modal}>
              <Text style={STYLES.modalTitle}>Your Reservation</Text>
              <Text style={STYLES.modalText}>Number of Guests: {this.state.guests}</Text>
              <Text style={STYLES.modalText}>Smoking?: {this.state.smoking ? 'Yes' : 'No'}</Text>
              <Text style={STYLES.modalText}>Date and Time: {this.state.date.toISOString()}</Text>

              <Button
                onPress={() => { this.resetForm(); }}
                color="#512DA8"
                title="Close"
              />
            </View>
          </Modal>
          {/* /modal */}
        </Animatable.View>
      </ScrollView>
    );
  }
}

export default Reservation;
