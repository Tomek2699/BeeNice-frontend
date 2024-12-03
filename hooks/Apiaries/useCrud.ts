import { Dispatch, SetStateAction, useState } from 'react';
import { Apiary } from '@/DataModels/ApiaryModel';
import { Alert, LayoutAnimation  } from 'react-native';
import ApiaryService from '@/services/ApiaryService';

export interface Props {
    setApiaries: Dispatch<SetStateAction<Apiary[]>>;
}

export const useCrud = ({ setApiaries } : Props) => {
  const handleAddApiary = (apiary: Apiary) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setApiaries((prevApiaries) => [...prevApiaries, apiary]);
  };

  const handleEditApiary = (apiary: Apiary) => {
    setApiaries((prevApiaries) => 
      prevApiaries.map(item => item.id === apiary.id ? apiary : item)
    );
  };

  const handleDelete = async (id: number) => {
    Alert.alert(
      'Usuń element',
      'Czy na pewno chcesz usunąć ten element?',
      [
        { text: 'Anuluj', style: 'cancel' },
        {
          text: 'Usuń',
          style: 'destructive',
          onPress: async () => {
            try {
              const response = await ApiaryService.delete(id);
              if (response.status === 200) {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                setApiaries((prevApiaries) => prevApiaries.filter((item) => item.id !== id));
              } else {
                Alert.alert('Błąd', 'Nie udało się usunąć elementu. Spróbuj ponownie.');
              }
            } catch (error) {
              console.error('Błąd usuwania elementu:', error);
              Alert.alert('Błąd', 'Nie udało się usunąć elementu.');
            }
          },
        },
      ]
    );
  };

  return {
    handleAddApiary,
    handleEditApiary,
    handleDelete,
  };
};
