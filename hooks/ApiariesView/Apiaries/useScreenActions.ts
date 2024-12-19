import { useState } from 'react';
import { Apiary } from '@/DataModels/ApiaryModel';

interface Props {
    apiaries: Apiary[];
}

export const useScreenActions = ({ apiaries } : Props) => {
  const [expandedApiary, setExpandedApiary] = useState(apiaries.length > 0 ? apiaries[0].id : null);
  const [addApiaryModalVisible, setAddApiaryModalVisible] = useState(false);
  const [editApiaryModalVisible, setEditApiaryModalVisible] = useState(false);
  const [selectedApiary, setSelectedApiary] = useState<Apiary | null>(null);

  const openAddApiaryModal = () => {
    setAddApiaryModalVisible(true)
  };

  const closeAddApiaryModal = () => {
    setAddApiaryModalVisible(false);
  };

  const openEditApiaryModal = (apiary: Apiary) => {
    setSelectedApiary(apiary);
    setEditApiaryModalVisible(true);
  };

  const closeEditApiaryModal = () => {
    setSelectedApiary(null);
    setEditApiaryModalVisible(false);
  };

  return { 
    expandedApiary, 
    selectedApiary, 
    addApiaryModalVisible, 
    editApiaryModalVisible, 
    setExpandedApiary, 
    openAddApiaryModal, 
    closeAddApiaryModal, 
    openEditApiaryModal, 
    closeEditApiaryModal
  };
};
