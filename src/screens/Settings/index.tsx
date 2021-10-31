import React, {useState} from 'react';
import {FlatList, View, Switch} from 'react-native';

import styles from './styles';
import Text from 'components/Text';
import {settingsConstants, switchColor} from './utils';
import Colors from 'utils/Colors';

type button = {
  name: string;
  value: boolean;
  action: (val: boolean) => any;
};

const initialState = {
  [settingsConstants.Notifications]: true,
};

const Settings = () => {
  const [state, setstate] = useState(initialState);

  const buttons: Array<button> = [
    {
      name: settingsConstants.Notifications,
      value: state[settingsConstants.Notifications],
      action: (val) => {
        setstate({...state, [settingsConstants.Notifications]: val});
        // TODO: API Call
      },
    },
  ];

  const renderButtons = ({item}: {item: button}) => {
    return (
      <View style={[styles.horizontalView, styles.buttonView]}>
        <Text>{item.name}</Text>
        <Switch
          trackColor={switchColor}
          thumbColor={Colors.white}
          ios_backgroundColor="#3e3e3e"
          onValueChange={item.action}
          value={item.value}
        />
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        Change the following general settings as per your convinience.
      </Text>
      <FlatList
        data={buttons}
        keyExtractor={(item, index) => `${item.name}-${index}`}
        renderItem={renderButtons}
        contentContainerStyle={styles.flatList}
      />
    </View>
  );
};

export default Settings;
