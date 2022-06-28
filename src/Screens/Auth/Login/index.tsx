import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  Text,
  ImageBackground,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Keyboard,
  Alert,
  ScrollView,
} from 'react-native';
import {login} from '../../../lib/api';
import {validateEmail} from '../../../lib/functions';
import {useDispatch} from 'react-redux';
import MyModal from '../../../Components/MyModal';
import {logged} from '../../../redux/actions';
const Login = ({navigation}: {navigation: any}) => {
  const [email, setEmail] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [show, setShow] = useState(false);
  const [phoneErr, setPhoneErr] = useState('');
  const [passwrodErr, setPasswordErr] = useState('');
  const [category, setCategory] = useState('Email');
  const [showModal, setShowModal] = useState(false);
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
  const dispatch = useDispatch();
  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground
        source={require('../../../assets/Images/SignupBackground.png')}
        style={{flex: 1}}>
        <View style={{paddingHorizontal: 15, flex: 1}}>
          {/* <ScrollView> */}
          {keyboardStatus == false && (
            <View
              style={{
                flex: 1.5,
                justifyContent: 'center',
                //   zIndex: 3,
                alignItems: 'center',
              }}>
              {/* <View
              style={{
                position: 'absolute',
                zIndex: 3,
                // elevation: 1,
                height: 200,
                width: 200,

                backgroundColor: 'transparent',
              }}> */}
              <Image
                resizeMode="contain"
                source={require('../../../assets/Images/logoback.png')}
                style={{height: 100, width: 100}}
              />
              {/* </View> */}
              {/* <Text
              style={{
                fontSize: 20,
                marginTop: 20,
                color
                fontFamily: 'MontserratAlternates-SemiBold',
              }}>
              Hello again.
            </Text> */}
              <Text
                style={{
                  fontSize: 18,
                  color: 'black',
                  marginTop: 40,
                  fontFamily: 'MontserratAlternates-SemiBold',
                }}>
                Welcome back.
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '80%',
                  top: 20,
                }}>
                <TouchableOpacity
                  onPress={() => setCategory('Email')}
                  style={{
                    borderBottomWidth: category == 'Email' ? 1 : 0,
                    borderBottomColor: 'grey',
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: category == 'Email' ? 'black' : 'grey',
                      fontFamily:
                        category == 'Email'
                          ? 'MontserratAlternates-SemiBold'
                          : 'MontserratAlternates-Medium',
                    }}>
                    Email
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setCategory('Phone No')}
                  style={{
                    borderBottomWidth: category == 'Phone No' ? 1 : 0,
                    borderBottomColor: 'grey',
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: category == 'Phone No' ? 'black' : 'grey',
                      fontFamily:
                        category == 'Phone No'
                          ? 'MontserratAlternates-SemiBold'
                          : 'MontserratAlternates-Medium',
                    }}>
                    Phone No
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          <View style={{flex: 2}}>
            {category == 'Email' ? (
              <>
                <View style={{marginTop: 30}}>
                  <Text
                    style={{
                      fontSize: 12,
                      color: 'black',
                      fontFamily: 'MontserratAlternates-SemiBold',
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
                      color: 'grey',
                      fontFamily: 'MontserratAlternates-Regular',
                    }}
                  />
                </View>
                <View style={{marginTop: 30}}>
                  <Text
                    style={{
                      fontSize: 12,
                      color: 'black',
                      fontFamily: 'MontserratAlternates-SemiBold',
                    }}>
                    PASSWORD
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      borderBottomWidth: 1,
                      borderBottomColor: passwrodErr ? 'red' : 'grey',
                      justifyContent: 'space-between',
                    }}>
                    <TextInput
                      value={password}
                      onChangeText={text => {
                        setPassword(text);
                        setPasswordErr('');
                      }}
                      secureTextEntry={show ? false : true}
                      style={{
                        // backgroundColor: 'red',
                        width: '85%',
                        height: 50,
                        color: 'grey',
                        // borderBottomColor: passwrodErr ? 'red' : 'grey',
                        // borderBottomWidth: 1,
                        fontFamily: 'MontserratAlternates-Regular',
                      }}
                    />
                    <TouchableOpacity onPress={() => setShow(!show)}>
                      <Text
                        style={{
                          fontFamily: 'MontserratAlternates-Regular',
                          fontSize: 10,
                        }}>
                        {password ? (show ? 'Hide' : 'Show') : null}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  {/* <TextInput
                    value={password}
                    onChangeText={text => {
                      setPassword(text);
                      setPasswordErr('');
                    }}
                    secureTextEntry
                    style={{
                      borderBottomColor: passwrodErr ? 'red' : 'grey',
                      borderBottomWidth: 1,
                      fontFamily: 'MontserratAlternates-Regular',
                    }}
                  /> */}
                </View>
                <View style={{marginTop: 5, alignItems: 'flex-end'}}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Email')}>
                    <Text
                      style={{
                        fontSize: 12,
                        color: 'black',
                        fontFamily: 'MontserratAlternates-Medium',
                      }}>
                      Forgot Password?
                    </Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    if (validateEmail(email) && password) {
                      setShowModal(true);
                      login({email, password})
                        .then(res => {
                          console.log('res', res);
                          setShowModal(false);
                          if (res.status == 'success') {
                            console.log('res', res);
                            logged(res)(dispatch);
                          }
                        })
                        .catch(error => {
                          console.log('err', error.response.data);
                          // Alert.alert("Credentials doesn't matched");
                          setShowModal(false);
                          if (error.response.data.status == 'error') {
                            if (error.response.data.is_verified == false) {
                              navigation.navigate('EmailVerification', {
                                email,
                              });
                              //   ToastAndroid.show(
                              //     `${error.response.data.message.email}`,
                              //     ToastAndroid.SHORT,
                              //   );
                              // Alert.alert(
                              //   `${error.response.data.message.email}`,
                              // );
                            } else if (
                              error.response.data.message ==
                              'Invalid Username or Password'
                            ) {
                              //   ToastAndroid.show(
                              //     `${error.response.data.message.phoneno}`,
                              //     ToastAndroid.SHORT,
                              //   );
                              Alert.alert(`${error.response.data.message}`);
                            } else if (
                              error.response.data.message == 'User not Found'
                            ) {
                              Alert.alert(`${error.response.data.message}`);
                            }
                          }
                        });

                      // navigation.navigate('TabNavigator');
                    } else if (!validateEmail(email) && !password) {
                      setEmailErr('asd');
                      setPasswordErr('asd');
                    } else if (!validateEmail(email)) {
                      setEmailErr('asd');
                    } else if (!password) {
                      setPasswordErr('asd');
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
                    Sign In
                  </Text>
                </TouchableOpacity>
                <View
                  style={{
                    marginTop: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'MontserratAlternates-Regular',
                      color: 'black',
                    }}>
                    New to Town Talk?
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Signup')}>
                    <Text
                      style={{
                        marginLeft: 7,
                        fontSize: 16,
                        fontFamily: 'MontserratAlternates-SemiBold',
                        color: '#5F95F0',
                      }}>
                      Sign Up
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <>
                <View style={{marginTop: 30}}>
                  <Text
                    style={{
                      fontSize: 12,
                      color: 'black',
                      fontFamily: 'MontserratAlternates-SemiBold',
                    }}>
                    PHONE NO
                  </Text>
                  <TextInput
                    keyboardType="phone-pad"
                    value={phone}
                    onChangeText={text => {
                      setPhone(text);
                      setPhoneErr('');
                    }}
                    style={{
                      borderBottomColor: phoneErr ? 'red' : 'grey',
                      borderBottomWidth: 1,
                      height: 50,
                      color: 'grey',
                      fontFamily: 'MontserratAlternates-Regular',
                    }}
                  />
                </View>
                {/* <View style={{marginTop: 30}}>
                  <Text style={{fontSize: 12}}>PASSWORD</Text>
                  <TextInput
                    value={password}
                    onChangeText={text => {
                      setPassword(text);
                      setPasswordErr('');
                    }}
                    secureTextEntry
                    style={{
                      borderBottomColor: passwrodErr ? 'red' : 'grey',
                      borderBottomWidth: 1,
                    }}
                  />
                </View> */}
                {/* <View style={{marginTop: 5, alignItems: 'flex-end'}}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Email')}>
                    <Text style={{fontSize: 12}}>Forgot Password</Text>
                  </TouchableOpacity>
                </View> */}
                <TouchableOpacity
                  onPress={() => {
                    setShowModal(true);
                    if (phone) {
                      login({phoneno: phone})
                        .then(res => {
                          console.log('res', res);
                          setShowModal(false);
                          if (res.status == 'success') {
                            // logged(res)(dispatch);
                            navigation.navigate('CodePhone', {phone});
                          }
                        })
                        .catch(err => {
                          console.log('err', err);
                          // Alert.alert("Credentials doesn't matched");
                          setShowModal(false);
                          console.log('Error MEssage ', err.response.data);
                          if (err.response.data.status == 'error') {
                            Alert.alert(`${err.response.data.message}`);
                          }
                        });
                      //
                    } else {
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
                    Verify
                  </Text>
                </TouchableOpacity>
                <View
                  style={{
                    marginTop: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'MontserratAlternates-Regular',
                      color: 'black',
                    }}>
                    New to Town Talk?
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Signup')}>
                    <Text
                      style={{
                        marginLeft: 7,
                        fontSize: 16,
                        fontFamily: 'MontserratAlternates-SemiBold',
                        color: '#5F95F0',
                      }}>
                      Sign Up
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
          {/* </ScrollView> */}
        </View>
      </ImageBackground>
      {MyModal(showModal)}
    </SafeAreaView>
  );
};
export default Login;
