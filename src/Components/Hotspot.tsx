import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/EvilIcons';
import {config} from '../../config';
const Hotspot = ({item, navigation}) => {
  return (
    <View
      style={{
        marginRight: 30,
        marginTop: 15,
        width: wp(90),
        // backgroundColor: 'red',
      }}>
      <Image
        resizeMode={'cover'}
        source={
          item?.photos
            ? {
                uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${item?.photos[0]?.photo_reference}&key=${config}`,
              }
            : require('../assets/Images/imagePlaceholder.png')
        }
        style={{height: 200, borderRadius: 10, width: '100%', marginTop: 10}}
      />
      <View
        style={{
          position: 'absolute',
          zIndex: 10,
          //   backgroundColor: 'red',
          top: 10,
          height: 20,
          padding: 10,
          flexDirection: 'row',
          //   alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}>
        <TouchableOpacity
          style={{
            height: 40,
            width: 100,
            borderRadius: 100,
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{color: 'black'}}>Open now</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            height: 40,
            // width: 100,
            borderRadius: 100,
            backgroundColor: '#FF6060',
            paddingHorizontal: 10,
            alignItems: 'center',
            flexDirection: 'row',
            // alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Icon name="local-fire-department" size={15} color="white" />
          <Text style={{color: 'white'}}>Hottest of them all</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 10,
          justifyContent: 'space-between',
        }}>
        <View style={{width: '70%'}}>
          <Text style={{color: 'black', fontSize: 16}}>{item.name}</Text>
          <View
            style={{flexDirection: 'row', marginTop: 5, alignItems: 'center'}}>
            <Icons name="location" size={15} color={'#5F95F0'} />
            <Text style={{fontSize: 12, color: 'grey'}}>{item.vicinity}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={{
            height: 40,
            width: 100,
            borderRadius: 100,
            backgroundColor: '#5F95F0',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{color: 'white'}}>Check in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Hotspot;
