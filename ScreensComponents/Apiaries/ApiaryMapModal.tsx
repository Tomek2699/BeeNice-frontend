import React, { useState } from 'react';
import { Text, View, Button, Alert, Modal, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Callout, Marker, MapPressEvent, PROVIDER_GOOGLE, Region } from 'react-native-maps';

type Coordinates = {
  latitude: number;
  longitude: number;
};

interface Props {
  visible: boolean;
  onClose: () => void;
}

export default function ApiaryMapModal ({visible, onClose} : Props) {
  const [selectedLocation, setSelectedLocation] = useState<Coordinates | null>(null);
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);

  const initialRegion: Region = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const handleMapPress = (event: MapPressEvent) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedLocation({ latitude, longitude });
  };

  const fetchUserLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'You need to allow location access to use this feature.');
        return;
      }

      const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
      const { latitude, longitude } = location.coords;
      setUserLocation({ latitude, longitude });
    } catch (error) {
      Alert.alert('Error', 'Unable to fetch location. Please try again.');
    }
  };

  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <View className='flex-1 justify-center items-center bg-zinc-900/60'>
        <View className='w-[90%] max-h-[80%] p-6 bg-primaryBg border-2 rounded-xl'>
          <Text className='text-3xl font-bold mb-6 text-center'>Cos</Text>
          <View className='flex-1 w-full h-full'>
            <MapView
              className='w-full h-full'
              initialRegion={initialRegion}
              onPress={handleMapPress}
            >
              {selectedLocation && (
                <Marker
                  coordinate={selectedLocation}
                  title="Selected Location"
                  description={`Lat: ${selectedLocation.latitude}, Lng: ${selectedLocation.longitude}`}
                />
              )}
              {userLocation && (
                <Marker
                  coordinate={userLocation}
                  pinColor="blue"
                  title="Your Location"
                  description={`Lat: ${userLocation.latitude}, Lng: ${userLocation.longitude}`}
                />
              )}
            </MapView>
          </View>
            <View className='absolute bottom-5 left-5 right-5'>
              <Button title="Get Current Location" onPress={fetchUserLocation} />
            </View>
            <View className='flex-row items-center justify-center mt-4'>
              <TouchableOpacity onPress={onClose}>
                <Text className='font-pmedium text-xl'>
                  Zamknij
                </Text>
              </TouchableOpacity>
            </View>
        </View>
      </View>          
    </Modal>
  );
};