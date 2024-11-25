import { Modal, View, Text, TextInput, TouchableOpacity } from 'react-native';
import React from 'react'

type MyComponentProps = {
  visible: boolean;
  title: string;
  acceptButton: string;
  inputs: { title: string, placeholder: string; value: string; onChange: (text: string) => void }[];
  onClose: () => void;
  onSubmit: () => void;
};

const CustomModal: React.FC<MyComponentProps> = ({ visible, title, acceptButton, inputs, onClose, onSubmit }) => {
  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <View className='flex-1 justify-center items-center bg-zinc-900/60'>
        <View className='w-[90%] p-20 bg-primaryBg border-2 rounded-xl items-center'>
          <Text className='text-3xl font-bold mb-6'>{title}</Text>

          {inputs.map((input, index) => (
            <View key={index} className='w-full justify-center items-center m-3'>
              <Text className='text-xl self-start text-black font-semibold'>
                {input.title}
              </Text>
              <TextInput
                className='w-full h-16 px-4 bg-fieldColor border-2 rounded-2xl items-center flex-row'
                placeholder={input.placeholder}
                value={input.value}
                onChangeText={input.onChange}
              />
            </View>
          ))}

          <View className='flex-row items-center justify-between'>
            <TouchableOpacity onPress={onSubmit} className='p-2 mr-5'>
              <Text className='font-pmedium text-xl'>
                {acceptButton}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onClose} className='p-2'>
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

export default CustomModal