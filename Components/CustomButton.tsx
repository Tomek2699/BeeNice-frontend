import { TouchableOpacity, Text } from 'react-native'
import React from 'react'

type MyComponentProps = {
    title: string;
    handlePress: () => void;
    containerStyles?: string;
    textStyles?: string;
    isLoading?: boolean;
  };

const CustomButton = ({ title, handlePress, containerStyles, textStyles, isLoading } : MyComponentProps) => {
  return (
    <TouchableOpacity 
        onPress={handlePress}
        activeOpacity={0.7}
        className={`bg-mainButtonBg rounded-xl min-h-[62px] justify-center items-center ${containerStyles} ${isLoading ? 'opacity-50' : ''}`}
        disabled={isLoading}>
        <Text className={`text-black text-lg font-psemibold ${textStyles}`}>
            {title}
        </Text>
    </TouchableOpacity>
  )
}

export default CustomButton