import React, {useState, useRef} from 'react';
import {View, Text} from 'react-native';
import Sound from 'react-native-sound';
import Slider from '@react-native-community/slider';
import SIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Entypo';
const AudioComp = ({audio, me}) => {
  const [duration, setDuration] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [value, setValue] = useState(0);
  const [minimumValue, setMinimumValue] = useState(0);
  const whoosh = useRef(null);

  const playSound = (soundUrl, i) => {
    // console.log('i am called', soundUrl);
    whoosh.current = new Sound(soundUrl, null, error => {
      if (error) {
        console.log('err', error);
        return;
      }
      // loaded successfully
      // console.log('i even came here');
      setDuration(whoosh.current.getDuration());

      // Play the sound with an onEnd callback
      setPlaying(true);
      whoosh.current.play(success => {
        if (success) {
          setPlaying(false);
          whoosh.current.release();
        } else {
        }
      });
    });

    setInterval(() => {
      whoosh.current.getCurrentTime(seconds => setValue(seconds));
    }, 500);
  };

  const pauseSound = () => {
    whoosh.current.pause();
    setPlaying(false);
  };

  const onValueChange = time => {
    whoosh.current.setCurrentTime(time);
  };
  return (
    <View
      style={{
        marginRight: 12,
        flexDirection: 'row',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        backgroundColor: me ? '#200E32' : '#EBEBEB',
        padding: 8,
      }}>
      {playing ? (
        <SIcon
          name={'pause'}
          size={25}
          color="white"
          onPress={() => pauseSound()}
        />
      ) : (
        <Icon
          name={'controller-play'}
          size={25}
          color="white"
          onPress={() => {
            console.log('noice', audio);
            playSound(audio, null);
          }}
        />
      )}
      <Slider
        style={{width: '80%'}}
        minimumValue={minimumValue}
        maximumValue={duration}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
        value={value}
        // onValueChange={vv => {
        //   onValueChange(vv);
        // }}
      />
    </View>
  );
};
export default AudioComp;
