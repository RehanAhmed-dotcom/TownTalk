import React, {useState} from 'react';

import {
  SafeAreaView,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  View,
  TextInput,
  FlatList,
} from 'react-native';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import Hotspot from '../../../Components/Hotspot';
const ExploreTowns = ({navigation}) => {
  const {darkmode} = useSelector(({USER}) => USER);
  const dummy = [1, 2, 3, 4, 5];
  const render = ({item}) => <Hotspot item={item} />;
  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: darkmode ? 'black' : 'white'}}>
      <View
        style={{
          height: 80,
          // elevation: 3,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 15,
          backgroundColor: darkmode ? '#242527' : 'white',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            height: 25,
            backgroundColor: '#ccc',
            width: 25,
            alignItems: 'center',
            borderRadius: 5,
            justifyContent: 'center',
          }}>
          <Icon color="black" name="arrowleft" size={20} />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 16,
            fontFamily: 'MontserratAlternates-SemiBold',
            color: darkmode ? 'white' : 'black',
          }}>
          Explore
        </Text>
        <View style={{width: 50}} />
        {/* <Icon1 name="diff-added" size={25} color="black" /> */}
      </View>
      <View style={{paddingHorizontal: 15}}>
        <Text style={{fontSize: 18, color: darkmode ? 'white' : 'black'}}>
          Middlesex County
        </Text>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: darkmode ? 'white' : 'black',
            }}>
            2,334 <Text style={{color: 'grey', fontSize: 14}}>Checkins</Text>
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              marginLeft: 30,
              color: darkmode ? 'white' : 'black',
            }}>
            7:30pm{' '}
            <Text style={{color: 'grey', fontSize: 14}}>Hottest time</Text>
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 20,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={{fontSize: 16, color: darkmode ? 'white' : 'black'}}>
            Hotspots in Middlesex County
          </Text>
          <Text style={{color: 'grey'}}>See all</Text>
        </View>
        <View>
          <FlatList
            data={dummy}
            renderItem={render}
            horizontal
            keyExtractor={item => `${item}a`}
          />
        </View>
        <Text style={{marginTop: 20, fontSize: 16, color: 'black'}}>
          Posts mentioning Middlesex County
        </Text>
      </View>
    </SafeAreaView>
  );
};
export default ExploreTowns;
