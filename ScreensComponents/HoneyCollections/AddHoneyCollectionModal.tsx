import React, { useState } from 'react';
import { Alert } from 'react-native';
import CustomModal from '../../Components/CustomModal';
import HoneyCollectionService from '../../services/HoneyCollectionService'
import { HoneyCollection } from '@/DataModels/HoneyCollectionModel';
import ShowDateHelper from '@/helpers/showDateHelper';

type MyComponentProps = {
  visible: boolean;
  hiveId: number | undefined;
  onClose: () => void;
  onSave: (honeyCollection: HoneyCollection) => void;
};

const AddHoneyCollectionModal: React.FC<MyComponentProps> = ({ visible, hiveId, onClose, onSave }) => {
  const initialHoneyCollectionState = { collectionDate: new Date(), honeyQuantity: 0, typeOfHoney: '' };
  const [honeyCollection, setHoneyCollection] = useState(initialHoneyCollectionState)

  const handleSave = async (): Promise<void> => {
    try {
      const response = await HoneyCollectionService.save(honeyCollection.collectionDate, honeyCollection.honeyQuantity, honeyCollection.typeOfHoney, hiveId);
      if(response.status === 200){
        const addedHoneyCollection = response.honeyCollection;
        onSave(addedHoneyCollection)
        setHoneyCollection(initialHoneyCollectionState);
        onClose();
      }
    } catch (error) {
      Alert.alert('Błąd', 'Nie udało się zapisać danych.');
    }
  };

  const handleClose = (): void => {
    setHoneyCollection(initialHoneyCollectionState);
    onClose();
  };

  return (
    <CustomModal
      visible={visible}
      title="Dodaj zbiór miodu"
      acceptButton='Zapisz'
      inputs={[
        {
          title: 'Data zbioru',
          placeholder: 'Wpisz datę',
          value: ShowDateHelper.formatDateToISOString(honeyCollection.collectionDate),
          onChange: (e) => setHoneyCollection({ ...honeyCollection, collectionDate: new Date(e)}),
          isDatePicker: true
        },
        {
          title: 'Ilość',
          placeholder: 'Wpisz ilość',
          value: honeyCollection.honeyQuantity.toString(),
          onChange: (e) => setHoneyCollection({ ...honeyCollection, honeyQuantity: parseInt(e)}),
        },
        {
          title: 'Rodzaj',
          placeholder: 'Wpisz rodzaj',
          value: honeyCollection.typeOfHoney,
          onChange: (e) => setHoneyCollection({ ...honeyCollection, typeOfHoney: e}),
        },
      ]}
      onClose={handleClose}
      onSubmit={handleSave}
    />
  );
};

export default AddHoneyCollectionModal;