import { Dispatch, SetStateAction } from 'react';
import { TherapeuticTreatment } from '@/DataModels/TherapeuticTreatmentModel';
import { Alert, LayoutAnimation  } from 'react-native';
import TherapeuticTreatmentService from '@/services/TherapeuticTreatmentService';

export interface Props {
    setTherapeuticTreatments: Dispatch<SetStateAction<TherapeuticTreatment[]>>;
}

export const useCrud = ({ setTherapeuticTreatments } : Props) => {

  const handleAddTherapeuticTreatment = (therapeuticTreatment: TherapeuticTreatment) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setTherapeuticTreatments((prevTherapeuticTreatments) => [...prevTherapeuticTreatments, therapeuticTreatment]);
  };

  const handleEditTherapeuticTreatment = (therapeuticTreatment: TherapeuticTreatment) => {
    setTherapeuticTreatments((prevTherapeuticTreatments) => 
      prevTherapeuticTreatments.map(item => item.id === therapeuticTreatment.id ? therapeuticTreatment : item)
    );
  };

  const handleDeleteTherapeuticTreatment = async (id: number) => {
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
              const response = await TherapeuticTreatmentService.delete(id);
              if (response.status === 200) {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                setTherapeuticTreatments((therapeuticTreatments) => therapeuticTreatments.filter((item) => item.id !== id));
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
    handleAddTherapeuticTreatment,
    handleEditTherapeuticTreatment,
    handleDeleteTherapeuticTreatment,
  };
};
