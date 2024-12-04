import { useState } from 'react';
import { Hive } from '@/DataModels/HiveModel';

interface Props {
    hives: Hive[];
}

export const useScreenActions = ({ hives } : Props) => {
  const [expandedHive, setExpandedHive] = useState(hives.length > 0 ? hives[0].id : null);
  const [addHiveModalVisible, setAddHiveModalVisible] = useState(false);
  const [editHiveModalVisible, setEditHiveModalVisible] = useState(false);
  const [selectedHive, setSelectedHive] = useState<Hive | null>(null);

  const openAddHiveModal = () => {
    setAddHiveModalVisible(true)
  };

  const closeAddHiveModal = () => {
    setAddHiveModalVisible(false);
  };

  const openEditHiveModal = (hive: Hive) => {
    setSelectedHive(hive);
    setEditHiveModalVisible(true);
  };

  const closeEditHiveModal = () => {
    setSelectedHive(null);
    setEditHiveModalVisible(false);
  };
  return { 
    expandedHive, 
    selectedHive, 
    addHiveModalVisible, 
    editHiveModalVisible, 
    setExpandedHive, 
    openAddHiveModal, 
    closeAddHiveModal, 
    openEditHiveModal, 
    closeEditHiveModal 
  };
};
