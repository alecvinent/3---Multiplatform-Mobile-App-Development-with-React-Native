import * as SecureStore from 'expo-secure-store';

import { Button, Platform, ScrollView, Text, View } from "react-native";
import { Card, CheckBox, Icon, Input } from "react-native-elements";
import React, { Component } from "react";

import AsyncStorage from '@react-native-async-storage/async-storage';
import { STYLES } from "../shared/styles";

//
class Login extends Component {
    static navigationOptions = {
        title: "Login",
    };

    //
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            remember: false
        };
    };

    //
    handleLogin = () => {
        console.log(JSON.stringify(this.state));
        if (this.state.remember) {
            SecureStore.setItemAsync('userinfo', JSON.stringify({
                username: this.state.username,
                password: this.state.password
            }))
                .catch((error) => console.log('Could not save user info', error));

        }
        else {
            SecureStore.deleteItemAsync('userinfo')
                .catch((error) => console.log('Could not delete user info', error));
        }
    };

    //
    componentDidMount() {
        SecureStore.getItemAsync('userinfo')
            .then((userdata) => {
                let userinfo = JSON.parse(userdata);
                if (userinfo) {
                    this.setState({ username: userinfo.username });
                    this.setState({ password: userinfo.password });
                    this.setState({ remember: true })
                }
            })
            .catch(() => console.log('intro not set'));
    }

    //
    render() {
        return (

            <ScrollView>
                <View style={STYLES.formRow}>
                    <Input placeholder="Username" leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                        onChangeText={(username) => this.setState({ username })}
                        value={this.state.username} inputContainerStyle={STYLES.loginFormInput}
                    />
                </View>
                <View style={STYLES.formRow}>
                    <Input placeholder="Password" leftIcon={{ type: 'font-awesome', name: 'key' }}
                        onChangeText={(password) => this.setState({ password })}
                        value={this.state.password} secureTextEntry={true}
                        inputContainerStyle={STYLES.loginFormInput}
                    />
                </View>
                <View style={STYLES.formRow}>
                    <CheckBox title="Remember Me?" checked={this.state.remember}
                        center
                        onPress={() => this.setState({ remember: !this.state.remember })}
                        inputContainerStyle={STYLES.loginFormCheckbox}
                    />
                </View>
                <View style={STYLES.loginFormButton}>
                    <Button onPress={() => this.handleLogin()} title="Login" color="#512da8" />
                </View>
            </ScrollView>
        );
    };
}

export default Login;