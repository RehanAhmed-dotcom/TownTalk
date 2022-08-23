import React, {useState} from 'react';

import {
  View,
  FlatList,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Dimensions,
  Alert,
  Text,
  ImageBackground,
  TextInput,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import LikeDislike from '../../../Components/LikeDislike';
import Comments from '../../../Components/Comments';
import Icon from 'react-native-vector-icons/AntDesign';
import CityList from '../../../Components/CityList';
import Icon3 from 'react-native-vector-icons/Ionicons';
import Icon6 from 'react-native-vector-icons/Entypo';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import Icon4 from 'react-native-vector-icons/Fontisto';
import Icon7 from 'react-native-vector-icons/MaterialIcons';
import Posts from '../../../Components/Posts';
import {cityAdd} from '../../../redux/actions';
const Search = ({navigation}) => {
  const [sel, setSel] = useState('');
  const [city, setCity] = useState('');
  const dispatch = useDispatch();
  const {CityAdd} = useSelector(({USER}) => USER);
  console.log('cityadd', CityAdd);
  const arr = [
    {
      name: 'Banks',
      image: <Icon1 name="bank" size={15} color={'#5F95F0'} />,
    },
    {
      name: 'Bars',
      image: <Icon7 name="sports-bar" size={15} color={'#5F95F0'} />,
    },
    {
      name: 'Clubs',
      image: <Icon6 name="sports-club" size={15} color={'#5F95F0'} />,
    },
    {
      name: 'Entertainment',
      image: <Icon3 name="tv" size={15} color={'#5F95F0'} />,
    },
    {
      name: 'Gas Stations',
      image: <Icon5 name="gas-pump" size={15} color={'#5F95F0'} />,
    },
    {
      name: 'Gyms',
      image: <Icon5 name="dumbbell" size={15} color={'#5F95F0'} />,
    },
    {
      name: 'Malls',
      image: <Icon7 name="local-mall" size={15} color={'#5F95F0'} />,
    },
    {
      name: 'Restaurants',
      image: <Icon3 name="restaurant" size={15} color={'#5F95F0'} />,
    },
    {
      name: 'Shopping',
      image: <Icon1 name="shopping-bag" size={15} color={'#5F95F0'} />,
    },

    {
      name: 'Supermarkets',
      image: <Icon4 name="shopping-store" size={15} color={'#5F95F0'} />,
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
  const renderItems = ({item}) => (
    <CityList item={item} navigation={navigation} />
  );
  const height = Dimensions.get('screen').height;
  console.log('hei', height);
  console.log('selected', CityAdd);
  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground
        style={{height: '100%'}}
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
        <View
          style={{
            marginTop: 20,
            // flex: 0.9,
            // backgroundColor: 'red',
            marginHorizontal: 15,
          }}>
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
              paddingLeft: 10,
              borderColor: 'black',
            }}>
            <TextInput
              placeholder="Where to now..."
              placeholderTextColor="grey"
              value={city}
              onChangeText={text => {
                setCity(text);
              }}
              style={{
                width: '90%',
                color: 'black',
                fontFamily: 'MontserratAlternates-Regular',
              }}
            />
            <TouchableOpacity
              style={{
                // backgroundColor: 'red',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                width: 30,
              }}
              onPress={() => {
                if (sel && city) {
                  const data = {name: city, category: sel};
                  navigation.navigate('ResturantsNearby', {sel, city});
                  cityAdd(data)(dispatch);
                } else {
                  Alert.alert('Select Category and City');
                }
              }}>
              <Image
                source={require('../../../assets/Images/search.png')}
                style={{height: 15, width: 15}}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => {
              if (sel) {
                navigation.navigate('ResturantsNearby', {sel});
              } else {
                Alert.alert('Select Category');
              }
            }}
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

          {/* <View
            style={{
              height: height > 850 ? '70%' : '78%',
              backgroundColor: 'red',
            }}>
           
          </View> */}
        </View>
        <View style={{height: height > 850 ? '70%' : '65%'}}>
          <FlatList data={CityAdd} renderItem={renderItems} />
        </View>
      </ImageBackground>

      {/* </ScrollView> */}

      {/* <Text>Home</Text> */}
    </SafeAreaView>
  );
};
export default Search;
