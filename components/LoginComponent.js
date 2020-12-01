import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as SecureStore from 'expo-secure-store';

import { Button, Image, Platform, ScrollView, Text, View } from "react-native";
import { Card, CheckBox, Icon, Input } from "react-native-elements";
import React, { Component } from "react";

import AsyncStorage from '@react-native-async-storage/async-storage';
import { STYLES } from "../shared/styles";
import { baseUrl } from "../shared/baseUrl";
import { createBottomTabNavigator } from "react-navigation";

//
class LoginTab extends Component {
    static navigationOptions = {
        title: "Login",
        tabBarIcon: ({ tintColor }) => (
            <Icon name="sign-in" type="font-awesome" size={24} iconStyle={{ color: tintColor }} />
        )
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
                <View style={STYLES.loginContainer}>
                    <View style={STYLES.loginFormRow}>
                        <Input placeholder="Username" leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                            onChangeText={(username) => this.setState({ username })}
                            value={this.state.username} inputContainerStyle={STYLES.loginFormInput}
                        />
                    </View>
                    <View style={STYLES.loginFormRow}>
                        <Input placeholder="Password" leftIcon={{ type: 'font-awesome', name: 'key' }}
                            onChangeText={(password) => this.setState({ password })}
                            value={this.state.password} secureTextEntry={true}
                            inputContainerStyle={STYLES.loginFormInput}
                        />
                    </View>
                    <View style={STYLES.loginFormRow}>
                        <CheckBox title="Remember Me?" checked={this.state.remember}
                            center
                            onPress={() => this.setState({ remember: !this.state.remember })}
                            inputContainerStyle={STYLES.loginFormCheckbox}
                        />
                    </View>
                    <View style={STYLES.loginFormButton}>
                        <Button onPress={() => this.handleLogin()}
                            title="Login"
                            icon={
                                <Icon name="sign-in" type="font-awesome" size={24} color="white" />
                            }
                            buttonStyle={{ backgroundColor: "#512da8" }}
                        />
                    </View>
                    <View style={STYLES.loginFormButton}>
                        <Button onPress={() => this.props.navigation.navigate('Register')}
                            title="Register"
                            clear
                            icon={
                                <Icon name="user-plus" type="font-awesome" size={24} color="blue" />
                            }
                            titleStyle={{ color: "blue" }}
                        />
                    </View>
                </View>
            </ScrollView>
        );
    };
}

//
class RegisterTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            remember: false,
            firstname: '',
            lastname: '',
            email: '',
            imageUrl: baseUrl + 'images/logo.png'
        };
    }

    getImageFromCamera = async () => {
        const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
        const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        if (cameraPermission.status === 'granted' && cameraRollPermission.status === 'granted') {
            let capturedImage = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [4, 3]
            });

            if (!capturedImage.cancelled) {
                this.setState({
                    imageUrl: capturedImage.uri
                });
            }
        }

    };

    static navigationOptions = {
        title: "Register",
        tabBarIcon: ({ tintColor }) => (
            <Icon name="user-plus" type="font-awesome" size={24} iconStyle={{ color: tintColor }} />
        )
    };

    //
    handleRegister() {
        console.log(JSON.stringify(this.state));
        if (this.state.remember) {
            SecureStore.setItemAsync('userinfo', JSON.stringify({
                username: this.state.username,
                password: this.state.password
            }))
                .catch((error) => console.log('Could not save user info', error));
        }
    };

    //
    render() {
        return (

            <ScrollView>
                <View style={STYLES.loginContainer}>
                    <View style={STYLES.imageContainer}>
                        <Image source={{ uri: this.state.imageUrl }} loadingIndicatorSource={require('./images/logo.png')} />
                        <Button title="Camera" onPress={this.getImageFromCamera} />
                    </View>

                    <View style={STYLES.loginFormRow}>
                        <Input placeholder="Username" leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                            onChangeText={(username) => this.setState({ username })}
                            value={this.state.username} inputContainerStyle={STYLES.loginFormInput}
                        />
                    </View>
                    <View style={STYLES.loginFormRow}>
                        <Input placeholder="Password" leftIcon={{ type: 'font-awesome', name: 'key' }}
                            onChangeText={(password) => this.setState({ password })}
                            value={this.state.password} secureTextEntry={true}
                            inputContainerStyle={STYLES.loginFormInput}
                        />
                    </View>
                    <View style={STYLES.loginFormRow}>
                        <Input placeholder="First Name" leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                            onChangeText={(firstname) => this.setState({ firstname })}
                            value={this.state.firstname} inputContainerStyle={STYLES.loginFormInput}
                        />
                    </View>
                    <View style={STYLES.loginFormRow}>
                        <Input placeholder="Last Name" leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                            onChangeText={(lastname) => this.setState({ lastname })}
                            value={this.state.lastname} inputContainerStyle={STYLES.loginFormInput}
                        />
                    </View>
                    <View style={STYLES.loginFormRow}>
                        <Input placeholder="Email" leftIcon={{ type: 'font-awesome', name: 'envelop-o' }}
                            onChangeText={(email) => this.setState({ email })}
                            value={this.state.email} inputContainerStyle={STYLES.loginFormInput}
                        />
                    </View>
                    <View style={STYLES.loginFormRow}>
                        <CheckBox title="Remember Me?" checked={this.state.remember}
                            center
                            onPress={() => this.setState({ remember: !this.state.remember })}
                            inputContainerStyle={STYLES.loginFormCheckbox}
                        />
                    </View>
                    <View style={STYLES.loginFormButton}>
                        <Button onPress={() => this.handleRegister()}
                            title="Register"
                            icon={
                                <Icon name="user-plus" type="font-awesome" size={24} color="white" />
                            }
                            buttonStyle={{ backgroundColor: "#512da8" }}
                        />
                    </View>
                </View>
            </ScrollView>
        );
    };
}

//
const Login = createBottomTabNavigator({
    Login: LoginTab,
    Register: RegisterTab
}, {
    tabBarOptions: {
        activeBackgroundColor: '#9575cd',
        inactiveBackgroundColor: '#9575cd',
        activeTintColor: 'white',
        inactiveTintColor: 'gray',

    }
});

//
export default Login;