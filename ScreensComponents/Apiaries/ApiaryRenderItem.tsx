import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Apiary } from '../../DataModels/ApiaryModel';
import Icons from '../../constants/Icons';

interface RenderApiaryProps {
  item: Apiary;
  expandedApiary: number | null;
  setExpandedApiary: (id: number | null) => void;
  handleOnPressEditApiary: (apiary: Apiary) => void;
  handleDelete: (id: number) => void;
}

const ApiaryRenderItem: React.FC<RenderApiaryProps> = ({
  item,
  expandedApiary,
  setExpandedApiary,
  handleOnPressEditApiary,
  handleDelete,
}) => {
  return (
    <TouchableOpacity
      className={`border-2 rounded-2xl p-4 bg-tile ${
        expandedApiary === item.id ? 'h-auto' : 'h-20'
      } mb-4`}
      onPress={() => setExpandedApiary(expandedApiary === item.id ? null : item.id)}
    >
      {expandedApiary === item.id ? (
        <View>
          <Text className="font-pbold font-bold text-2xl mb-1" numberOfLines={1}>
            {item.name}
          </Text>
          <View className="flex-row justify-between">
            <Text className="font-pmedium font-bold text-xl" numberOfLines={1}>
              {item.location}
            </Text>
            <Text className="font-pmedium font-bold text-xl" numberOfLines={1}>
              {item.creationDate.toLocaleDateString('pl-PL')}
            </Text>
          </View>

          <View className="self-center h-[1] w-[80%] my-4 bg-black"></View>

          <View className="flex-row justify-between">
            <TouchableOpacity
              className="flex-row justify-center bg-edit w-[48%] rounded-xl p-3"
              onPress={() => handleOnPressEditApiary(item)}
            >
              <Text className="font-pmedium text-xm mr-3">Edytuj</Text>
              <Image source={Icons.edit} className="w-6 h-6" resizeMode="contain" />
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-row justify-center bg-remove w-[48%] rounded-xl p-3"
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
            {item.name}
          </Text>
          <View className="flex-row">
            <TouchableOpacity
              className="bg-edit rounded-xl p-3 mr-2"
              onPress={() => handleOnPressEditApiary(item)}
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

export default ApiaryRenderItem;