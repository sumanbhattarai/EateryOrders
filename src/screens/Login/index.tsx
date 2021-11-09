import React from 'react';
import {
  View,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

import styles from './styles';
import Text from 'components/Text';
import Input from 'components/Input';
import Button from 'components/Button';

const Login = () => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
        style={styles.container}>
        <View style={styles.header}>
          <Animatable.Image
            animation="fadeInDownBig"
            duration={1500}
            source={require('assets/images/logo.png')}
            style={styles.logo}
          />
        </View>
        <Animatable.View
          animation="fadeInUpBig"
          delay={1000}
          style={styles.footer}>
          <View style={styles.form}>
            <Text type="sub-heading">Welcome, Admin! {'\n'} </Text>
            <Text>Please, login to continue.</Text>
            <Input
              placeholder="Email"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Input
              placeholder="Password"
              autoCapitalize="none"
              secureTextEntry
            />
            <Button title="Login" style={styles.button} needsInternet />
          </View>
        </Animatable.View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default Login;
