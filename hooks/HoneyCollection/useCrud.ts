import { Dispatch, SetStateAction } from 'react';
import { HoneyCollection } from '@/DataModels/HoneyCollectionModel';
import { Alert, LayoutAnimation  } from 'react-native';
import HoneyCollectionService from '@/services/HoneyCollectionService';

export interface Props {
    setHoneyCollections: Dispatch<SetStateAction<HoneyCollection[]>>;
}

export const useCrud = ({ setHoneyCollections } : Props) => {

  const handleAddHoneyCollection = (honeyCollection: HoneyCollection) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setHoneyCollections((prevHoneyCollections) => [...prevHoneyCollections, honeyCollection]);
  };

  const handleEditHoneyCollection = (honeyCollection: HoneyCollection) => {
    setHoneyCollections((prevHoneyCollections) => 
      prevHoneyCollections.map(item => item.id === honeyCollection.id ? honeyCollection : item)
    );
  };

  const handleDeleteHoneyCollection = async (id: number) => {
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
              const response = await HoneyCollectionService.delete(id);
              if (response.status === 200) {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                setHoneyCollections((honeyCollections) => honeyCollections.filter((item) => item.id !== id));
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
    handleAddHoneyCollection,
    handleEditHoneyCollection,
    handleDeleteHoneyCollection,
  };
};
