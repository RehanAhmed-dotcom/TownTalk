import React from 'react';

import {Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Login from '../Screens/Auth/Login';
import Signup from '../Screens/Auth/Signup';
import Code from '../Screens/Auth/Code';
import Email from '../Screens/Auth/Email';
import Password from '../Screens/Auth/Password';
import TabNavigator from './Tab';
import UserProfile from '../Screens/ExtraScreens/UserProfile';
import PostDetails from '../Screens/ExtraScreens/PostDetails';
import Search from '../Screens/ExtraScreens/Search';
import ResturantsNearby from '../Screens/ExtraScreens/ResturantsNearby';
import RestaurantsDetail from '../Screens/ExtraScreens/RestaurantsDetail';
import SingleChat from '../Screens/ExtraScreens/SingleChat';
import EditProfile from '../Screens/ExtraScreens/EditProfile';
// import Group from '../Components/Group';
import Comments from '../Screens/ExtraScreens/Comments';
import {useSelector} from 'react-redux';
import GroupPage from '../Screens/ExtraScreens/GroupsPage';
import GroupDetails from '../Screens/ExtraScreens/GroupDetails';
import NewPassword from '../Screens/ExtraScreens/NewPassword';
import CodePhone from '../Screens/Auth/CodePhone';
import CreateGroup from '../Screens/ExtraScreens/CreateGroup';
import Splash from '../Screens/Auth/Splash';
import GroupPost from '../Screens/ExtraScreens/GroupPost';
import EmailVerification from '../Screens/Auth/EmailVerification';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();
// const Tab =
const Root = () => {
  const {isLoggedIn} = useSelector(({USER}) => USER);
  console.log('logged', isLoggedIn);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {!isLoggedIn ? (
          <>
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Email" component={Email} />
            <Stack.Screen
              name="EmailVerification"
              component={EmailVerification}
            />
            <Stack.Screen name="Code" component={Code} />
            <Stack.Screen name="CodePhone" component={CodePhone} />
            <Stack.Screen name="Password" component={Password} />
          </>
        ) : (
          <>
            <Stack.Screen name="TabNavigator" component={TabNavigator} />
            <Stack.Screen name="CreateGroup" component={CreateGroup} />
            <Stack.Screen name="UserProfile" component={UserProfile} />
            <Stack.Screen name="GroupPage" component={GroupPage} />
            <Stack.Screen name="NewPassword" component={NewPassword} />
            <Stack.Screen name="SingleChat" component={SingleChat} />
            <Stack.Screen name="PostDetails" component={PostDetails} />
            <Stack.Screen name="GroupDetails" component={GroupDetails} />
            <Stack.Screen name="Comments" component={Comments} />
            <Stack.Screen name="GroupPost" component={GroupPost} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
            <Stack.Screen name="Search" component={Search} />
            <Stack.Screen
              name="ResturantsNearby"
              component={ResturantsNearby}
            />
            <Stack.Screen
              name="RestaurantsDetail"
              component={RestaurantsDetail}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Root;
