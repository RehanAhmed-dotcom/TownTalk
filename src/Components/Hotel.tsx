import React, {useState, useEffect} from 'react';

import {
  View,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import Axios from 'axios';
import LikeDislike from './LikeDislike';
import {config} from '../../config';
// import Comments from '../../../Components/Comments';
import Icon from 'react-native-vector-icons/Fontisto';
const Hotel = props => {
  // console.log('confing', config);
  const {navigation, item} = props;
  // console.log('opne', item?.opening_hours?.open_now);
  const [image, setImage] = useState('');
  const [show, setShow] = useState(false);
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('RestaurantsDetail', {item})}
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
            <View style={{width: '90%'}}>
              <Text
                style={{
                  fontFamily: 'MontserratAlternates-SemiBold',
                  fontSize: 16,
                  color: 'black',
                }}>
                {item.name}
              </Text>
              {/* <View
                style={{
                  flexDirection: 'row',
                  // backgroundColor: 'red',
                  alignItems: 'center',
                  width: '90%',
                  flexWrap: 'wrap',
                }}>
                {item.types.map(element => (
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: 'MontserratAlternates-Medium',
                      marginTop: 5,
                      color: 'black',
                    }}>
                    {element},
                  </Text>
                ))}
              </View> */}

              {/* <Text
                style={{
                  fontSize: 12,
                  fontFamily: 'MontserratAlternates-Medium',
                  marginTop: 5,
                  color: 'black',
                }}>
                Italian, Chinese, Pizza, Fastfood
              </Text> */}
            </View>
            {/* <Text
              style={{
                fontSize: 12,
                fontFamily: 'MontserratAlternates-Medium',
                marginTop: 5,
                color: 'black',
              }}>
              2 Km
            </Text> */}
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
          {item?.opening_hours?.open_now ? 'Open Now' : 'Closed'}
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
          resizeMode={'cover'}
          source={
            item?.photos
              ? {
                  uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${item?.photos[0]?.photo_reference}&key=${config}`,
                }
              : require('../assets/Images/imagePlaceholder.png')
          }
          style={{height: 150, borderRadius: 10, width: '100%', marginTop: 10}}
        />
      </View>

      {/* <Text style={{color: '#5F95F0', fontWeight: 'bold'}}>#{item}</Text> */}
    </TouchableOpacity>
  );
};

export default Hotel;
