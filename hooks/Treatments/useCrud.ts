import { Dispatch, SetStateAction } from 'react';
import { Queen } from '@/DataModels/QueenModel';
import { Alert, LayoutAnimation  } from 'react-native';
import QueenService from '@/services/QueenService';

export interface Props {
    setQueens: Dispatch<SetStateAction<Queen[]>>;
}

export const useCrud = ({ setQueens } : Props) => {

  const handleAddQueen = (queen: Queen) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setQueens((prevQueens) => [...prevQueens, queen]);
  };

  const handleEditQueen = (queen: Queen) => {
    setQueens((prevQueens) => 
      prevQueens.map(item => item.id === queen.id ? queen : item)
    );
  };

  const handleDeleteQueen = async (id: number) => {
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
              const response = await QueenService.delete(id);
              if (response.status === 200) {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                setQueens((queens) => queens.filter((item) => item.id !== id));
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
    handleAddQueen,
    handleEditQueen,
    handleDeleteQueen,
  };
};
