import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Images from '../../constants/Images'
import FormFieldAuth from '@/Components/FormFieldAuth'
import CustomButton from "../../Components/CustomButton";
import { Link, router } from 'expo-router'
import { UserServiceInstance } from '../../services/UserService';
import LinkButton from '@/Components/LinkButton'

const SignIn = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (): Promise<void> => {
    try {
      setIsLoading(true)
      const data = await UserServiceInstance.login(form.email, form.password);

      if(data.status === 200){
        router.replace('/apiaries')
      }
    } catch (error) {
      Alert.alert('Błąd', 'Nie udało się zalogować. Sprawdź dane logowania.');
    }
    finally{
      setIsLoading(false)
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
              Zaloguj się do Bee Nice
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

            <CustomButton
              title='Zaloguj'
              handlePress={handleLogin}
              containerStyles='mt-8'
              isLoading={isLoading}
            />

            <View className='justify-center pt-5 items-center'>
              <Text className='text-lg text-black font-pregular'>
                Nie masz jeszcze konta?
              </Text>
              <LinkButton text='Zarejestruj się!' otherStyles='text-lg font-psemibold text-secondary' handleOnPress={() => router.replace('/sign-up')}/>
            </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn