import React, { useState } from 'react';
import { Alert } from 'react-native';
import CustomModal from '../../Components/CustomModal';
import ApiaryService from '../../services/ApiaryService'
import { Apiary } from '@/DataModels/ApiaryModel';

type MyComponentProps = {
  visible: boolean;
  onClose: () => void;
  onSave: (apiary: Apiary) => void;
};

const AddApiaryModal: React.FC<MyComponentProps> = ({ visible, onClose, onSave }) => {
  const initialApiaryState = { name: '', location: '' };
  const [apiary, setApiary] = useState(initialApiaryState)

  const handleSave = async (): Promise<void> => {
    try {
      const response = await ApiaryService.save(apiary.name, apiary.location);
      if(response.status === 200){
        const addedApiary = response.apiary;
        onSave(addedApiary)
        setApiary(initialApiaryState);
        onClose();
      }
    } catch (error) {
      Alert.alert('Błąd', 'Nie udało się zapisać danych.');
    }
  };

  const handleClose = (): void => {
    setApiary(initialApiaryState);
    onClose();
  };

  return (
    <CustomModal
      visible={visible}
      title="Dodaj pasiekę"
      acceptButton='Zapisz'
      inputs={[
        {
          title: 'Nazwa',
          placeholder: 'Wpisz nazwę',
          value: apiary.name,
          onChange: (e) => setApiary({ ...apiary, name: e}),
        },
        {
          title: 'Lokalizacja',
          placeholder: 'Wpisz lokalizację',
          value: apiary.location,
          onChange: (e) => setApiary({ ...apiary, location: e}),
        },
      ]}
      onClose={handleClose}
      onSubmit={handleSave}
    />
  );
};

export default AddApiaryModal;