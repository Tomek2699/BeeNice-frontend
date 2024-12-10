import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Review } from '../../DataModels/ReviewModel';
import Icons from '../../constants/Icons';
import ShowDateHelper from '@/helpers/showDateHelper';

interface RenderProps {
  item: Review;
  expandedReview: number | null;
  setExpandedReview: (id: number | null) => void;
  handleOnPressEditReview: (review: Review) => void;
  handleDelete: (id: number) => void;
}

const ReviewRenderItem: React.FC<RenderProps> = ({
  item,
  expandedReview,
  setExpandedReview,
  handleOnPressEditReview,
  handleDelete,
}) => {

  return (
    <TouchableOpacity
      className={`border-2 rounded-2xl p-4 bg-tile ${
        expandedReview === item.id ? 'h-auto' : 'h-20'
      } mb-4`}
      onPress={() => setExpandedReview(expandedReview === item.id ? null : item.id)}
    >
      {expandedReview === item.id ? (
        <View>
          <Text className="font-pbold font-bold text-2xl" numberOfLines={1}>
              {ShowDateHelper.formatDateToShowForDate(item.reviewDate)}
          </Text>
          <View className="flex-row justify-between">
            <Text className="font-pmedium font-bold text-xl mb-1" numberOfLines={1}>
              {item.familyState}
            </Text>
            <Text className="font-pmedium font-bold text-xl" numberOfLines={1}>
              {item.comment}
            </Text>
          </View>

          <View className="self-center h-[1] w-[80%] my-4 bg-black"></View>

          <View className="flex-row justify-between">
            <TouchableOpacity
              className="flex-row justify-center bg-edit w-[33%] rounded-xl p-3"
              onPress={() => handleOnPressEditReview(item)}
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
            {ShowDateHelper.formatDateToShowForDate(item.reviewDate)}
          </Text>
          <View className="flex-row">
            <TouchableOpacity
              className="bg-edit rounded-xl p-3 mr-2"
              onPress={() => handleOnPressEditReview(item)}
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

export default ReviewRenderItem;