import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  Modal,
  FlatList,
  Image,
  ImageBackground,
  TouchableOpacity,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/Entypo';
import {useSelector} from 'react-redux';
import {postDetail} from '../../../lib/api';
import SwiperPosts from '../../../Components/SwiperPosts';
import database from '@react-native-firebase/database';
const PostDetails = ({navigation, route}: {navigation: any; route: any}) => {
  const {userData, darkmode} = useSelector(({USER}) => USER);
  const [data, setData] = useState({});
  const {item} = route.params;
  //   console.log('item in detail', item);
  const [check, setCheck] = useState('');
  const [change, setChange] = useState(false);
  const [specific, setSpecific] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [swipe, setSwiper] = useState([]);
  const [list, setList] = useState([]);
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
          console.log('users', users);
          setList(users.reverse());
          // setLoading(false);

          // console.log("user list in chat list ", JSON.stringify(users))
        });
    } catch (error) {}
  }, []);
  const alter = () => {
    console.log('alter called');
    setChange(!change);
  };
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
        backgroundColor: darkmode ? '#242527' : 'white',
        borderRadius: 10,
        paddingTop: 5,
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
              color: darkmode ? 'white' : 'black',
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
      <View style={{alignItems: 'center'}}>
        {/* {item.counter ? (
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
            <Text style={{color: 'white', fontSize: 12}}>{item.counter}</Text>
            <Text>{moment(item.timestamp).format('DD/MM/YYYY HH:MM')}</Text>
          </View>
        ) : (
          <Text style={{fontSize: 12}}>
            {moment(item.timestamp).format('DD/MM/YYYY HH:MM')}
          </Text>
        )} */}
        {/* <Text
          style={{
            color: 'black',
            fontFamily: 'MontserratAlternates-Regular',
            fontSize: 10,
          }}>
          {item.time}
        </Text> */}
      </View>
    </TouchableOpacity>
  );
  const MyModal = (show: boolean) => {
    //   console.log('show', show);
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
              backgroundColor: darkmode ? 'black' : 'white',
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
                color: darkmode ? 'white' : 'black',
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
  useEffect(() => {
    _usersList();
    postDetail({Auth: userData.token, id: item.id}).then(res => {
      console.log('res of detail', res);
      setData(res.post);
      setSwiper(res.post.media);
      setCheck('abc');
    });
  }, [change]);
  //   console.log('data', data);
  return (
    <View style={{flex: 1, backgroundColor: darkmode ? 'black' : 'white'}}>
      {/* <ImageBackground
        style={{flex: 1}}
        source={require('../../../assets/Images/back.png')}> */}
      <View
        style={{
          height: 80,
          backgroundColor: darkmode ? '#242527' : 'white',
          elevation: 3,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 15,
          // justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: '#ccc',
            width: 30,
            height: 30,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 5,
          }}
          onPress={() => navigation.goBack()}>
          <Icon name="left" size={20} color={'black'} />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 16,
            fontFamily: 'MontserratAlternates-SemiBold',
            color: darkmode ? 'white' : 'black',
            marginLeft: 20,
          }}>
          Post Details
        </Text>
        {/* <Text style={{fontFamily: 'MontserratAlternates-Regular'}}>
              Chicago, IL 60611, USA
            </Text> */}
      </View>
      {check ? (
        <SwiperPosts
          item={data}
          swipe={swipe}
          onShare={() => {
            setSpecific(item);
            setShowModal(true);
          }}
          hashPress={text => {
            navigation.navigate('Hashes', {text});
          }}
          press={alter}
          navigation={navigation}
        />
      ) : null}
      {/* </ImageBackground> */}
      {MyModal(showModal)}
    </View>
  );
};
export default PostDetails;
