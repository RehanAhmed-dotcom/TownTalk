import React, {useState, useEffect} from 'react';

import {
  View,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Image,
  Text,
  Platform,
  PermissionsAndroid,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import Axios from 'axios';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';
import {viewAllPost} from '../../../lib/api';
import Geolocation from 'react-native-geolocation-service';
import LikeDislike from '../../../Components/LikeDislike';
import Comments from '../../../Components/Comments';
import Icon from 'react-native-vector-icons/Entypo';
import Posts from '../../../Components/Posts';
const Home = ({navigation}) => {
  const arr = ['fun', 'danger', 'helpful', 'adventure', 'hobby'];
  const [latitude, setlatitude] = useState(0);
  const [longitude, setlongitude] = useState(0);
  const [datas, setData] = useState([]);
  const [location, setLocation] = useState('');
  const {userData} = useSelector(({USER}) => USER);
  const [change, setChange] = useState(false);
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
  const alter = () => {
    console.log('alter called');
    setChange(!change);
  };
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
  const cuRRentlocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        setlatitude(position.coords.latitude);
        setlongitude(position.coords.longitude);
        getPlace(position.coords.latitude, position.coords.longitude);
        // getPlace('47.751076', '-120.740135');
        console.log('users location', position.coords.longitude);

        console.log('users location', position.coords.latitude);
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
    Platform.OS == 'ios'
      ? Geolocation.requestAuthorization('always').then(res => {
          cuRRentlocation();
          console.log('res', res);
        })
      : requestLocationPermission();
  }, []);
  useEffect(() => {
    handleRestaurantSearch();
    viewAllPost({Auth: userData.token, latitude, longitude}).then(res => {
      // console.log('res', res);
      setData(res.posts.data);
    });
  }, [latitude, change]);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      viewAllPost({Auth: userData.token, latitude, longitude}).then(res => {
        // console.log('res', res);
        setData(res.posts.data);
      });
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);
  // console.log('data', datas);
  const renderItem1 = ({item}) => (
    <Posts item={item} press={alter} navigation={navigation} />
  );
  const getPlace = (latitude, longitude) => {
    // console.log('inside get place fuction');
    // console.log('lat long', latitude, longitude);
    let radius = 100;
    // let myapikey = 'AIzaSyB_H2_55fkLI8-EyfYLUlJI4obywUd-KnE';
    // let mapKey = 'AIzaSyBC2R0hGR9kjgysDNUsOWHWF_oU0jc6DIg';
    let mapKey = 'AIzaSyCmhmQiZWqaMzKclPUY-mEshxF7Lj4T4NI';
    // let request = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&key=${myapikey}`;
    let request = `https://maps.googleapis.com/maps/api/geocode/json?address=${latitude},${longitude}&key=${mapKey}`;
    // let request = `https://maps.googleapis.com/maps/api/geocode/json?address=${lot},${logo}&key=${mapKey}`;
    return Axios.get(request)
      .then(({data, status}) => {
        console.log('data', data.results[0].address_components);
        // setLocation("Rawalpindi")
        // console.log('whole responce', JSON.stringify(data));
        // const currentCity = data.results[0].address_components.filter(
        //   x =>
        //     x.types.filter(
        //       t =>
        //         t == 'administrative_area_level_2' ||
        //         'administrative_area_level_1',
        //     ).length > 0,
        // )[2].long_name;
        const currentCity = data.results[0].address_components.filter(
          x =>
            x.types.filter(
              t =>
                t == 'administrative_area_level_1' ||
                t == 'administrative_area_level_2',
            ).length > 0,
        )[0].long_name;
        // console.log('city current city', currentCity);

        setLocation(currentCity);
        // console.log('place', JSON.stringify(data.results[0].name));
        // return status === 200 || status === 201 ? data : null;
      })
      .catch(e => {});
  };
  // console.log('location', location);
  const lat = 33.5344737;
  const long = 73.0525821;
  const handleRestaurantSearch = () => {
    console.log('here');
    const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?';
    const location = `location=${lat},${long}`;
    const radius = '&radius=2000';
    const type = '&keyword=restaurant';
    const key = '&key=AIzaSyDtkp4KHqYIYddiYheGVMPqO9ko5ZtwYAU';
    const restaurantSearchUrl = url + location + radius + type + key;
    fetch(restaurantSearchUrl)
      .then(response => response.json())
      .then(result => console.log('result', result))
      // .then(result => this.setState({restaurantList: result}))
      .catch(e => console.log(e));
  };
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
              {`${userData.userdata.firstname} ${userData.userdata.lastname}`}
            </Text>
            <Text style={{fontFamily: 'MontserratAlternates-Regular'}}>
              {location}
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
              <FlatList data={datas} renderItem={renderItem1} />
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
