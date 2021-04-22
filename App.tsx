import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Fonts from 'utils/Fonts';

const App = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Icon name="keyboard-backspace" size={30} color="black" />
      <Text style={{fontFamily: Fonts.bold, fontSize: 24}}>Bold</Text>
      <Text style={{fontFamily: Fonts.regular, fontSize: 24}}>Regular</Text>
      <Text style={{fontFamily: Fonts.light, fontSize: 24}}>Light</Text>
    </View>
  );
};

export default App;
