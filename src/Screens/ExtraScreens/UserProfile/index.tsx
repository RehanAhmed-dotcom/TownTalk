import React, {useState, useEffect} from 'react';
import {
  View,
  ImageBackground,
  Image,
  FlatList,
  TouchableOpacity,
  Text,
} from 'react-native';
import {likeDislikeProfile} from '../../../lib/api';
import Icons from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Entypo';
import {profile} from '../../../lib/api';
import Posts from '../../../Components/Posts';
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

  const [posts, setPosts] = useState([]);
  const {userData} = useSelector(({USER}) => USER);
  const [change, setChange] = useState(false);
  const render = ({item}) => (
    <View>
      {select == 'Groups' ? (
        <Group />
      ) : (
        <Posts
          item={item}
          onPress={() => {
            navigation.navigate('PostDetails', {item});
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
  useEffect(() => {
    profile({Auth: userData.token, id: item.user.id}).then(res => {
      console.log('resi', JSON.stringify(res));
      setPosts(res.data.posts);
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
            data={posts}
            renderItem={render}
          />
        </View>
      </ImageBackground>
    </View>
  );
};
export default UserProfile;
