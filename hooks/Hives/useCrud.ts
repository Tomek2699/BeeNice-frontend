import { Dispatch, SetStateAction } from 'react';
import { Hive } from '@/DataModels/HiveModel';
import { Alert, LayoutAnimation  } from 'react-native';
import HiveService from '@/services/HiveService';

export interface Props {
    setHives: Dispatch<SetStateAction<Hive[]>>;
}

export const useCrud = ({ setHives } : Props) => {

  const handleAddHive = (hive: Hive) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setHives((prevHives) => [...prevHives, hive]);
  };

  const handleEditHive = (hive: Hive) => {
    setHives((prevHives) => 
      prevHives.map(item => item.id === hive.id ? hive : item)
    );
  };

  const handleDeleteHive = async (id: number) => {
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
              const response = await HiveService.delete(id);
              if (response.status === 200) {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                setHives((hives) => hives.filter((item) => item.id !== id));
              } else {
                Alert.alert('Błąd', 'Nie udało się usunąć elementu. Spróbuj ponownie.');
              }
            } catch (error) {
              console.error('Błąd usuwania elementu:', error);
              Alert.alert('Błąd', 'Nie udało się usunąć elementu.');
            }
          },
        },
      ],
    );
  }

  return {
    handleAddHive,
    handleEditHive,
    handleDeleteHive,
  };
};
