import React, {useState, useEffect} from 'react';

import {
  View,
  FlatList,
  TextInput,
  ScrollView,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Text,
  ImageBackground,
  PermissionsAndroid,
} from 'react-native';

import Geolocation from 'react-native-geolocation-service';
import MapView from 'react-native-maps';
import {addPost} from '../../../lib/api';
import MyModal from '../../../Components/MyModal';
import LikeDislike from '../../../Components/LikeDislike';
import Comments from '../../../Components/Comments';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Entypo';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Hotel from '../../../Components/Hotel';
import {useSelector} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import Swiper from 'react-native-swiper';
const Create = ({navigation}) => {
  const {userData} = useSelector(({USER}) => USER);
  const [name, setName] = useState('');
  const [img, setImg] = useState([]);
  const [zip, setZip] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [description, setDescription] = useState('');
  const [hash, setHash] = useState('');
  const [latitude, setlatitude] = useState(0);
  const [longitude, setlongitude] = useState(0);
  // console.log('userdata', latitude, longitude);
  const picker = () => {
    ImagePicker.openPicker({
      // multiple: true,
      width: 1500,
      height: 1500,
      cropping: true,
    }).then(image => {
      // setShow(!show);
      // images.push(image.path);
      // setImg(image.path);
      setImg([...img, {image: image.path}]);
      // console.log(image);
      // setImgErr('');
    });
  };
  const add = () => {
    setShowModal(true);
    const data = new FormData();
    data.append('hashtags', hash);
    data.append('zipcode', zip);
    data.append('latitude', latitude);
    data.append('longitude', longitude);
    data.append('description', description);
    data.append('title', name);
    data.append('media_type', 'image');
    img.forEach(item => {
      data.append('media[]', {
        uri: item.image,
        type: 'image/jpeg',
        name: `image${Math.random()}.jpg`,
      });
    });

    data.append('title', name);
    addPost({Auth: userData.token}, data)
      .then(res => {
        setShowModal(false);
        console.log('res', res);
        if (res.status == 'success') {
          navigation.goBack();
        }
      })
      .catch(err => {
        setShowModal(false);
        console.log('err', err);
      });
  };
  const cuRRentlocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        setlatitude(position.coords.latitude);
        setlongitude(position.coords.longitude);
        // getPlace(position.coords.latitude, position.coords.longitude);
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
  useEffect(() => {
    Platform.OS == 'ios'
      ? Geolocation.requestAuthorization('always').then(res => {
          cuRRentlocation();
          console.log('res', res);
        })
      : requestLocationPermission();
  }, []);
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
          {/* <TouchableOpacity>
            <Icon1 name="left" size={20} />
          </TouchableOpacity> */}
          <View style={{marginLeft: 10}}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'MontserratAlternates-SemiBold',
                color: 'black',
              }}>
              Add Post
            </Text>
            {/* <Text style={{fontFamily: 'MontserratAlternates-Regular'}}>
              Chicago, IL 60611, USA
            </Text> */}
          </View>
        </View>
        <ScrollView>
          <View style={{marginTop: 20, paddingHorizontal: 15}}>
            <View style={{flexDirection: 'row'}}>
              {img.length > 0 && (
                <View style={{width: 150, marginRight: 10, height: 150}}>
                  <Swiper
                    showsPagination={true}
                    key={img.length}
                    paginationStyle={{bottom: 10}}
                    activeDotColor="#5F95F0"
                    loop={false}
                    style={{alignItems: 'center', justifyContent: 'center'}}
                    showsButtons={false}>
                    {img.map(item => (
                      <Image
                        source={{uri: item.image}}
                        style={{
                          borderRadius: 10,
                          width: '100%',
                          height: '100%',
                        }}
                      />
                    ))}
                  </Swiper>
                </View>
              )}
              <TouchableOpacity
                onPress={() => picker()}
                style={{
                  height: 150,
                  width: '45%',
                  borderWidth: 1,

                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 5,
                  borderColor: '#5F95F0',
                }}>
                {/* {img ? (
                  <Image
                    source={{uri: img}}
                    style={{height: 150, width: '100%', borderRadius: 5}}
                  />
                ) : ( */}
                <Icon2 name="images-outline" size={50} color={'#5F95F0'} />
                {/* )} */}
              </TouchableOpacity>
            </View>
            <View style={{marginTop: 30}}>
              <Text
                style={{
                  fontSize: 12,
                  color: 'black',
                  fontFamily: 'MontserratAlternates-SemiBold',
                }}>
                Name
              </Text>
              {/* <TextInput
                value={`${userData.userdata.firstname} ${userData.userdata.lastname}`}
                placeholderTextColor={'black'}
                editable={false}
                // onChangeText={text => {

                //   setEmail(text);
                //   setEmailErr('');
                // }}
                style={{
                  fontFamily: 'MontserratAlternates-Regular',
                  borderBottomColor: 'grey',
                  color: 'black',
                  borderBottomWidth: 1,
                }}
              /> */}
              <TextInput
                value={name}
                placeholderTextColor={'black'}
                // editable={false}
                onChangeText={text => {
                  setName(text);
                }}
                style={{
                  fontFamily: 'MontserratAlternates-Regular',
                  borderBottomColor: 'grey',
                  color: 'black',
                  borderBottomWidth: 1,
                }}
              />
            </View>

            <View style={{marginTop: 30}}>
              <Text
                style={{
                  fontSize: 12,
                  color: 'black',
                  fontFamily: 'MontserratAlternates-SemiBold',
                }}>
                Zip code
              </Text>
              <TextInput
                value={zip}
                onChangeText={text => {
                  setZip(text);
                  // setEmailErr('');
                }}
                style={{
                  fontFamily: 'MontserratAlternates-Regular',
                  borderBottomColor: 'grey',
                  borderBottomWidth: 1,
                  color: 'grey',
                }}
              />
            </View>
            <View style={{marginTop: 30}}>
              <Text
                style={{
                  fontSize: 12,
                  color: 'black',
                  fontFamily: 'MontserratAlternates-SemiBold',
                }}>
                Post description
              </Text>
              <TextInput
                textAlignVertical="top"
                value={description}
                multiline
                numberOfLines={5}
                onChangeText={text => {
                  setDescription(text);
                  // setEmailErr('');
                }}
                style={{
                  fontFamily: 'MontserratAlternates-Regular',
                  borderColor: 'grey',
                  borderWidth: 1,
                  marginTop: 10,
                  borderRadius: 5,
                  color: 'grey',
                  height: 100,
                }}
              />
            </View>
            <View style={{marginTop: 30}}>
              <Text
                style={{
                  fontSize: 12,
                  color: 'black',
                  fontFamily: 'MontserratAlternates-SemiBold',
                }}>
                Hash Tag
              </Text>
              <TextInput
                value={hash}
                textAlignVertical="top"
                multiline
                numberOfLines={5}
                placeholder="#Walking #Talking"
                placeholderTextColor="#ccc"
                onChangeText={text => {
                  setHash(text);
                  // setEmailErr('');
                }}
                style={{
                  fontFamily: 'MontserratAlternates-Regular',
                  borderColor: 'grey',
                  color: 'grey',
                  marginTop: 10,
                  borderWidth: 1,
                  borderRadius: 5,
                  height: 100,
                }}
              />
            </View>
            <TouchableOpacity
              onPress={() => add()}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                height: 50,
                marginTop: 30,
                marginBottom: 20,
                borderRadius: 5,
                elevation: 2,
                backgroundColor: '#5F95F0',
              }}>
              <Text
                style={{
                  fontFamily: 'MontserratAlternates-SemiBold',
                  color: 'white',
                }}>
                Add Post
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* <ScrollView>
          <Image
            source={require('../../../assets/Images/restaurants.jpg')}
            style={{height: 200, width: '100%'}}
          />
          <View
            style={{
              marginTop: 0,
              backgroundColor: 'white',
              elevation: 3,
              paddingHorizontal: 10,
              borderRadius: 5,
              marginHorizontal: 15,
            }}>
            <View style={{width: '100%', marginTop: 10, alignItems: 'center'}}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: 'MontserratAlternates-SemiBold',
                  color: '#5F95F0',
                }}>
                Pearl Continental
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: 'MontserratAlternates-SemiBold',
                  color: '#5F95F0',
                }}>
                Hotel Rawalpindi
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 20,
              }}>
              <View>
                <Text
                  style={{
                    fontSize: 13,
                    fontFamily: 'MontserratAlternates-Medium',
                  }}>
                  PKR 4500
                </Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Icon
                    name="star"
                    size={10}
                    color="#5F95F0"
                    style={{marginLeft: 1}}
                  />
                  <Icon
                    name="star"
                    size={10}
                    color="#5F95F0"
                    style={{marginLeft: 1}}
                  />
                  <Icon
                    name="star"
                    size={10}
                    color="#5F95F0"
                    style={{marginLeft: 1}}
                  />
                  <Icon
                    name="star"
                    size={10}
                    color="#5F95F0"
                    style={{marginLeft: 1}}
                  />
                  <Icon
                    name="star"
                    size={10}
                    color="#5F95F0"
                    style={{opacity: 0.5, marginLeft: 1}}
                  />
                </View>
              </View>
            </View>
            <View style={{width: '100%', marginTop: 10, alignItems: 'center'}}>
              <TouchableOpacity
                style={{
                  width: 200,
                  height: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#5F95F0',
                  marginTop: 10,
                  borderRadius: 5,
                }}>
                <Text
                  style={{
                    fontSize: 10,
                    color: 'white',
                    fontFamily: 'MontserratAlternates-SemiBold',
                  }}>
                  View Deal
                </Text>
              </TouchableOpacity>
            </View>
            <Text
              style={{
                fontSize: 16,
                marginTop: 10,
                fontFamily: 'MontserratAlternates-Regular',
              }}>
              About
            </Text>
            <Text
              style={{
                fontSize: 12,
                marginTop: 10,
                fontFamily: 'MontserratAlternates-Regular',
              }}>
              Pearl Continental Hotels & Resorts is the largest chain of
              five-star hotels in Pakistan with properties in Karachi, Lahore,
              Rawalpindi, Peshawar, Gawadar, Bhurban, Muzaffarabad and Malam
              Jabba
            </Text>
            <Text
              style={{
                fontSize: 16,
                marginTop: 10,
                fontFamily: 'MontserratAlternates-Regular',
              }}>
              Amneties
            </Text>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                alignItems: 'center',
              }}>
              <Image
                resizeMode="contain"
                source={require('../../../assets/Images/drink.png')}
                style={{width: 15, height: 15}}
              />
              <Text
                style={{
                  fontSize: 12,
                  marginLeft: 10,
                  fontFamily: 'MontserratAlternates-Regular',
                }}>
                Food & Drinks
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                alignItems: 'center',
              }}>
              <Image
                resizeMode="contain"
                source={require('../../../assets/Images/family.png')}
                style={{width: 15, height: 15}}
              />
              <Text
                style={{
                  fontSize: 12,
                  marginLeft: 10,
                  fontFamily: 'MontserratAlternates-Regular',
                }}>
                Family
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                alignItems: 'center',
              }}>
              <Image
                resizeMode="contain"
                source={require('../../../assets/Images/clean.png')}
                style={{width: 15, height: 15}}
              />
              <Text
                style={{
                  fontSize: 12,
                  marginLeft: 10,
                  fontFamily: 'MontserratAlternates-Regular',
                }}>
                Cleaning Services
              </Text>
            </View>
            <View style={{height: 30}} />
          </View>
          <View style={{marginTop: 20, paddingHorizontal: 15}}>
            <Text style={{fontFamily: 'MontserratAlternates-SemiBold'}}>
              Restaurants address
            </Text>
            <Text
              style={{
                marginTop: 10,
                fontFamily: 'MontserratAlternates-Regular',
              }}>
              Sadar Rawalpindi, Pakistan
            </Text>
            <View
              style={{
                height: 200,
                marginBottom: 10,
                marginTop: 20,
                borderRadius: 10,
              }}>
              <MapView
                style={{flex: 1, borderRadius: 10}}
                initialRegion={{
                  latitude: 37.78825,
                  longitude: -122.4324,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
              />
            </View>
          </View>
        </ScrollView> */}
      </ImageBackground>
      {MyModal(showModal)}
    </SafeAreaView>
  );
};
export default Create;
