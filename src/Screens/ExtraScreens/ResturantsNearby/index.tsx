import React from 'react';

import {
  View,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Text,
  ImageBackground,
} from 'react-native';

import LikeDislike from '../../../Components/LikeDislike';
import Comments from '../../../Components/Comments';
import Icon from 'react-native-vector-icons/Entypo';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Hotel from '../../../Components/Hotel';
const ResturantsNearby = ({navigation}) => {
  const arr = ['fun', 'danger', 'helpful', 'adventure', 'hobby'];
  const renderItem = ({item}) => (
    <View
      style={{
        height: 30,
        backgroundColor: 'white',
        marginRight: 10,
        marginLeft: 3,
        marginVertical: 3,
        elevation: 3,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 100,
        borderRadius: 5,
      }}>
      <Text
        style={{color: '#5F95F0', fontFamily: 'MontserratAlternates-Medium'}}>
        #{item}
      </Text>
    </View>
  );
  const renderItem3 = ({item}) => (
    <View
      style={{
        // height: 30,
        // backgroundColor: 'white',
        // marginRight: 10,
        // marginLeft: 3,
        // marginVertical: 3,
        // elevation: 3,
        // alignItems: 'center',
        // justifyContent: 'center',
        // minWidth: 100,
        borderRadius: 5,
      }}>
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
  );
  const renderItem1 = ({item}) => <Hotel navigation={navigation} />;
  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground source={require('../../../assets/Images/back.png')}>
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
            <Icon1 name="left" size={20} color="black" />
          </TouchableOpacity>
          <View style={{marginLeft: 20}}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'MontserratAlternates-SemiBold',
                color: 'black',
              }}>
              Restaurants Nearby
            </Text>
            {/* <Text style={{fontFamily: 'MontserratAlternates-Regular'}}>
              Chicago, IL 60611, USA
            </Text> */}
          </View>
        </View>
        {/* <FlatList horizontal data={arr} renderItem={renderItem} /> */}
        {/* <ScrollView> */}
        <View style={{marginTop: 0, marginHorizontal: 15}}>
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
          <ScrollView>
            <View style={{marginTop: 20, marginBottom: 120}}>
              <FlatList data={arr} renderItem={renderItem1} />
            </View>
          </ScrollView>
        </View>
      </ImageBackground>

      {/* </ScrollView> */}

      {/* <Text>Home</Text> */}
    </SafeAreaView>
  );
};
export default ResturantsNearby;
