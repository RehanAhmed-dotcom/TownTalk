import React, {useState} from 'react';

import {
  View,
  FlatList,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Text,
  ImageBackground,
} from 'react-native';
import {useSelector} from 'react-redux';
import Posts from '../../../Components/Posts';
import Group from '../../../Components/Group';
import {logoutuser} from '../../../redux/actions';
import MapView from 'react-native-maps';
import LikeDislike from '../../../Components/LikeDislike';
import Comments from '../../../Components/Comments';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Entypo';
import Icon1 from 'react-native-vector-icons/AntDesign';
import {useDispatch} from 'react-redux';
import Hotel from '../../../Components/Hotel';
const Profile = ({navigation}) => {
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);
  const [select, setSelect] = useState('Posts');
  const {userData} = useSelector(({USER}) => USER);
  const dispatch = useDispatch();
  const arr = ['fun', 'danger', 'helpful', 'adventure', 'hobby'];
  const render = ({item}) => (
    <View>{select == 'Groups' ? <Group /> : <Posts />}</View>
  );
  console.log('user', userData);
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
              onPress={() => {
                setLike(!like);
                setDislike(false);
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
                color={like ? '#5F95F0' : 'grey'}
              />
              <Text
                style={{
                  fontFamily: 'MontserratAlternates-Regular',
                  fontSize: 14,
                  color: 'black',
                  marginLeft: 5,
                }}>
                700K
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setDislike(!dislike);
                setLike(false);
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
                color={dislike ? '#5F95F0' : 'grey'}
              />
              <Text
                style={{
                  fontFamily: 'MontserratAlternates-Regular',
                  fontSize: 14,
                  color: 'black',
                  marginLeft: 5,
                }}>
                100K
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
            data={arr}
            renderItem={render}
          />
        </View>
        {/* <Text>abc</Text> */}
      </ImageBackground>
    </SafeAreaView>
  );
};
export default Profile;
