import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { BeeFamily } from '../../DataModels/BeeFamilyMode';
import Icons from '../../constants/Icons';
import ShowDateHelper from '@/helpers/showDateHelper';

interface RenderProps {
  item: BeeFamily;
  expandedBeeFamily: number | null;
  setExpandedBeeFamily: (id: number | null) => void;
  handleOnPressEditBeeFamily: (beeFamily: BeeFamily) => void;
  handleDelete: (id: number) => void;
}

const BeeFamilyRenderItem: React.FC<RenderProps> = ({
  item,
  expandedBeeFamily,
  setExpandedBeeFamily,
  handleOnPressEditBeeFamily,
  handleDelete,
}) => {

  return (
    <TouchableOpacity
      className={`border-2 rounded-2xl p-4 bg-tile ${
        expandedBeeFamily === item.id ? 'h-auto' : 'h-20'
      } mb-4`}
      onPress={() => setExpandedBeeFamily(expandedBeeFamily === item.id ? null : item.id)}
    >
      {expandedBeeFamily === item.id ? (
        <View>
          <Text className="font-pbold font-bold text-2xl mb-1" numberOfLines={1}>
            {item.familyNumber}
          </Text>
          <View className="flex-row justify-between">
            <Text className="font-pmedium font-bold text-xl" numberOfLines={1}>
              {item.race}
            </Text>
            <Text className="font-pmedium font-bold text-xl" numberOfLines={1}>
              {item.familyState}
            </Text>
            <Text className="font-pmedium font-bold text-xl" numberOfLines={1}>
              {ShowDateHelper.formatDateToShowForDate(item.creationDate)}
            </Text>
          </View>

          <View className="self-center h-[1] w-[80%] my-4 bg-black"></View>

          <View className="flex-row justify-between">
            <TouchableOpacity
              className="flex-row justify-center bg-edit w-[33%] rounded-xl p-3"
              onPress={() => handleOnPressEditBeeFamily(item)}
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
            {item.familyNumber}
          </Text>
          <View className="flex-row">
            <TouchableOpacity
              className="bg-edit rounded-xl p-3 mr-2"
              onPress={() => handleOnPressEditBeeFamily(item)}
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

export default BeeFamilyRenderItem;