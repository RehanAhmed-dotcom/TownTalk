import React, {useEffect} from 'react';

import {View, Image, ImageBackground, Text} from 'react-native';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(function () {
      navigation.navigate('Login');
    }, 3000);
  }, []);
  return (
    <View style={{flex: 1}}>
      <ImageBackground
        style={{flex: 1, justifyContent: 'flex-end'}}
        source={require('../../../assets/Images/backSplash.png')}>
        <View
          style={{
            height: '100%',
            width: '100%',
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={require('../../../assets/Images/LogoStar.png')}
            style={{height: 200, width: 200}}
          />
        </View>
        <View style={{height: '28%', width: '100%'}}>
          <Image
            resizeMode="contain"
            source={require('../../../assets/Images/girlSitting.png')}
            style={{width: '100%', height: '100%'}}
          />
        </View>
      </ImageBackground>
    </View>
  );
};
export default Splash;
