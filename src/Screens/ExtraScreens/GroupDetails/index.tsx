import React, {useState, useRef} from 'react';

import {
  View,
  FlatList,
  TextInput,
  ScrollView,
  Modal,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Text,
  ImageBackground,
} from 'react-native';
import Recaptcha from 'react-native-recaptcha-that-works';
import Posts from '../../../Components/Posts';
import Group from '../../../Components/Group';
import MapView from 'react-native-maps';
import LikeDislike from '../../../Components/LikeDislike';
import Comments from '../../../Components/Comments';
import Icon2 from 'react-native-vector-icons/Fontisto';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Icon1 from 'react-native-vector-icons/AntDesign';
import Hotel from '../../../Components/Hotel';
const GroupDetails = ({navigation}) => {
  const arr = [
    {name: 'Food', members: '70 members'},
    {name: 'Art', members: '70 members'},
    {name: 'Gaming', members: '70 members'},
    {name: 'Art', members: '70 members'},
    {name: 'Gaming', members: '70 members'},
  ];
  const [show, setShow] = useState(false);
  const [mile, setMile] = useState('5 Miles');
  const [select, setSelect] = useState('');
  const render = ({item, index}) => <Posts />;
  const recaptcha = useRef();

  const send = () => {
    console.log('send!');
    recaptcha.current.open();
  };

  const onVerify = token => {
    console.log('success!', token);
  };

  const onExpire = () => {
    console.warn('expired!');
  };
  const myModal3 = () => (
    <Modal animationType="slide" transparent={true} visible={show}>
      <View
        style={{
          flex: 1,
          alignItems: 'flex-end',
          // justifyContent: 'center',
          backgroundColor: '#00000088',
        }}>
        <View
          style={{
            width: '70%',
            backgroundColor: 'white',
            padding: 20,
            marginRight: 30,
            borderRadius: 10,
            marginTop: 50,
          }}>
          <TouchableOpacity
            onPress={() => setMile('5 Miles')}
            style={{
              flexDirection: 'row',
              borderBottomColor: 'grey',
              borderBottomWidth: 1,
              paddingBottom: 10,
              alignItems: 'center',
            }}>
            <Icon
              name={
                mile == '5 Miles'
                  ? 'radio-button-checked'
                  : 'radio-button-unchecked'
              }
              size={20}
              color={mile == '5 Miles' ? '#5F95F0' : 'grey'}
            />
            <Text
              style={{
                marginLeft: 5,
                color: 'black',
                fontFamily: 'MontserratAlternates-Regular',
              }}>
              Most People
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setMile('10 Miles')}
            style={{
              flexDirection: 'row',
              borderBottomColor: 'grey',
              borderBottomWidth: 1,
              paddingBottom: 10,
              marginTop: 10,
              alignItems: 'center',
            }}>
            <Icon
              name={
                mile == '10 Miles'
                  ? 'radio-button-checked'
                  : 'radio-button-unchecked'
              }
              size={20}
              color={mile == '10 Miles' ? '#5F95F0' : 'grey'}
            />
            <Text
              style={{
                marginLeft: 5,
                color: 'black',
                fontFamily: 'MontserratAlternates-Regular',
              }}>
              Most People
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setMile('15 Miles')}
            style={{
              flexDirection: 'row',
              borderBottomColor: 'grey',
              borderBottomWidth: 1,
              paddingBottom: 10,
              marginTop: 10,
              alignItems: 'center',
            }}>
            <Icon
              name={
                mile == '15 Miles'
                  ? 'radio-button-checked'
                  : 'radio-button-unchecked'
              }
              size={20}
              color={mile == '15 Miles' ? '#5F95F0' : 'grey'}
            />
            <Text
              style={{
                marginLeft: 5,
                color: 'black',
                fontFamily: 'MontserratAlternates-Regular',
              }}>
              Most People
            </Text>
          </TouchableOpacity>

          <View style={{alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => {
                setMile(mile);
                setShow(false);
              }}
              style={{
                height: 40,
                width: 150,
                alignItems: 'center',
                marginTop: 20,
                borderRadius: 10,
                justifyContent: 'center',
                backgroundColor: '#5F95F0',
              }}>
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'MontserratAlternates-SemiBold',
                }}>
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* <View
          style={{
            backgroundColor: 'white',
            height: 100,
            width: 100,
            borderRadius: 50,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator size="large" color={'#5F95F0'} />
        </View> */}
      </View>
    </Modal>
  );
  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground
        style={{flex: 1}}
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
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon1 name="left" color="black" size={20} />
            </TouchableOpacity>
            <View style={{marginLeft: 20}}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: 'MontserratAlternates-SemiBold',
                  color: 'black',
                }}>
                Group Detail
              </Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon2 name="locked" size={10} color={'#5F95F0'} />
                <Text style={{fontSize: 12, color: 'black', marginLeft: 5}}>
                  Private Group
                </Text>
              </View>
            </View>
          </View>
          <TouchableOpacity onPress={() => setShow(!show)}>
            <Image
              source={require('../../../assets/Images/filter.png')}
              style={{height: 20, width: 20}}
            />
          </TouchableOpacity>

          {/* <Icon
            name="log-out"
            color={'#5F95F0'}
            size={20}
            onPress={() => navigation.navigate('Login')}
          /> */}
        </View>
        <ScrollView>
          <View style={{flex: 1}}>
            <View style={{height: 250, width: '100%'}}>
              <Image
                source={require('../../../assets/Images/restaurants.jpg')}
                style={{height: 250, width: '100%'}}
              />
              <View
                style={{
                  position: 'absolute',
                  // backgroundColor: 'red',
                  height: 250,
                  width: '100%',
                  justifyContent: 'flex-end',
                  paddingHorizontal: 15,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View>
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: 'MontserratAlternates-SemiBold',
                        color: 'white',
                      }}>
                      Arts
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginTop: 10,
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          borderRadius: 30,
                          borderColor: 'white',
                          borderWidth: 1,
                        }}>
                        <Image
                          source={require('../../../assets/Images/social.jpg')}
                          style={{height: 30, borderRadius: 20, width: 30}}
                        />
                      </View>

                      <View
                        style={{
                          borderRadius: 30,
                          borderColor: 'white',
                          right: 15,
                          borderWidth: 1,
                        }}>
                        <Image
                          source={require('../../../assets/Images/social.jpg')}
                          style={{
                            height: 30,
                            // marginLeft: 10,
                            // right: 15,
                            borderRadius: 20,
                            width: 30,
                          }}
                        />
                      </View>

                      <View
                        style={{
                          borderRadius: 30,
                          borderColor: 'white',
                          right: 30,
                          borderWidth: 1,
                        }}>
                        <Image
                          source={require('../../../assets/Images/social.jpg')}
                          style={{
                            height: 30,
                            // marginLeft: 10,

                            borderRadius: 20,
                            width: 30,
                          }}
                        />
                      </View>
                      <View
                        style={{
                          borderRadius: 30,
                          borderColor: 'white',
                          right: 45,
                          borderWidth: 1,
                        }}>
                        <Image
                          source={require('../../../assets/Images/social.jpg')}
                          style={{
                            height: 30,
                            // marginLeft: 10,
                            // right: 15,
                            borderRadius: 20,
                            width: 30,
                          }}
                        />
                      </View>
                      <View
                        style={{
                          borderRadius: 30,
                          borderColor: 'white',
                          borderWidth: 1,
                          right: 60,
                        }}>
                        <Image
                          source={require('../../../assets/Images/social.jpg')}
                          style={{
                            height: 30,
                            // marginLeft: 10,
                            // right: 15,
                            borderRadius: 20,
                            width: 30,
                          }}
                        />
                      </View>
                    </View>
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: 'MontserratAlternates-Medium',
                        color: 'white',
                      }}>
                      80 Members
                    </Text>
                  </View>
                  {/* <Text
                    style={{
                      fontSize: 12,
                      fontFamily: 'MontserratAlternates-Regular',
                      color: 'white',
                    }}>
                    13 min Ago
                  </Text> */}
                </View>
              </View>
            </View>

            {/* <FlatList data={arr} numColumns={2} key={2} renderItem={render} /> */}
            <View style={{marginTop: 20, paddingHorizontal: 15}}>
              <TouchableOpacity
                onPress={() => send()}
                style={{
                  height: 50,
                  backgroundColor: '#5F95F0',
                  alignItems: 'center',
                  justifyContent: 'center',
                  elevation: 2,
                  borderRadius: 10,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: 'MontserratAlternates-SemiBold',
                    color: 'white',
                  }}>
                  Join Group
                </Text>
              </TouchableOpacity>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  style={{
                    marginTop: 20,
                    color: '#5F95F0',
                    fontFamily: 'MontserratAlternates-Regular',
                  }}>
                  #fun #danger #helpful #adventure #hobby
                </Text>
              </View>

              <Text
                style={{
                  // marginTop: 20,
                  fontFamily: 'MontserratAlternates-Regular',
                  fontSize: 14,
                  color: 'black',
                }}>
                At vero eos et accusamus et iusto odio dignissimos ducimus qui
                blanditiss skdlkj ksdjfslkdfj klasjdkfldskj skldjfdlsjflsd ksj
                kl skjflkj klsjl kjslk jl sjlkfj s lkdsj ksjdklfjlkdjflk jkj
                ksjdkfl kjslkdj lksjfklsdjflkj
              </Text>
              <Text
                style={{
                  fontSize: 17,
                  fontFamily: 'MontserratAlternates-SemiBold',
                  color: 'black',
                  marginTop: 30,
                }}>
                Groups Posts
              </Text>
              <FlatList data={arr} renderItem={render} />
            </View>
          </View>
        </ScrollView>

        {/* <Text>abc</Text> */}
      </ImageBackground>
      <Recaptcha
        ref={recaptcha}
        siteKey="6LejsqwZAAAAAGsmSDWH5g09dOyNoGMcanBllKPF"
        baseUrl="http://127.0.0.1"
        onVerify={onVerify}
        onExpire={onExpire}
        // size="invisible"
      />
      {myModal3()}
    </SafeAreaView>
  );
};
export default GroupDetails;
