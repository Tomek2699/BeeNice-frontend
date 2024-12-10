import { useState, useEffect } from 'react';
import { TherapeuticTreatment } from '@/DataModels/TherapeuticTreatmentModel';
import TherapeuticTreatmentService from '@/services/TherapeuticTreatmentService';
import { Alert } from 'react-native';

interface Props {
  params: {
    hiveId?: string | string[];
    [key: string]: unknown;
  };
}

export const useData = ({params} : Props) => {
  const [hiveId, setHiveId] = useState<number | undefined>();
  const [therapeuticTreatments, setTherapeuticTreatments] = useState<TherapeuticTreatment[]>([]);
  const [filteredTherapeuticTreatments, setFilteredTherapeuticTreatments] = useState<TherapeuticTreatment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getData = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await TherapeuticTreatmentService.getItems(hiveId);
      if(response.status === 200){
        const downloadedTherapeuticTreatments = response.therapeuticTreatments;
        setTherapeuticTreatments(downloadedTherapeuticTreatments);
      }
    } catch (error) {
      Alert.alert('Błąd', 'Nie udało się pobrać danych.');
    }
    finally{
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const hiveIdParam = params.hiveId;
    const id = Array.isArray(hiveIdParam) ? hiveIdParam[0] : hiveIdParam;
    const parsedId = Number(id);

    if (!isNaN(parsedId)) {
      setHiveId(parsedId);
    } else {
      console.error('Invalid hiveId:', hiveIdParam);
    }
  }, [params]);

  useEffect(() => {
    if (hiveId !== undefined) {
      getData();
    }
  }, [hiveId]);

  return {
    hiveId,
    therapeuticTreatments,
    filteredTherapeuticTreatments,
    setTherapeuticTreatments,
    setFilteredTherapeuticTreatments,
    isLoading,
  };
};
