import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import CustomModal from '../../Components/CustomModal';
import QueenService from '../../services/QueenService'
import { Queen } from '@/DataModels/QueenModel';
import ShowDateHelper from '@/helpers/showDateHelper';

type MyComponentProps = {
  visible: boolean;
  value: Queen | null;
  onClose: () => void;
  onSave: (queen: Queen) => void;
};

const EditQueenModal: React.FC<MyComponentProps> = ({ visible, value, onClose, onSave }) => {
  const initialQueenState = { queenNumber: '', race: '', hatchDate: new Date(), state: '' };
  const [queen, setQueen] = useState(initialQueenState)

  const handleSave = async (): Promise<void> => {
    if(value != null){
        try {
            const queenToEdit: Queen = {
              id: value.id,
              queenNumber: queen.queenNumber,
              race: queen.race,
              hatchDate: queen.hatchDate,
              state: queen.state,
              hiveId: value.hiveId
            };
            const response = await QueenService.edit(queenToEdit);
            if(response.status === 200){
              const addedQueen = response.queen;
              onSave(addedQueen)
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
      console.log(typeof value.hatchDate)
        setQueen(value);
    }
    else{
      setQueen(initialQueenState);
    }
  }, [value]); 

  return (
    <CustomModal
      visible={visible}
      title="Edytuj matkę"
      acceptButton='Edytuj'
      inputs={[
        {
          title: 'Numer',
          placeholder: 'Wpisz numer',
          value: queen.queenNumber,
          onChange: (e) => setQueen({ ...queen, queenNumber: e}),
        },
        {
          title: 'Rasa',
          placeholder: 'Wpisz rasę',
          value: queen.race,
          onChange: (e) => setQueen({ ...queen, race: e}),
        },
        {
          title: 'Data',
          placeholder: 'Wpisz datę',
          value: ShowDateHelper.formatDateToISOString(queen.hatchDate),
          onChange: (e) => setQueen({ ...queen, hatchDate: new Date(e)}),
          isDatePicker: true
        },
        {
          title: 'Stan',
          placeholder: 'Wpisz stan',
          value: queen.state,
          onChange: (e) => setQueen({ ...queen, state: e}),
        },
      ]}
      onClose={handleClose}
      onSubmit={handleSave}
    />
  );
};

export default EditQueenModal;