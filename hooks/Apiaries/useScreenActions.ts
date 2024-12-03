import { useState } from 'react';
import { Apiary } from '@/DataModels/ApiaryModel';

export interface Props {
    apiaries: Apiary[];
}

export const useScreenActions = ({ apiaries } : Props) => {
  const [expandedApiary, setExpandedApiary] = useState(apiaries.length > 0 ? apiaries[0].id : null);
  const [addApiaryModalVisible, setAddApiaryModalVisible] = useState(false);
  const [editApiaryModalVisible, setEditApiaryModalVisible] = useState(false);
  const [selectedApiary, setSelectedApiary] = useState<Apiary | null>(null);

  const openAddModal = () => {
    setAddApiaryModalVisible(true)
  };

  const closeAddApairyModal = () => {
    setAddApiaryModalVisible(false);
  };

  const openEditModal = (apiary: Apiary) => {
    setSelectedApiary(apiary);
    setEditApiaryModalVisible(true);
  };

  const closeEditApairyModal = () => {
    setEditApiaryModalVisible(false);
    setSelectedApiary(null);
  };
  return { expandedApiary, selectedApiary, addApiaryModalVisible, editApiaryModalVisible, setExpandedApiary, openAddModal, closeAddApairyModal, openEditModal, closeEditApairyModal };
};
