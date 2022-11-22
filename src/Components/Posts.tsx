import React, {useState} from 'react';

import {
  View,
  FlatList,
  ScrollView,
  Alert,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import LikeDislike from './LikeDislike';
import Swiper from 'react-native-swiper';
import moment from 'moment';
import MentionHashtagTextView from 'react-native-mention-hashtag-text';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/Entypo';
import Icon1 from 'react-native-vector-icons/EvilIcons';
const Posts = props => {
  const {
    item,
    navigation,
    onShare,
    blockuser,
    onPress,
    hashPress,
    handleReport,
    press,
  } = props;
  const {userData} = useSelector(({USER}) => USER);
  const [show, setShow] = useState(false);
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      style={{
        // height: 30,
        backgroundColor: 'white',
        marginRight: 3,
        elevation: 3,
        zIndex: -110,
        // alignItems: 'center',
        // justifyContent: 'center',
        // minWidth: 100,
        marginLeft: 3,
        marginVertical: 3,
        marginTop: 10,
        padding: 12,
        borderRadius: 5,
      }}>
      <TouchableOpacity
        onPress={() => navigation.navigate('UserProfile', {item})}
        style={{
          // marginTop: 5,
          flexDirection: 'row',
          alignItems: 'center',
          // backgroundColor: 'red',
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={
              item?.user?.image
                ? {uri: item?.user?.image}
                : require('../assets/Images/girl.jpg')
            }
            style={{width: 50, height: 50, borderRadius: 50}}
          />
          <View style={{marginLeft: 10}}>
            <Text
              style={{
                fontFamily: 'MontserratAlternates-SemiBold',
                fontSize: 16,
                color: 'black',
              }}>
              {`${item?.user?.firstname}`}
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontFamily: 'MontserratAlternates-Regular',
                marginTop: 5,
                color: 'grey',
              }}>
              {/* {item.test} */}
              {/* // {d.toLocaleTimeString() } */}
              {item?.created_at}
              {/* {moment(item?.created_at).format('DD MMMM YYYY HH:MM a')} */}
            </Text>
          </View>
        </View>

        <Icon2
          name="dots-three-vertical"
          size={20}
          color={'black'}
          style={{bottom: 10}}
          onPress={() => setShow(!show)}
        />
        {show && (
          <View
            // onPress={() => Alert.alert('hello')}
            style={{
              position: 'absolute',
              height: 100,
              zIndex: 3,
              width: 100,
              // backgroundColor: 'red',
              borderRadius: 10,
              right: 0,
              top: 30,
            }}>
            <TouchableOpacity
              onPress={() => {
                setShow(!show);
              }}
              style={{
                height: 40,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                borderBottomLeftRadius:
                  item.user.id == userData.userdata.id ? 10 : 0,
                borderBottomRightRadius:
                  item.user.id == userData.userdata.id ? 10 : 0,
                justifyContent: 'center',
                borderBottomWidth: item.user.id == userData.userdata.id ? 0 : 1,
                borderBottomColor: 'grey',

                paddingLeft: 10,
                backgroundColor: '#ccc',
                // elevation: 1,
              }}>
              <Text>Share Post</Text>
            </TouchableOpacity>
            {item.user.id != userData.userdata.id && (
              <TouchableOpacity
                onPress={() => {
                  setShow(!show);
                  handleReport(item.id);
                  blockuser(item.user.id);
                }}
                // onPress={() =>}
                style={{
                  height: 40,
                  borderBottomLeftRadius: 10,
                  borderBottomRightRadius: 10,
                  justifyContent: 'center',
                  paddingLeft: 10,
                  backgroundColor: '#ccc',
                  // elevation: 1,
                }}>
                <Text>Report Post</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </TouchableOpacity>

      <View style={{marginTop: 10}}>
        {/* <Text
          style={{
            fontSize: 13,
            color: 'black',
            fontFamily: 'MontserratAlternates-Regular',
          }}>
          {item?.description}
        </Text> */}

        {/* {item?.media.length > 0 && (
          <View style={{width: '100%', marginTop: 10, height: 350}}>
            <Swiper
              loadMinimal={true}
              showsPagination={true}
              key={item?.media.length}
              paginationStyle={{bottom: 10}}
              activeDotColor="#5F95F0"
              loop={true}
              style={{
                alignItems: 'center',
                zIndex: 40,
                justifyContent: 'center',
              }}
              showsButtons={false}>
              {item?.media.map(item => (
                //   <View style={{width: '100%', marginTop: 10, height: 150}}>
                <Image
                  source={{uri: item.media}}
                  style={{
                    height: undefined,
                    aspectRatio: 1,
                    borderRadius: 10,
                    width: '100%',
                    marginTop: 10,
                  }}
                />
                //   </View>
              ))}
            </Swiper>
          </View>
        )} */}
        {item?.media[0]?.media && (
          <Image
            source={
              item?.media[0]?.media
                ? {uri: item?.media[0]?.media}
                : require('../assets/Images/social.jpg')
            }
            resizeMode="cover"
            style={{
              height: undefined,
              aspectRatio: 1,
              zIndex: -11,
              borderRadius: 10,
              width: '100%',
              marginTop: 10,
            }}
          />
        )}
        <View style={{marginTop: 10}}>
          <MentionHashtagTextView
            numberOfLines={5}
            mentionHashtagPress={hashPress}
            mentionHashtagColor={'#5F95F0'}
            style={{
              fontSize: 13,
              color: 'black',
              fontFamily: 'MontserratAlternates-Regular',
            }}>
            {item?.description}
          </MentionHashtagTextView>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 10,
          // backgroundColor: 'red',
        }}>
        <View
          style={{
            flexDirection: 'row',
            // backgroundColor: 'red',
            alignItems: 'center',
          }}>
          <LikeDislike item={item} press={press} />
          <TouchableOpacity
            onPress={() => navigation.navigate('Comments', {id: item.id})}
            // onPress={() => {
            //   setLike(!like);
            //   setDislike(false);
            // }}
            style={{
              flexDirection: 'row',
              marginLeft: 0,
              // backgroundColor: 'red',
              // height: '100%',
              // height: 20,
              width: 35,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {/* <Image
                source={require('../assets/Images/comment.png')}
                style={{height: 10, width: 10}}
              /> */}
            <Icon1 name="comment" size={25} color="black" />

            <Text
              style={{
                fontFamily: 'MontserratAlternates-Regular',
                // marginLeft: 5,
                color: 'black',
                fontSize: 13,
              }}>
              {item.comment_count}
            </Text>
          </TouchableOpacity>
        </View>

        {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => {
              setLike(!like);
              setDislike(false);
              // press();
              likeDislike({
                Auth: userData.token,
                creator_id: item?.user?.id,
                post_id: item?.id,
                is_like: 1,
              })
                .then(res => {
                  console.log('res', res);
                  press();
                })
                .catch(err => {
                  console.log('err', err);
                });
            }}
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon
              name="thumbs-up"
              size={20}
              color={like ? '#5F95F0' : 'grey'}
            />
            <Text
              style={{
                fontFamily: 'MontserratAlternates-Regular',
                fontSize: 13,
                marginLeft: 5,
                color: 'black',
              }}>
              {likecount}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setDislike(!dislike);
              setLike(false);
              press();
              likeDislike({
                Auth: userData.token,
                creator_id: item?.user?.id,
                post_id: item?.id,
                is_like: 0,
              })
                .then(res => {
                  console.log('res', res);
                })
                .catch(err => {
                  console.log('err', err);
                });
            }}
            style={{
              flexDirection: 'row',
              marginLeft: 10,
              alignItems: 'center',
            }}>
            <Icon
              name="thumbs-down"
              size={20}
              color={dislike ? '#5F95F0' : 'grey'}
            />
            <Text
              style={{
                fontFamily: 'MontserratAlternates-Regular',
                fontSize: 13,
                marginLeft: 5,
                color: 'black',
              }}>
              {dislikecount}
            </Text>
          </TouchableOpacity>
        </View> */}
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => {
              onShare();
            }}
            //   setLike(!like);
            //   setDislike(false);
            // }}
            style={{
              flexDirection: 'row',
              width: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {/* <Image
              source={require('../assets/Images/share.png')}
              style={{height: 10, width: 10}}
            /> */}
            <Icon name="send" size={16} color={'black'} />
            {/* <Text
              style={{
                fontFamily: 'MontserratAlternates-Regular',
                marginLeft: 5,
                fontSize: 13,
                color: 'black',
              }}>
              Share
            </Text> */}
          </TouchableOpacity>
        </View>
      </View>
      {item?.comment_count > 0 && (
        <TouchableOpacity
          onPress={() => navigation.navigate('Comments', {id: item.id})}
          style={{marginTop: 10}}>
          <Text
            style={{
              fontSize: 13,
              color: 'black',
              fontFamily: 'MontserratAlternates-Regular',
            }}>
            View all{' '}
            <Text
              style={{
                fontSize: 14,
                color: 'black',
                fontFamily: 'MontserratAlternates-Bold',
              }}>
              {item?.comment_count}
            </Text>{' '}
            comments
          </Text>
        </TouchableOpacity>
      )}
      {item?.recentcomments && (
        <TouchableOpacity style={{marginTop: 10}}>
          <Text
            style={{
              fontSize: 13,
              color: 'black',
              fontFamily: 'MontserratAlternates-Regular',
            }}>
            <Text
              style={{
                fontSize: 14,
                color: 'black',
                fontFamily: 'MontserratAlternates-Bold',
              }}>
              {item?.recentcomments?.user.firstname}
            </Text>{' '}
            {item?.recentcomments?.comment}
          </Text>
        </TouchableOpacity>
      )}

      {/* <Text style={{color: '#5F95F0', fontWeight: 'bold'}}>#{item}</Text> */}
    </TouchableOpacity>
  );
};

export default Posts;
