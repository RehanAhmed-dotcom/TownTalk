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
import Hotspot from '../../../Components/Hotspot';
import Icon from 'react-native-vector-icons/Feather';
const Explore = ({navigation}) => {
  const [search, setSearch] = useState('');
  const dummy = [1, 2, 3, 4, 5];
  const render = ({item}) => <Hotspot item={item} />;
  const renders = ({item}) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('ExploreTowns')}
      style={{
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        paddingBottom: 20,
        marginTop: 20,
      }}>
      <Text style={{fontSize: 16, color: 'black'}}>Middlesex County</Text>
      <Text style={{marginTop: 5, color: 'grey'}}>2,334 Check ins</Text>
    </TouchableOpacity>
  );
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          height: 80,
          // elevation: 3,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 15,
          justifyContent: 'center',
        }}>
        <Text
          style={{
            fontSize: 16,
            fontFamily: 'MontserratAlternates-SemiBold',
            color: 'black',
          }}>
          Explore
        </Text>

        {/* <Icon1 name="diff-added" size={25} color="black" /> */}
      </View>
      <ScrollView>
        <View style={{paddingHorizontal: 15}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: 50,
                paddingHorizontal: 15,
                backgroundColor: '#ccc',
                borderRadius: 10,
                width: '80%',
              }}>
              <Icon name="search" color="#5F95F0" size={20} />
              <TextInput
                value={search}
                onChangeText={text => setSearch(text)}
                placeholder="Search"
                placeholderTextColor={'grey'}
                style={{color: 'black', flex: 1}}
              />
            </View>
            <TouchableOpacity
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#200E32',
                height: 50,
                width: 50,
                borderRadius: 10,
              }}>
              <Image
                source={require('../../../assets/Images/whitefilter.png')}
                style={{height: 20, width: 20}}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('HotspotsNearby')}>
              <Text style={{fontSize: 16, color: 'black'}}>
                Hotspots Nearby
              </Text>
            </TouchableOpacity>
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
          <Text style={{marginTop: 20, color: 'black', fontSize: 16}}>
            #Trendingtowns
          </Text>
          <View>
            <FlatList
              data={dummy}
              renderItem={renders}
              keyExtractor={item => `${item}a`}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Explore;
