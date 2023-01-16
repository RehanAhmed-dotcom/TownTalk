import React, {useState, useEffect} from 'react';

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
import {city_posts, checkIn, business_check} from '../../../lib/api';
import Icon from 'react-native-vector-icons/AntDesign';
import Hotspot from '../../../Components/Hotspot';
import Posts from '../../../Components/Posts';
const ExploreTowns = ({navigation, route}) => {
  const {city} = route.params;
  console.log('city', city);
  const {darkmode, userData} = useSelector(({USER}) => USER);
  const dummy = [1, 2, 3, 4, 5];
  // console.log('route', city);
  const [posts, setPosts] = useState([]);
  const [hotSpots, setHotspots] = useState([]);
  const [specific, setSpecific] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [reportId, setReportId] = useState('');
  const [deleteModal, setDeleteModal] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [change, setChange] = useState(false);
  const [blockuserId, setBlockuserId] = useState('');
  const [showReportModal, setShowReportModal] = useState(false);
  const checkPlace = place => {
    business_check({name: place.name, Auth: userData.token})
      .then(res => {
        // setShowModal(false);
        // console.log('res', res);
        if (res.status == 'success') {
          if (res.check) {
            navigation.navigate('RestaurantsDetailBackend', {id: place.name});
          } else {
            navigation.navigate('RestaurantsDetail', {item: place});
          }
        }
      })
      .catch(err => {
        // setShowModal(false);
        console.log('err in check', err);
      });
  };
  const checked = place => {
    checkIn({Auth: userData.token, business_name: place.name})
      .then(res => {
        console.log('res of checkedin', res);
        if (res.status == 'success') {
          setRefresh(!refresh);
        }
      })
      .catch(err => {
        console.log('err in checkedin', err);
      });
  };
  const render = ({item, index}) => (
    <Hotspot
      item={item}
      hottest={index == 0 ? true : false}
      check={() => checkPlace(item)}
      checkedIn={() => checked(item)}
      navigation={navigation}
    />
  );
  useEffect(() => {
    city_posts({Auth: userData.token, location: city})
      .then(res => {
        // console.log('res of city', res);
        setHotspots(res.hotspots);
        setPosts(res.posts);
      })
      .catch(err => {
        console.log('err of city', err);
      });
  }, [refresh]);
  const deletePost = id => {
    setReportId(id);
    setDeleteModal(true);
  };
  const alter = () => {
    // console.log('alter called');
    setChange(!change);
  };
  const handleReport = id => {
    setReportId(id);
    setShowReportModal(true);
  };
  const blockUserComp = id => {
    // console.log('block user id', id);
    setBlockuserId(id);
  };
  const renderItem1 = ({item}) => (
    <Posts
      item={item}
      onShare={() => {
        setSpecific(item);
        setShowModal(true);
      }}
      onPress={() => {
        navigation.navigate('PostDetails', {item});
      }}
      deletePost={deletePost}
      press={alter}
      navigation={navigation}
      tagPress={text => {
        navigation.navigate('Hashes', {tag: item.business_tag});
        console.log('tag press');
      }}
      hashPress={text => {
        console.log('text of hash tag', text);
        navigation.navigate('Hashes', {text});
      }}
      handleReport={handleReport}
      blockuser={blockUserComp}
    />
  );
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
          {city}
        </Text>
        {/* <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: darkmode ? 'white' : 'black',
            }}>
            <Text style={{color: 'grey', fontSize: 14}}>Checkins</Text>
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              marginLeft: 30,
              color: darkmode ? 'white' : 'black',
            }}>
            {' '}
            <Text style={{color: 'grey', fontSize: 14}}>Hottest time</Text>
          </Text>
        </View> */}
        <View
          style={{
            flexDirection: 'row',
            marginTop: 20,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={{fontSize: 16, color: darkmode ? 'white' : 'black'}}>
            Hotspots in {city}
          </Text>
          <Text style={{color: 'grey'}}>See all</Text>
        </View>
        <View>
          <FlatList
            data={hotSpots}
            renderItem={render}
            horizontal
            keyExtractor={item => `${item}a`}
          />
        </View>
        <Text
          style={{
            marginTop: 20,
            fontSize: 16,
            color: darkmode ? 'white' : 'black',
          }}>
          Posts mentioning {city}
        </Text>
        <View style={{height: hotSpots.length > 0 ? '38%' : '75%'}}>
          <FlatList data={posts} renderItem={renderItem1} />
        </View>
      </View>
    </SafeAreaView>
  );
};
export default ExploreTowns;
