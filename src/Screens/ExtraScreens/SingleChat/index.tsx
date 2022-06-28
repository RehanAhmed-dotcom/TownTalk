import React, {useState, useEffect} from 'react';

import {
  View,
  FlatList,
  TextInput,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Text,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
} from 'react-native';
import moment from 'moment';
import {recieverMsg, senderImgMsg, senderMsg} from '../../../lib/messageUtils';
import {useSelector} from 'react-redux';
import database from '@react-native-firebase/database';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/AntDesign';
const SingleChat = ({navigation, route}: {navigation: any; route: any}) => {
  const {item} = route.params;
  const image = route?.params?.image;
  const items = route?.params?.items;
  const [keyboardStatus, setKeyboardStatus] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const {userData} = useSelector(({USER}) => USER);
  const Wrapper = Platform.OS == 'android' ? View : KeyboardAvoidingView;
  const guestData = {
    id: item.id,
    firstname: item.firstname,
    lastname: item.lastname,
    email: item.email,
    // fcm_token: fcm_token ? fcm_token : item.fcm_token,
    fcm_token: item.fcm_token,
    image: item.image,
    // distance: item.distance,
    // isOn: on ? on : item.message_status,
    // hours: time.getHours(),
    // mins: time.getMinutes(),
  };
  const user = {
    id: userData.userdata.id,
    firstname: userData.userdata.firstname,
    lastname: userData.userdata.lastname,
    email: userData.userdata.email,
    fcm_token: userData.userdata.fcm_token,
    image: userData.userdata.image,
  };
  const [name, setName] = useState('Olivia Benson');

  console.log('item in chat', item);
  const [zip, setZip] = useState('');
  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus('Keyboard Shown');
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus('Keyboard Hidden');
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);
  const _chatUsers = async () => {
    try {
      console.log('user going to db', guestData);
      database()
        .ref('users/' + userData.userdata.email.replace(/[^a-zA-Z0-9 ]/g, ''))
        .child(guestData.email.replace(/[^a-zA-Z0-9 ]/g, ''))
        .set({
          latestMessage: message,
          timestamp: database.ServerValue.TIMESTAMP,
          counter: 0,
          screen: image && items,
          user: guestData,
        });

      database()
        .ref('users/' + guestData.email.replace(/[^a-zA-Z0-9 ]/g, ''))
        .child(userData.userdata.email.replace(/[^a-zA-Z0-9 ]/g, ''))
        .once('value', snapshot => {
          const counts = snapshot?.val()?.counter;
          database()
            .ref('users/' + guestData.email.replace(/[^a-zA-Z0-9 ]/g, ''))
            .child(userData.userdata.email.replace(/[^a-zA-Z0-9 ]/g, ''))
            .set({
              latestMessage: message,
              timestamp: database.ServerValue.TIMESTAMP,
              counter: counts ? counts + 1 : 1,
              screen: image && items,
              user: user,
            });
        });
    } catch (error) {}
  };
  const handleSend = () => {
    if (message) {
      setMessage('');

      // console.log('message is here', message);
      senderMsg(
        message,
        userData.userdata.email.replace(/[^a-zA-Z0-9 ]/g, ''),
        guestData.email.replace(/[^a-zA-Z0-9 ]/g, ''),
        Date.now(),
        items,
        // quote,
      );

      _chatUsers()
        .then(() => {})
        .catch(err => {
          // console.log('error inside screen', err);
        });

      recieverMsg(
        message,
        userData.userdata.email.replace(/[^a-zA-Z0-9 ]/g, ''),
        guestData.email.replace(/[^a-zA-Z0-9 ]/g, ''),
        Date.now(),
        items,
        // quote,
      );
      _chatUsers()
        .then(() => {})
        .catch(err => {});
    }

    // _handlePushNotification()
  };
  const _getMeesages = async () => {
    try {
      database()
        .ref('messeges')
        .child(userData.userdata.email.replace(/[^a-zA-Z0-9 ]/g, ''))
        .child(guestData.email.replace(/[^a-zA-Z0-9 ]/g, ''))
        .on('value', dataSnapshot => {
          let msgs = [];
          dataSnapshot.forEach(child => {
            // console.log('child', child);
            msgs.push({
              sendBy: child.val().messege.sender,
              recievedBy: child.val().messege.reciever,
              msg: child.val().messege.msg,
              date: child.val().messege.date,
              // Type: child.val().messege.type,
              screen: child.val().messege.screen,
              // quote: child.val().messege.quote,
            });
            return undefined;
          });
          setMessages(msgs.reverse());

          // console.log('msssssssssssssggggggggggsssssssss', msgs);
        });
    } catch (error) {}
  };
  useEffect(() => {
    if (image) {
      setMessage(image);
    }
  }, [image]);
  useEffect(() => {
    _getMeesages();
    _updateChatCount();
  }, []);
  const _updateChatCount = async () => {
    try {
      database()
        .ref('users/' + userData.userdata.email.replace(/[^a-zA-Z0-9 ]/g, ''))
        .child(guestData.email.replace(/[^a-zA-Z0-9 ]/g, ''))
        .once('value', snapshot => {
          if (snapshot.val() != null) {
            database()
              .ref(
                'users/' +
                  userData.userdata.email.replace(/[^a-zA-Z0-9 ]/g, ''),
              )
              .child(guestData.email.replace(/[^a-zA-Z0-9 ]/g, ''))
              .update({
                counter: 0,
              });
          }
        });
    } catch (error) {}
  };
  const render = ({item, index}) => {
    console.log('item in chat', item);
    const check = word => {
      if (word.substring(word.length - 4) == '.jpg') {
        return true;
      }
    };
    return (
      <View
        style={{
          // backgroundColor: 'red',
          // height: 50,
          alignItems:
            item.sendBy == userData.userdata.email.replace(/[^a-zA-Z0-9 ]/g, '')
              ? 'flex-end'
              : 'flex-start',
          marginBottom: 10,
          marginTop: index == 0 ? 10 : 10,
        }}>
        {check(item.msg) == true ? (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('PostDetails', {item: item.screen})
            }>
            <Image
              source={{uri: item.msg}}
              style={{height: 200, width: 250, borderRadius: 5}}
            />
          </TouchableOpacity>
        ) : (
          <View
            style={{
              padding: 10,
              borderRadius: 5,
              maxWidth: '90%',
              // lineSpacing:1,

              backgroundColor:
                item.sendBy ==
                userData.userdata.email.replace(/[^a-zA-Z0-9 ]/g, '')
                  ? '#5F95F0'
                  : '#ccc',
            }}>
            <Text
              style={{
                lineHeight: 20,
                fontFamily: 'MontserratAlternates-Regular',
                color:
                  item.sendBy ==
                  userData.userdata.email.replace(/[^a-zA-Z0-9 ]/g, '')
                    ? 'white'
                    : 'black',
              }}>
              {item.msg}
            </Text>
            <View style={{alignItems: 'flex-end'}}>
              <Text
                style={{
                  fontSize: 10,
                  fontFamily: 'MontserratAlternates-Regular',
                  color:
                    item.sendBy ==
                    userData.userdata.email.replace(/[^a-zA-Z0-9 ]/g, '')
                      ? 'white'
                      : 'grey',
                }}>
                {moment(item.date).format('DD/MM/YYYY HH:MM')}
              </Text>
            </View>
          </View>
        )}
      </View>
    );
  };
  // console.log('messages', messages);
  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground
        style={{flex: 1}}
        source={require('../../../assets/Images/back.png')}>
        <Wrapper behavior="padding" style={{flex: 1}}>
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
                <Icon1 name="left" color="black" size={20} />
              </TouchableOpacity>
              <Image
                source={
                  item?.image
                    ? {uri: item?.image}
                    : require('../../../assets/Images/girl.jpg')
                }
                style={{
                  height: 40,
                  marginLeft: 20,
                  width: 40,
                  borderRadius: 20,
                }}
              />
              <View style={{marginLeft: 10}}>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: 'MontserratAlternates-SemiBold',
                    color: 'black',
                  }}>
                  {`${item?.firstname} ${item?.lastname}`}
                </Text>
                {/* <Text
                style={{
                  fontFamily: 'MontserratAlternates-Regular',
                  color: 'black',
                }}>
                online
              </Text> */}
              </View>
            </View>

            {/* <Image
            source={require('../../../assets/Images/search.png')}
            style={{height: 20, width: 20}}
          /> */}
          </View>
          <View style={{paddingHorizontal: 15, flex: 1}}>
            <FlatList
              inverted
              showsVerticalScrollIndicator={false}
              data={messages}
              renderItem={render}
              // style={{paddingVertical: 20}}
            />
          </View>
          <View
            style={{
              height: 70,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 15,
              backgroundColor: '#ccc',
              marginBottom:
                Platform.OS == 'android'
                  ? 0
                  : keyboardStatus == 'Keyboard Shown'
                  ? 20
                  : 0,
            }}>
            <Icon1 name="plus" size={20} color="grey" />
            <TextInput
              value={message}
              onChangeText={text => setMessage(text)}
              placeholder="Write your message here..."
              style={{
                backgroundColor: 'white',
                width: '80%',
                height: 50,
                paddingHorizontal: 10,
                color: 'black',
                fontFamily: 'MontserratAlternates-Regular',
                borderRadius: 30,
              }}
              placeholderTextColor={'grey'}
            />
            <TouchableOpacity
              onPress={() => handleSend()}
              style={{
                backgroundColor: '#5F95F0',
                borderRadius: 30,
                width: 35,
                height: 35,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Icon2 name="ios-send" size={15} color="white" />
            </TouchableOpacity>
          </View>
        </Wrapper>
      </ImageBackground>
    </SafeAreaView>
  );
};
export default SingleChat;
