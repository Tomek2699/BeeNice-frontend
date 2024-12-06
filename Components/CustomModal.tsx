import { Modal, View, Text, TextInput, TouchableOpacity, Keyboard, Platform, ScrollView, KeyboardAvoidingView } from 'react-native';
import React, { useState } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import ShowDateHelper from '@/helpers/showDateHelper';

interface MyComponentProps {
  visible: boolean;
  title: string;
  acceptButton: string;
  inputs: { 
    title: string, 
    placeholder: string; 
    value: string; 
    onChange: (text: string) => void;
    isDatePicker?: boolean;
  }[];
  onClose: () => void;
  onSubmit: () => void;
};

export default function CustomModal({ visible, title, acceptButton, inputs, onClose, onSubmit }: MyComponentProps) {
  const [showDatePickerModal, setShowDatePickerModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentInputIndex, setCurrentInputIndex] = useState<number | null>(null);

  const openDatePickerModal = (index: number) => {
    setCurrentInputIndex(index);
    const currentValue = inputs[index].value;

    if (currentValue) {
      const parsedDate = new Date(currentValue);
      if (!isNaN(parsedDate.getTime())) {
        setSelectedDate(parsedDate);
      } else {
        setSelectedDate(new Date());
      }
    } else {
      setSelectedDate(new Date());
    }

    setShowDatePickerModal(true);
    Keyboard.dismiss();
  };

  const handleDateClose = () => {
    setShowDatePickerModal(false);
  };

  const handleDateSave = () => {
    if (currentInputIndex !== null && selectedDate) {
      inputs[currentInputIndex].onChange(selectedDate.toISOString());
    }
    setShowDatePickerModal(false);
  };

  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View className='flex-1 justify-center items-center bg-zinc-900/60'>
          <View className='w-[90%] p-6 bg-primaryBg border-2 rounded-xl'>
            <Text className='text-3xl font-bold mb-6 text-center'>{title}</Text>

            <ScrollView>
              <View className='w-[90%]'>
                {inputs.map((input, index) => (
                  <View key={index} className="w-full justify-center items-center m-3">
                    <Text className="text-xl self-start text-black font-semibold">{input.title}</Text>

                    {input.isDatePicker ? (
                      <TouchableOpacity
                        onPress={() => openDatePickerModal(index)}
                        className="w-full h-16 px-4 bg-fieldColor border-2 rounded-2xl justify-center"
                      >
                        <Text className='color-black'>
                          {input.value ? ShowDateHelper.formatDateToShowForString(input.value) : input.placeholder}
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <TextInput
                        className="w-full h-16 px-4 bg-fieldColor border-2 rounded-2xl items-center flex-row"
                        placeholder={input.placeholder}
                        placeholderTextColor="black"
                        value={input.value}
                        onChangeText={input.onChange}
                        onSubmitEditing={Keyboard.dismiss}
                      />
                    )}
                  </View>
                ))}
              </View>
            </ScrollView>

            <View className='flex-row items-center justify-center mt-4'>
              <TouchableOpacity onPress={onSubmit}>
                <Text className='font-pmedium text-xl mr-6'>
                  {acceptButton}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onClose}>
                <Text className='font-pmedium text-xl'>
                  Zamknij
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>

      {showDatePickerModal && (
        <Modal visible={showDatePickerModal} animationType="fade" transparent={true}>
          <View className="flex-1 justify-center items-center bg-zinc-900/60">
            <View className="w-[90%] p-6 bg-primaryBg rounded-xl items-center">
              <Text className="text-2xl font-bold mb-4">Wybierz datę</Text>
              <DateTimePicker
                value={selectedDate || new Date()}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={(event, date) => setSelectedDate(date || selectedDate)}
                textColor='black'
              />
              <View className="flex-row items-center justify-between mt-4">
                <TouchableOpacity
                  onPress={handleDateSave}
                  className="mr-6"
                >
                  <Text className='font-pmedium text-xl'>Zapisz</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleDateClose}
                >
                  <Text className='font-pmedium text-xl'>Zamknij</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </Modal>
  );
};

