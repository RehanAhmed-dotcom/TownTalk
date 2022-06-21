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
import ImagePicker from 'react-native-image-crop-picker';
import Swiper from 'react-native-swiper';
const Create = ({navigation}) => {
  const [name, setName] = useState('Olivia Benson');
  const [img, setImg] = useState([]);
  const [zip, setZip] = useState('');
  const picker = () => {
    ImagePicker.openPicker({
      // multiple: true,
      width: 1500,
      height: 1500,
      cropping: true,
    }).then(image => {
      // setShow(!show);
      // images.push(image.path);
      setImg([...img, {image: image.path}]);
      console.log(image);
      // setImgErr('');
    });
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
                  width: 150,
                  borderWidth: 1,

                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 5,
                  borderColor: '#5F95F0',
                }}>
                <Icon2 name="images-outline" size={50} color={'#5F95F0'} />
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
              <TextInput
                value={name}
                placeholderTextColor={'grey'}
                editable={false}
                // onChangeText={text => {

                //   setEmail(text);
                //   setEmailErr('');
                // }}
                style={{
                  fontFamily: 'MontserratAlternates-Regular',
                  borderBottomColor: 'grey',
                  // color: 'black',
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
                value={zip}
                multiline
                numberOfLines={5}
                onChangeText={text => {
                  setZip(text);
                  // setEmailErr('');
                }}
                style={{
                  fontFamily: 'MontserratAlternates-Regular',
                  borderColor: 'grey',
                  borderWidth: 1,
                  marginTop: 10,
                  borderRadius: 5,
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
                value={zip}
                multiline
                numberOfLines={5}
                onChangeText={text => {
                  setZip(text);
                  // setEmailErr('');
                }}
                style={{
                  fontFamily: 'MontserratAlternates-Regular',
                  borderColor: 'grey',
                  marginTop: 10,
                  borderWidth: 1,
                  borderRadius: 5,
                  height: 100,
                }}
              />
            </View>
            <TouchableOpacity
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
    </SafeAreaView>
  );
};
export default Create;
