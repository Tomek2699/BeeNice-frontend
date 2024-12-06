import { Dispatch, SetStateAction } from 'react';
import { BeeFamily } from '@/DataModels/BeeFamilyMode';
import { Alert, LayoutAnimation  } from 'react-native';
import BeeFamilyService from '@/services/BeeFamilyService';

export interface Props {
  setBeeFamilies: Dispatch<SetStateAction<BeeFamily[]>>;
}

export const useCrud = ({ setBeeFamilies } : Props) => {

  const handleAddBeeFamily = (beeFamily: BeeFamily) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setBeeFamilies((prevBeeFamiliess) => [...prevBeeFamiliess, beeFamily]);
  };

  const handleEditBeeFamily = (beeFamily: BeeFamily) => {
    setBeeFamilies((prevBeeFamiliess) => 
      prevBeeFamiliess.map(item => item.id === beeFamily.id ? beeFamily : item)
    );
  };

  const handleDeleteBeeFamily = async (id: number) => {
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
              const response = await BeeFamilyService.delete(id);
              if (response.status === 200) {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                setBeeFamilies((beeFamilies) => beeFamilies.filter((item) => item.id !== id));
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
    handleAddBeeFamily,
    handleEditBeeFamily,
    handleDeleteBeeFamily,
  };
};
