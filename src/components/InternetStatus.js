import React, {useState, useEffect} from 'react';
import {Dimensions, View, Text} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import * as Animatable from 'react-native-animatable';

export default function InternetCheck() {
  const APP_NAME = 'Example App';
  const [isConnected, setIsConnected] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    //Intial status
    NetInfo.fetch().then((state) => {
      setIsConnected(state.isConnected);
      if (state.isConnected == false) {
        setMounted(true);
      }
    });
    //Internet connection listener
    NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
      if (state.isConnected == false) {
        setMounted(true);
      }
    });
  }, []);

  return (
    <React.Fragment>
      {!isConnected && (
        <Animatable.View
          style={{
            backgroundColor: 'red',
            borderTopLeftRadius: 40,
            flexDirection: 'row',
            position: 'absolute',
            zIndex: 2,
            top: 30,
            width: Dimensions.get('window').width / 1.5,
            height: 40,
            alignItems: 'center',
            alignContent: 'center',
            alignSelf: 'center',
            borderRadius: 50,
          }}
          animation="fadeInDown">
          <View style={{flex: 2}}>
            <Text
              style={{
                color: '#fff',
                textAlign: 'center',
                alignSelf: 'center',
                fontWeight: '700',
              }}>
              You're using {APP_NAME} offline
            </Text>
          </View>
        </Animatable.View>
      )}
      {isConnected && mounted && (
        <Animatable.View
          style={{
            backgroundColor: 'green',
            borderTopLeftRadius: 40,
            flexDirection: 'row',
            position: 'absolute',
            zIndex: 2,
            top: 30,
            width: Dimensions.get('window').width / 1.5,
            height: 40,
            alignItems: 'center',
            alignContent: 'center',
            alignSelf: 'center',
            borderRadius: 50,
          }}
          animation="fadeOutUp"
          duration={5000}
          delay={2000}>
          <View style={{flex: 2}}>
            <Text
              style={{
                color: '#fff',
                textAlign: 'center',
                alignSelf: 'center',
                fontWeight: '700',
              }}>
              You're back online!
            </Text>
          </View>
        </Animatable.View>
      )}
    </React.Fragment>
  );
}
