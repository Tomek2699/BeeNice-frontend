import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import CustomModal from '../../Components/CustomModal';
import HiveService from '../../services/HiveService'
import { Hive } from '@/DataModels/HiveModel';

type MyComponentProps = {
  visible: boolean;
  value: Hive | null;
  onClose: () => void;
  onSave: (hive: Hive) => void;
};

const EditHiveModal: React.FC<MyComponentProps> = ({ visible, value, onClose, onSave }) => {
  const initialHiveState = { hiveNumber: '', type: '', state: '' };
  const [hive, setHive] = useState({
    hiveNumber: '',
    type: '',
    state: '',
  })

  const handleSave = async (): Promise<void> => {
    if(value != null){
        try {
            const hiveToEdit: Hive = {
              id: value.id,
              hiveNumber: hive.hiveNumber,
              type: hive.type,
              state: hive.state,
              apiaryId: value.apiaryId
            };
            const response = await HiveService.edit(hiveToEdit);
            if(response.status === 200){
              const addedHive = response.hive;
              onSave(addedHive)
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
    if(value != null){
        setHive(value);
    }
    else{
        setHive(initialHiveState);
    }
  }, [value]); 

  return (
    <CustomModal
      visible={visible}
      title="Edytuj ul"
      acceptButton='Edytuj'
      inputs={[
        {
          title: 'Numer',
          placeholder: 'Wpisz numer',
          value: hive.hiveNumber,
          onChange: (e) => setHive({ ...hive, hiveNumber: e}),
        },
        {
          title: 'Typ',
          placeholder: 'Wpisz typ',
          value: hive.type,
          onChange: (e) => setHive({ ...hive, type: e}),
        },
        {
          title: 'Stan',
          placeholder: 'Wpisz stan',
          value: hive.state,
          onChange: (e) => setHive({ ...hive, state: e}),
        },
      ]}
      onClose={handleClose}
      onSubmit={handleSave}
    />
  );
};

export default EditHiveModal;