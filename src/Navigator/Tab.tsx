import * as React from 'react';
import {Text, Image, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/AntDesign';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon4 from 'react-native-vector-icons/FontAwesome';
import Home from '../Screens/TabScreens/Home';
import Chat from '../Screens/TabScreens/Chat';
import Create from '../Screens/TabScreens/Create';
import Notification from '../Screens/TabScreens/Notification';
import Profile from '../Screens/TabScreens/Profile';
import {useSelector} from 'react-redux';
const TabNavigator = () => {
  const {userData} = useSelector(({USER}) => USER);
  return (
    <Tab.Navigator screenOptions={{headerShown: false, tabBarShowLabel: false}}>
      <Tab.Screen
        // options={{}}
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                height: '100%',
                // width: '100%',
                borderTopWidth: focused ? 2 : 0,
                borderTopColor: '#5F95F0',
                paddingHorizontal: 10,
                // borderTopLeftRadius: 2,
                // borderTopRightRadius: 2,
                // backgroundColor: 'red',
                justifyContent: 'center',
                // position: 'absolute',
              }}>
              <Icon
                name="ios-home"
                size={20}
                color={focused ? '#5F95F0' : 'grey'}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                height: '100%',
                // width: '100%',
                borderTopWidth: focused ? 2 : 0,
                borderTopColor: '#5F95F0',
                paddingHorizontal: 10,
                // borderTopLeftRadius: 2,
                // borderTopRightRadius: 2,
                // backgroundColor: 'red',
                justifyContent: 'center',
                // position: 'absolute',
              }}>
              <Icon1
                name="chat"
                size={20}
                color={focused ? '#5F95F0' : 'grey'}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Create"
        component={Create}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                height: '100%',
                // width: '100%',
                borderTopWidth: 0,
                borderTopColor: '#5F95F0',
                paddingHorizontal: 10,
                // borderTopLeftRadius: 2,
                // borderTopRightRadius: 2,
                // backgroundColor: 'red',
                justifyContent: 'center',
                // position: 'absolute',
              }}>
              <Icon2 name="pluscircle" size={30} color={'#5F95F0'} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Notification"
        component={Notification}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                height: '100%',
                // width: '100%',
                borderTopWidth: focused ? 2 : 0,
                borderTopColor: '#5F95F0',
                paddingHorizontal: 10,
                // borderTopLeftRadius: 2,
                // borderTopRightRadius: 2,
                // backgroundColor: 'red',
                justifyContent: 'center',
                // position: 'absolute',
              }}>
              <Icon3
                name="bell"
                size={20}
                color={focused ? '#5F95F0' : 'grey'}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                height: '100%',
                // width: '100%',
                borderTopWidth: focused ? 2 : 0,
                borderTopColor: '#5F95F0',
                paddingHorizontal: 10,
                // borderTopLeftRadius: 2,
                // backgroundColor: 'red',
                // borderTopRightRadius: 2,
                // backgroundColor: 'red',
                justifyContent: 'center',
                // position: 'absolute',
              }}>
              {userData.userdata.image ? (
                <Image
                  resizeMode="cover"
                  source={{uri: userData.userdata.image}}
                  style={{height: 20, width: 20, borderRadius: 10}}
                />
              ) : (
                <Icon4
                  name="user-circle-o"
                  size={20}
                  color={focused ? '#5F95F0' : 'grey'}
                />
              )}
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
