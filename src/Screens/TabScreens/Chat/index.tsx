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
const Chat = ({navigation}) => {
  const [name, setName] = useState('Olivia Benson');
  const [zip, setZip] = useState('');
  const ary = [
    {
      image: require('../../../assets/Images/girl.jpg'),
      name: 'Olivia Benson',
      mesg: 'Shall we meet today',
      time: '5:45 PM',
      unread: '1',
    },
    {
      image: require('../../../assets/Images/girl.jpg'),
      name: 'Olivia Benson',
      mesg: 'Shall we meet today',
      time: '5:45 PM',
      unread: '1',
    },
    {
      image: require('../../../assets/Images/girl.jpg'),
      name: 'Olivia Benson',
      mesg: 'Shall we meet today',
      time: '5:45 PM',
      unread: '1',
    },
    {
      image: require('../../../assets/Images/girl.jpg'),
      name: 'Olivia Benson',
      mesg: 'Shall we meet today',
      time: '5:45 PM',
      unread: '1',
    },
    {
      image: require('../../../assets/Images/girl.jpg'),
      name: 'Olivia Benson',
      mesg: 'Shall we meet today',
      time: '5:45 PM',
      unread: '1',
    },
  ];
  const render = ({item}) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('SingleChat')}
      style={{
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        alignItems: 'center',
        paddingBottom: 20,
        borderBottomColor: '#ccc',
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          source={require('../../../assets/Images/girl.jpg')}
          style={{height: 50, width: 50, borderRadius: 30}}
        />
        <View style={{marginLeft: 10}}>
          <Text
            style={{
              fontSize: 14,
              fontFamily: 'MontserratAlternates-SemiBold',
              color: item.unread ? 'black' : 'black',
            }}>
            {item.name}
          </Text>
          <Text
            style={{
              marginTop: 5,
              color: 'black',
              fontFamily: 'MontserratAlternates-Regular',
            }}>
            {item.mesg}
          </Text>
        </View>
      </View>
      <View style={{alignItems: 'center'}}>
        {item.unread && (
          <View
            style={{
              backgroundColor: '#5F95F0',
              height: 20,
              width: 20,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 30,
              marginBottom: 5,
            }}>
            <Text style={{color: 'white', fontSize: 12}}>{item.unread}</Text>
          </View>
        )}
        <Text
          style={{
            color: 'black',
            fontFamily: 'MontserratAlternates-Regular',
            fontSize: 10,
          }}>
          {item.time}
        </Text>
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
            justifyContent: 'space-between',
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
              Inbox
            </Text>
            {/* <Text style={{fontFamily: 'MontserratAlternates-Regular'}}>
              Chicago, IL 60611, USA
            </Text> */}
          </View>
          <Image
            source={require('../../../assets/Images/search.png')}
            style={{height: 20, width: 20}}
          />
        </View>
        <View style={{paddingHorizontal: 15}}>
          <FlatList data={ary} renderItem={render} />
        </View>
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
export default Chat;
