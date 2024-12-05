import React, { useState } from 'react';
import { Alert } from 'react-native';
import CustomModal from '../../Components/CustomModal';
import QueenService from '../../services/QueenService'
import { Queen } from '@/DataModels/QueenModel';
import ShowDateHelper from '@/helpers/showDateHelper';

type MyComponentProps = {
  visible: boolean;
  hiveId: number | undefined;
  onClose: () => void;
  onSave: (queen: Queen) => void;
};

const AddQueenModal: React.FC<MyComponentProps> = ({ visible, hiveId, onClose, onSave }) => {
  const initialQueenState = { queenNumber: '', race: '', hatchDate: new Date(), state: '' };
  const [queen, setQueen] = useState(initialQueenState)

  const handleSave = async (): Promise<void> => {
    try {
      const response = await QueenService.save(queen.queenNumber, queen.race, queen.hatchDate, queen.state, hiveId);
      if(response.status === 200){
        const addedQueen = response.queen;
        onSave(addedQueen)
        setQueen(initialQueenState);
        onClose();
      }
    } catch (error) {
      Alert.alert('Błąd', 'Nie udało się zapisać danych.');
    }
  };

  const handleClose = (): void => {
    setQueen(initialQueenState);
    onClose();
  };

  return (
    <CustomModal
      visible={visible}
      title="Dodaj matkę"
      acceptButton='Zapisz'
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

export default AddQueenModal;