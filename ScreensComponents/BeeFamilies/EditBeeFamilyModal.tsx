import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import CustomModal from '../../Components/CustomModal';
import BeeFamilyService from '../../services/BeeFamilyService'
import { BeeFamily } from '@/DataModels/BeeFamilyMode';
import ShowDateHelper from '@/helpers/showDateHelper';

type MyComponentProps = {
  visible: boolean;
  value: BeeFamily | null;
  onClose: () => void;
  onSave: (beeFamily: BeeFamily) => void;
};

const EditBeeFamilyModal: React.FC<MyComponentProps> = ({ visible, value, onClose, onSave }) => {
  const initialBeeFamilynState = { familyNumber: '', race: '', familyState: '', creationDate: new Date() };
  const [beeFamily, setBeeFamily] = useState(initialBeeFamilynState)

  const handleSave = async (): Promise<void> => {
    if(value != null){
        try {
            const beeFamilyToEdit: BeeFamily = {
              id: value.id,
              familyNumber: beeFamily.familyNumber,
              race: beeFamily.race,
              familyState: beeFamily.familyState,
              creationDate: beeFamily.creationDate,
              hiveId: value.hiveId
            };
            const response = await BeeFamilyService.edit(beeFamilyToEdit);
            if(response.status === 200){
              const addedBeeFamily = response.beeFamily;
              onSave(addedBeeFamily)
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
      setBeeFamily(value);
    }
    else{
      setBeeFamily(initialBeeFamilynState);
    }
  }, [value]); 

  return (
    <CustomModal
      visible={visible}
      title="Edytuj rodzinę"
      acceptButton='Edytuj'
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

export default EditBeeFamilyModal;