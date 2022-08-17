import React, {useState, useEffect} from 'react';
import {
  View,
  ImageBackground,
  Image,
  TextInput,
  Keyboard,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
  Text,
} from 'react-native';
// import { useState } from 'react';
import {register} from '../../../lib/api';
import {logged} from '../../../redux/actions';
import {validateEmail} from '../../../lib/functions';
import {useDispatch} from 'react-redux';
import MyModal from '../../../Components/MyModal';
import ImagePicker from 'react-native-image-crop-picker';
const Signup = ({navigation}: {navigation: any}) => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState('');
  const [image, setImage] = useState('');
  const [firstNameErr, setFirstNameErr] = useState('');
  const [lastName, setLastName] = useState('');
  const [lastNameErr, setLastNameErr] = useState('');
  const [zip, setZip] = useState('');
  const [zipErr, setZipErr] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneErr, setPhoneErr] = useState('');
  const [email, setEmail] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [keyboardStatus, setKeyboardStatus] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const picker = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setImage(image.path);
    });
  };
  const Wrapper = Platform.OS == 'ios' ? KeyboardAvoidingView : View;
  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground
        source={require('../../../assets/Images/SignupBackground.png')}
        style={{flex: 1}}>
        {/* <Image
          source={require('../../../assets/Images/mainLogo.png')}
          style={{height: 200, marginLeft: 0, width: 200}}
        /> */}
        {keyboardStatus == false && (
          <>
            <TouchableOpacity
              onPress={() => picker()}
              style={{
                marginTop: 70,
                alignItems: 'center',
                height: 100,
                // width: 100,
              }}>
              {/* <View style={{height: 100, width: 100, backgroundColor: 'red'}}> */}
              <Image
                resizeMode="cover"
                source={
                  image
                    ? {uri: image}
                    : require('../../../assets/Images/user.png')
                }
                style={{height: 100, borderRadius: 60, width: 100}}
              />
              {/* </View> */}
            </TouchableOpacity>
            <View style={{alignItems: 'center'}}>
              {/* <Text
            style={{
              marginTop: 20,
              fontSize: 20,
              fontFamily: 'MontserratAlternates-SemiBold',
            }}>
            Hello!
          </Text> */}
              <Text
                style={{
                  fontSize: 18,
                  marginTop: 20,
                  color: 'black',
                  paddingBottom: 5,
                  fontFamily: 'MontserratAlternates-SemiBold',
                }}>
                Sign up to get started.
              </Text>
            </View>
          </>
        )}

        <Wrapper behavior="padding" style={{flex: 1}}>
          <ScrollView style={{flex: 1}}>
            <View style={{paddingHorizontal: 15}}>
              <View style={{marginTop: 30}}>
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: 'MontserratAlternates-SemiBold',
                    color: 'black',
                  }}>
                  USER NAME
                </Text>
                <TextInput
                  value={firstName}
                  onChangeText={text => {
                    if (text.includes(' ')) {
                      setFirstName(text.trim());
                      setFirstNameErr('');
                    } else {
                      setFirstName(text);
                      setFirstNameErr('');
                    }
                  }}
                  style={{
                    borderBottomColor: firstNameErr ? 'red' : 'grey',
                    borderBottomWidth: 1,
                    height: 50,
                    color: 'black',
                    fontFamily: 'MontserratAlternates-Regular',
                  }}
                />
              </View>
              {/* <View style={{marginTop: 30}}>
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: 'MontserratAlternates-SemiBold',
                    color: 'black',
                  }}>
                  LAST NAME
                </Text>
                <TextInput
                  value={lastName}
                  onChangeText={text => {
                    setLastName(text);
                    setLastNameErr('');
                  }}
                  style={{
                    borderBottomColor: lastNameErr ? 'red' : 'grey',
                    borderBottomWidth: 1,
                    height: 50,
                    color: 'black',
                    fontFamily: 'MontserratAlternates-Regular',
                  }}
                />
              </View> */}
              <View style={{marginTop: 30}}>
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: 'MontserratAlternates-SemiBold',
                    color: 'black',
                  }}>
                  ZIP CODE
                </Text>
                <TextInput
                  value={zip}
                  onChangeText={text => {
                    setZip(text);
                    setZipErr('');
                  }}
                  style={{
                    borderBottomColor: zipErr ? 'red' : 'grey',
                    borderBottomWidth: 1,
                    height: 50,
                    color: 'black',
                    fontFamily: 'MontserratAlternates-Regular',
                  }}
                />
              </View>
              <View style={{marginTop: 30}}>
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
                  autoCapitalize="none"
                  onChangeText={text => {
                    setEmail(text);
                    setEmailErr('');
                  }}
                  style={{
                    borderBottomColor: emailErr ? 'red' : 'grey',
                    borderBottomWidth: 1,
                    height: 50,
                    color: 'black',
                    fontFamily: 'MontserratAlternates-Regular',
                  }}
                />
              </View>
              <View style={{marginTop: 30}}>
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: 'MontserratAlternates-SemiBold',
                    color: 'black',
                  }}>
                  PASSWORD
                </Text>
                <TextInput
                  value={password}
                  secureTextEntry
                  onChangeText={text => {
                    setPassword(text);
                    setPasswordErr('');
                  }}
                  style={{
                    borderBottomColor: passwordErr ? 'red' : 'grey',
                    borderBottomWidth: 1,
                    height: 50,
                    color: 'black',
                    fontFamily: 'MontserratAlternates-Regular',
                  }}
                />
              </View>
              <View style={{marginTop: 30}}>
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: 'MontserratAlternates-SemiBold',
                    color: 'black',
                  }}>
                  PHONE NO
                </Text>
                <TextInput
                  value={phone}
                  // secureTextEntry
                  placeholder="+92----------"
                  placeholderTextColor={'grey'}
                  onChangeText={text => {
                    setPhone(text);
                    setPhoneErr('');
                  }}
                  style={{
                    borderBottomColor: phoneErr ? 'red' : 'grey',
                    borderBottomWidth: 1,
                    height: 50,
                    color: 'black',
                    fontFamily: 'MontserratAlternates-Regular',
                  }}
                />
              </View>
              <TouchableOpacity
                onPress={() => {
                  if (
                    validateEmail(email) &&
                    password.length >= 8 &&
                    firstName &&
                    zip &&
                    phone
                  ) {
                    setShowModal(true);
                    // navigation.navigate('EmailVerification', {
                    //   firstName,
                    //   lastName,
                    //   zip,
                    //   email,
                    //   password,
                    //   phone,
                    //   image,
                    // });
                    const data = new FormData();
                    data.append('firstname', firstName);

                    data.append('zipcode', zip);
                    data.append('email', email);
                    data.append('password', password);
                    data.append('phoneno', phone);
                    {
                      image &&
                        data.append('image', {
                          uri: image,
                          type: 'image/jpeg',
                          name: `image${new Date()}.jpg`,
                        });
                    }
                    register(data)
                      .then(res => {
                        console.log('res', res);

                        setShowModal(false);
                        if (res.status == 'success') {
                          navigation.navigate('EmailVerification', {email});
                        }
                        // logged(res)(dispatch);
                      })
                      .catch(error => {
                        console.log('err', error.response.data);
                        setShowModal(false);
                        // console.log('Error MEssage ', error.response.data);
                        if (error.response.data.status == 'error') {
                          if (error.response.data.message.email) {
                            //   ToastAndroid.show(
                            //     `${error.response.data.message.email}`,
                            //     ToastAndroid.SHORT,
                            //   );
                            Alert.alert(`${error.response.data.message.email}`);
                          }
                          if (error.response.data.message.phoneno) {
                            //   ToastAndroid.show(
                            //     `${error.response.data.message.phoneno}`,
                            //     ToastAndroid.SHORT,
                            //   );
                            Alert.alert(
                              `${error.response.data.message.phoneno}`,
                            );
                          }
                          if (error.response.data.message.firstname) {
                            //   ToastAndroid.show(
                            //     `${error.response.data.message.phoneno}`,
                            //     ToastAndroid.SHORT,
                            //   );
                            Alert.alert(
                              'The username has already been taken.',
                              // `${error.response.data.message.firstname}`,
                            );
                          }
                        }
                      });
                    // navigation.navigate('TabNavigator');
                  } else if (
                    !validateEmail(email) &&
                    !password &&
                    !firstName &&
                    !zip &&
                    !phone
                  ) {
                    setEmailErr('asd');
                    setPasswordErr('asd');
                    setFirstNameErr('asd');
                    // setLastNameErr('asd');
                    setZipErr('asd');
                    setPhoneErr('asd');
                  } else if (!validateEmail(email)) {
                    setEmailErr('asd');
                  } else if (!password) {
                    setPasswordErr('asd');
                  } else if (password.length < 8) {
                    Alert.alert(
                      'Password length must be greater or equal to 8 characters',
                    );
                  } else if (!firstName) {
                    setFirstNameErr('asd');
                  } else if (!zip) {
                    setZipErr('asd');
                  } else if (!phone) {
                    setPhoneErr('asd');
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
                <Text
                  style={{
                    fontFamily: 'MontserratAlternates-SemiBold',
                    fontSize: 16,
                    color: 'white',
                  }}>
                  Sign Up
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  marginTop: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 20,
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: 'MontserratAlternates-Regular',
                    color: 'black',
                  }}>
                  Already in Town talk?
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <Text
                    style={{
                      marginLeft: 7,
                      fontSize: 16,
                      fontFamily: 'MontserratAlternates-SemiBold',
                      color: '#5F95F0',
                    }}>
                    Sign In
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </Wrapper>
      </ImageBackground>
      {MyModal(showModal)}
    </SafeAreaView>
  );
};
export default Signup;
