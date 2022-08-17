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
} from 'react-native';
import {config} from '../../../../config';
import StarRating from 'react-native-star-rating';
import MapView, {Marker} from 'react-native-maps';
import ImageModal from '../../../Components/ImageModal';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Swiper from 'react-native-swiper';
const RestaurantsDetail = ({navigation, route}) => {
  const {item} = route.params;
  const [showModal, setShowModal] = useState(false);
  const alter = () => {
    setShowModal(!showModal);
  };
  console.log('item', item);
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
            zIndex: 3,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 15,
            // justifyContent: 'space-between',
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon1 name="left" color="black" size={20} />
          </TouchableOpacity>
          <View style={{marginLeft: 20}}>
            <Text
              style={{
                fontSize: 16,

                fontFamily: 'MontserratAlternates-SemiBold',
                color: 'black',
              }}>
              Detail
            </Text>
            {/* <Text style={{fontFamily: 'MontserratAlternates-Regular'}}>
              Chicago, IL 60611, USA
            </Text> */}
          </View>
        </View>
        <ScrollView>
          <TouchableOpacity
            onPress={() => {
              if (item.photos) {
                setShowModal(true);
              }
            }}
            style={{height: 200, width: '100%'}}>
            <Image
              source={
                item.photos
                  ? {
                      uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${item.photos[0].photo_reference}&key=${config}`,
                    }
                  : require('../../../assets/Images/imagePlaceholder.png')
              }
              style={{height: 200, width: '100%'}}
            />
          </TouchableOpacity>
          {/* <Image
            source={require('../../../assets/Images/restaurants.jpg')}
            style={{height: 200, width: '100%'}}
          /> */}
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
                  color: 'black',
                }}>
                {item.name}
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
                    color: 'black',
                    fontFamily: 'MontserratAlternates-Medium',
                  }}>
                  {item.vicinity}
                </Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {/* {item.types.map(element => (
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: 'MontserratAlternates-Medium',
                    // marginTop: 5,
                    color: 'black',
                  }}>
                  {element},{' '}
                </Text>
              ))} */}
            </View>
            <View style={{width: 100, marginTop: 10}}>
              <Text
                style={{
                  fontSize: 16,
                  marginTop: 10,
                  color: 'black',
                  fontFamily: 'MontserratAlternates-Medium',
                  marginBottom: 10,
                }}>
                Rating
              </Text>
              <StarRating
                disabled={true}
                maxStars={5}
                rating={item.rating}
                starSize={20}
                // style={{marginTop: 10}}
                // selectedStar={(rating) => this.onStarRatingPress(rating)}
              />
              <Text style={{marginTop: 10}}>{item.rating}</Text>
            </View>
            <Text
              style={{
                fontSize: 16,
                marginTop: 10,
                color: 'black',
                fontFamily: 'MontserratAlternates-Medium',
              }}>
              Amneties
            </Text>
            {item.types.map(element => (
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 5,
                  alignItems: 'center',
                }}>
                {/* <Image
               resizeMode="contain"
               source={require('../../../assets/Images/drink.png')}
               style={{width: 15, height: 15}}
             /> */}
                <Text
                  style={{
                    fontSize: 12,
                    marginTop: 5,
                    // marginLeft: 10,
                    color: 'black',
                    fontFamily: 'MontserratAlternates-Medium',
                  }}>
                  {element}
                </Text>
              </View>
            ))}

            <View style={{height: 10}} />
          </View>
          <View style={{marginTop: 20, paddingHorizontal: 15}}>
            {/* <Text
              style={{
                fontFamily: 'MontserratAlternates-SemiBold',
                color: 'black',
              }}>
              Restaurants address
            </Text> */}
            {/* <Text
              style={{
                fontSize: 13,
                color: 'black',
                fontFamily: 'MontserratAlternates-Medium',
              }}>
              {item.vicinity}
            </Text> */}
            <View
              style={{
                height: 200,
                marginBottom: 30,
                marginTop: 20,
                borderRadius: 10,
              }}>
              <MapView
                style={{flex: 1, borderRadius: 10}}
                initialRegion={{
                  latitude: item.geometry.location.lat,
                  longitude: item.geometry.location.lng,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}>
                <Marker
                  // key={index}
                  coordinate={{
                    latitude: item.geometry.location.lat,
                    longitude: item.geometry.location.lng,
                  }}
                  title={'location'}
                  // description={marker.description}
                />
              </MapView>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
      {ImageModal(
        showModal,
        `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${
          item.photos ? item?.photos[0]?.photo_reference : null
        }&key=${config}`,
        alter,
      )}
    </SafeAreaView>
  );
};
export default RestaurantsDetail;
