import React, {useState, useEffect} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import {useSelector} from 'react-redux';
import {likeDislike} from '../lib/api';
const LikeDislike = props => {
  const {userData} = useSelector(({USER}) => USER);
  const {item, press} = props;
  const [like, setLike] = useState(item?.is_like == true ? true : false);
  const [dislike, setDislike] = useState(item?.is_like == false ? true : false);
  const [likecount, setLikeCount] = useState(item?.like_count);
  const [dislikecount, setDislikeCount] = useState(item?.dislike_count);

  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <TouchableOpacity
        onPress={() => {
          setLike(!like);
          setDislike(false);
          setDislikeCount(
            item?.is_like == false
              ? item?.dislike_count - 1
              : item?.dislike_count,
          );
          setLikeCount(
            item?.is_like == true ? item?.like_count - 1 : item?.like_count + 1,
          );
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
          color={item?.is_like == true ? '#5F95F0' : 'grey'}
        />
        <Text
          style={{
            fontFamily: 'MontserratAlternates-Regular',
            fontSize: 13,
            marginLeft: 5,
            color: 'black',
          }}>
          {item?.like_count}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setDislike(!dislike);
          setLike(false);
          setLikeCount(
            item?.is_like == true ? item?.like_count - 1 : item?.like_count,
          );
          setDislikeCount(
            item?.is_like == false
              ? item?.dislike_count - 1
              : item?.dislike_count + 1,
          );
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
        style={{flexDirection: 'row', marginLeft: 10, alignItems: 'center'}}>
        <Icon
          name="thumbs-down"
          size={20}
          color={item?.is_like == false ? '#5F95F0' : 'grey'}
        />
        <Text
          style={{
            fontFamily: 'MontserratAlternates-Regular',
            fontSize: 13,
            marginLeft: 5,
            color: 'black',
          }}>
          {item?.dislike_count}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LikeDislike;
