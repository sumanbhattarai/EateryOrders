import React from 'react';
import {StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Entypo';
import {SafeAreaView} from 'react-native-safe-area-context';

import AddFood from 'screens/AddFood';
import AddCategory from 'screens/AddCategory';
import Detail from 'screens/Detail';
import Menu from 'screens/Menu';
import Recieved from 'screens/Recieved';
import Delivered from 'screens/Delivered';
import Confirmed from 'screens/Confirmed';
import Account from 'screens/Account';
import Font from 'utils/Fonts';
import Color from 'utils/Colors';
import {BottomTabParamList, RootStackParamList, TopTabParamList} from './utils';
import Settings from 'screens/Settings';
import Fonts from 'utils/Fonts';
import {wp} from 'utils/Constants';
import Colors from 'utils/Colors';
import Login from 'screens/Login';
import {useAppSelector} from 'services/TypedRedux';

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<BottomTabParamList>();
const TopTab = createMaterialTopTabNavigator<TopTabParamList>();

const styles = StyleSheet.create({
  fullScreen: {flex: 1},
});

const OrderTab = () => {
  return (
    <SafeAreaView style={styles.fullScreen}>
      <TopTab.Navigator
        tabBarOptions={{
          labelStyle: {
            fontSize: 12,
            fontFamily: Font.regular,
          },
          indicatorStyle: {
            backgroundColor: Color.primary,
          },
        }}>
        <TopTab.Screen name="Recieved" component={Recieved} />
        <TopTab.Screen name="Confirmed" component={Confirmed} />
        <TopTab.Screen name="Delivered" component={Delivered} />
      </TopTab.Navigator>
    </SafeAreaView>
  );
};

const BottomNavigation = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: Color.primary,
        labelStyle: {
          fontFamily: Font.regular,
          fontSize: 10,
        },
        keyboardHidesTabBar: true,
        allowFontScaling: true,
      }}
      initialRouteName="Menu">
      <Tab.Screen
        name="Menu"
        component={Menu}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="list" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Order"
        component={OrderTab}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="bell" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="cog" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const RootNavigator = () => {
  const {token} = useAppSelector((state) => state.auth);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          gestureEnabled: true,
          ...TransitionPresets.SlideFromRightIOS,
          headerTitleStyle: {
            fontFamily: Fonts.regular,
            fontSize: wp(3.8),
          },
          headerBackTitleVisible: false,
          headerTintColor: Colors.black,
        }}>
        {!token ? (
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
        ) : (
          <>
            <Stack.Screen
              name="Home"
              component={BottomNavigation}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="AddFood"
              component={AddFood}
              options={({route}) => ({
                title: route.params.isEdit ? 'Edit details' : 'Add a food item',
              })}
              initialParams={{
                isEdit: false,
              }}
            />
            <Stack.Screen
              name="AddCategory"
              component={AddCategory}
              options={{
                title: 'Add a category',
              }}
            />
            <Stack.Screen
              name="FoodDetail"
              component={Detail}
              options={({route}) => ({
                title: route.params.name,
              })}
            />
            <Stack.Screen name="Settings" component={Settings} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
