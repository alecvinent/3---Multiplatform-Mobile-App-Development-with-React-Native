import * as Animatable from "react-native-animatable";
import * as MailComposer from 'expo-mail-composer';

import { Button, Card, Icon } from "react-native-elements";
import React, { Component } from "react";
import { Text, View } from "react-native";

//
class Contact extends Component {

  //
  constructor(props) {
    super(props);
    this.state = {
      email: 'confusion@food.net'
    };
  }

  //
  static navigationOptions = {
    title: "Contact",
  };
  //
  sendMail() {
    MailComposer.composeAsync({
      recipients: ['confusion@food.net'],
      subject: 'Enquiry',
      body: 'Some text here'
    });
  }

  //
  render() {
    return (
      <View>
        <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
          <Card>
            <Card.Title>Contact Information</Card.Title>
            <Card.Divider />
            <Text style={{ marginBottom: 10 }}>121, Clear Water Bay Road</Text>
            <Text>Clear Water Bay, Kowloon</Text>
            <Text>HONG KONG</Text>
            <Text>Tel: +852 1234 5678</Text>
            <Text>Fax: +852 8765 4321</Text>
            <Text>Email: {this.state.email}</Text>
            <Button title="Send Email" onPress={this.sendMail} buttonStyle={{ backgroundColor: '#512da8', marginTop: 10 }}
              icon={<Icon name='envelope-o' type='font-awesome' color='white' />} />
          </Card>
        </Animatable.View>
      </View>
    );
  }
}

export default Contact;
