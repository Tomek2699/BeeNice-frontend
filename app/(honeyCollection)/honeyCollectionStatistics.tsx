import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useHoneyCollections } from '@/DataProviders/HoneyCollectionsProvider';
import { Text, Image, View, LayoutChangeEvent, TouchableOpacity, Modal } from 'react-native';
import { BarChart, barDataItem } from 'react-native-gifted-charts'
import YearRangePicker from '@/Components/YearPicker';
import { generatePdf } from '@/hooks/HoneyCollections/generatePdf';
import Icons from '@/constants/Icons';

const honeyCollectionStatistics = () => {
  const { honeyCollections } = useHoneyCollections();
  const [chartData, setChartData] = useState<{ label: string; value: number }[]>([]);
  const [maxDataValue, setMaxDataValue] = useState<number>();
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [tempSelectedYear, setTempSelectedYear] = useState<number>(new Date().getFullYear());
  const [availableYears, setAvailableYears] = useState<number[]>([]);
  const [openFilter, setOpenFilter] = useState(false);

  const { generatePDF } = generatePdf({ honeyCollections, yearCollection: selectedYear });

  useEffect(() => {
    const filteredHoneyCollections = selectedYear
      ? honeyCollections.filter(({ collectionDate }) =>
          collectionDate.getFullYear() === selectedYear
        )
      : honeyCollections;

    const monthlyData = filteredHoneyCollections.reduce<{ [month: number]: number }>((acc, { collectionDate, honeyQuantity }) => {
      const month = collectionDate.getMonth();
      if (!acc[month]) {
        acc[month] = 0;
      }
      acc[month] += honeyQuantity;
      return acc;
    }, {});

    const formattedChartData = Array.from({ length: 12 }, (_, index) => ({
      label: new Date(selectedYear, index).toLocaleString('default', { month: 'short' }),
      value: monthlyData[index] || 0,
    }));

    const maxValue = Math.max(...formattedChartData.map(item => item.value));

    const years = Array.from(
      new Set(honeyCollections.map(({ collectionDate }) => collectionDate.getFullYear()))
    ).sort((a, b) => a - b);
  
    setAvailableYears(years);

    setMaxDataValue(maxValue + 300);
    setChartData(formattedChartData);
  }, [honeyCollections, selectedYear]);

  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  const handleLayout = (event: LayoutChangeEvent) => {
    const { height, width } = event.nativeEvent.layout;
    setWidth(width);
    setHeight(height);
  };

  const handleSaveFilter = () => {
    setSelectedYear(tempSelectedYear);
    setOpenFilter(false);
  };

  return (
    <SafeAreaView className='bg-primaryBg h-full'>
      <View className='flex-1 justify-center mx-2'>
        <View className={'flex-[0.3] justify-center items-center'}>
          <TouchableOpacity className='bg-mainButtonBg border-2 rounded-2xl p-4 mb-2'
            onPress={() => setOpenFilter(true)}
          >
            <Text className='font-psemibold text-xl'>Ustaw filtr</Text>
          </TouchableOpacity>
          <TouchableOpacity className='flex-row justify-center self-center bg-mainButtonBg border-2 rounded-2xl p-4'
            onPress={() => generatePDF()}
          >
            <Text className='font-psemibold text-xl'>Wygeneruj zestawienie</Text>
            <Image source={Icons.pdf} className="w-6 h-6" resizeMode="contain" />
          </TouchableOpacity>
        </View>

        <View className={`flex-[0.7] justify-end`} onLayout={handleLayout}>
          <BarChart
            data={chartData}
            height={height * 0.8}
            width={width * 0.75}
            barWidth={18}
            barBorderRadius={5}
            spacing={40}
            autoCenterTooltip
            initialSpacing={20}
            yAxisThickness={0}
            isAnimated
            maxValue={maxDataValue}
            renderTooltip={(item: barDataItem) => {
              return (
                <View className="mb-[-20] bg-[#e3af34] px-1.5 py-1 rounded-md">
                  <Text className='text-black'>{item.value}</Text>
                </View>
              );
            }}
          />
        </View>
      </View>

      <Modal visible={openFilter} animationType="fade" transparent={true}>
        <View className='flex-1 justify-center items-center bg-zinc-900/60'>
          <View className='w-[90%] max-h-[80%] p-6 bg-primaryBg border-2 rounded-xl'>
            <Text className='text-3xl font-bold mb-6 text-center'>Ustaw filtr</Text>
            <View className='h-[200]'>
              <YearRangePicker 
                yearsRange={availableYears}
                actualSetYear={selectedYear}
                onYearSelect={setTempSelectedYear}
              />
            </View>
            <View className='flex-row items-center justify-center mt-4'>
              <TouchableOpacity onPress={handleSaveFilter}>
                <Text className='font-pmedium text-xl mr-6'>
                  Zapisz
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setOpenFilter(false)}>
                <Text className='font-pmedium text-xl'>
                  Zamknij
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

export default honeyCollectionStatistics;
