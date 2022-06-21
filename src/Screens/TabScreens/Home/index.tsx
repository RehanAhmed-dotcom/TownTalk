import React from 'react';

import {
  View,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Image,
  Text,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LikeDislike from '../../../Components/LikeDislike';
import Comments from '../../../Components/Comments';
import Icon from 'react-native-vector-icons/Entypo';
import Posts from '../../../Components/Posts';
const Home = ({navigation}) => {
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
      <Text style={{color: 'black', fontFamily: 'MontserratAlternates-Medium'}}>
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
  const renderItem1 = ({item}) => <Posts />;
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
          <View>
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'MontserratAlternates-SemiBold',
                color: '#5F95F0',
              }}>
              Olivia Benson
            </Text>
            <Text style={{fontFamily: 'MontserratAlternates-Regular'}}>
              Chicago, IL 60611, USA
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity onPress={() => navigation.navigate('Search')}>
              <Image
                source={require('../../../assets/Images/search.png')}
                style={{height: 15, width: 15}}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('GroupPage')}>
              <Image
                source={require('../../../assets/Images/9055212_bxs_category_icon.png')}
                style={{height: 15, marginLeft: 10, width: 15}}
              />
            </TouchableOpacity>
          </View>
        </View>
        {/* <FlatList horizontal data={arr} renderItem={renderItem} /> */}
        {/* <ScrollView> */}
        <View style={{marginTop: 10, paddingHorizontal: 12}}>
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
          <FlatList horizontal data={arr} renderItem={renderItem} />
          <ScrollView>
            <View style={{marginTop: 10, width: '100%', height: hp(74)}}>
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
export default Home;
