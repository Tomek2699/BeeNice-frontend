import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import CustomModal from '../../Components/CustomModal';
import TherapeuticTreatmentService from '../../services/TherapeuticTreatmentService'
import { TherapeuticTreatment } from '@/DataModels/TherapeuticTreatmentModel';
import ShowDateHelper from '@/helpers/showDateHelper';

type MyComponentProps = {
  visible: boolean;
  value: TherapeuticTreatment | null;
  onClose: () => void;
  onSave: (therapeuticTreatment: TherapeuticTreatment) => void;
};

const EditTherapeuticTreatmentModal: React.FC<MyComponentProps> = ({ visible, value, onClose, onSave }) => {
  const initialTherapeuticTreatmentState = { treatmentDate: new Date(), medicine: '', dose: '', comment: '' };
  const [therapeuticTreatment, setTherapeuticTreatment] = useState(initialTherapeuticTreatmentState)

  const handleSave = async (): Promise<void> => {
    if(value != null){
        try {
            const therapeuticTreatmentToEdit: TherapeuticTreatment = {
              id: value.id,
              treatmentDate: therapeuticTreatment.treatmentDate,
              medicine: therapeuticTreatment.medicine,
              dose: therapeuticTreatment.dose,
              comment: therapeuticTreatment.comment,
              hiveId: value.hiveId
            };
            const response = await TherapeuticTreatmentService.edit(therapeuticTreatmentToEdit);
            if(response.status === 200){
              const addedTherapeuticTreatment = response.therapeuticTreatment;
              onSave(addedTherapeuticTreatment)
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
        setTherapeuticTreatment(value);
    }
    else{
      setTherapeuticTreatment(initialTherapeuticTreatmentState);
    }
  }, [value]); 

  return (
    <CustomModal
      visible={visible}
      title="Edytuj zabieg"
      acceptButton='Edytuj'
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
          title: 'Komentraz',
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

export default EditTherapeuticTreatmentModal;