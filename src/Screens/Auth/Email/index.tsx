import React, {useState} from 'react';
import {
  View,
  ImageBackground,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import {validateEmail} from '../../../lib/functions';
import Icon from 'react-native-vector-icons/AntDesign';
import {submitEmail} from '../../../lib/api';
import MyModal from '../../../Components/MyModal';
const Email = ({navigation}: {navigation: any}) => {
  const [email, setEmail] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [showModal, setShowModal] = useState(false);
  // console.log('navi', navigation.navigate);
  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground
        style={{flex: 1}}
        source={require('../../../assets/Images/back.png')}>
        <View
          style={{
            height: 58,
            elevation: 3,
            backgroundColor: 'white',
            justifyContent: 'center',
            paddingLeft: 20,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon
              name="left"
              size={20}
              color={'black'}
              onPress={() => navigation.goBack()}
            />
            <Text
              style={{
                fontSize: 17,
                marginLeft: 20,
                color: 'black',
                fontFamily: 'MontserratAlternates-SemiBold',
                // fontWeight: 'bold',
              }}>
              Forgot Password
            </Text>
          </View>
        </View>
        <View style={{marginTop: 100, paddingHorizontal: 15}}>
          <View style={{alignItems: 'center'}}>
            <Text
              style={{
                fontFamily: 'MontserratAlternates-Medium',
                color: 'black',
              }}>
              Enter your email for the verification process.
            </Text>
            <Text
              style={{
                fontFamily: 'MontserratAlternates-Medium',
                color: 'black',
                marginTop: 5,
              }}>
              We will send 4 digits code to your email.
            </Text>
          </View>
          <View style={{marginTop: 80}}>
            <Text
              style={{
                fontSize: 12,
                fontFamily: 'MontserratAlternates-SemiBold',
                color: 'black',
              }}>
              EMAIL ADDRESS
            </Text>
            <TextInput
              value={email}
              onChangeText={text => {
                setEmail(text);
                setEmailErr('');
              }}
              style={{
                borderBottomColor: emailErr ? 'red' : 'grey',
                borderBottomWidth: 1,
                height: 50,
              }}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              if (validateEmail(email)) {
                setShowModal(true);
                //   Alert.alert('Email');
                submitEmail({email})
                  .then(res => {
                    setShowModal(false);
                    console.log('res', res);
                    if (res.status == 'success') {
                      navigation.navigate('Code', {email});
                    }
                    // if()
                  })
                  .catch(error => {
                    // console.log('err', error.response.data);
                    if (error.response.data.status == 'error') {
                      Alert.alert(
                        "We can't find a user with that e-mail address.",
                      );
                    }
                    setShowModal(false);
                  });
                //
              } else {
                setEmailErr('asd');
              }
            }}
            style={{
              backgroundColor: '#5F95F0',
              alignItems: 'center',
              height: 50,
              borderRadius: 10,
              marginTop: 80,
              elevation: 3,
              justifyContent: 'center',
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 16, color: 'white'}}>
              Send
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      {/* <Text>Email</Text> */}
      {MyModal(showModal)}
    </SafeAreaView>
  );
};
export default Email;
