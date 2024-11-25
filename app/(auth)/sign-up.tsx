import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Images from '../../constants/Images'
import FormFieldAuth from '@/Components/FormFieldAuth'
import CustomButton from "../../Components/CustomButton";
import { Link, router } from 'expo-router'
import { UserServiceInstance } from '../../services/UserService';
import LinkButton from '@/Components/LinkButton'


const SignUp = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [isSubmitting, setisSubmitting] = useState(false)

  const handleRegister = async (): Promise<void> => {
    try {
      const data = await UserServiceInstance.register(form.email, form.password, form.confirmPassword);
      if(data.status === 200){
        router.replace('/sign-in')
      }
    } catch (error) {
      Alert.alert('Błąd', 'Nie udało się zarejestrować. Sprawdź dane rejestracji.');
    }
  };

  return (
    <SafeAreaView className='bg-primaryBg h-full'>
      <ScrollView>
        <View className='w-full justify-center min-h-[80vh] px-4 my-1'>
          <Image source={Images.logoTextPast}
            resizeMode='contain'
            className='w-[170px] h-[50px]'/>

            <Text className='text-2xl text-black font-psemibold mt-6'>
              Zarejestruj się w Bee Nice!
            </Text>

            <FormFieldAuth
              title="Email"
              value={form.email}
              handleChangeText={(e) => setForm({ ...form, email: e})}
              otherStyles="mt-7"
              keyboardType="email-address"
            />

            <FormFieldAuth
              title="Hasło"
              value={form.password}
              handleChangeText={(e) => setForm({ ...form, password: e})}
              otherStyles="mt-7"
            />

            <FormFieldAuth
              title="Powtórz hasło"
              value={form.confirmPassword}
              handleChangeText={(e) => setForm({ ...form, confirmPassword: e})}
              otherStyles="mt-7"
            />

            <CustomButton
              title='Zarejestruj'
              handlePress={handleRegister}
              containerStyles='mt-8'
              isLoading={isSubmitting}
            />
            <View className='justify-center pt-5 items-center'>
              <Text className='text-lg text-black font-pregular'>
                Masz już konto?
              </Text>
              <LinkButton text='Zaloguj się!' otherStyles='text-lg font-psemibold text-secondary' handleOnPress={() => router.replace('/sign-in')}/>
            </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp