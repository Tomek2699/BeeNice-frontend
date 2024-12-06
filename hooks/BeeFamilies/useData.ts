import { useState, useEffect } from 'react';
import { BeeFamily } from '@/DataModels/BeeFamilyMode';
import BeeFamilyService from '@/services/BeeFamilyService';
import { Alert } from 'react-native';

interface Props {
  params: {
    hiveId?: string | string[];
    [key: string]: unknown;
  };
}

export const useData = ({params} : Props) => {
  const [hiveId, setHiveId] = useState<number | undefined>();
  const [beeFamilies, setBeeFamilies] = useState<BeeFamily[]>([]);
  const [filteredBeeFamilies, setFilteredBeeFamilies] = useState<BeeFamily[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getData = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await BeeFamilyService.getItems(hiveId);
      if(response.status === 200){
        const downloadedBeeFamilies = response.beeFamilies;
        setBeeFamilies(downloadedBeeFamilies);
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
    beeFamilies,
    filteredBeeFamilies,
    setBeeFamilies,
    setFilteredBeeFamilies,
    isLoading,
  };
};
