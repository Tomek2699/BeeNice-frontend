import React, { useState } from 'react';
import { Alert } from 'react-native';
import CustomModal from '../../Components/CustomModal';
import BeeFamilyService from '../../services/BeeFamilyService'
import { BeeFamily } from '@/DataModels/BeeFamilyMode';
import ShowDateHelper from '@/helpers/showDateHelper';

type MyComponentProps = {
  visible: boolean;
  hiveId: number | undefined;
  onClose: () => void;
  onSave: (beeFamily: BeeFamily) => void;
};

const AddBeeFamilyModal: React.FC<MyComponentProps> = ({ visible, hiveId, onClose, onSave }) => {
  const initialBeeFamilyState = { familyNumber: '', race: '', familyState: '', creationDate: new Date()};
  const [beeFamily, setBeeFamily] = useState(initialBeeFamilyState)

  const handleSave = async (): Promise<void> => {
    try {
      const response = await BeeFamilyService.save(beeFamily.familyNumber, beeFamily.race, beeFamily.familyState, beeFamily.creationDate, hiveId);
      if(response.status === 200){
        const addedBeeFamily = response.beeFamily;
        onSave(addedBeeFamily)
        setBeeFamily(initialBeeFamilyState);
        onClose();
      }
    } catch (error) {
      Alert.alert('Błąd', 'Nie udało się zapisać danych.');
    }
  };

  const handleClose = (): void => {
    setBeeFamily(initialBeeFamilyState);
    onClose();
  };

  return (
    <CustomModal
      visible={visible}
      title="Dodaj rodzinę"
      acceptButton='Zapisz'
      inputs={[
        {
          title: 'Numer',
          placeholder: 'Wpisz numer',
          value: beeFamily.familyNumber,
          onChange: (e) => setBeeFamily({ ...beeFamily, familyNumber: e}),
        },
        {
          title: 'Rasa',
          placeholder: 'Wpisz rasę',
          value: beeFamily.race,
          onChange: (e) => setBeeFamily({ ...beeFamily, race: e}),
        },
        {
          title: 'Stan',
          placeholder: 'Wpisz stan',
          value: beeFamily.familyState,
          onChange: (e) => setBeeFamily({ ...beeFamily, familyState: e}),
        },
        {
          title: 'Data',
          placeholder: 'Wpisz datę',
          value: ShowDateHelper.formatDateToISOString(beeFamily.creationDate),
          onChange: (e) => setBeeFamily({ ...beeFamily, creationDate: new Date(e)}),
          isDatePicker: true
        },
      ]}
      onClose={handleClose}
      onSubmit={handleSave}
    />
  );
};

export default AddBeeFamilyModal;