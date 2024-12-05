import { useState, useEffect } from 'react';
import { Hive } from '@/DataModels/HiveModel';
import HiveService from '@/services/HiveService';
import { Alert } from 'react-native';

interface Props {
  params: {
    apiaryId?: string | string[];
    [key: string]: unknown;
  };
}

export const useData = ({params} : Props) => {
  const [apiaryId, setApiaryId] = useState<number | undefined>();
  const [hives, setHives] = useState<Hive[]>([]);
  const [filteredHives, setFilteredHives] = useState<Hive[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getData = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await HiveService.getItems(apiaryId);
      if(response.status === 200){
        const downloadedHives = response.hives;
        setHives(downloadedHives);
      }
    } catch (error) {
      Alert.alert('Błąd', 'Nie udało się pobrać danych.');
    }
    finally{
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const apiaryIdParam = params.apiaryId;
    const id = Array.isArray(apiaryIdParam) ? apiaryIdParam[0] : apiaryIdParam;
    const parsedId = Number(id);

    if (!isNaN(parsedId)) {
      setApiaryId(parsedId);
    } else {
      console.error('Invalid apiaryId:', apiaryIdParam);
    }
  }, [params]);

  useEffect(() => {
    if (apiaryId !== undefined) {
      getData();
    }
  }, [apiaryId]);

  return {
    apiaryId,
    hives,
    filteredHives,
    setHives,
    setFilteredHives,
    isLoading,
  };
};
