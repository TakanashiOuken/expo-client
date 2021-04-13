import React from "react";
import Background from "../components/Background";
import Header from "../components/Header";
import Logo from "../components/Logo";
import Paragraph from "../components/Paragraph";
import { Video, AVPlaybackStatus } from 'expo-av';
import { Platform, Button, View, Text} from "react-native";

const StartScreen = () => {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  
  return (
  <Background>
    <Header>Welcome</Header>
    <Paragraph>This is the public page</Paragraph>
    
    <View>
    <Text>OS</Text>
    <Text>{Platform.OS}</Text>
    <Text>OS Version</Text>
    <Text>{Platform.Version}</Text>
    <Text>isTV</Text>
    <Text>{Platform.isTV.toString()}</Text>
    {Platform.OS === 'ios' && <>
      <Text>isPad</Text>
      <Text>{Platform.isPad.toString()}</Text>
    </>}
    <Text>Constants</Text>
    <Text>
      {JSON.stringify(Platform.constants, null, 2)}
    </Text>
    
    <Video
        ref={video}
        style={{width:'100%', height: 219,}}
        source={{
          uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
        }}
        useNativeControls
        resizeMode="contain"
        isLooping
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      />
      <View>
        <Button
          title={status.isPlaying ? 'Pause' : 'Play'}
          onPress={() =>
            status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
          }
        />
      </View>
      </View>
  </Background>
  );
};

export default StartScreen;
