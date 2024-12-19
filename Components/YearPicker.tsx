import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';

type YearRangePickerProps = {
  yearsRange: number[];
  actualSetYear: number,
  onYearSelect: (year: number) => void;
};

const YearRangePicker: React.FC<YearRangePickerProps> = ({ yearsRange, actualSetYear, onYearSelect }) => {
  const [selectedYear, setSelectedYear] = useState<number>(actualSetYear);

  const handleYearPress = (year: number) => {
    setSelectedYear(year);
    onYearSelect(year);
  };

  return (
    <View className="flex-1 p-4">
      <Text className="font-pbold text-3xl mb-4 text-center">Wybierz rok</Text>
      <FlatList
        data={yearsRange}
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            className={`p-4 my-2 items-center self-center rounded-2xl ${
              item === selectedYear ? 'bg-gray-400' : ''
            }`}
            onPress={() => handleYearPress(item)}
          >
            <Text
              className={`font-psemibold text-2xl text-black`}
            >
              {item}
            </Text>
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default YearRangePicker;
