import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import CustomModal from '../../Components/CustomModal';
import HoneyCollectionService from '../../services/HoneyCollectionService'
import { HoneyCollection } from '@/DataModels/HoneyCollectionModel';
import ShowDateHelper from '@/helpers/showDateHelper';

type MyComponentProps = {
  visible: boolean;
  value: HoneyCollection | null;
  onClose: () => void;
  onSave: (honeyCollection: HoneyCollection) => void;
};

const EditHoneyCollectionModal: React.FC<MyComponentProps> = ({ visible, value, onClose, onSave }) => {
  const initialHoneyCollectionState = { collectionDate: new Date(), honeyQuantity: 0, typeOfHoney: '' };
  const [honeyCollection, setHoneyCollection] = useState(initialHoneyCollectionState)

  const handleSave = async (): Promise<void> => {
    if(value != null){
        try {
            const honeyCollectionToEdit: HoneyCollection = {
              id: value.id,
              collectionDate: honeyCollection.collectionDate,
              honeyQuantity: honeyCollection.honeyQuantity,
              typeOfHoney: honeyCollection.typeOfHoney,
              hiveId: value.hiveId
            };
            const response = await HoneyCollectionService.edit(honeyCollectionToEdit);
            if(response.status === 200){
              const addedHoneyCollection = response.honeyCollection;
              onSave(addedHoneyCollection)
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
        setHoneyCollection(value);
    }
    else{
      setHoneyCollection(initialHoneyCollectionState);
    }
  }, [value]); 

  return (
    <CustomModal
      visible={visible}
      title="Edytuj zbiór miodu"
      acceptButton='Edytuj'
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
          title: 'Stan',
          placeholder: 'Wpisz stan',
          value: honeyCollection.typeOfHoney,
          onChange: (e) => setHoneyCollection({ ...honeyCollection, typeOfHoney: e}),
        },
      ]}
      onClose={handleClose}
      onSubmit={handleSave}
    />
  );
};

export default EditHoneyCollectionModal;