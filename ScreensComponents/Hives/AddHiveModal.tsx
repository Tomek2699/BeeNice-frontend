import React, { useState } from 'react';
import { Alert } from 'react-native';
import CustomModal from '../../Components/CustomModal';
import HiveService from '../../services/HiveService'
import { Hive } from '@/DataModels/HiveModel';

type MyComponentProps = {
  visible: boolean;
  apiaryId: number | undefined;
  onClose: () => void;
  onSave: (hive: Hive) => void;
};

const AddHiveModal: React.FC<MyComponentProps> = ({ visible, apiaryId, onClose, onSave }) => {
  const initialHiveState = { hiveNumber: '', type: '', state: '' };
  const [hive, setHive] = useState(initialHiveState)

  const handleSave = async (): Promise<void> => {
    try {
      const response = await HiveService.save(hive.hiveNumber, hive.type, hive.state, apiaryId);
      if(response.status === 200){
        const addedHive = response.hive;
        onSave(addedHive)
        setHive(initialHiveState);
        onClose();
      }
    } catch (error) {
      Alert.alert('Błąd', 'Nie udało się zapisać danych.');
    }
  };

  const handleClose = (): void => {
    setHive(initialHiveState);
    onClose();
  };

  return (
    <CustomModal
      visible={visible}
      title="Dodaj ul"
      acceptButton='Zapisz'
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

export default AddHiveModal;