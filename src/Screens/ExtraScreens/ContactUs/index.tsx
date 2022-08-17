import React, {useState} from 'react';
import {
  View,
  SafeAreaView,
  Image,
  ImageBackground,
  Alert,
  Text,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import Icon1 from 'react-native-vector-icons/AntDesign';
import {logoutuser} from '../../../redux/actions';
import {useDispatch, useSelector} from 'react-redux';
import {deleteAccount} from '../../../lib/api';
import SwitchWithIcons from 'react-native-switch-with-icons';
// import CheckBox from 'react-native-check-box';
import ToggleSwitch from 'toggle-switch-react-native';
import Icons from 'react-native-vector-icons/AntDesign';
const ContactUs = ({navigation}) => {
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
              Contact us
            </Text>
          </View>

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
            // alignItems: 'center',
            marginTop: 15,
            // flexDirection: 'row',
            // justifyContent: 'space-between',
            paddingHorizontal: 15,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon1 name="right" color={'black'} />
            <Text
              style={{
                fontSize: 13,
                color: 'black',
                marginLeft: 10,
                fontFamily: 'MontserratAlternates-Regular',
              }}>
              Email
            </Text>
          </View>
          <Text
            style={{
              fontSize: 13,
              marginLeft: 30,
              color: 'black',
              marginTop: 10,
              fontFamily: 'MontserratAlternates-Regular',
            }}>
            Towntalk@gmail.com
          </Text>
        </View>
        <View
          style={{
            // alignItems: 'center',
            marginTop: 15,
            // flexDirection: 'row',
            // justifyContent: 'space-between',
            paddingHorizontal: 15,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon1 name="right" color={'black'} />
            <Text
              style={{
                fontSize: 13,
                color: 'black',
                marginLeft: 10,
                fontFamily: 'MontserratAlternates-Regular',
              }}>
              Twitter
            </Text>
          </View>
          <Text
            style={{
              fontSize: 13,
              marginLeft: 30,
              color: 'black',
              marginTop: 10,
              fontFamily: 'MontserratAlternates-Regular',
            }}>
            Towntalk@gmail.com
          </Text>
        </View>
        <View
          style={{
            // alignItems: 'center',
            marginTop: 15,
            // flexDirection: 'row',
            // justifyContent: 'space-between',
            paddingHorizontal: 15,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon1 name="right" color={'black'} />
            <Text
              style={{
                fontSize: 13,
                color: 'black',
                marginLeft: 10,
                fontFamily: 'MontserratAlternates-Regular',
              }}>
              Phone
            </Text>
          </View>
          <Text
            style={{
              fontSize: 13,
              marginLeft: 30,
              color: 'black',
              marginTop: 10,
              fontFamily: 'MontserratAlternates-Regular',
            }}>
            +100110011100
          </Text>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};
export default ContactUs;
