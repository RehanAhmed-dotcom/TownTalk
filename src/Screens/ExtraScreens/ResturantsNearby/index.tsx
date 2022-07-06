import React, {useEffect, useState} from 'react';

import {
  View,
  FlatList,
  Platform,
  ScrollView,
  TouchableOpacity,
  PermissionsAndroid,
  Image,
  SafeAreaView,
  Text,
  ImageBackground,
} from 'react-native';
import Axios from 'axios';
import Geocoder from 'react-native-geocoding';
import Geolocation from 'react-native-geolocation-service';
import LikeDislike from '../../../Components/LikeDislike';
import Comments from '../../../Components/Comments';
import Icon from 'react-native-vector-icons/Entypo';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Hotel from '../../../Components/Hotel';
import {config} from '../../../../config';
const ResturantsNearby = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const [latitude, setlatitude] = useState(0);
  const [longitude, setlongitude] = useState(0);
  const [location, setLocation] = useState('');
  const {sel} = route.params;
  const city = route?.params?.city;
  const [list, setList] = useState([]);
  // const arr = ['fun', 'danger', 'helpful', 'adventure', 'hobby'];
  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        cuRRentlocation();
      }
    } catch (err) {
      console.warn(err);
    }
  };
  console.log('city', city);
  const handleRestaurantSearch = (lat: Number, long: Number) => {
    // console.log('here');
    const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?';
    const location = `location=${lat},${long}`;
    const radius = '&radius=2000';
    const type = `&keyword=${sel}`;
    const key = `&key=${config}`;
    const restaurantSearchUrl = url + location + radius + type + key;
    fetch(restaurantSearchUrl)
      .then(response => response.json())
      .then(result => {
        setList(result.results);
        // console.log('results', result);
      })
      // .then(result => this.setState({restaurantList: result}))
      .catch(e => console.log('err', e));
  };
  const handleCitySearch = (city: String) => {
    Geocoder.from(city)
      .then(json => {
        console.log('lat', JSON.stringify(json));
        var location = json.results[0].geometry.location;
        handleRestaurantSearch(location.lat, location.lng);
      })
      .catch(error => console.warn(error));
  };
  const cuRRentlocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        setlatitude(position.coords.latitude);
        setlongitude(position.coords.longitude);
        if (city) {
          handleCitySearch(city);
        } else {
          handleRestaurantSearch(
            position.coords.latitude,
            position.coords.longitude,
          );
        }

        // getPlace(position.coords.latitude, position.coords.longitude);
        // getPlace('47.751076', '-120.740135');
        // console.log('users location', position.coords.longitude);

        // console.log('users location', position.coords.latitude);
      },
      error => {
        console.log('error in loc', error);
      },
      {
        enableHighAccuracy: true,
        // timeout: 15000,
        // maximumAge: 10000
      },
    );
  };
  useEffect(() => {
    // handleAddress('solo');
    Geocoder.init(config);

    Platform.OS == 'ios'
      ? Geolocation.requestAuthorization('always').then(res => {
          cuRRentlocation();
          console.log('res', res);
        })
      : requestLocationPermission();
  }, []);
  const renderItem1 = ({item}: {item: any}) => (
    <Hotel item={item} navigation={navigation} />
  );
  // console.log('firsts', JSON.stringify(list[0]));
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
              {sel} Nearby
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
              <FlatList data={list} renderItem={renderItem1} />
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
