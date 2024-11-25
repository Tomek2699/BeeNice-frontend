import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import Icons from '../constants/Icons'

type MyComponentProps = {
    title: string;
    value: string,
    placeholder?: any,
    handleChangeText: (text: string) => void,
    otherStyles: string,
    keyboardType?: string,
  };

const FormFieldAuth = ({ title, value, placeholder, handleChangeText, otherStyles, keyboardType} : MyComponentProps) => {
    const [showPassword, setShowPassword] = useState(false)

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className='text-base text text-black font-pmedium'>{title}</Text>

      <View className='w=full h-16 px-4 bg-fieldColor border-2 rounded-2xl items-center flex-row'>
        <TextInput
            className='flex-1 text-black font-psemibold text-base'
            value={value}
            placeholder={placeholder}
            placeholderTextColor='#312f17'
            onChangeText={handleChangeText}
            secureTextEntry={ (title === 'Hasło' || title === 'Powtórz hasło') && !showPassword}
        />

        {(title === "Hasło" || title === 'Powtórz hasło') && (
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Image source={!showPassword ? Icons.eye : Icons.eyeHide}
                    className='w-6 h-6'
                    resizeMode='contain'
                />
            </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default FormFieldAuth