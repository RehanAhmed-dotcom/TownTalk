import React, {useState} from 'react';

import {
  View,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Platform,
  Image,
  Text,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MentionHashtagTextView from 'react-native-mention-hashtag-text';
import LikeDislike from './LikeDislike';
import Icons from 'react-native-vector-icons/AntDesign';
import Video from 'react-native-video';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/Feather';
import Swiper from 'react-native-swiper';
import Icon1 from 'react-native-vector-icons/EvilIcons';
const SwiperPosts = props => {
  const {item, swipe, navigation, onShare, onPress, hashPress, press} = props;
  const {userData, darkmode} = useSelector(({USER}) => USER);
  const [paused, setPaused] = useState(false);
  const [show, setShow] = useState(false);
  console.log('checking item', item);
  return (
    <ScrollView>
      <View
        //   activeOpacity={1}
        //   onPress={onPress}
        style={{
          // height: 30,
          backgroundColor: darkmode ? '#242527' : 'white',
          marginRight: 3,
          elevation: 3,
          // alignItems: 'center',
          // justifyContent: 'center',
          // minWidth: 100,
          marginLeft: 3,
          marginVertical: 3,
          marginTop: 10,
          padding: 12,
          borderRadius: 5,
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('UserProfile', {item})}
          style={{
            // marginTop: 5,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'row',
              // backgroundColor: 'red',
              alignItems: 'center',
            }}>
            <Image
              source={
                item?.user?.image
                  ? {uri: item?.user?.image}
                  : require('../assets/Images/girl.jpg')
              }
              style={{width: 50, height: 50, borderRadius: 50}}
            />
            <View style={{marginLeft: 10}}>
              <Text
                style={{
                  fontFamily: 'MontserratAlternates-SemiBold',
                  fontSize: 16,
                  color: darkmode ? 'white' : 'black',
                }}>
                {`${item?.user?.firstname}`}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: 'MontserratAlternates-Regular',
                  marginTop: 5,
                  color: darkmode ? 'white' : 'black',
                }}>
                {item?.created_at}
              </Text>
            </View>
          </View>
          {/* <Icon
          name="dots-three-horizontal"
          size={20}
          color={'black'}
          style={{bottom: 10}}
        /> */}
        </TouchableOpacity>
        {/* <View
        style={{
          marginTop: 10,
          width: '100%',
          flexDirection: 'row',
          // alignItems: 'center',
          // backgroundColor: 'red',
          overflow: 'hidden',
        }}>
        {item?.hashtag?.map(element => (
          <Text
            style={{
              marginRight: 5,
              fontSize: 13,
              fontFamily: 'MontserratAlternates-Medium',
              color: '#5F95F0',
            }}>
            #{element}
          </Text>
        ))}
       
      </View> */}
        <View style={{marginTop: 10}}>
          <View>
            <MentionHashtagTextView
              mentionHashtagPress={hashPress}
              mentionHashtagColor={'#5F95F0'}
              style={{
                fontSize: 13,
                color: 'black',
                fontFamily: 'MontserratAlternates-Regular',
              }}>
              {item.description}
            </MentionHashtagTextView>
          </View>

          {/* <Text
          style={{
            fontSize: 13,
            color: 'black',
            fontFamily: 'MontserratAlternates-Regular',
          }}>
          {item?.description}
        </Text> */}
          {swipe.length > 0 && (
            <View style={{width: '100%', marginTop: 10, height: 350}}>
              <Swiper
                loadMinimal={true}
                showsPagination={true}
                key={swipe.length}
                paginationStyle={{bottom: 10}}
                activeDotColor="#5F95F0"
                loop={true}
                style={{
                  alignItems: 'center',
                  zIndex: 40,
                  justifyContent: 'center',
                }}
                showsButtons={false}>
                {swipe.map(
                  item =>
                    //   <View style={{width: '100%', marginTop: 10, height: 150}}>
                    item?.media_type == 'image' ? (
                      <Image
                        source={{uri: item?.media}}
                        style={{
                          borderRadius: 10,
                          width: '100%',
                          height: '100%',
                          resizeMode: 'cover',
                        }}
                      />
                    ) : (
                      <>
                        <Video
                          resizeMode="stretch"
                          posterresizeMode="cover"
                          repeat={Platform.OS == 'ios' ? true : false}
                          onEnd={() => setPaused(true)}
                          // onEnd={() => setPaused(!paused)}
                          poster={'https://baconmockup.com/300/200/'}
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            // width: wp(85),
                            // back
                            // borderRadius: 10,
                            borderRadius: 10,
                            bottom: 0,
                            // height: 250,
                            width: '100%',
                            height: '100%',
                            right: 0,
                          }}
                          // controls={true}
                          paused={paused}
                          source={{uri: item?.media}}
                        />
                        <View
                          style={{
                            position: 'absolute',
                            height: '100%',
                            width: '100%',
                            alignItems: 'center',
                            // backgroundColor: 'red',
                            justifyContent: 'center',
                          }}>
                          {paused ? (
                            <TouchableOpacity
                              style={{
                                width: 50,
                                height: 50,
                                borderRadius: 30,
                                alignItems: 'center',
                                backgroundColor: '#5F95F0',
                                justifyContent: 'center',
                              }}>
                              <Icon
                                name={'controller-play'}
                                onPress={() => setPaused(!paused)}
                                size={40}
                                color="white"
                              />
                            </TouchableOpacity>
                          ) : (
                            <TouchableOpacity
                              style={{
                                width: 50,
                                height: 50,
                                backgroundColor: '#5F95F0',
                                borderRadius: 30,
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}>
                              <Icons
                                name={'pause'}
                                onPress={() => setPaused(!paused)}
                                size={40}
                                color="white"
                              />
                            </TouchableOpacity>
                          )}
                        </View>
                      </>
                    ),
                  //   </View>
                )}
              </Swiper>
            </View>
          )}

          {/* <Image
          source={
            item?.media[0]?.media
              ? {uri: item?.media[0]?.media}
              : require('../assets/Images/social.jpg')
          }
          style={{height: 150, borderRadius: 10, width: '100%', marginTop: 10}}
        /> */}
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            // marginTop: 10,
            zIndex: -3,
            // backgroundColor: 'red',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '50%',
              // backgroundColor: 'red',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <LikeDislike item={item} press={press} />
            {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => {
              setLike(!like);
              setDislike(false);
              // press();
              likeDislike({
                Auth: userData.token,
                creator_id: item?.user?.id,
                post_id: item?.id,
                is_like: 1,
              })
                .then(res => {
                  console.log('res', res);
                  press();
                })
                .catch(err => {
                  console.log('err', err);
                });
            }}
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon
              name="thumbs-up"
              size={20}
              color={like ? '#5F95F0' : 'grey'}
            />
            <Text
              style={{
                fontFamily: 'MontserratAlternates-Regular',
                fontSize: 13,
                marginLeft: 5,
                color: 'black',
              }}>
              {likecount}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setDislike(!dislike);
              setLike(false);
              press();
              likeDislike({
                Auth: userData.token,
                creator_id: item?.user?.id,
                post_id: item?.id,
                is_like: 0,
              })
                .then(res => {
                  console.log('res', res);
                })
                .catch(err => {
                  console.log('err', err);
                });
            }}
            style={{
              flexDirection: 'row',
              marginLeft: 10,
              alignItems: 'center',
            }}>
            <Icon
              name="thumbs-down"
              size={20}
              color={dislike ? '#5F95F0' : 'grey'}
            />
            <Text
              style={{
                fontFamily: 'MontserratAlternates-Regular',
                fontSize: 13,
                marginLeft: 5,
                color: 'black',
              }}>
              {dislikecount}
            </Text>
          </TouchableOpacity>
        </View> */}
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: '50%',
              marginTop: 10,
              justifyContent: 'space-between',
              // backgroundColor: 'red',
              alignItems: 'center',
            }}>
            {!show && (
              <TouchableOpacity
                onPress={() => navigation.navigate('Comments', {id: item.id})}
                // onPress={() => {
                //   setLike(!like);
                //   setDislike(false);
                // }}
                style={{
                  flexDirection: 'row',
                  marginLeft: 30,
                  width: 35,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {/* <Image
                source={require('../assets/Images/comment.png')}
                style={{height: 10, width: 10}}
              /> */}
                <Icon1 name="comment" size={25} color="grey" />
                <Text
                  style={{
                    fontFamily: 'MontserratAlternates-Regular',
                    // marginLeft: 5,
                    color: darkmode ? 'white' : 'black',
                    fontSize: 13,
                  }}>
                  {item.comment_count}
                </Text>
                {/* <Text
                style={{
                  fontFamily: 'MontserratAlternates-Regular',
                  marginLeft: 5,
                  color: 'black',
                  fontSize: 13,
                }}>
                Comments
              </Text> */}
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={() => {
                onShare();
              }}
              //   setLike(!like);
              //   setDislike(false);
              // }}
              style={{
                flexDirection: 'row',
                width: 30,
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              {/* <Image
              source={require('../assets/Images/share.png')}
              style={{height: 10, width: 10}}
            /> */}
              <Icon2 name="send" size={16} color={'grey'} />
              {/* <Text
              style={{
                fontFamily: 'MontserratAlternates-Regular',
                marginLeft: 5,
                fontSize: 13,
                color: 'black',
              }}>
              Share
            </Text> */}
            </TouchableOpacity>
          </View>
        </View>

        {/* <Text style={{color: '#5F95F0', fontWeight: 'bold'}}>#{item}</Text> */}
      </View>
    </ScrollView>
  );
};

export default SwiperPosts;
