import React, {useState, useCallback, useEffect} from 'react';

import {
  View,
  FlatList,
  TextInput,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Text,
  ImageBackground,
} from 'react-native';
import {useSelector} from 'react-redux';
import moment from 'moment';
import {blockUserList} from '../../../lib/api';
import database from '@react-native-firebase/database';
const Chat = ({navigation}) => {
  const [name, setName] = useState('Olivia Benson');
  const [zip, setZip] = useState('');
  const [list, setList] = useState([]);
  const [block, setBlock] = useState([]);
  const [fb, setFb] = useState(false);
  const [db, setDb] = useState(false);
  const {userData} = useSelector(({USER}) => USER);
  const ary = [
    {
      image: require('../../../assets/Images/girl.jpg'),
      name: 'Olivia Benson',
      mesg: 'Shall we meet today',
      time: '5:45 PM',
      unread: '1',
    },
    {
      image: require('../../../assets/Images/girl.jpg'),
      name: 'Olivia Benson',
      mesg: 'Shall we meet today',
      time: '5:45 PM',
      unread: '1',
    },
    {
      image: require('../../../assets/Images/girl.jpg'),
      name: 'Olivia Benson',
      mesg: 'Shall we meet today',
      time: '5:45 PM',
      unread: '1',
    },
    {
      image: require('../../../assets/Images/girl.jpg'),
      name: 'Olivia Benson',
      mesg: 'Shall we meet today',
      time: '5:45 PM',
      unread: '1',
    },
    {
      image: require('../../../assets/Images/girl.jpg'),
      name: 'Olivia Benson',
      mesg: 'Shall we meet today',
      time: '5:45 PM',
      unread: '1',
    },
  ];
  useEffect(() => {
    console.log('only one ready');
    if (fb && db) {
      console.log('clients ready');
      // const toRemove = [1, 2];
      // const myArray = [1, 2, 3, 5];

      // const rray = myArray.filter(function (el) {
      //   return toRemove.indexOf(el) < 0;
      // });
      console.log('fb arry', list);
      console.log('block list', block);
      var myArray = list;
      var toRemove = block;

      for (var i = myArray.length - 1; i >= 0; i--) {
        for (var j = 0; j < toRemove.length; j++) {
          if (myArray[i] && myArray[i].user.email === toRemove[j].email) {
            myArray.splice(i, 1);
          }
        }
      }
      console.log('array', myArray);
      // alert(JSON.stringify(myArray));
    } else if (fb) {
      console.log('firebase ready');
    } else if (db) {
      console.log('database ready');
    }
  }, [fb, db]);
  // console.log('list', list);
  const render = ({item}) => {
    const check = word => {
      if (word.substring(word.length - 4) == '.jpg') {
        return true;
      }
    };
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('SingleChat', {item: item.user})}
        style={{
          flexDirection: 'row',
          marginTop: 20,
          justifyContent: 'space-between',
          borderBottomWidth: 1,
          alignItems: 'center',
          paddingBottom: 20,
          borderBottomColor: '#ccc',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={
              item.user.image
                ? {uri: item.user.image}
                : require('../../../assets/Images/girl.jpg')
            }
            style={{height: 50, width: 50, borderRadius: 30}}
          />
          <View style={{marginLeft: 10}}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'MontserratAlternates-SemiBold',
                color: item.unread ? 'black' : 'black',
              }}>
              {`${item.user.firstname}`}
            </Text>
            {check(item.latestMessage) == true ? (
              <Text
                style={{
                  marginTop: 5,
                  color: 'black',
                  fontFamily: 'MontserratAlternates-Regular',
                }}>
                Image
              </Text>
            ) : (
              <Text
                style={{
                  marginTop: 5,
                  color: 'black',
                  fontFamily: 'MontserratAlternates-Regular',
                }}>
                {item.latestMessage.slice(0, 23)}
              </Text>
            )}
          </View>
        </View>
        <View style={{alignItems: 'center'}}>
          {item.counter ? (
            <>
              <View
                style={{
                  backgroundColor: '#5F95F0',
                  height: 20,
                  width: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 30,
                  marginBottom: 5,
                }}>
                <Text style={{color: 'white', fontSize: 12}}>
                  {item.counter}
                </Text>
                {/* <Text>{moment(item.timestamp).format('DD/MM/YYYY HH:MM')}</Text> */}
              </View>
              <Text style={{color: 'grey'}}>
                {moment(item.timestamp).format('DD/MM/YYYY HH:MM')}
              </Text>
            </>
          ) : (
            <Text style={{fontSize: 12}}>
              {moment(item.timestamp).format('DD/MM/YYYY HH:MM')}
            </Text>
          )}
          <Text
            style={{
              color: 'black',
              fontFamily: 'MontserratAlternates-Regular',
              fontSize: 10,
            }}>
            {item.time}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  const blockUser = () => {
    blockUserList({Auth: userData.token}).then(res => {
      // console.log('res', res);
      setBlock(res.data);
      setDb(!db);
      console.log('block done');
    });
  };
  const _usersList = useCallback(async () => {
    try {
      // setLoading(true);
      database()
        .ref('users/' + userData.userdata.email.replace(/[^a-zA-Z0-9 ]/g, ''))
        .orderByChild('timestamp')
        .on('value', dataSnapshot => {
          let users = [];
          dataSnapshot.forEach(child => {
            users.push(child.val());
          });
          // console.log('users', users);
          blockUserList({Auth: userData.token}).then(res => {
            // console.log('res', res);
            var myArray = users;
            var toRemove = res.data;
            for (var i = myArray.length - 1; i >= 0; i--) {
              for (var j = 0; j < toRemove.length; j++) {
                if (myArray[i] && myArray[i].user.email === toRemove[j].email) {
                  myArray.splice(i, 1);
                }
              }
            }
            setList(myArray.reverse());
            // setBlock(res.data);
            // setDb(!db);
            // console.log('block done');
          });
          // setList(users.reverse());
          setFb(!fb);
          // setLoading(false);
          console.log('firebase done');
          // console.log("user list in chat list ", JSON.stringify(users))
        });
    } catch (error) {}
  }, []);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      _usersList();
      blockUser();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);
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
          {/* <TouchableOpacity>
            <Icon1 name="left" size={20} />
          </TouchableOpacity> */}
          <View style={{marginLeft: 10}}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'MontserratAlternates-SemiBold',
                color: 'black',
              }}>
              Inbox
            </Text>
            {/* <Text style={{fontFamily: 'MontserratAlternates-Regular'}}>
              Chicago, IL 60611, USA
            </Text> */}
          </View>
          {/* <Image
            source={require('../../../assets/Images/search.png')}
            style={{height: 20, width: 20}}
          /> */}
        </View>
        <View style={{paddingHorizontal: 15}}>
          <FlatList data={list} renderItem={render} />
        </View>
        {/* <ScrollView>
          <Image
            source={require('../../../assets/Images/restaurants.jpg')}
            style={{height: 200, width: '100%'}}
          />
          <View
            style={{
              marginTop: 0,
              backgroundColor: 'white',
              elevation: 3,
              paddingHorizontal: 10,
              borderRadius: 5,
              marginHorizontal: 15,
            }}>
            <View style={{width: '100%', marginTop: 10, alignItems: 'center'}}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: 'MontserratAlternates-SemiBold',
                  color: '#5F95F0',
                }}>
                Pearl Continental
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: 'MontserratAlternates-SemiBold',
                  color: '#5F95F0',
                }}>
                Hotel Rawalpindi
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 20,
              }}>
              <View>
                <Text
                  style={{
                    fontSize: 13,
                    fontFamily: 'MontserratAlternates-Medium',
                  }}>
                  PKR 4500
                </Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Icon
                    name="star"
                    size={10}
                    color="#5F95F0"
                    style={{marginLeft: 1}}
                  />
                  <Icon
                    name="star"
                    size={10}
                    color="#5F95F0"
                    style={{marginLeft: 1}}
                  />
                  <Icon
                    name="star"
                    size={10}
                    color="#5F95F0"
                    style={{marginLeft: 1}}
                  />
                  <Icon
                    name="star"
                    size={10}
                    color="#5F95F0"
                    style={{marginLeft: 1}}
                  />
                  <Icon
                    name="star"
                    size={10}
                    color="#5F95F0"
                    style={{opacity: 0.5, marginLeft: 1}}
                  />
                </View>
              </View>
            </View>
            <View style={{width: '100%', marginTop: 10, alignItems: 'center'}}>
              <TouchableOpacity
                style={{
                  width: 200,
                  height: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#5F95F0',
                  marginTop: 10,
                  borderRadius: 5,
                }}>
                <Text
                  style={{
                    fontSize: 10,
                    color: 'white',
                    fontFamily: 'MontserratAlternates-SemiBold',
                  }}>
                  View Deal
                </Text>
              </TouchableOpacity>
            </View>
            <Text
              style={{
                fontSize: 16,
                marginTop: 10,
                fontFamily: 'MontserratAlternates-Regular',
              }}>
              About
            </Text>
            <Text
              style={{
                fontSize: 12,
                marginTop: 10,
                fontFamily: 'MontserratAlternates-Regular',
              }}>
              Pearl Continental Hotels & Resorts is the largest chain of
              five-star hotels in Pakistan with properties in Karachi, Lahore,
              Rawalpindi, Peshawar, Gawadar, Bhurban, Muzaffarabad and Malam
              Jabba
            </Text>
            <Text
              style={{
                fontSize: 16,
                marginTop: 10,
                fontFamily: 'MontserratAlternates-Regular',
              }}>
              Amneties
            </Text>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                alignItems: 'center',
              }}>
              <Image
                resizeMode="contain"
                source={require('../../../assets/Images/drink.png')}
                style={{width: 15, height: 15}}
              />
              <Text
                style={{
                  fontSize: 12,
                  marginLeft: 10,
                  fontFamily: 'MontserratAlternates-Regular',
                }}>
                Food & Drinks
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                alignItems: 'center',
              }}>
              <Image
                resizeMode="contain"
                source={require('../../../assets/Images/family.png')}
                style={{width: 15, height: 15}}
              />
              <Text
                style={{
                  fontSize: 12,
                  marginLeft: 10,
                  fontFamily: 'MontserratAlternates-Regular',
                }}>
                Family
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                alignItems: 'center',
              }}>
              <Image
                resizeMode="contain"
                source={require('../../../assets/Images/clean.png')}
                style={{width: 15, height: 15}}
              />
              <Text
                style={{
                  fontSize: 12,
                  marginLeft: 10,
                  fontFamily: 'MontserratAlternates-Regular',
                }}>
                Cleaning Services
              </Text>
            </View>
            <View style={{height: 30}} />
          </View>
          <View style={{marginTop: 20, paddingHorizontal: 15}}>
            <Text style={{fontFamily: 'MontserratAlternates-SemiBold'}}>
              Restaurants address
            </Text>
            <Text
              style={{
                marginTop: 10,
                fontFamily: 'MontserratAlternates-Regular',
              }}>
              Sadar Rawalpindi, Pakistan
            </Text>
            <View
              style={{
                height: 200,
                marginBottom: 10,
                marginTop: 20,
                borderRadius: 10,
              }}>
              <MapView
                style={{flex: 1, borderRadius: 10}}
                initialRegion={{
                  latitude: 37.78825,
                  longitude: -122.4324,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
              />
            </View>
          </View>
        </ScrollView> */}
      </ImageBackground>
    </SafeAreaView>
  );
};
export default Chat;
