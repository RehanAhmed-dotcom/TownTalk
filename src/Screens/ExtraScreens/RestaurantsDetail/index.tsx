import React from 'react';

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
import MapView from 'react-native-maps';
import LikeDislike from '../../../Components/LikeDislike';
import Comments from '../../../Components/Comments';
import Icon2 from 'react-native-vector-icons/Fontisto';
import Icon from 'react-native-vector-icons/Entypo';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Swiper from 'react-native-swiper';
import Hotel from '../../../Components/Hotel';
const RestaurantsDetail = ({navigation}) => {
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
  const renderPagination = (index, total, context) => {
    return (
      <View
        style={{
          position: 'absolute',
          bottom: 10,
          backgroundColor: 'black',
          height: 30,
          width: 40,
          alignItems: 'center',
          borderRadius: 10,
          right: 10,
        }}>
        <Text style={{color: 'grey'}}>
          <Text
            style={{
              color: 'white',
              fontSize: 20,
            }}>
            {index + 1}
          </Text>
          /{total}
        </Text>
      </View>
    );
  };
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
          <View style={{height: 200, width: '100%'}}>
            <Swiper
              renderPagination={renderPagination}
              autoplay={true}
              dot={
                <View
                  style={{
                    backgroundColor: 'rgba(0,0,0,.2)',
                    // width: 20,
                    height: 5,
                    borderRadius: 4,
                    marginLeft: 3,
                    marginRight: 3,
                    // width: '100%',
                    position: 'absolute',
                    // marginTop: 100,
                    marginBottom: 3,
                  }}
                />
              }
              showsButtons={false}>
              {['1', '1', '1', '1', '1'].map(item => (
                <Image
                  source={require('../../../assets/Images/restaurants.jpg')}
                  style={{height: '100%', width: '100%'}}
                />
              ))}
            </Swiper>
          </View>
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
                Hunain Restaurant
              </Text>
              {/* <Text
                style={{
                  fontSize: 16,
                  fontFamily: 'MontserratAlternates-SemiBold',
                  color: 'black',
                }}>
                Hotel Rawalpindi
              </Text> */}
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
                  7th road Lahore Pakistan
                </Text>
              </View>
            </View>
            {/* <View style={{width: '100%', marginTop: 10, alignItems: 'center'}}>
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
            </View> */}
            <Text
              style={{
                fontSize: 12,
                fontFamily: 'MontserratAlternates-Medium',
                // marginTop: 5,
                color: 'black',
              }}>
              Italian, Chinese, Asian, Fastfood
            </Text>
            <TouchableOpacity
              style={{
                borderBottomColor: 'black',
                width: 25,
                borderBottomWidth: 1,
              }}>
              <Text
                style={{
                  fontSize: 12,
                  // letterSpacing: 0.1,
                  fontFamily: 'MontserratAlternates-SemiBold',
                  marginTop: 10,
                  color: 'black',
                }}>
                Call
              </Text>
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 16,
                color: 'black',
                marginTop: 40,
                fontFamily: 'MontserratAlternates-SemiBold',
              }}>
              About
            </Text>
            <Text
              style={{
                fontSize: 12,
                marginTop: 10,
                color: 'black',
                fontFamily: 'MontserratAlternates-Medium',
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
                color: 'black',
                fontFamily: 'MontserratAlternates-Medium',
              }}>
              Amneties
            </Text>
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
                  // marginLeft: 10,
                  color: 'black',
                  fontFamily: 'MontserratAlternates-Medium',
                }}>
                Italian
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
                alignItems: 'center',
              }}>
              {/* <Image
                resizeMode="contain"
                source={require('../../../assets/Images/family.png')}
                style={{width: 15, height: 15}}
              /> */}
              <Text
                style={{
                  fontSize: 12,
                  // marginLeft: 10,
                  color: 'black',
                  fontFamily: 'MontserratAlternates-Medium',
                }}>
                Chinese
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
                alignItems: 'center',
              }}>
              {/* <Image
                resizeMode="contain"
                source={require('../../../assets/Images/clean.png')}
                style={{width: 15, height: 15}}
              /> */}
              <Text
                style={{
                  fontSize: 12,
                  // marginLeft: 10,
                  color: 'black',
                  fontFamily: 'MontserratAlternates-Medium',
                }}>
                Asian
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
                alignItems: 'center',
              }}>
              {/* <Image
                resizeMode="contain"
                source={require('../../../assets/Images/clean.png')}
                style={{width: 15, height: 15}}
              /> */}
              <Text
                style={{
                  fontSize: 12,
                  // marginLeft: 10,
                  color: 'black',
                  fontFamily: 'MontserratAlternates-Medium',
                }}>
                FastFood
              </Text>
            </View>
            <View style={{height: 10}} />
          </View>
          <View style={{marginTop: 20, paddingHorizontal: 15}}>
            <Text
              style={{
                fontFamily: 'MontserratAlternates-SemiBold',
                color: 'black',
              }}>
              Restaurants address
            </Text>
            <Text
              style={{
                fontSize: 13,
                color: 'black',
                fontFamily: 'MontserratAlternates-Medium',
              }}>
              7th road Lahore Pakistan
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
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};
export default RestaurantsDetail;
