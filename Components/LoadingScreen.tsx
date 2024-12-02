import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import LottieItems from '../constants/Lottie'
import LottieView from 'lottie-react-native';

function LoadingScreen() {
  return (
    <View className='flex-1 justify-center items-center bg-primaryBg'>
      <LottieView
      autoPlay
      style={{
        width: 200,
        height: 200,
      }}
        source={LottieItems.loadingHive}>
      </LottieView>
    </View>
  );
}

export default LoadingScreen;