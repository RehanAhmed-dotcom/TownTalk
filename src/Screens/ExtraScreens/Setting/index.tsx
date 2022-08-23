import React, {useState} from 'react';
import {
  View,
  SafeAreaView,
  Image,
  Linking,
  ImageBackground,
  Alert,
  Text,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {logoutuser} from '../../../redux/actions';
import {useDispatch, useSelector} from 'react-redux';
import {deleteAccount} from '../../../lib/api';
import SwitchWithIcons from 'react-native-switch-with-icons';
// import CheckBox from 'react-native-check-box';
import ToggleSwitch from 'toggle-switch-react-native';
import Icons from 'react-native-vector-icons/AntDesign';
const Setting = ({navigation}) => {
  const dispatch = useDispatch();
  const [check, setCheck] = useState(false);
  const {userData} = useSelector(({USER}) => USER);
  const moon = require('../../../assets/Images/moon.png');
  const sun = require('../../../assets/Images/sunFull.png');
  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground
        style={{height: '100%'}}
        source={require('../../../assets/Images/back.png')}>
        <View
          style={{
            height: 80,
            backgroundColor: 'white',
            elevation: 3,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 15,

            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icons name="left" size={20} color={'black'} />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'MontserratAlternates-SemiBold',
                color: 'black',
                marginLeft: 20,
              }}>
              Settings
            </Text>
          </View>
          <SwitchWithIcons
            value={check}
            // noIcon={true}
            icon={{
              true:
                // <Icon name="moon" />
                moon,
              false:
                // <Icon name="moon" />
                sun,
            }}
            onValueChange={
              value => setCheck(!check)
              // console.log(`Value has been updated to ${value}`)
            }
          />
          {/* <ToggleSwitch
            isOn={check}
            onColor="black"
            offColor="#ccc"
            // label="Example label"
            labelStyle={{color: 'black', fontWeight: '900'}}
            size="small"
            onToggle={isOn => setCheck(!check)}
          /> */}
          {/* <CheckBox
            style={{flex: 1, padding: 10}}
            onClick={() => {
              setCheck(!check);
            }}
            isChecked={check}
            leftText={'CheckBox'}
          /> */}
          {/* <Text style={{fontFamily: 'MontserratAlternates-Regular'}}>
              Chicago, IL 60611, USA
            </Text> */}
        </View>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 15,
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('NewPassword')}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: 50,
              marginTop: 30,
              width: '45%',
              marginBottom: 20,
              borderRadius: 5,
              elevation: 2,
              backgroundColor: '#5F95F0',
            }}>
            <Text
              style={{
                fontFamily: 'MontserratAlternates-SemiBold',
                color: 'white',
              }}>
              Change Password
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Alert.alert(
                'Delete account',
                'Are you sure you want to delete your account?',
                [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {
                    text: 'OK',
                    onPress: () => {
                      deleteAccount({Auth: userData.token})
                        .then(res => {
                          console.log('res of delte', res);
                        })
                        .catch(err => {
                          console.log('err', err.response.data);
                        });
                      logoutuser(false)(dispatch);
                    },
                  },
                ],
              );
            }}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: 50,
              marginTop: 30,
              width: '45%',
              marginBottom: 20,
              borderRadius: 5,
              elevation: 2,
              backgroundColor: '#5F95F0',
            }}>
            <Text
              style={{
                fontFamily: 'MontserratAlternates-SemiBold',
                color: 'white',
              }}>
              Delete account
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 15,
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('BlockedUser')}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: 50,
              marginTop: 30,
              width: '45%',
              marginBottom: 20,
              borderRadius: 5,
              elevation: 2,
              backgroundColor: '#5F95F0',
            }}>
            <Text
              style={{
                fontFamily: 'MontserratAlternates-SemiBold',
                color: 'white',
              }}>
              People blocked
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(
                'https://app.termly.io/document/privacy-policy/72c48b63-dcc9-42ea-9088-7663a09410d7',
              )
            }
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: 50,
              marginTop: 30,
              width: '45%',
              marginBottom: 20,
              borderRadius: 5,
              elevation: 2,
              backgroundColor: '#5F95F0',
            }}>
            <Text
              style={{
                fontFamily: 'MontserratAlternates-SemiBold',
                color: 'white',
              }}>
              Privacy policy
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 15,
          }}>
          <TouchableOpacity
            onPress={
              () =>
                Linking.openURL(
                  'https://app.termly.io/document/terms-of-use-for-website/337641ae-e6ce-4fed-8267-c8105baa3a0f ',
                )
              //
            }
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: 50,
              marginTop: 30,
              width: '45%',
              marginBottom: 20,
              borderRadius: 5,
              elevation: 2,
              backgroundColor: '#5F95F0',
            }}>
            <Text
              style={{
                fontFamily: 'MontserratAlternates-SemiBold',
                color: 'white',
              }}>
              Terms of Use
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('ContactUs')}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: 50,
              marginTop: 30,
              width: '45%',
              marginBottom: 20,
              borderRadius: 5,
              elevation: 2,
              backgroundColor: '#5F95F0',
            }}>
            <Text
              style={{
                fontFamily: 'MontserratAlternates-SemiBold',
                color: 'white',
              }}>
              Contact Us
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
            paddingHorizontal: 15,
          }}>
          <TouchableOpacity
            onPress={
              () =>
                Alert.alert('Logout', 'Are you sure you want to Logout?', [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {text: 'OK', onPress: () => logoutuser(false)(dispatch)},
                ])
              //
            }
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: 50,
              marginTop: 30,
              width: '45%',
              marginBottom: 20,
              borderRadius: 5,
              elevation: 2,
              backgroundColor: '#5F95F0',
            }}>
            <Text
              style={{
                fontFamily: 'MontserratAlternates-SemiBold',
                color: 'white',
              }}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};
export default Setting;
