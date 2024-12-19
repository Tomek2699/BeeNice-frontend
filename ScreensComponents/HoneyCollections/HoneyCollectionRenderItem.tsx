import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { HoneyCollection } from '../../DataModels/HoneyCollectionModel';
import Icons from '../../constants/Icons';
import ShowDateHelper from '@/helpers/showDateHelper';

interface RenderProps {
  item: HoneyCollection;
  expandedHoneyCollection: number | null;
  setExpandedHoneyCollection: (id: number | null) => void;
  handleOnPressEditHoneyCollection: (honeyCollection: HoneyCollection) => void;
  handleDelete: (id: number) => void;
}

const HoneyCollectionRenderItem: React.FC<RenderProps> = ({
  item,
  expandedHoneyCollection,
  setExpandedHoneyCollection,
  handleOnPressEditHoneyCollection,
  handleDelete,
}) => {

  return (
    <TouchableOpacity
      className={`border-2 rounded-2xl p-4 bg-tile shadow ${
        expandedHoneyCollection === item.id ? 'h-auto' : 'h-20'
      } mb-4`}
      onPress={() => setExpandedHoneyCollection(expandedHoneyCollection === item.id ? null : item.id)}
    >
      {expandedHoneyCollection === item.id ? (
        <View>
          <Text className="font-pbold font-bold text-2xl mb-1" numberOfLines={1}>
            {ShowDateHelper.formatDateToShowForDate(item.collectionDate)}
          </Text>
          <View className="flex-row justify-between">
            <Text className="font-pmedium font-bold text-xl" numberOfLines={1}>
              {item.honeyQuantity}
            </Text>
            <Text className="font-pmedium font-bold text-xl" numberOfLines={1}>
              {item.typeOfHoney}
            </Text>
          </View>

          <View className="self-center h-[1] w-[80%] my-4 bg-black"></View>

          <View className="flex-row justify-between">
            <TouchableOpacity
              className="flex-row justify-center bg-edit w-[33%] rounded-xl p-3"
              onPress={() => handleOnPressEditHoneyCollection(item)}
            >
              <Text className="font-pmedium text-xm mr-3">Edytuj</Text>
              <Image source={Icons.edit} className="w-6 h-6" resizeMode="contain" />
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-row justify-center bg-remove w-[33%] rounded-xl p-3"
              onPress={() => handleDelete(item.id)}
            >
              <Text className="font-pmedium text-xm mr-3">Usuń</Text>
              <Image source={Icons.remove} className="w-6 h-6" resizeMode="contain" />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View className="flex-row justify-between items-center">
          <Text className="font-psemibold text-xl" numberOfLines={1}>
            {ShowDateHelper.formatDateToShowForDate(item.collectionDate)}
          </Text>
          <View className="flex-row">
            <TouchableOpacity
              className="bg-edit rounded-xl p-3 mr-2"
              onPress={() => handleOnPressEditHoneyCollection(item)}
            >
              <Image source={Icons.edit} className="w-6 h-6" resizeMode="contain" />
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-remove rounded-xl p-3"
              onPress={() => handleDelete(item.id)}
            >
              <Image source={Icons.remove} className="w-6 h-6" resizeMode="contain" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default HoneyCollectionRenderItem;