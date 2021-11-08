import React from 'react';
import {
  TextInputProps,
  ViewStyle,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Input from 'components/Input';
import Colors from 'utils/Colors';
import {wp} from 'utils/Constants';

interface Props extends TextInputProps {
  style?: ViewStyle;
  clearSearch: () => void;
}

const styles = StyleSheet.create({
  container: {flexDirection: 'row', alignItems: 'center'},
  clearView: {marginLeft: -wp(6), marginTop: wp(2)},
});

const Search = ({clearSearch, value, ...rest}: Props) => {
  return (
    <View style={styles.container}>
      <Input value={value} {...rest} />
      {Boolean(value) && (
        <TouchableOpacity style={styles.clearView} onPress={clearSearch}>
          <Icon name="cancel" color={Colors.black} size={wp(4)} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Search;
