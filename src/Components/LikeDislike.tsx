import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
const LikeDislike = () => {
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <TouchableOpacity
        onPress={() => {
          setLike(!like);
          setDislike(false);
        }}
        style={{flexDirection: 'row', alignItems: 'center'}}>
        <Icon name="thumbs-up" size={20} color={like ? '#5F95F0' : 'grey'} />
        <Text
          style={{
            fontFamily: 'MontserratAlternates-Regular',
            fontSize: 13,
            marginLeft: 5,
            color: 'black',
          }}>
          70K
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setDislike(!dislike);
          setLike(false);
        }}
        style={{flexDirection: 'row', marginLeft: 10, alignItems: 'center'}}>
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
          100
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LikeDislike;
