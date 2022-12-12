import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/EvilIcons';
const Hotspot = ({item}) => {
  return (
    <View
      style={{
        marginRight: 30,
        marginTop: 15,
        width: wp(90),
        // backgroundColor: 'red',
      }}>
      <Image
        source={require('../assets/Images/download.jpg')}
        style={{width: '100%', height: 250, borderRadius: 10}}
      />
      <View
        style={{
          position: 'absolute',
          zIndex: 10,
          //   backgroundColor: 'red',
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
        <View>
          <Text style={{color: 'black', fontSize: 16}}>Nightclub 123</Text>
          <View
            style={{flexDirection: 'row', marginTop: 5, alignItems: 'center'}}>
            <Icons name="location" size={15} color={'#5F95F0'} />
            <Text style={{fontSize: 12, color: 'grey'}}>
              22 elm street Los Angeles,California
            </Text>
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
