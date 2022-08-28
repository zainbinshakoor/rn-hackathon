import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';

import auth from '@react-native-firebase/auth';


import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import LoginSVG from "../../assests/misc/login.svg";
import GoogleSVG from "../../assests/misc/google.svg";
import FacebookSVG from "../../assests/misc/facebook.svg";
import TwitterSVG from "../../assests/misc/twitter.svg";

import CustomButton from '../../../components/CustomButton';
import InputField from '../../../components/InputField';



export default function Login({ navigation }) {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isProcessing, setIsProcessing] = useState(false)
  const handleLogin = () => {

    if (!email) {
      alert("Please enter your email")
      return
    }
    if (password.length < 6) {
      alert("Password must be 6 chars")
      return
    }
    setIsProcessing(true)
    try {
      auth().signInWithEmailAndPassword(email, password).then((userCredential) => {
        const user = userCredential.user;
        console.log(user)

      })
    } catch (error) {
      alert(error);
      setIsProcessing(false)
    }

  }
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
      <View style={{ paddingHorizontal: 25 }}>
        <View style={{ alignItems: 'center' }}>
          <LoginSVG
            height={300}
            width={300}
            style={{ transform: [{ rotate: '-5deg' }] }}
          />
        </View>

        <Text
          style={{
            fontFamily: 'Roboto-Medium',
            fontSize: 28,
            fontWeight: '500',
            color: '#333',
            marginBottom: 30,
          }}>
          Login
        </Text>

        <InputField
          keyboardType={"email-address"}
          icon={
            <MaterialIcons
              name="alternate-email"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          inputType="text"
          labelValue={email}
          onChangeText={(userEmail) => setEmail(userEmail)}

        />

        <InputField
          icon={
            <Ionicons
              name="ios-lock-closed-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          inputType="password"

          labelValue={password}
          onChangeText={(userPassword) => setPassword(userPassword)}

          fieldButtonLabel={"Forgot?"}
          fieldButtonFunction={() => { }}

        />

        <CustomButton label={"Login"} onPress={handleLogin}    ActivityIndicator={isProcessing ? true : false}/>

        <Text style={{ textAlign: 'center', color: '#666', marginBottom: 30 }}>
          Or, login with ...
        </Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 30,
          }}>
          <TouchableOpacity
            onPress={() => { }}
            style={{
              borderColor: '#ddd',
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}>
            <GoogleSVG height={24} width={24} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => { }}
            style={{
              borderColor: '#ddd',
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}>
            <FacebookSVG height={24} width={24} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => { }}
            style={{
              borderColor: '#ddd',
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}>
            <TwitterSVG height={24} width={24} />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          <Text>New to the app?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={{ color: '#AD40AF', fontWeight: '700' }}> Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
