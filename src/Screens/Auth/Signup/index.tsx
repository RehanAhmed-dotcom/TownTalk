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
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {logged} from '../../../redux/actions';
import {validateEmail} from '../../../lib/functions';
import {useDispatch} from 'react-redux';
import {LoginButton, LoginManager, AccessToken} from 'react-native-fbsdk';
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
  const getInfoFromToken = token => {
    console.log('------------------');
    fetch(
      'https://graph.facebook.com/v2.5/me?fields=email,name,friends,picture&access_token=' +
        token,
    )
      .then(response => response.json())
      .then(json => {
        console.log('json', json);
      });
    // .then(json => {
    //   // setloding(true);
    //   const data = new FormData();
    //   data.append('email', json.email);
    //   data.append('password', json.id);
    //   // data.append('social', 'true');
    //   login({
    //     typ: use == 'stu' ? 'student' : 'teacher',
    //     data: data,
    //   })
    //     .then(res => {
    //       console.log('---------', res);

    //       if (res.status == 'success') {
    //         setloding(false);
    //         userAuthorize(res)(dispatch);
    //         // navigation.navigate(use == 'stu' ? 'StudentTab' : 'TeacherTab');
    //       } else {
    //         setloding(false);
    //         console.log('Some Thing Wrong');
    //       }
    //     })
    //     .catch(error => {
    //       // setloding(false);
    //       // console.log('Message Error', error?.response?.data);
    //       // seterr(error?.response?.data?.message);

    //       if (error.response.data.status == 'error') {
    //         var today = new Date();
    //         var dd = String(today.getDate()).padStart(2, '0');
    //         var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    //         var yyyy = today.getFullYear();

    //         let vrifiddate = yyyy + '-' + mm + '-' + dd;

    //         const data = new FormData();
    //         data.append(
    //           'first_name',
    //           json.name
    //             .split(' ')[0]
    //             .replace(/^./, json.name.split(' ')[0][0].toUpperCase()),
    //         );
    //         data.append('email', json.email);
    //         data.append('last_name', json.name.split(' ')[1]);
    //         // data.append('name', json.name);
    //         // data.append('email', json.email);
    //         data.append('password', json.id);
    //         data.append('password_confirmation', json.id);
    //         data.append('email_verified_at', vrifiddate);
    //         // data.append('type', type);
    //         if (json.picture.data.url) {
    //           json.picture.data.url &&
    //             data.append('image', {
    //               uri: json.picture.data.url,
    //               type: 'image/jpeg',
    //               name: 'image' + new Date() + '.jpg',
    //             });
    //           console.log('data,,,,,', data);
    //         }
    //         CompleteProfile({
    //           typ: use == 'stu' ? 'student' : 'teacher',
    //           data: data,
    //         })
    //           .then(res => {
    //             console.log('-----', res);
    //             if (res.status == 'success') {
    //               setloding(false);
    //               userAuthorize(res)(dispatch);
    //               // navigation.navigate(use == 'stu' ? 'StudentTab' : 'Verificatiion');
    //             } else {
    //               setloding(false);
    //               console.log('Some Thing Wrong');
    //             }
    //           })
    //           .catch(error => {
    //             setloding(false);
    //             console.log('Message Error------1', error);
    //             console.log('Message Error------2', error.response.message);
    //             console.log('Message Error------3', error.data);
    //             console.log('Message Error------4', error.response.data);
    //             console.log('Message Error------5', error.message);

    //             if (error?.response?.data?.message?.email) {
    //               alert(error?.response?.data?.message?.email);
    //             } else {
    //               setloding(false);
    //               console.log('Error Meaasge sign up', error.response.data);
    //             }
    //           });
    //       } else {
    //         // setloding(false);
    //         console.log('Message Error', error);
    //         // seterr('Some thing Wrong');
    //       }
    //     });
    // })
    // .catch(error => {
    //   // setloding(false);
    //   Alert.alert(error);
    // });
  };
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '663248566993-u3shjkc82qcp2h3jie63k1per56tbv4n.apps.googleusercontent.com',
      offlineAccess: false,
    });
  }, []);
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('userInfo', userInfo);
      // this.setState({userInfo});
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };
  const Faceboologin = async () => {
    LoginManager.logOut();
    LoginManager.setLoginBehavior('web_only');
    LoginManager.logInWithPermissions(['email', 'public_profile']).then(
      function (result) {
        if (result.isCancelled) {
          console.log('cancled');
        } else {
          AccessToken.getCurrentAccessToken().then(data => {
            console.log('userdata', data.permissions);
            // const {accessToken} = data;
            // initUser(accessToken);
            const accessToken = data.accessToken.toString();
            getInfoFromToken(accessToken);
          });
        }
      },

      function (error) {
        alert(error);
        console.log('error', error);
      },
    );
  };
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
      {/* <ImageBackground
        source={require('../../../assets/Images/SignupBackground.png')}
        style={{flex: 1}}> */}
      {/* <Image
          source={require('../../../assets/Images/mainLogo.png')}
          style={{height: 200, marginLeft: 0, width: 200}}
        /> */}
      <Text
        style={{
          fontSize: 18,
          marginTop: 30,
          marginLeft: 20,
          color: 'black',
          paddingBottom: 5,
          fontFamily: 'MontserratAlternates-SemiBold',
        }}>
        Sign Up
      </Text>
      {keyboardStatus == false && (
        <>
          <TouchableOpacity
            onPress={() => picker()}
            style={{
              marginTop: 40,
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
                  : require('../../../assets/Images/roundplaceholder.png')
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
                fontSize: 16,
                marginTop: 20,
                color: 'grey',
                paddingBottom: 5,
                fontFamily: 'MontserratAlternates-SemiBold',
              }}>
              Profile picture
            </Text>
          </View>
        </>
      )}

      <Wrapper behavior="padding" style={{flex: 1}}>
        <ScrollView style={{flex: 1}}>
          <View style={{paddingHorizontal: 15}}>
            <View style={{marginTop: 30}}>
              <TextInput
                value={firstName}
                onBlur={() => {
                  firstName.length > 10 && setFirstNameErr('name limitation');
                  firstName.length < 4 && setFirstNameErr('name limitation');
                }}
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
                  borderColor: firstNameErr ? 'red' : 'grey',
                  borderWidth: 1,
                  height: 50,
                  borderRadius: 10,
                  paddingHorizontal: 10,
                  color: 'black',
                  fontFamily: 'MontserratAlternates-Regular',
                }}
                placeholderTextColor={'grey'}
                placeholder={'@Username'}
              />
            </View>
            <Text style={{marginTop: 10, fontSize: 12, color: 'grey'}}>
              Minumum 4 characters, Maximum 10 characters
            </Text>
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
            <View style={{marginTop: 20}}>
              <TextInput
                value={email}
                autoCapitalize="none"
                placeholderTextColor={'grey'}
                placeholder={'Email Address'}
                onChangeText={text => {
                  setEmail(text);
                  setEmailErr('');
                }}
                style={{
                  borderColor: emailErr ? 'red' : 'grey',
                  borderWidth: 1,
                  height: 50,
                  paddingHorizontal: 10,
                  borderRadius: 10,
                  color: 'black',
                  fontFamily: 'MontserratAlternates-Regular',
                }}
              />
            </View>
            <View style={{marginTop: 30}}>
              <TextInput
                value={phone}
                // secureTextEntry
                placeholder="Phone"
                placeholderTextColor={'grey'}
                onChangeText={text => {
                  setPhone(text);
                  setPhoneErr('');
                }}
                style={{
                  borderColor: phoneErr ? 'red' : 'grey',
                  borderWidth: 1,
                  borderRadius: 10,
                  height: 50,
                  paddingHorizontal: 10,
                  color: 'black',
                  fontFamily: 'MontserratAlternates-Regular',
                }}
              />
            </View>

            <View style={{marginTop: 30}}>
              {/* <Text
                style={{
                  fontSize: 12,
                  fontFamily: 'MontserratAlternates-SemiBold',
                  color: 'black',
                }}>
                PASSWORD
              </Text> */}
              <TextInput
                value={password}
                placeholderTextColor={'grey'}
                placeholder={'Password'}
                secureTextEntry
                onChangeText={text => {
                  setPassword(text);
                  setPasswordErr('');
                }}
                style={{
                  borderColor: passwordErr ? 'red' : 'grey',
                  borderWidth: 1,
                  height: 50,
                  borderRadius: 10,
                  paddingHorizontal: 10,
                  color: 'black',
                  fontFamily: 'MontserratAlternates-Regular',
                }}
              />
            </View>
            <View style={{marginTop: 30}}>
              <TextInput
                value={password}
                placeholderTextColor={'grey'}
                placeholder={'Confirm Password'}
                secureTextEntry
                onChangeText={text => {
                  setPassword(text);
                  setPasswordErr('');
                }}
                style={{
                  borderColor: passwordErr ? 'red' : 'grey',
                  borderWidth: 1,
                  height: 50,
                  borderRadius: 10,
                  color: 'black',
                  fontFamily: 'MontserratAlternates-Regular',
                }}
              />
            </View>
            <View style={{marginTop: 30}}>
              <TextInput
                value={zip}
                onChangeText={text => {
                  setZip(text);
                  setZipErr('');
                }}
                style={{
                  borderColor: zipErr ? 'red' : 'grey',
                  borderWidth: 1,
                  height: 50,
                  borderRadius: 10,
                  paddingHorizontal: 10,
                  color: 'black',
                  fontFamily: 'MontserratAlternates-Regular',
                }}
                placeholderTextColor={'grey'}
                placeholder={'ZIP CODE'}
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
                          Alert.alert(`${error.response.data.message.phoneno}`);
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
                marginTop: 40,
                elevation: 3,
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontFamily: 'MontserratAlternates-SemiBold',
                  fontSize: 16,
                  color: 'white',
                }}>
                Continue
              </Text>
            </TouchableOpacity>
            <View
              style={{
                marginTop: 20,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                onPress={() => {
                  Faceboologin();
                }}>
                <Image
                  source={require('../../../assets/Images/facebook.png')}
                  style={{height: 40, width: 40, marginRight: 10}}
                />
              </TouchableOpacity>

              <Image
                source={require('../../../assets/Images/twitter.png')}
                style={{height: 40, width: 40, marginRight: 10}}
              />
              <TouchableOpacity onPress={() => signIn()}>
                <Image
                  source={require('../../../assets/Images/google.png')}
                  style={{height: 40, width: 40, marginRight: 10}}
                />
              </TouchableOpacity>

              <Image
                source={require('../../../assets/Images/apple.png')}
                style={{height: 40, width: 40, marginRight: 10}}
              />
            </View>
            <View
              style={{
                marginTop: 20,
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
                Already have an account?
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text
                  style={{
                    marginLeft: 7,
                    fontSize: 16,
                    fontFamily: 'MontserratAlternates-SemiBold',
                    color: 'black',
                  }}>
                  Sign in!
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Wrapper>
      {/* </ImageBackground> */}
      {MyModal(showModal)}
    </SafeAreaView>
  );
};
export default Signup;
