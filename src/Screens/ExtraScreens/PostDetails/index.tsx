import React, {useState, useEffect} from 'react';
import {View, ImageBackground, TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';
import {postDetail} from '../../../lib/api';
import Posts from '../../../Components/Posts';
const PostDetails = ({navigation, route}: {navigation: any; route: any}) => {
  const {userData} = useSelector(({USER}) => USER);
  const [data, setData] = useState({});
  const {item} = route.params;
  //   console.log('item in detail', item);
  const [check, setCheck] = useState('');
  const [change, setChange] = useState(false);
  const alter = () => {
    console.log('alter called');
    setChange(!change);
  };
  useEffect(() => {
    postDetail({Auth: userData.token, id: item.id}).then(res => {
      //   console.log('res of detail', res);
      setData(res.post);
      setCheck('abc');
    });
  }, [change]);
  //   console.log('data', data);
  return (
    <View style={{flex: 1}}>
      <ImageBackground
        style={{flex: 1}}
        source={require('../../../assets/Images/back.png')}>
        <View
          style={{
            height: 80,
            backgroundColor: 'white',
            elevation: 3,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 15,
            // justifyContent: 'space-between',
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="left" size={20} color={'black'} />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'MontserratAlternates-SemiBold',
              color: 'black',
              marginLeft: 20,
            }}>
            Post Details
          </Text>
          {/* <Text style={{fontFamily: 'MontserratAlternates-Regular'}}>
              Chicago, IL 60611, USA
            </Text> */}
        </View>
        {check ? (
          <Posts item={data} press={alter} navigation={navigation} />
        ) : null}
      </ImageBackground>
    </View>
  );
};
export default PostDetails;
