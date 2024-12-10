import { useState } from 'react';
import { TherapeuticTreatment } from '@/DataModels/TherapeuticTreatmentModel';

interface Props {
  therapeuticTreatments: TherapeuticTreatment[];
}

export const useScreenActions = ({ therapeuticTreatments } : Props) => {
  const [expandedTherapeuticTreatment, setExpandedTherapeuticTreatment] = useState(therapeuticTreatments.length > 0 ? therapeuticTreatments[0].id : null);
  const [addTherapeuticTreatmentModalVisible, setAddTherapeuticTreatmentModalVisible] = useState(false);
  const [editTherapeuticTreatmentModalVisible, setEditTherapeuticTreatmentModalVisible] = useState(false);
  const [selectedTherapeuticTreatment, setSelectedTherapeuticTreatment] = useState<TherapeuticTreatment | null>(null);

  const openAddTherapeuticTreatmentModal = () => {
    setAddTherapeuticTreatmentModalVisible(true)
  };

  const closeAddTherapeuticTreatmentModal = () => {
    setAddTherapeuticTreatmentModalVisible(false);
  };

  const openEditTherapeuticTreatmentModal = (therapeuticTreatment: TherapeuticTreatment) => {
    setSelectedTherapeuticTreatment(therapeuticTreatment);
    setEditTherapeuticTreatmentModalVisible(true);
  };

  const closeEditTherapeuticTreatmentModal = () => {
    setSelectedTherapeuticTreatment(null);
    setEditTherapeuticTreatmentModalVisible(false);
  };
  return { 
    expandedTherapeuticTreatment, 
    selectedTherapeuticTreatment, 
    addTherapeuticTreatmentModalVisible, 
    editTherapeuticTreatmentModalVisible, 
    setExpandedTherapeuticTreatment, 
    openAddTherapeuticTreatmentModal, 
    closeAddTherapeuticTreatmentModal, 
    openEditTherapeuticTreatmentModal, 
    closeEditTherapeuticTreatmentModal 
  };
};
