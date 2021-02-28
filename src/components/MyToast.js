import {ToastAndroid, Platform, View} from 'react-native';
import {Toast} from 'native-base';
export default MyToast = (text) =>
  Platform.OS === 'android'
    ? ToastAndroid.showWithGravityAndOffset(
        text,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      )
    : Toast.show({
        text: text,
        position: 'bottom',
        duration: 3000,
      });
