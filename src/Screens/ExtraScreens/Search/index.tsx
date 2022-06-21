import React, {useState} from 'react';

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
import LikeDislike from '../../../Components/LikeDislike';
import Comments from '../../../Components/Comments';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Entypo';
import Icon3 from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import Icon4 from 'react-native-vector-icons/MaterialCommunityIcons';
import Posts from '../../../Components/Posts';
const Search = ({navigation}) => {
  const [sel, setSel] = useState('');
  const arr = [
    {
      name: 'Restaurant',
      image: <Icon3 name="restaurant" size={15} color={'#5F95F0'} />,
    },
    {
      name: 'Gym',
      image: <Icon4 name="dumbbell" size={15} color={'#5F95F0'} />,
    },
    {
      name: 'Bank',
      image: <Icon1 name="bank" size={15} color={'#5F95F0'} />,
    },
    {
      name: 'Hospital',
      image: <Icon5 name="hospital" size={15} color={'#5F95F0'} />,
    },
  ];
  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => setSel(item.name)}
      style={{
        height: 30,
        backgroundColor: 'white',
        marginRight: 10,
        paddingHorizontal: 10,
        marginLeft: 3,
        marginVertical: 3,
        elevation: 3,
        flexDirection: 'row',
        borderWidth: sel == item.name ? 1 : 0,
        // maxWidth: 150,
        borderColor: '#5F95F0',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 100,
        borderRadius: 5,
      }}>
      {item.image}
      {/* <Image source={require(`../../../assets/Images/${item.image}`)} /> */}
      <Text
        style={{
          color: '#5F95F0',
          marginLeft: 5,
          fontFamily: 'MontserratAlternates-Medium',
        }}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );
  const cities = [
    {name: 'London', detail: 'England, United Kingdom'},
    {name: 'Dubai', detail: 'Emirates of Dubai, United Arab Emirates'},
    {name: 'Istanbul', detail: 'Turkey, Europe'},
    {name: 'New York City', detail: 'New York, United States'},
    {name: 'Rome', detail: 'Lazio, Italy'},
  ];
  const renderItems = ({item}) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('ResturantsNearby')}
      style={{flexDirection: 'row', marginTop: 20, alignItems: 'center'}}>
      <Icon2 name="location-pin" size={30} color={'#5F95F0'} />
      <View style={{marginLeft: 10}}>
        <Text style={{fontFamily: 'MontserratAlternates-SemiBold'}}>
          {item.name}
        </Text>
        <Text style={{fontSize: 10}}>{item.detail}</Text>
      </View>
    </TouchableOpacity>
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
            Search
          </Text>
          {/* <Text style={{fontFamily: 'MontserratAlternates-Regular'}}>
              Chicago, IL 60611, USA
            </Text> */}
        </View>
        {/* <FlatList horizontal data={arr} renderItem={renderItem} /> */}
        {/* <ScrollView> */}
        <View style={{marginTop: 20, marginHorizontal: 15}}>
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
          <View
            style={{
              backgroundColor: 'white',
              flexDirection: 'row',
              justifyContent: 'space-between',
              height: 40,
              borderRadius: 10,
              marginTop: 10,
              alignItems: 'center',
              borderWidth: 1,
              paddingHorizontal: 10,
              borderColor: 'black',
            }}>
            <TextInput
              placeholder="Where to now..."
              style={{width: '90%', fontFamily: 'MontserratAlternates-Regular'}}
            />
            <Image
              source={require('../../../assets/Images/search.png')}
              style={{height: 15, width: 15}}
            />
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('ResturantsNearby')}
            style={{
              borderBottomWidth: 1,
              borderBottomColor: 'grey',
              marginTop: 20,
              flexDirection: 'row',
              paddingBottom: 10,
              alignItems: 'center',
            }}>
            <Icon1 name="send" size={15} />
            <Text
              style={{
                marginLeft: 10,
                fontFamily: 'MontserratAlternates-Regular',
              }}>
              Nearby me...
            </Text>
          </TouchableOpacity>
          <FlatList data={cities} renderItem={renderItems} />
        </View>
      </ImageBackground>

      {/* </ScrollView> */}

      {/* <Text>Home</Text> */}
    </SafeAreaView>
  );
};
export default Search;
