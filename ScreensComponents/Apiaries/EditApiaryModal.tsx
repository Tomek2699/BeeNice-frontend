import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import CustomModal from '../../Components/CustomModal';
import ApiaryService from '../../services/ApiaryService'
import { Apiary } from '@/DataModels/ApiaryModel';

type MyComponentProps = {
  visible: boolean;
  value: Apiary | null;
  onClose: () => void;
  onSave: (apiary: Apiary) => void;
};

const AddApiaryModal: React.FC<MyComponentProps> = ({ visible, value, onClose, onSave }) => {
  const initialApiaryState = { name: '', location: '' };
  const [apiary, setApiary] = useState({
    name: '',
    location: '',
  })

  const handleSave = async (): Promise<void> => {
    if(value != null){
        try {
            const apiaryToEdit: Apiary = {
              id: value.id,
              name: apiary.name,
              location: apiary.location,
              creationDate: value.creationDate
            };
            const response = await ApiaryService.edit(apiaryToEdit);
            if(response.status === 200){
              const addedApiary = response.apiary;
              onSave(addedApiary)
              onClose();
            }
          } catch (error) {
            Alert.alert('Błąd', 'Nie udało się edytować danych.');
          }
    }
  };

  const handleClose = (): void => {
    onClose();
  };

  useEffect(() => {
    console.log(value?.id)
    if(value != null){
        setApiary(value);
    }
    else{
        setApiary(initialApiaryState);
    }
  }, [value]); 

  return (
    <CustomModal
      visible={visible}
      title="Edytuj pasiekę"
      acceptButton='Edytuj'
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