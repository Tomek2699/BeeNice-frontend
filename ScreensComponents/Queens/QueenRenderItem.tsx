import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Queen } from '../../DataModels/QueenModel';
import Icons from '../../constants/Icons';
import ShowDateHelper from '@/helpers/showDateHelper';

interface RenderProps {
  item: Queen;
  expandedHive: number | null;
  setExpandedHive: (id: number | null) => void;
  handleOnPressEditHive: (queen: Queen) => void;
  handleDelete: (id: number) => void;
}

const QueenRenderItem: React.FC<RenderProps> = ({
  item,
  expandedHive,
  setExpandedHive,
  handleOnPressEditHive,
  handleDelete,
}) => {

  return (
    <TouchableOpacity
      className={`border-2 rounded-2xl p-4 bg-tile ${
        expandedHive === item.id ? 'h-auto' : 'h-20'
      } mb-4`}
      onPress={() => setExpandedHive(expandedHive === item.id ? null : item.id)}
    >
      {expandedHive === item.id ? (
        <View>
          <Text className="font-pbold font-bold text-2xl mb-1" numberOfLines={1}>
            {item.queenNumber}
          </Text>
          <View className="flex-row justify-between">
            <Text className="font-pmedium font-bold text-xl" numberOfLines={1}>
              {item.race}
            </Text>
            <Text className="font-pmedium font-bold text-xl" numberOfLines={1}>
              {ShowDateHelper.formatDateToShowForDate(item.hatchDate)}
            </Text>
            <Text className="font-pmedium font-bold text-xl" numberOfLines={1}>
              {item.state}
            </Text>
          </View>

          <View className="self-center h-[1] w-[80%] my-4 bg-black"></View>

          <View className="flex-row justify-between">
            <TouchableOpacity
              className="flex-row justify-center bg-edit w-[33%] rounded-xl p-3"
              onPress={() => handleOnPressEditHive(item)}
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
            {item.queenNumber}
          </Text>
          <View className="flex-row">
            <TouchableOpacity
              className="bg-edit rounded-xl p-3 mr-2"
              onPress={() => handleOnPressEditHive(item)}
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

export default QueenRenderItem;