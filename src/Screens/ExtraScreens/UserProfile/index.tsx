import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  ImageBackground,
  Image,
  FlatList,
  Modal,
  TouchableOpacity,
  Text,
} from 'react-native';
import Icon1 from 'react-native-vector-icons/Entypo';
import {likeDislikeProfile, profile} from '../../../lib/api';
import Icons from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Entypo';
// import {} from '../../../lib/api';
import Posts from '../../../Components/Posts';
import Group from '../../../Components/Group';
import database from '@react-native-firebase/database';
const UserProfile = ({navigation, route}: {navigation: any; route: any}) => {
  const [profileObject, setProfileObject] = useState({});
  const [like, setLike] = useState(
    profileObject.is_like == true ? true : false,
  );
  const {item} = route.params;
  const [dislike, setDislike] = useState(
    profileObject.is_like == false ? true : false,
  );
  const [select, setSelect] = useState('Posts');
  const [specific, setSpecific] = useState({});
  const [posts, setPosts] = useState([]);
  const {userData} = useSelector(({USER}) => USER);
  const [list, setList] = useState([]);
  const [change, setChange] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const renders = ({item}) => (
    <View>
      {select == 'Groups' ? (
        <Group
          item={item}
          onPress={() => {
            navigation.navigate('GroupDetails', {item});
          }}
          page={'profile'}
        />
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
  const alter = () => {
    console.log('alter called');
    setChange(!change);
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
    profile({Auth: userData.token, id: item.user.id}).then(res => {
      console.log('resi of profile', JSON.stringify(res));
      setPosts(res.data);
      setProfileObject(res.data);
    });
  }, [change]);
  return (
    <View style={{flex: 1}}>
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
            // justifyContent: 'space-between',
          }}>
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
            User Details
          </Text>
          {/* <Text style={{fontFamily: 'MontserratAlternates-Regular'}}>
              Chicago, IL 60611, USA
            </Text> */}
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
                item.user.image
                  ? {uri: item.user.image}
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
              {item.user.firstname} {item.user.lastname}
            </Text>
            <Text
              style={{fontSize: 14, fontFamily: 'MontserratAlternates-Medium'}}>
              {/* {userData.userdata.} */}
            </Text>
            {userData.userdata.id != item.user.id && (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('SingleChat', {item: item.user})
                }
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
                  Chat
                </Text>
              </TouchableOpacity>
            )}
          </View>
          <View
            style={{
              flexDirection: 'row',
              // justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <TouchableOpacity
              activeOpacity={userData.userdata.id != item.user.id ? 0 : 1}
              onPress={() => {
                userData.userdata.id != item.user.id &&
                  likeDislikeProfile({
                    Auth: userData.token,
                    profile_id: item.user.id,
                    is_like: 1,
                  }).then(res => {
                    alter();
                  });

                // setLike(!like);
                // setDislike(false);
              }}
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
                color={profileObject.is_like == true ? '#5F95F0' : 'grey'}
              />
              <Text
                style={{
                  fontFamily: 'MontserratAlternates-Regular',
                  fontSize: 14,
                  color: 'black',
                  marginLeft: 5,
                }}>
                {profileObject.like_count ? profileObject.like_count : 0}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={userData.userdata.id != item.user.id ? 0 : 1}
              onPress={() => {
                userData.userdata.id != item.user.id &&
                  likeDislikeProfile({
                    Auth: userData.token,
                    profile_id: item.user.id,
                    is_like: 0,
                  })
                    .then(res => {
                      console.log('res', res);
                      alter();
                    })
                    .catch(err => {
                      console.log('err', err);
                    });
              }}
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
                color={profileObject.is_like == false ? '#5F95F0' : 'grey'}
              />
              <Text
                style={{
                  fontFamily: 'MontserratAlternates-Regular',
                  fontSize: 14,
                  color: 'black',
                  marginLeft: 5,
                }}>
                {profileObject.dislike_count ? profileObject.dislike_count : 0}
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
            data={select == 'Posts' ? posts.posts : posts.groups}
            renderItem={renders}
          />
        </View>
      </ImageBackground>
      {MyModal(showModal)}
    </View>
  );
};
export default UserProfile;
