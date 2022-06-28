import React, {useState, useCallback, useEffect} from 'react';

import {
  View,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Modal,
  Text,
  ImageBackground,
} from 'react-native';
import {profile} from '../../../lib/api';
import Icon1 from 'react-native-vector-icons/Entypo';
import Posts from '../../../Components/Posts';
import Group from '../../../Components/Group';
import {logoutuser} from '../../../redux/actions';
import database from '@react-native-firebase/database';
import Icon from 'react-native-vector-icons/Entypo';
import {useDispatch, useSelector} from 'react-redux';

const Profile = ({navigation}) => {
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);
  const [select, setSelect] = useState('Posts');
  const [posts, setPosts] = useState([]);
  const [change, setChange] = useState(false);
  const [data, setData] = useState({});
  const {userData} = useSelector(({USER}) => USER);
  const [showModal, setShowModal] = useState(false);
  const [specific, setSpecific] = useState({});
  const [list, setList] = useState([]);
  const dispatch = useDispatch();
  const alter = () => {
    console.log('alter called');
    setChange(!change);
  };
  const renders = ({item}) => (
    <View>
      {select == 'Groups' ? (
        <Group />
      ) : (
        <Posts
          item={item}
          onPress={() => {
            navigation.navigate('PostDetails', {item});
          }}
          onShare={() => {
            setSpecific(item);
            setShowModal(true);
          }}
          press={alter}
          navigation={navigation}
        />
      )}
    </View>
  );
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
          console.log('users', users);
          setList(users.reverse());
          // setLoading(false);

          // console.log("user list in chat list ", JSON.stringify(users))
        });
    } catch (error) {}
  }, []);
  const render = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        setShowModal(false);
        navigation.navigate('SingleChat', {
          item: item.user,
          image: specific.media[0].media,
          items: specific,
        });
      }}
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
            {`${item.user.firstname} ${item.user.lastname}`}
          </Text>
          {/* <Text
            style={{
              marginTop: 5,
              color: 'black',
              fontFamily: 'MontserratAlternates-Regular',
            }}>
            {/* {item.latestMessage} 
          </Text> */}
        </View>
      </View>
      <View style={{alignItems: 'center'}}>
        {/* {item.counter ? (
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
            <Text style={{color: 'white', fontSize: 12}}>{item.counter}</Text>
            <Text>{moment(item.timestamp).format('DD/MM/YYYY HH:MM')}</Text>
          </View>
        ) : (
          <Text style={{fontSize: 12}}>
            {moment(item.timestamp).format('DD/MM/YYYY HH:MM')}
          </Text>
        )} */}
        {/* <Text
          style={{
            color: 'black',
            fontFamily: 'MontserratAlternates-Regular',
            fontSize: 10,
          }}>
          {item.time}
        </Text> */}
      </View>
    </TouchableOpacity>
  );
  const MyModal = (show: boolean) => {
    //   console.log('show', show);
    return (
      <Modal animationType="slide" transparent={true} visible={show}>
        <View
          style={{
            flex: 1,
            // height: hp(100),
            backgroundColor: '#00000088',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 200,
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            // position: 'absolute',
          }}>
          <View
            style={{
              height: '60%',
              width: '90%',
              borderRadius: 10,
              backgroundColor: 'white',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                marginTop: 15,
                marginRight: 15,
              }}>
              <Icon1
                name="circle-with-cross"
                size={20}
                color="black"
                onPress={() => setShowModal(false)}
              />
            </View>
            <View style={{paddingHorizontal: 10}}>
              <FlatList data={list} renderItem={render} />
            </View>
          </View>
        </View>
      </Modal>
    );
  };
  useEffect(() => {
    _usersList();
    profile({Auth: userData.token, id: userData.userdata.id}).then(res => {
      console.log('res', JSON.stringify(res));
      setPosts(res.data);
    });
  }, [change]);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      profile({Auth: userData.token, id: userData.userdata.id}).then(res => {
        console.log('res', JSON.stringify(res));
        setPosts(res.data);
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
          <View style={{marginLeft: 0}}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'MontserratAlternates-SemiBold',
                color: 'black',
              }}>
              Profile
            </Text>
          </View>

          <Icon
            name="log-out"
            color={'black'}
            size={20}
            onPress={() => logoutuser(false)(dispatch)}
          />
        </View>
        <View
          style={{
            paddingHorizontal: 15,
            // backgroundColor: 'red',
            marginTop: 30,
            flex: 1,
          }}>
          <View style={{alignItems: 'center'}}>
            <Image
              source={
                userData.userdata.image
                  ? {uri: userData.userdata.image}
                  : require('../../../assets/Images/girl.jpg')
              }
              style={{height: 100, width: 100, borderRadius: 50}}
            />
            <Text
              style={{
                fontSize: 16,
                color: 'black',
                fontFamily: 'MontserratAlternates-SemiBold',
              }}>
              {userData.userdata.firstname} {userData.userdata.lastname}
            </Text>
            <Text
              style={{fontSize: 14, fontFamily: 'MontserratAlternates-Medium'}}>
              {/* {userData.userdata.} */}
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('EditProfile')}
              style={{
                position: 'absolute',
                // backgroundColor: 'blue',
                width: '100%',

                alignItems: 'flex-end',
                height: 100,
              }}>
              <Text
                style={{
                  color: '#5F95F0',
                  fontFamily: 'MontserratAlternates-Regular',
                  fontSize: 12,
                }}>
                Edit
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              // justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <TouchableOpacity
              activeOpacity={1}
              // onPress={() => {
              //   setLike(!like);
              //   setDislike(false);
              // }}
              style={{
                // flexDirection: 'column',
                alignItems: 'center',
                // backgroundColor: 'red',
                height: 30,
                justifyContent: 'center',
                flexDirection: 'row',
                width: '50%',
                borderRightWidth: 1,
                borderRightColor: 'grey',
              }}>
              <Icon
                name="thumbs-up"
                size={20}
                color={like ? '#5F95F0' : 'grey'}
              />
              <Text
                style={{
                  fontFamily: 'MontserratAlternates-Regular',
                  fontSize: 14,
                  color: 'black',
                  marginLeft: 5,
                }}>
                {posts.like_count ? posts.like_count : 0}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              // onPress={() => {
              //   setDislike(!dislike);
              //   setLike(false);
              // }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                // backgroundColor: 'red',
                height: 50,
                width: '50%',
              }}>
              <Icon
                name="thumbs-down"
                size={20}
                color={dislike ? '#5F95F0' : 'grey'}
              />
              <Text
                style={{
                  fontFamily: 'MontserratAlternates-Regular',
                  fontSize: 14,
                  color: 'black',
                  marginLeft: 5,
                }}>
                {posts.dislike_count ? posts.dislike_count : 0}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              // backgroundColor: 'blue',
              width: '100%',
            }}>
            <TouchableOpacity
              onPress={() => setSelect('Posts')}
              style={{
                // backgroundColor: 'red',
                // height: 40,
                alignItems: 'center',
                borderBottomColor: '#5F95F0',
                borderBottomWidth: select == 'Posts' ? 1 : 0,
                paddingBottom: 10,
                justifyContent: 'center',
                width: '33%',
              }}>
              <Text
                style={{
                  color: select == 'Posts' ? '#5F95F0' : 'grey',
                  fontSize: 14,
                  fontFamily:
                    select == 'Posts'
                      ? 'MontserratAlternates-SemiBold'
                      : 'MontserratAlternates-Regular',
                }}>
                Posts
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setSelect('Groups')}
              style={{
                // backgroundColor: 'green',
                // height: 40,
                borderBottomColor: '#5F95F0',
                borderBottomWidth: select == 'Groups' ? 1 : 0,
                paddingBottom: 10,
                alignItems: 'center',
                justifyContent: 'center',
                width: '33%',
              }}>
              <Text
                style={{
                  color: select == 'Groups' ? '#5F95F0' : 'grey',
                  fontSize: 14,
                  fontFamily:
                    select == 'Groups'
                      ? 'MontserratAlternates-SemiBold'
                      : 'MontserratAlternates-Regular',
                }}>
                Groups
              </Text>
            </TouchableOpacity>
          </View>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={posts.posts}
            renderItem={renders}
          />
        </View>
        {/* <Text>abc</Text> */}
      </ImageBackground>
      {MyModal(showModal)}
    </SafeAreaView>
  );
};
export default Profile;
