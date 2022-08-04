import React, {useState, useEffect} from 'react';

import {
  View,
  FlatList,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Text,
  ImageBackground,
  TextInput,
} from 'react-native';
import moment from 'moment';
import {createComment, viewComment} from '../../../lib/api';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Entypo';
import Icon3 from 'react-native-vector-icons/FontAwesome';
const Comments = ({navigation, route}) => {
  const {id} = route.params;
  console.log('id', id);
  const [comments, setComments] = useState([]);
  const {userData} = useSelector(({USER}) => USER);
  const [change, setChange] = useState(false);
  const [comment, setComment] = useState('');
  useEffect(() => {
    viewComment({Auth: userData.token, id}).then(res => {
      console.log('res of comments', res);
      setComments(res.comments);
    });
  }, [change]);
  const cities = [
    {name: 'London', detail: 'England, United Kingdom'},
    {name: 'Dubai', detail: 'Emirates of Dubai, United Arab Emirates'},
    {name: 'Istanbul', detail: 'Turkey, Europe'},
    {name: 'New York City', detail: 'New York, United States'},
    {name: 'Rome', detail: 'Lazio, Italy'},
  ];
  const renderItems = ({item}) => (
    <View
      style={{
        marginTop: 0,
      }}>
      {/* <Text
      style={{
        fontSize: 16,
        fontFamily: 'MontserratAlternates-SemiBold',
      }}>
      Comments
    </Text> */}
      <View
        style={{
          marginTop: 20,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{alignItems: 'center', flexDirection: 'row'}}>
          <Image
            source={
              item.user.image
                ? {uri: item.user.image}
                : require('../../../assets/Images/girl.jpg')
            }
            style={{width: 50, height: 50, borderRadius: 50}}
          />
          <View style={{marginLeft: 10}}>
            <Text
              style={{
                fontFamily: 'MontserratAlternates-SemiBold',
                fontSize: 14,
                color: 'black',
              }}>
              {`${item.user.firstname} ${item.user.lastname}`}
            </Text>
            {/* <Text
         style={{
           fontSize: 12,
           fontFamily: 'MontserratAlternates-Regular',
           marginTop: 5,
         }}>
         Today, 03:24 PM
       </Text> */}
          </View>
        </View>
        <Text
          style={{
            fontSize: 12,
            fontFamily: 'MontserratAlternates-Regular',
          }}>
          {moment(item.created_at).format('MMM DD YYYY')}
        </Text>
      </View>
      <Text
        style={{
          fontFamily: 'MontserratAlternates-Regular',
          marginTop: 10,
          color: 'black',
        }}>
        {item.comment}
      </Text>
    </View>
  );
  const send = () => {
    setComment('');
    createComment({Auth: userData.token, post_id: id, comment}).then(res => {
      setChange(!change);
    });
  };
  console.log('comm', comments);
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
            // justifyContent: 'space-between',
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="left" size={20} color={'black'} />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'MontserratAlternates-SemiBold',
              color: 'black',
              marginLeft: 20,
            }}>
            Comments
          </Text>
          {/* <Text style={{fontFamily: 'MontserratAlternates-Regular'}}>
              Chicago, IL 60611, USA
            </Text> */}
        </View>
        {/* <FlatList horizontal data={arr} renderItem={renderItem} /> */}
        {/* <ScrollView> */}
        <View style={{flex: 1, paddingHorizontal: 15}}>
          {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {arr.map(item => (
            <View
              style={{
                height: 30,
                backgroundColor: 'white',
                marginRight: 10,
                elevation: 3,
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: 100,
                borderRadius: 5,
              }}>
              <Text style={{color: '#5F95F0', fontWeight: 'bold'}}>
                #{item}
              </Text>
            </View>
          ))}
        </View> */}
          {/* <FlatList horizontal data={arr} renderItem={renderItem} /> */}

          <FlatList data={comments} renderItem={renderItems} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: 'white',
            height: 70,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TextInput
            placeholder={'Add your comment'}
            placeholderTextColor={'grey'}
            value={comment}
            onChangeText={text => {
              setComment(text);
            }}
            style={{
              width: '80%',
              height: 50,
              borderRadius: 30,
              color: 'black',
              paddingHorizontal: 10,
              backgroundColor: '#ccc',
            }}
          />
          <TouchableOpacity onPress={() => send()} style={{marginLeft: 10}}>
            <Icon3 name="send" size={25} color="#5F95F0" />
          </TouchableOpacity>
        </View>
      </ImageBackground>

      {/* </ScrollView> */}

      {/* <Text>Home</Text> */}
    </SafeAreaView>
  );
};
export default Comments;
