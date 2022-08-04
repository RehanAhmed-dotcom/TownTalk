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
  ImageBackground,
} from 'react-native';
import {getNotification} from '../../../lib/api';
import {useSelector} from 'react-redux';
const Notification = ({navigation}) => {
  const [notification, setNotification] = useState([]);
  const {userData} = useSelector(({USER}) => USER);
  const render = ({item, index}) => (
    <TouchableOpacity
      onPress={() => {
        item.type == 'post_like'
          ? navigation.navigate('PostDetails', {item: item.post})
          : item.type == 'post_dislike'
          ? navigation.navigate('PostDetails', {item: item.post})
          : console.log('hello');
      }}
      style={{
        flexDirection: 'row',
        marginTop: index == 0 ? 30 : 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingBottom: 20,
        justifyContent: 'space-between',
      }}>
      {item.type == 'post_like' ? (
        <>
          <Image
            source={
              item.user_data.image
                ? {uri: item.user_data.image}
                : require('../../../assets/Images/girl.jpg')
            }
            style={{height: 40, width: 40, borderRadius: 30}}
          />
          <View style={{width: '70%'}}>
            <Text
              style={{
                fontSize: 14,
                color: 'black',
                fontFamily: 'MontserratAlternates-SemiBold',
              }}>
              {item.user_data.firstname} {item.user_data.lastname}
              <Text style={{fontFamily: 'MontserratAlternates-Regular'}}>
                {' '}
                liked your post
              </Text>
            </Text>
            {/* <Text style={{color: 'grey', fontSize: 12, marginTop: 5}}>
              Commented on your post
            </Text> */}
            {/* <Text style={{color: 'black', marginTop: 5}}>
          "I am interested in taking you to see my place. Contact me at
          +92-333-XXXXXXX"
        </Text> */}
          </View>
          <Text
            style={{
              fontSize: 10,
              color: 'black',
              fontFamily: 'MontserratAlternates-Regular',
            }}>
            {item.time}
          </Text>
        </>
      ) : item.type == 'post_dislike' ? (
        <>
          <Image
            source={
              item.user_data.image
                ? {uri: item.user_data.image}
                : require('../../../assets/Images/girl.jpg')
            }
            style={{height: 40, width: 40, borderRadius: 30}}
          />
          <View style={{width: '70%'}}>
            <Text
              style={{
                fontSize: 14,
                color: 'black',
                fontFamily: 'MontserratAlternates-SemiBold',
              }}>
              {item.user_data.firstname} {item.user_data.lastname}
              <Text style={{fontFamily: 'MontserratAlternates-Regular'}}>
                {' '}
                disliked your post
              </Text>
            </Text>
            {/* <Text style={{color: 'grey', fontSize: 12, marginTop: 5}}>
              Commented on your post
            </Text> */}
            {/* <Text style={{color: 'black', marginTop: 5}}>
          "I am interested in taking you to see my place. Contact me at
          +92-333-XXXXXXX"
        </Text> */}
          </View>
          <Text
            style={{
              fontSize: 10,
              color: 'black',
              fontFamily: 'MontserratAlternates-Regular',
            }}>
            {item.time}
          </Text>
        </>
      ) : item.type == 'profile_dislike' ? (
        <>
          <Image
            source={
              item.user_data.image
                ? {uri: item.user_data.image}
                : require('../../../assets/Images/girl.jpg')
            }
            style={{height: 40, width: 40, borderRadius: 30}}
          />
          <View style={{width: '70%'}}>
            <Text
              style={{
                fontSize: 14,
                color: 'black',
                fontFamily: 'MontserratAlternates-SemiBold',
              }}>
              {item.user_data.firstname} {item.user_data.lastname}
              <Text style={{fontFamily: 'MontserratAlternates-Regular'}}>
                {' '}
                disliked your profile
              </Text>
            </Text>
            {/* <Text style={{color: 'grey', fontSize: 12, marginTop: 5}}>
              Commented on your post
            </Text> */}
            {/* <Text style={{color: 'black', marginTop: 5}}>
          "I am interested in taking you to see my place. Contact me at
          +92-333-XXXXXXX"
        </Text> */}
          </View>
          <Text
            style={{
              fontSize: 10,
              color: 'black',
              fontFamily: 'MontserratAlternates-Regular',
            }}>
            {item.time}
          </Text>
        </>
      ) : item.type == 'profile_like' ? (
        <>
          <Image
            source={
              item.user_data.image
                ? {uri: item.user_data.image}
                : require('../../../assets/Images/girl.jpg')
            }
            style={{height: 40, width: 40, borderRadius: 30}}
          />
          <View style={{width: '70%'}}>
            <Text
              style={{
                fontSize: 14,
                color: 'black',
                fontFamily: 'MontserratAlternates-SemiBold',
              }}>
              {item.user_data.firstname} {item.user_data.lastname}
              <Text style={{fontFamily: 'MontserratAlternates-Regular'}}>
                {' '}
                liked your profile
              </Text>
            </Text>
            {/* <Text style={{color: 'grey', fontSize: 12, marginTop: 5}}>
              Commented on your post
            </Text> */}
            {/* <Text style={{color: 'black', marginTop: 5}}>
          "I am interested in taking you to see my place. Contact me at
          +92-333-XXXXXXX"
        </Text> */}
          </View>
          <Text
            style={{
              fontSize: 10,
              color: 'black',
              fontFamily: 'MontserratAlternates-Regular',
            }}>
            {item.time}
          </Text>
        </>
      ) : (
        <>
          <Image
            source={require('../../../assets/Images/girl.jpg')}
            style={{height: 40, width: 40, borderRadius: 30}}
          />
          <View style={{width: '70%'}}>
            <Text
              style={{
                fontSize: 14,
                color: 'black',
                fontFamily: 'MontserratAlternates-SemiBold',
              }}>
              {item.name}
            </Text>
            <Text
              style={{
                color: 'grey',
                fontSize: 12,
                fontFamily: 'MontserratAlternates-Medium',
                marginTop: 5,
              }}>
              Commented on your post
            </Text>
            <Text
              style={{
                color: 'black',
                fontFamily: 'MontserratAlternates-Regular',
                marginTop: 5,
              }}>
              "I am interested in taking you to see my place. Contact me at
              +92-333-XXXXXXX"
            </Text>
          </View>
          <Text
            style={{
              fontFamily: 'MontserratAlternates-Regular',
              color: 'black',
              fontSize: 10,
            }}>
            {item.time}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getNotification({Auth: userData.token}).then(res => {
        // console.log('res of notifications', res);
        setNotification(res.data.reverse());
      });
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
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{marginLeft: 10}}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: 'MontserratAlternates-SemiBold',
                  color: 'black',
                }}>
                Notification
              </Text>
            </View>
          </View>
        </View>
        <View style={{paddingHorizontal: 15, flex: 1}}>
          <FlatList data={notification} renderItem={render} />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};
export default Notification;
