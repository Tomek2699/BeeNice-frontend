import React, { useState } from 'react';
import { Alert } from 'react-native';
import CustomModal from '../../Components/CustomModal';
import TherapeuticTreatmentService from '../../services/TherapeuticTreatmentService'
import { TherapeuticTreatment } from '@/DataModels/TherapeuticTreatmentModel';
import ShowDateHelper from '@/helpers/showDateHelper';

type MyComponentProps = {
  visible: boolean;
  hiveId: number | undefined;
  onClose: () => void;
  onSave: (therapeuticTreatment: TherapeuticTreatment) => void;
};

const AddTherapeuticTreatmentModal: React.FC<MyComponentProps> = ({ visible, hiveId, onClose, onSave }) => {
  const initialTherapeuticTreatmentState = { treatmentDate: new Date(), medicine: '', dose: '', comment: '' };
  const [therapeuticTreatment, setTherapeuticTreatment] = useState(initialTherapeuticTreatmentState)

  const handleSave = async (): Promise<void> => {
    try {
      const response = await TherapeuticTreatmentService.save(therapeuticTreatment.treatmentDate, therapeuticTreatment.medicine, therapeuticTreatment.dose, 
        therapeuticTreatment.comment, hiveId);
      if(response.status === 200){
        const addedTherapeuticTreatment = response.therapeuticTreatment;
        onSave(addedTherapeuticTreatment)
        setTherapeuticTreatment(initialTherapeuticTreatmentState);
        onClose();
      }
    } catch (error) {
      Alert.alert('Błąd', 'Nie udało się zapisać danych.');
    }
  };

  const handleClose = (): void => {
    setTherapeuticTreatment(initialTherapeuticTreatmentState);
    onClose();
  };

  return (
    <CustomModal
      visible={visible}
      title="Dodaj zabieg"
      acceptButton='Zapisz'
      inputs={[
        {
          title: 'Data',
          placeholder: 'Wpisz datę',
          value: ShowDateHelper.formatDateToISOString(therapeuticTreatment.treatmentDate),
          onChange: (e) => setTherapeuticTreatment({ ...therapeuticTreatment, treatmentDate: new Date(e)}),
          isDatePicker: true
        },
        {
          title: 'Lek',
          placeholder: 'Wpisz lek',
          value: therapeuticTreatment.medicine,
          onChange: (e) => setTherapeuticTreatment({ ...therapeuticTreatment, medicine: e}),
        },
        {
          title: 'Ilość',
          placeholder: 'Wpisz ilość',
          value: therapeuticTreatment.dose,
          onChange: (e) => setTherapeuticTreatment({ ...therapeuticTreatment, dose: e}),
        },
        {
          title: 'Komentarz',
          placeholder: 'Wpisz komentarz',
          value: therapeuticTreatment.comment,
          onChange: (e) => setTherapeuticTreatment({ ...therapeuticTreatment, comment: e}),
        },
      ]}
      onClose={handleClose}
      onSubmit={handleSave}
    />
  );
};

export default AddTherapeuticTreatmentModal;