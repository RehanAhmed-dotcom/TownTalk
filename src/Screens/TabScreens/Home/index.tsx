import React, {useState, useCallback, useEffect} from 'react';
import moment from 'moment';
import {
  View,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
  Text,
  Platform,
  PermissionsAndroid,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import Axios from 'axios';
import PushNotification from 'react-native-push-notification';
// import GooglePlacesAutocomplete, {
//   geocodeByAddress,
//   getLatLng,
// } from 'react-google-places-autocomplete';
import database from '@react-native-firebase/database';
import messaging from '@react-native-firebase/messaging';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Entypo';
import Icon1 from 'react-native-vector-icons/EvilIcons';
import Icon2 from 'react-native-vector-icons/AntDesign';
import Icon3 from 'react-native-vector-icons/Feather';
import {useSelector, useDispatch} from 'react-redux';
import {updateToken} from '../../../lib/api';
import {viewAllPost, blockUser, reportUser, hashTag} from '../../../lib/api';
// import {logoutuser} from '../../../redux/actions';
import Geolocation from 'react-native-geolocation-service';
import Posts from '../../../Components/Posts';
import {lat, long, logoutuser} from '../../../redux/actions';
const Home = ({navigation}) => {
  const arr = ['fun', 'danger', 'helpful', 'adventure', 'hobby'];
  const [latitude, setlatitude] = useState(0);
  const dispatch = useDispatch();
  const [longitude, setlongitude] = useState(0);
  const [page, setPage] = useState(1);
  const [select, setSelect] = useState('');
  const [datas, setData] = useState([]);
  const [location, setLocation] = useState('');
  const [specific, setSpecific] = useState({});
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [testArr, setTestArr] = useState([]);
  const [hash, setHash] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showfilter, setShowFilter] = useState(false);
  const [reportId, setReportId] = useState('');
  const [reportReason, setReportReason] = useState('');
  const [blockuserId, setBlockuserId] = useState('');
  const [filter, setFilter] = useState('all');
  const [showReportModal, setShowReportModal] = useState(false);
  const {userData, Lat, Long} = useSelector(({USER}) => USER);
  const [change, setChange] = useState(false);
  const [list, setList] = useState([]);
  // console.log('lat long in redux', datas);
  const _usersList = useCallback(async () => {
    try {
      // setLoading(true);
      database()
        .ref('users/' + userData.userdata.email.replace(/[^a-zA-Z0-9 ]/g, ''))
        .orderByChild('timestamp')
        .on('value', dataSnapshot => {
          let users = [];
          dataSnapshot.forEach(child => {
            users.push(child.val());
          });
          // console.log('users', users);
          setList(users.reverse());
          // setLoading(false);

          // console.log("user list in chat list ", JSON.stringify(users))
        });
    } catch (error) {}
  }, []);
  const alter = () => {
    // console.log('alter called');
    setChange(!change);
  };
  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        cuRRentlocation();
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const cuRRentlocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        setlatitude(position.coords.latitude);
        setlongitude(position.coords.longitude);
        lat(position.coords.latitude)(dispatch);
        long(position.coords.longitude)(dispatch);
        // getPlace('40.6727', '-74.2152');
        getPlace(position.coords.latitude, position.coords.longitude);
        // viewAllPost({
        //   Auth: userData.token,
        //   page,
        //   latitude: position.coords.latitude,
        //   longitude: position.coords.longitude,
        // })
        //   .then(res => {
        //     // console.log('res', res);
        //     setData(res.posts.data);
        //   })
        //   .catch(err => {
        //     console.log('err in home', err.response.data);
        //   });
        // getPlace('47.751076', '-120.740135');
        // console.log('users location', position.coords.longitude);

        // console.log('users location', position.coords.latitude);
      },
      error => {
        console.log('error in loc', error);
      },
      {
        enableHighAccuracy: true,
        // timeout: 15000,
        // maximumAge: 10000
      },
    );
  };
  useEffect(() => {
    getToken();
    // PushNotification.cancelAllLocalNotifications();
  }, []);
  const getToken = async () => {
    let fcmToken = await messaging().getToken();
    updateToken({Auth: userData.token, fcm_token: fcmToken})
      .then(res => {
        if (res.status == 'success') {
          console.log('updated');
        }
      })
      .catch(err => {
        logoutuser(false)(dispatch);
      });
    messaging().onTokenRefresh(token => {
      updateToken({Auth: userData.token, fcm_token: token})
        .then(res => {
          if (res.status == 'success') {
            console.log('updated');
          }
        })
        .catch(err => {
          logoutuser(false)(dispatch);
        });
    });
  };
  useEffect(() => {
    // handleAddress('solo');
    // PushNotification.cancelAllLocalNotifications();
    Platform.OS == 'ios'
      ? Geolocation.requestAuthorization('always').then(res => {
          cuRRentlocation();
          // console.log('res', res);
        })
      : requestLocationPermission();
  }, []);
  const increasePage = () => {
    setRefreshing(true);
    viewAllPost({
      Auth: userData.token,
      page: page + 1,
      latitude: latitude ? latitude : Lat,
      longitude: longitude ? longitude : Long,
      filter_post: filter,
    })
      .then(res => {
        // console.log('res of pagination', res);
        setRefreshing(false);
        // setTestArr([...testArr, ...res.posts.data]);
        if (res.status == 'success') {
          setData([...datas, ...res.posts.data]);
          setPage(page + 1);
        }
      })
      .catch(err => {
        setRefreshing(false);
      });
  };
  useEffect(() => {
    // PushNotification.cancelAllLocalNotifications();
    hashTag({Auth: userData.token, latitude, longitude}).then(res => {
      // console.log('res of hash', res);
      setHash(res.hashtags);
    });
    _usersList();
    viewAllPost({
      Auth: userData.token,
      page: 1,
      latitude: latitude ? latitude : Lat,
      longitude: longitude ? longitude : Long,
      filter_post: filter,
    })
      .then(res => {
        // console.log('res', res);
        setData(res.posts.data);
        setTestArr(res.posts.data);
      })
      .catch(err => {
        console.log('err in home', err.response.data);
      });
  }, [lat, change]);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setSelect('');
      setPage(1);
      // PushNotification.cancelAllLocalNotifications();
      // setChange(!change);
      hashTag({Auth: userData.token, latitude, longitude}).then(res => {
        // console.log('res of hash', res);
        setHash(res.hashtags);
      });
      viewAllPost({
        Auth: userData.token,
        page: 1,
        latitude: latitude ? latitude : Lat,
        longitude: longitude ? longitude : Long,
        filter_post: filter,
      })
        .then(res => {
          // console.log('res of new api', res);
          setData(res.posts.data);
          setTestArr(res.posts.data);
        })
        .catch(err => {
          console.log('err in home', err.response.data);
        });
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);
  const render = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        setShowModal(false);
        navigation.navigate('SingleChat', {
          item: item.user,
          image: specific.media[0].media,
          items: specific,
        });
      }}
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
          source={
            item.user.image
              ? {uri: item.user.image}
              : require('../../../assets/Images/girl.jpg')
          }
          style={{height: 50, width: 50, borderRadius: 30}}
        />
        <View style={{marginLeft: 10}}>
          <Text
            style={{
              fontSize: 14,
              fontFamily: 'MontserratAlternates-SemiBold',
              color: item.unread ? 'black' : 'black',
            }}>
            {`${item.user.firstname}`}
          </Text>
          {/* <Text
            style={{
              marginTop: 5,
              color: 'black',
              fontFamily: 'MontserratAlternates-Regular',
            }}>
            {/* {item.latestMessage} 
          </Text> */}
        </View>
      </View>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          height: 30,
          width: 30,
          borderRadius: 20,
          backgroundColor: '#5F95F0',
        }}>
        <Icon3 name="send" color="white" size={18} />
      </View>
    </TouchableOpacity>
  );
  const MyModal = (show: boolean) => {
    // console.log('show', latitude, longitude);
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={show}
        onRequestClose={() => setShowModal(!showModal)}>
        <TouchableOpacity
          onPress={() => setShowModal(!showModal)}
          style={{
            flex: 1,
            // height: hp(100),
            backgroundColor: '#00000088',
            alignItems: 'center',
            justifyContent: 'flex-end',
            zIndex: 200,
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            // position: 'absolute',
          }}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => console.log('hello')}
            style={{
              // height: '45%',
              maxHeight: '40%',
              minHeight: '20%',
              width: '100%',
              borderRadius: 10,
              backgroundColor: 'white',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                marginTop: 15,
                marginRight: 15,
              }}>
              {/* <Icon
                name="circle-with-cross"
                size={20}
                color="black"
                onPress={() => setShowModal(false)}
              /> */}
            </View>
            <Text
              style={{
                marginLeft: 10,
                fontSize: 16,
                color: 'black',
                fontFamily: 'MontserratAlternates-SemiBold',
              }}>
              Share with contacts
            </Text>
            <View style={{paddingHorizontal: 10, marginBottom: 20}}>
              <FlatList data={list} renderItem={render} />
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    );
  };
  // console.log('page', page);
  const handleReport = id => {
    setReportId(id);
    setShowReportModal(true);
  };
  const blockUserComp = id => {
    // console.log('block user id', id);
    setBlockuserId(id);
  };
  const ReportModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={showReportModal}
        onRequestClose={() => setShowReportModal(false)}>
        <TouchableOpacity
          onPress={() => setShowReportModal(false)}
          style={{
            flex: 1,
            // height: hp(100),
            backgroundColor: '#00000088',
            alignItems: 'center',
            justifyContent: 'flex-end',
            zIndex: 200,
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            // position: 'absolute',
          }}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => console.log('hello')}
            style={{
              height: '45%',
              width: '100%',
              backgroundColor: 'white',
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              padding: 20,
            }}>
            <Text
              style={{
                fontFamily: 'MontserratAlternates-SemiBold',
                fontSize: 16,
                color: 'black',
              }}>
              Report this post
            </Text>
            <Text
              style={{
                fontFamily: 'MontserratAlternates-Regular',
                fontSize: 14,
                color: 'grey',
                marginTop: 10,
              }}>
              If someone is in immediate danger, get help before reporting to
              Towntalk. Don't wait.
            </Text>
            <TextInput
              value={reportReason}
              onChangeText={text => setReportReason(text)}
              style={{
                backgroundColor: '#ccc',
                height: 100,
                borderRadius: 10,
                color: 'black',
                padding: 10,
                marginTop: 15,
              }}
              placeholder="Why do you want to report this post?"
              placeholderTextColor="grey"
              numberOfLines={4}
              multiline
              textAlignVertical="top"
            />

            <TouchableOpacity
              onPress={() => {
                reportUser({Auth: userData.token, post_id: reportId})
                  .then(res => {
                    console.log('res of report', res);
                  })
                  .catch(err => {
                    console.log('err in report', err);
                  });
                setShowReportModal(false);
              }}
              style={{
                width: '100%',
                height: 50,
                backgroundColor: '#5F95F0',
                marginTop: 15,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'MontserratAlternates-SemiBold',
                }}>
                Report
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                reportUser({Auth: userData.token, post_id: reportId})
                  .then(res => {
                    console.log('res of report', res);
                  })
                  .catch(err => {
                    console.log('err in report', err);
                  });
                blockUser({Auth: userData.token, block_user_id: blockuserId})
                  .then(res => {
                    console.log('res of block', res);
                    setChange(!change);
                  })
                  .catch(err => {
                    console.log('err in block', err);
                  });
                setShowReportModal(false);
              }}
              style={{
                width: '100%',
                height: 50,
                backgroundColor: '#200E32',
                marginTop: 15,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'MontserratAlternates-SemiBold',
                }}>
                Report & block user
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    );
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
  const getPlace = (latitude, longitude) => {
    // console.log('inside get place fuction');
    // console.log('lat long', latitude, longitude);
    let radius = 100;
    // let myapikey = 'AIzaSyB_H2_55fkLI8-EyfYLUlJI4obywUd-KnE';
    // let mapKey = 'AIzaSyBC2R0hGR9kjgysDNUsOWHWF_oU0jc6DIg';
    let mapKey = 'AIzaSyCmhmQiZWqaMzKclPUY-mEshxF7Lj4T4NI';
    // let request = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&key=${myapikey}`;
    let request = `https://maps.googleapis.com/maps/api/geocode/json?address=${latitude},${longitude}&key=${mapKey}`;
    // let request = `https://maps.googleapis.com/maps/api/geocode/json?address=${lot},${logo}&key=${mapKey}`;
    return Axios.get(request)
      .then(({data, status}) => {
        // console.log('data', data.results[0].address_components);
        // setLocation("Rawalpindi")
        // console.log('whole responce', JSON.stringify(data));
        // const currentCity = data.results[0].address_components.filter(
        //   x =>
        //     x.types.filter(
        //       t =>
        //         t == 'administrative_area_level_2' ||
        //         'administrative_area_level_1',
        //     ).length > 0,
        // )[2].long_name;
        const currentCity = data.results[0].address_components.filter(
          x =>
            x.types.filter(
              t =>
                t == 'administrative_area_level_1' ||
                t == 'administrative_area_level_2',
            ).length > 0,
        )[0].long_name;
        // console.log('city current city', currentCity);

        setLocation(currentCity);
        // console.log('place', JSON.stringify(data.results[0].name));
        // return status === 200 || status === 201 ? data : null;
      })
      .catch(e => {});
  };
  // console.log('location', datas[0]);
  // const lat = 33.5344737;
  const onRefresh = () => {
    setRefreshing(true);
    viewAllPost({
      Auth: userData.token,
      page: 1,
      latitude: latitude ? latitude : Lat,
      longitude: longitude ? longitude : Long,
      filter_post: filter,
    })
      .then(res => {
        // console.log('res of new api', res);
        setData(res.posts.data);
        setTestArr(res.posts.data);
        setRefreshing(false);
      })
      .catch(err => {
        setRefreshing(false);
        console.log('err in home', err.response.data);
      });
    // setLoadAble(true);
    // setLoading(true);
    // getHomeData_API(1)
    //   .then((res) => {
    //     if (res) {
    //       const { homebanner, status, newsfeedlist } = res;
    //       if (status === "success") {
    //         Array.isArray(homebanner) && setHeading(homebanner[0]);
    //         Array.isArray(newsfeedlist) && setList(newsfeedlist);
    //       }
    //     }
    //   })
    // .catch((e) => {})
    // .finally(() => {
    //   setPage(2);
    // setRefreshing(false);
    // setLoading(false);
    // });
  };
  // const long = 73.0525821;
  // console.log('test arr length', testArr.length);
  return (
    <SafeAreaView style={{flex: 1}}>
      {/* <ImageBackground
        style={{flex: 1}}
        source={require('../../../assets/Images/back.png')}> */}
      <View
        style={{
          height: 80,
          backgroundColor: 'white',
          // elevation: 3,
          flexDirection: 'row',
          alignItems: 'center',

          paddingHorizontal: 15,
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            style={{height: 50, width: 50, borderRadius: 30}}
            source={
              userData?.userdata?.image
                ? {uri: userData?.userdata?.image}
                : require('../../../assets/Images/girl.jpg')
            }
          />
          <View style={{marginLeft: 10}}>
            <Text style={{fontSize: 12, color: 'grey'}}>
              Hello {userData?.userdata?.firstname}!
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon1 name="location" size={20} color={'#5F95F0'} />
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: 'MontserratAlternates-SemiBold',
                  color: '#5F95F0',
                }}>
                {location}
                {/* {`${userData?.userdata?.firstname}`} */}
              </Text>
              <TouchableOpacity
                style={{
                  height: 20,
                  width: 20,
                  backgroundColor: '#5F95F0',
                  borderRadius: 10,
                  alignItems: 'center',
                  marginLeft: 5,
                  justifyContent: 'center',
                }}>
                <Icon1 name="pencil" size={15} color="white" />
              </TouchableOpacity>
            </View>
          </View>

          {/* <Text style={{fontFamily: 'MontserratAlternates-Regular'}}>
              {location}
            </Text> */}
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity
            style={{
              width: 25,
              height: 25,
              borderWidth: 1,
              backgroundColor: 'white',
              borderRadius: 5,
              alignItems: 'center',
              justifyContent: 'center',
              borderColor: '#ccc',
            }}
            onPress={() => navigation.navigate('Search')}>
            <Icon2 name="search1" size={18} color="black" />
            {/* <Image
              source={require('../../../assets/Images/search.png')}
              style={{height: 15, width: 15}}
            /> */}
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 25,
              height: 25,
              borderWidth: 1,
              backgroundColor: 'white',
              borderRadius: 5,
              alignItems: 'center',
              marginLeft: 5,
              justifyContent: 'center',
              borderColor: '#ccc',
            }}
            onPress={() => navigation.navigate('Notification')}>
            <Image
              resizeMode="contain"
              source={require('../../../assets/Images/BellIcon.png')}
              style={{
                height: 15,
                // marginLeft: 10,
                width: 15,
                // borderWidth: 1,
                // borderColor: 'grey',
                // borderRadius: 5,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
      {/* <FlatList horizontal data={arr} renderItem={renderItem} /> */}
      {/* <ScrollView> */}
      <View
        style={{
          // marginTop: 10,
          backgroundColor: 'white',
          paddingHorizontal: 12,
          flex: 1,
        }}>
        {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {arr.map(item => (
            <View
              style={{
                height: 30,
                backgroundColor: 'white',
                marginRight: 10,
                elevation: 3,
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: 100,
                borderRadius: 5,
              }}>
              <Text style={{color: '#5F95F0', fontWeight: 'bold'}}>
                #{item}
              </Text>
            </View>
          ))}
        </View> */}
        {/* <FlatList horizontal data={hash} renderItem={renderItem} /> */}
        {/* <ScrollView> */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            zIndex: 134,
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontSize: 14,
              fontFamily: 'MontserratAlternates-SemiBold',
              color: 'black',
            }}>
            Recent posts
          </Text>
          <TouchableOpacity
            onPress={() => setShowFilter(!showfilter)}
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={require('../../../assets/Images/filters.png')}
              style={{height: 20, width: 20}}
              resizeMode="contain"
            />
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'MontserratAlternates-Regular',
                color: 'black',
                marginLeft: 3,
              }}>
              Filters
            </Text>
            {showfilter && (
              <View
                style={{
                  height: 200,
                  width: 150,
                  right: 0,
                  top: 20,
                  zIndex: 250,
                  position: 'absolute',
                  // backgroundColor: '#ccc',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setFilter('all');
                    setShowFilter(!showfilter);
                    setTimeout(function () {
                      setChange(!change);
                    }, 1000);
                  }}
                  style={{
                    height: 40,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,

                    justifyContent: 'center',
                    borderBottomWidth: 1,
                    borderBottomColor: 'grey',

                    paddingLeft: 10,
                    backgroundColor: '#ccc',
                    // elevation: 1,
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: 'black',
                      fontFamily: 'MontserratAlternates-Medium',
                    }}>
                    All
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setFilter('recent');
                    setShowFilter(!showfilter);
                    setTimeout(function () {
                      setChange(!change);
                    }, 1000);
                  }}
                  style={{
                    height: 40,

                    justifyContent: 'center',
                    borderBottomWidth: 1,
                    borderBottomColor: 'grey',

                    paddingLeft: 10,
                    backgroundColor: '#ccc',
                    // elevation: 1,
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: 'black',
                      fontFamily: 'MontserratAlternates-Medium',
                    }}>
                    Most Recent
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setFilter('likes');
                    setShowFilter(!showfilter);
                    setTimeout(function () {
                      setChange(!change);
                    }, 1000);
                  }}
                  style={{
                    height: 40,

                    justifyContent: 'center',
                    borderBottomWidth: 1,
                    borderBottomColor: 'grey',

                    paddingLeft: 10,
                    backgroundColor: '#ccc',
                    // elevation: 1,
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: 'black',
                      fontFamily: 'MontserratAlternates-Medium',
                    }}>
                    Most Likes
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setFilter('comments');
                    setShowFilter(!showfilter);
                    setTimeout(function () {
                      setChange(!change);
                    }, 1000);
                  }}
                  style={{
                    height: 40,
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,

                    justifyContent: 'center',
                    // borderBottomWidth: 1,
                    borderBottomColor: 'grey',

                    paddingLeft: 10,
                    backgroundColor: '#ccc',
                    // elevation: 1,
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: 'black',
                      fontFamily: 'MontserratAlternates-Medium',
                    }}>
                    Most Comments
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginTop: 10,
            // flex: 1,
            width: '100%',
            paddingBottom: 0,
            height: hp(Platform.OS == 'ios' ? 73 : 78.5),
          }}>
          <FlatList
            data={datas}
            // onEndReachedThreshold={0.5}
            onRefresh={onRefresh}
            keyExtractor={item => item.id + 'a'}
            refreshing={refreshing}
            onEndReached={increasePage}
            renderItem={renderItem1}
          />
        </View>
        {/* </ScrollView> */}
      </View>
      {/* </ImageBackground> */}

      {/* </ScrollView> */}

      {/* <Text>Home</Text> */}
      {MyModal(showModal)}
      {ReportModal()}
    </SafeAreaView>
  );
};
export default Home;
