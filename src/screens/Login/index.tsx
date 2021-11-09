import React, {useState, useCallback} from 'react';
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
import {showError} from 'utils/Toast';
import {useAppSelector, useAppDispatch} from 'services/TypedRedux';
import {login} from 'store/slices/auth';
import {RequestStatus} from 'store/utils';

const validateData = ({email, password}: {email: string; password: string}) => {
  if (Boolean(email) && Boolean(password)) {
    return true;
  }
  showError('Failed! Make sure all the fields are valid.');
  return false;
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {status} = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleLogin = useCallback(() => {
    const isValid = validateData({email, password});
    if (isValid) {
      dispatch(login({email, password}));
    }
  }, [email, password, dispatch]);

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
              value={email}
              onChangeText={(val) => setEmail(val)}
            />
            <Input
              placeholder="Password"
              autoCapitalize="none"
              secureTextEntry
              value={password}
              onChangeText={(val) => setPassword(val)}
            />
            <Button
              title="Login"
              style={styles.button}
              needsInternet
              onPress={handleLogin}
              loading={status === RequestStatus.Pending}
            />
          </View>
        </Animatable.View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default Login;
