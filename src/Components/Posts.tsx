import React, {useState} from 'react';

import {
  View,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import LikeDislike from './LikeDislike';

import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Entypo';
import Icon1 from 'react-native-vector-icons/FontAwesome';
const Posts = props => {
  const {item, navigation, onShare, onPress, press} = props;
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
              {`${item?.user?.firstname} ${item?.user?.lastname}`}
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontFamily: 'MontserratAlternates-Regular',
                marginTop: 5,
              }}>
              {item?.created_at}
            </Text>
          </View>
        </View>
        {/* <Icon
          name="dots-three-horizontal"
          size={20}
          color={'black'}
          style={{bottom: 10}}
        /> */}
      </TouchableOpacity>
      <View
        style={{
          marginTop: 10,
          width: '100%',
          // flexDirection: 'row',
          // alignItems: 'center',
          // backgroundColor: 'red',
          overflow: 'hidden',
        }}>
        <Text
          style={{
            marginRight: 5,
            fontSize: 13,
            fontFamily: 'MontserratAlternates-Medium',
            color: '#5F95F0',
          }}>
          {item?.hashtag}
        </Text>
        {/* <FlatList horizontal data={arr} renderItem={renderItem3} /> */}
        {/* {arr.map(item => (
        <View>
          <Text
            style={{
              marginRight: 5,
              fontSize: 13,
              fontFamily: 'MontserratAlternates-Medium',
              color: '#5F95F0',
            }}>
            #{item}
          </Text>
        </View>
      ))} */}
      </View>
      <View style={{marginTop: 10}}>
        <Text
          style={{
            fontSize: 13,
            color: 'black',
            fontFamily: 'MontserratAlternates-Regular',
          }}>
          {item?.description}
        </Text>

        <Image
          source={
            item?.media[0]?.media
              ? {uri: item?.media[0]?.media}
              : require('../assets/Images/social.jpg')
          }
          style={{height: 150, borderRadius: 10, width: '100%', marginTop: 10}}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 10,
        }}>
        <LikeDislike item={item} press={press} />
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
            style={{flexDirection: 'row', alignItems: 'center'}}>
            {/* <Image
              source={require('../assets/Images/share.png')}
              style={{height: 10, width: 10}}
            /> */}
            <Icon name="share" size={16} color={'black'} />
            <Text
              style={{
                fontFamily: 'MontserratAlternates-Regular',
                marginLeft: 5,
                fontSize: 13,
                color: 'black',
              }}>
              Share
            </Text>
          </TouchableOpacity>
          {!show && (
            <TouchableOpacity
              onPress={() => navigation.navigate('Comments', {id: item.id})}
              // onPress={() => {
              //   setLike(!like);
              //   setDislike(false);
              // }}
              style={{
                flexDirection: 'row',
                marginLeft: 10,
                alignItems: 'center',
              }}>
              {/* <Image
                source={require('../assets/Images/comment.png')}
                style={{height: 10, width: 10}}
              /> */}
              <Icon1 name="commenting" size={15} color="black" />

              <Text
                style={{
                  fontFamily: 'MontserratAlternates-Regular',
                  marginLeft: 5,
                  color: 'black',
                  fontSize: 13,
                }}>
                Comments
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* <Text style={{color: '#5F95F0', fontWeight: 'bold'}}>#{item}</Text> */}
    </TouchableOpacity>
  );
};

export default Posts;
