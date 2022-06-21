import React, {useState} from 'react';

import {
  View,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import LikeDislike from './LikeDislike';
// import Comments from '../../../Components/Comments';
import Icon from 'react-native-vector-icons/Fontisto';
const Hotel = props => {
  //   console.log('props', props);
  const {navigation} = props;
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
  const [show, setShow] = useState(false);
  const arr = ['fun', 'danger', 'helpful', 'adventure', 'hobby'];
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('RestaurantsDetail')}
      style={{
        // height: 30,
        backgroundColor: 'white',
        marginRight: 10,
        elevation: 3,
        // alignItems: 'center',
        // justifyContent: 'center',
        // minWidth: 100,
        marginLeft: 3,
        marginVertical: 3,
        marginTop: 10,
        padding: 10,
        borderRadius: 5,
      }}>
      <View
        style={{
          // marginTop: 20,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{alignItems: 'center', flexDirection: 'row'}}>
          {/* <Image
            source={require('../assets/Images/girl.jpg')}
            style={{width: 50, height: 50, borderRadius: 50}}
          /> */}
          <View
            style={{
              marginLeft: 0,
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
            }}>
            <View>
              <Text
                style={{
                  fontFamily: 'MontserratAlternates-SemiBold',
                  fontSize: 16,
                  color: 'black',
                }}>
                Hunain Restaurant
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: 'MontserratAlternates-Medium',
                  marginTop: 5,
                  color: 'black',
                }}>
                Italian, Chinese, Pizza, Fastfood
              </Text>
            </View>
            <Text
              style={{
                fontSize: 12,
                fontFamily: 'MontserratAlternates-Medium',
                marginTop: 5,
                color: 'black',
              }}>
              2 Km
            </Text>
          </View>
        </View>
        {/* <Icon name="dots-three-horizontal" size={20} /> */}
      </View>
      <View
        style={{
          marginTop: 10,
          width: '100%',
          // flexDirection: 'row',
          alignItems: 'center',
          // backgroundColor: 'red',
          overflow: 'hidden',
        }}>
        {/* <FlatList horizontal data={arr} renderItem={renderItem3} /> */}
        {/* {arr.map(item => (
        <View>
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
      ))} */}
      </View>
      <View style={{marginTop: 5}}>
        <Text
          style={{
            fontSize: 12,
            fontFamily: 'MontserratAlternates-Medium',
            // marginTop: 5,
            color: 'black',
          }}>
          Open Now
        </Text>
        {/* <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View>
            <Text
              style={{
                fontSize: 13,
                color: 'black',
                fontFamily: 'MontserratAlternates-Medium',
              }}>
              PKR 4500
            </Text>
            <Text
              style={{
                fontSize: 10,
                color: 'black',
                fontFamily: 'MontserratAlternates-Regular',
              }}>
              Booking.com
            </Text>
            <Text
              style={{
                fontSize: 10,
                color: 'black',
                fontFamily: 'MontserratAlternates-Regular',
              }}>
              Reserve now, pay at stay
            </Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon
                name="star"
                size={10}
                color="#5F95F0"
                style={{marginLeft: 3}}
              />
              <Icon
                name="star"
                size={10}
                color="#5F95F0"
                style={{marginLeft: 3}}
              />
              <Icon
                name="star"
                size={10}
                color="#5F95F0"
                style={{marginLeft: 3}}
              />
              <Icon
                name="star"
                size={10}
                color="#5F95F0"
                style={{marginLeft: 3}}
              />
              <Icon
                name="star"
                size={10}
                color="#5F95F0"
                style={{opacity: 0.5, marginLeft: 3}}
              />
            </View>
            <TouchableOpacity
              style={{
                width: 70,
                height: 20,
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
        </View> */}
        <Image
          source={require('../assets/Images/dish.jpg')}
          style={{height: 150, borderRadius: 10, width: '100%', marginTop: 10}}
        />
      </View>

      {/* <Text style={{color: '#5F95F0', fontWeight: 'bold'}}>#{item}</Text> */}
    </TouchableOpacity>
  );
};

export default Hotel;
