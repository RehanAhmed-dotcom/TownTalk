import React, {useState, useEffect} from 'react';
import moment from 'moment';
import {
  View,
  FlatList,
  TextInput,
  ScrollView,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Modal,
  KeyboardAvoidingView,
  Image,
  Text,
  ImageBackground,
  PermissionsAndroid,
} from 'react-native';
import Tags from 'react-native-tags';
import MentionHashtagTextView from 'react-native-mention-hashtag-text';
import {config} from '../../../../config';
import Geolocation from 'react-native-geolocation-service';
import MapView from 'react-native-maps';
import {addPost} from '../../../lib/api';
import MyModal from '../../../Components/MyModal';
import LikeDislike from '../../../Components/LikeDislike';
import Comments from '../../../Components/Comments';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Feather';
import Icon1 from 'react-native-vector-icons/EvilIcons';
import IconFire from 'react-native-vector-icons/MaterialIcons';
import Hotel from '../../../Components/Hotel';
import {useSelector} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import Swiper from 'react-native-swiper';
const Create = ({navigation}) => {
  const {userData} = useSelector(({USER}) => USER);
  const [name, setName] = useState(`${userData?.userdata?.firstname}`);
  const [img, setImg] = useState([]);
  const [zip, setZip] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [tagedBusiness, setTagedBusiness] = useState('');
  const [description, setDescription] = useState('');
  const [businessList, setBusinessList] = useState([]);
  const [tagBusinessModal, setTagBusinessModal] = useState(false);
  // const [hash, setHash] = useState([]);
  const [count, setCount] = useState(0);
  const [video, setVideo] = useState(true);
  const [search, setSearch] = useState('');
  const [latitude, setlatitude] = useState(0);
  const [longitude, setlongitude] = useState(0);
  const d = new Date();
  console.log('date', moment(d).format('MM-DD-YYYY hh:mm a'));
  // console.log('userdata', hash);
  const picker = (camera: string) => {
    camera == 'Gallery'
      ? ImagePicker.openPicker({
          width: 1500,
          height: 1500,
          cropping: true,
        }).then(image => {
          setImg([...img, {image: image.path}]);
          setCount(count + 1);
        })
      : camera == 'Video'
      ? ImagePicker.openPicker({
          mediaType: 'video',
        }).then(video => {
          console.log(video);
          setImg([...img, {video: video.path}]);
          setVideo(false);
        })
      : ImagePicker.openCamera({
          width: 1500,
          height: 1500,
          cropping: true,
        }).then(image => {
          setImg([...img, {image: image.path}]);
          setCount(count + 1);
        });
  };
  console.log('img has video?', img);
  const add = () => {
    // if (zip && latitude) {
    if (latitude) {
      // if (hash.length > 0) {
      if (description || img.length > 0) {
        setShowModal(true);
        const data = new FormData();
        // hash.forEach(item => {
        //   data.append('hashtags[]', item.substring(0, 200));
        // });
        data.append('zipcode', zip);
        data.append('latitude', latitude);
        data.append('longitude', longitude);
        data.append('business_tag', tagedBusiness);
        data.append('description', description);
        data.append('dateTime', moment(d).format('MM-DD-YYYY hh:mm a'));
        data.append('title', name);

        img.forEach(item => {
          // item.image
          // ? data.append('media_type', 'image')
          // : data.append('media_type', 'video');
          item.image
            ? data.append('media[]', {
                uri: item.image,
                type: 'image/jpeg',
                name: `image${Math.random()}.jpg`,
              })
            : // data.append('media_type', 'image')
              data.append('media[]', {
                uri: item.video,
                type: 'video/mp4',
                name: `video${Math.random()}.mp4`,
              });
          // data.append('media_type', 'video')
        });

        addPost({Auth: userData.token}, data)
          .then(res => {
            setShowModal(false);
            console.log('res', res);
            if (res.status == 'success') {
              navigation.goBack();
              setImg([]);
              setTagedBusiness('');
              setCount(0);
              setVideo(true);
              // setName('');
              setZip('');
              setDescription('');
              // setHash([]);
            }
          })
          .catch(err => {
            setShowModal(false);
            console.log('err', err.response.data);
            Alert.alert('Something went wrong, please try again!');
          });
      } else {
        Alert.alert('Enter post detail!');
      }

      // } else {
      //   Alert.alert("Enter Hash tag then press 'space'");
      // }
    } else {
      Alert.alert('Location required');
    }
  };
  const handleRestaurantSearch = (lat: Number, long: Number) => {
    // console.log('here');
    const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?';
    const location = `location=${lat},${long}`;
    const radius = '&radius=2000';
    const type = `&keyword=Entertainment`;
    const key = `&key=${config}`;
    const restaurantSearchUrl = url + location + radius + type + key;
    fetch(restaurantSearchUrl)
      .then(response => response.json())
      .then(result => {
        // console.log('result', result.results);
        setBusinessList(result.results);
        // setList(result.results);
        // setShowModal(false);
        // console.log('results', result.results);
      })
      // .then(result => this.setState({restaurantList: result}))
      .catch(e => {
        console.log('err', e);
        // setShowModal(false);
      });
  };
  const cuRRentlocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        setlatitude(position.coords.latitude);
        setlongitude(position.coords.longitude);
        // getPlace(position.coords.latitude, position.coords.longitude);
        // getPlace('47.751076', '-120.740135');
        console.log('users location', position.coords.longitude);

        console.log('users location', position.coords.latitude);
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
  console.log('lat', latitude, longitude);
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
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setTagedBusiness('');
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);
  useEffect(() => {
    Platform.OS == 'ios'
      ? Geolocation.requestAuthorization('always').then(res => {
          cuRRentlocation();
          console.log('res', res);
        })
      : requestLocationPermission();
  }, []);
  const Wrapper = Platform.OS == 'ios' ? KeyboardAvoidingView : View;
  const render = ({item}) => (
    <Image
      source={{uri: item.image ? item.image : item.video}}
      style={{width: 130, height: 150, marginRight: 10, borderRadius: 10}}
    />
  );
  const renders = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        setTagedBusiness(item.name);
        setTagBusinessModal(false);
      }}
      style={{
        marginTop: 20,
        paddingBottom: 20,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
      }}>
      <Text style={{fontSize: 16, color: 'black'}}>{item.name}</Text>
      <Text style={{color: 'grey', marginTop: 5}}>{item.vicinity}</Text>
    </TouchableOpacity>
  );
  const tagModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      onRequestClose={() => setTagBusinessModal(false)}
      visible={tagBusinessModal}>
      <View
        style={{
          flex: 1,
          backgroundColor: '#00000088',
          justifyContent: 'flex-end',
        }}>
        <View
          style={{
            backgroundColor: 'white',
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            width: '100%',
            paddingHorizontal: 15,
            // paddingTop: 30,
            paddingBottom: 20,
            // height: 50,
          }}>
          <View style={{alignItems: 'center'}}>
            <IconFire
              name="horizontal-rule"
              onPress={() => setTagBusinessModal(false)}
              size={50}
              color="#ccc"
            />
          </View>
          <Text style={{fontSize: 18, fontWeight: '600', color: 'black'}}>
            Tag a business
          </Text>
          <Text style={{color: 'grey', marginTop: 5}}>
            Tag a business and say something
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              height: 50,
              paddingHorizontal: 15,
              backgroundColor: '#ccc',
              borderRadius: 10,
              marginTop: 20,
              width: '100%',
            }}>
            <Icon name="search" color="#5F95F0" size={20} />
            <TextInput
              value={search}
              onChangeText={text => setSearch(text)}
              placeholder="Search by name or zipcode"
              placeholderTextColor={'grey'}
              style={{color: 'black', flex: 1}}
            />
          </View>
          <View
            style={{
              maxHeight: '75%',
              minHeight: '20%',
            }}>
            <FlatList data={businessList} renderItem={renders} />
          </View>
        </View>
      </View>
    </Modal>
  );
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          height: 80,
          // backgroundColor: 'white',
          // elevation: 3,
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
            Add Post
          </Text>
          {/* <Text style={{fontFamily: 'MontserratAlternates-Regular'}}>
              Chicago, IL 60611, USA
            </Text> */}
        </View>
        <TouchableOpacity
          onPress={() => add()}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: 50,
            // marginTop: 30,
            paddingHorizontal: 20,

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
      <Wrapper behavior="padding" style={{flex: 1}}>
        <ScrollView>
          <View style={{marginTop: 0, paddingHorizontal: 15}}>
            {/* <MentionHashtagTextView
                mentionHashtagPress={text => console.log('text', text)}
                mentionHashtagColor={'#5F95F0'}>
                This is a text with a @mention and #hashtag. You can add more
                @mentions like @john @foe or #hashtags like #ReactNative
              </MentionHashtagTextView> */}
            <View
              style={{
                flexDirection: 'row',
                // backgroundColor: 'red',
                marginTop: 10,
              }}>
              <Image
                source={
                  userData?.userdata?.image
                    ? {uri: userData?.userdata?.image}
                    : require('../../../assets/Images/girl.jpg')
                }
                style={{height: 50, borderRadius: 25, width: 50}}
              />
              <View style={{marginLeft: 10}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text
                    style={{
                      fontFamily: 'MontserratAlternates-Regular',
                      // color: 'grey',
                      color: 'black',
                      fontWeight: '700',
                    }}>
                    {userData?.userdata?.firstname}
                  </Text>
                  {tagedBusiness ? (
                    <Text>
                      {' '}
                      tagged
                      <Text style={{fontWeight: '700', color: 'black'}}>
                        {' '}
                        {tagedBusiness}
                      </Text>
                    </Text>
                  ) : null}
                </View>
                <TextInput
                  textAlignVertical="top"
                  value={description}
                  maxLength={300}
                  placeholderTextColor={'grey'}
                  placeholder="What's happening?"
                  multiline
                  numberOfLines={5}
                  onChangeText={text => {
                    setDescription(text);
                    // setEmailErr('');
                  }}
                  style={{
                    fontFamily: 'MontserratAlternates-Regular',
                    // borderColor: 'grey',
                    // borderWidth: 1,
                    marginTop: 0,
                    // paddingHorizontal: 10,
                    borderRadius: 5,
                    // flex: 1,
                    width: 250,
                    color: 'black',
                    height: 100,
                  }}
                />
              </View>
            </View>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              {img.length > 0 && (
                // <View style={{width: 150, marginRight: 10, height: 150}}>
                //   <Swiper
                //     showsPagination={true}
                //     key={img.length}
                //     paginationStyle={{bottom: 10}}
                //     activeDotColor="#5F95F0"
                //     loop={false}
                //     style={{alignItems: 'center', justifyContent: 'center'}}
                //     showsButtons={false}>
                //     {img.map(item => (
                //       <Image
                //         source={{uri: item.image}}
                //         style={{
                //           borderRadius: 10,
                //           width: '100%',
                //           height: '100%',
                //         }}
                //       />
                //     ))}
                //   </Swiper>
                // </View>
                <FlatList data={img} renderItem={render} horizontal />
              )}
            </View>
            <View style={{marginTop: 30}}>
              <Text
                style={{
                  fontFamily: 'MontserratAlternates-Regular',
                  color: 'grey',
                }}>
                {description.length}/300
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                // backgroundColor: 'red',
                marginTop: 30,
                // width: '80%',
              }}>
              {count < 4 && (
                <>
                  <TouchableOpacity
                    onPress={() => picker('Camera')}
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: 10,
                      borderWidth: 1,
                      alignItems: 'center',
                      borderStyle: 'dashed',
                      justifyContent: 'center',
                      borderColor: '#5F95F0',
                    }}>
                    <Icon name="camera" size={30} color={'#5F95F0'} />
                    <Text style={{fontSize: 12, marginTop: 5, color: 'black'}}>
                      Open Camera
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => picker('Gallery')}
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: 10,
                      marginLeft: 5,
                      borderWidth: 1,
                      alignItems: 'center',
                      borderStyle: 'dashed',
                      justifyContent: 'center',
                      borderColor: '#5F95F0',
                    }}>
                    <Icon2
                      name="ios-images-outline"
                      size={30}
                      color={'#5F95F0'}
                    />
                    <Text style={{fontSize: 12, marginTop: 5, color: 'black'}}>
                      Gallery
                    </Text>
                  </TouchableOpacity>
                </>
              )}
              {!tagedBusiness && (
                <TouchableOpacity
                  onPress={() => {
                    setTagBusinessModal(true);
                    handleRestaurantSearch(latitude, longitude);
                  }}
                  style={{
                    width: 80,
                    height: 80,
                    marginLeft: 5,
                    borderRadius: 10,
                    borderWidth: 1,
                    alignItems: 'center',
                    borderStyle: 'dashed',
                    justifyContent: 'center',
                    borderColor: '#5F95F0',
                  }}>
                  <Icon1 name="location" size={30} color={'#5F95F0'} />
                  <Text style={{fontSize: 12, marginTop: 5, color: 'black'}}>
                    Tag business
                  </Text>
                </TouchableOpacity>
              )}
              {video && (
                <TouchableOpacity
                  onPress={() => picker('Video')}
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 10,
                    borderWidth: 1,
                    alignItems: 'center',
                    marginLeft: 5,
                    borderStyle: 'dashed',
                    justifyContent: 'center',
                    borderColor: '#5F95F0',
                  }}>
                  <Icon name="video" size={30} color={'#5F95F0'} />
                  <Text style={{fontSize: 12, marginTop: 5, color: 'black'}}>
                    Video
                  </Text>
                </TouchableOpacity>
              )}
            </View>
            {/* <View style={{marginTop: 30}}>
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
                  paddingHorizontal: 10,
                  borderBottomWidth: 1,
                  color: 'black',
                  height: 50,
                }}
              />
            </View> */}
            {/* <View style={{marginTop: 30}}>
              <Text
                style={{
                  fontSize: 12,
                  color: 'black',
                  // marginBottom: 50,
                  fontFamily: 'MontserratAlternates-SemiBold',
                }}>
                Post description
              </Text>
            </View> */}
            <View style={{height: 50}} />
            {/* <View style={{marginTop: 30, marginBottom: 20}}>
                <Text
                  style={{
                    fontSize: 12,
                    color: 'black',
                    fontFamily: 'MontserratAlternates-SemiBold',
                  }}>
                  Hash Tag
                </Text>
                <Tags
                  initialText=""
                  textInputProps={{
                    placeholder: 'Any Tag',
                    autoCapitalize: 'none',
                    placeholderTextColor: 'grey',
                  }}
                  initialTags={[]}
                  onChangeTags={tags => {
                    console.log('length', tags.length);
                    setHash(tags);
                  }}
                  onTagPress={(index, tagLabel, event, deleted) =>
                    console.log(
                      index,
                      tagLabel,
                      event,
                      deleted ? 'deleted' : 'not deleted',
                    )
                  }
                  containerStyle={{justifyContent: 'center'}}
                  inputStyle={{
                    // borderWidth: 1,
                    height: 50,
                    backgroundColor: 'white',
                    borderRadius: 5,
                    color: 'black',
                    // borderColor: 'black',
                  }}
                  renderTag={({
                    tag,
                    index,
                    onPress,
                    deleteTagOnPress,
                    readonly,
                  }) => (
                    <TouchableOpacity key={`${tag}-${index}`} onPress={onPress}>
                      <Text style={{color: 'grey'}}>
                        {`${
                          tag.substring(0, 1) != '#' ? '#' : ''
                        }${tag.substring(0, 200)}`}{' '}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              </View> */}
          </View>
        </ScrollView>
      </Wrapper>
      {tagModal()}
      {MyModal(showModal)}
    </SafeAreaView>
  );
};
export default Create;
