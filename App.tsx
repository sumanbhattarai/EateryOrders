import React from 'react';
import {View, Text} from 'react-native';
import Fonts from 'utils/Fonts';

const App = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontFamily: Fonts.bold, fontSize: 24}}>Bold</Text>
      <Text style={{fontFamily: Fonts.regular, fontSize: 24}}>Regular</Text>
      <Text style={{fontFamily: Fonts.light, fontSize: 24}}>Light</Text>
    </View>
  );
};

export default App;
