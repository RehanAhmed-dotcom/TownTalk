import React, {useState} from 'react';

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
import MapView from 'react-native-maps';
import LikeDislike from '../../../Components/LikeDislike';
import Comments from '../../../Components/Comments';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Entypo';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Hotel from '../../../Components/Hotel';
const SingleChat = ({navigation}) => {
  const [name, setName] = useState('Olivia Benson');
  const [zip, setZip] = useState('');
  const ary = [
    {
      image: require('../../../assets/Images/girl.jpg'),
      name: 'Veronica Bardot',
      mesg: 'Nadal, Can you please let me know a price of that condo?',
      time: '5:45 PM',
      unread: '1',
    },
    {
      image: require('../../../assets/Images/girl.jpg'),
      name: 'Veronica Bardot',
      mesg: 'I am thinking to take it!!',
      time: '5:45 PM',
      unread: '0',
    },
    {
      image: require('../../../assets/Images/girl.jpg'),
      name: 'Veronica Bardot',
      mesg: 'Hey Melvin. I need to check. That post is quite old.',
      time: '5:45 PM',
      unread: '1',
    },
    {
      image: require('../../../assets/Images/girl.jpg'),
      name: 'Veronica Bardot',
      mesg: 'Yeah! sure but its really cool',
      time: '5:45 PM',
      unread: '1',
    },

    // {
    //   image: require('../../../assets/Images/girl.jpg'),
    //   name: 'Veronica Bardot',
    //   mesg: 'Shall we meet today',
    //   time: '5:45 PM',
    //   unread: '1',
    // },
  ];
  const render = ({item, index}) => (
    <View
      style={{
        // backgroundColor: 'red',
        // height: 50,
        alignItems: item.unread == 0 ? 'flex-end' : 'flex-start',
        marginBottom: 10,
        marginTop: index == 0 ? 30 : 10,
      }}>
      <View
        style={{
          padding: 10,
          borderRadius: 5,
          maxWidth: '90%',
          // lineSpacing:1,

          backgroundColor: item.unread == 0 ? '#5F95F0' : '#ccc',
        }}>
        <Text
          style={{
            lineHeight: 20,
            fontFamily: 'MontserratAlternates-Regular',
            color: item.unread == 0 ? 'white' : 'black',
          }}>
          {item.mesg}
        </Text>
        <View style={{alignItems: 'flex-end'}}>
          <Text
            style={{
              fontSize: 10,
              fontFamily: 'MontserratAlternates-Regular',
              color: item.unread == 0 ? 'white' : 'grey',
            }}>
            {item.time}
          </Text>
        </View>
      </View>
    </View>
  );
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
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon1 name="left" color="black" size={20} />
            </TouchableOpacity>
            <Image
              source={require('../../../assets/Images/girl.jpg')}
              style={{height: 40, marginLeft: 20, width: 40, borderRadius: 20}}
            />
            <View style={{marginLeft: 10}}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: 'MontserratAlternates-SemiBold',
                  color: 'black',
                }}>
                Jason Moody
              </Text>
              <Text
                style={{
                  fontFamily: 'MontserratAlternates-Regular',
                  color: 'black',
                }}>
                online
              </Text>
            </View>
          </View>

          {/* <Image
            source={require('../../../assets/Images/search.png')}
            style={{height: 20, width: 20}}
          /> */}
        </View>
        <View style={{paddingHorizontal: 15, flex: 1}}>
          <FlatList
            data={ary}
            renderItem={render}
            // style={{paddingVertical: 20}}
          />
        </View>
        <View
          style={{
            height: 70,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 15,
            backgroundColor: '#ccc',
          }}>
          <Icon1 name="plus" size={20} color="grey" />
          <TextInput
            placeholder="Write your message here..."
            style={{
              backgroundColor: 'white',
              width: '80%',
              height: 50,
              paddingHorizontal: 10,
              fontFamily: 'MontserratAlternates-Regular',
              borderRadius: 30,
            }}
            placeholderTextColor={'grey'}
          />
          <TouchableOpacity
            style={{
              backgroundColor: '#5F95F0',
              borderRadius: 30,
              width: 35,
              height: 35,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Icon2 name="ios-send" size={15} color="white" />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};
export default SingleChat;
