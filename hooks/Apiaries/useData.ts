import { useState, useEffect } from 'react';
import ApiaryService from '../../services/ApiaryService';
import { Apiary } from '../../DataModels/ApiaryModel';

export const useData = () => {
  const [apiaries, setApiaries] = useState<Apiary[]>([]);
  const [filteredApiaries, setFilteredApiaries] = useState<Apiary[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    try {
      const response = await ApiaryService.getItems();
      if (response.status === 200) {
        setApiaries(response.apiaries);
      }
    } catch (error) {
      console.error('Error fetching data', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getDataWithDelay = async () => {
    setIsLoading(true)
    setTimeout(async () => {
      await getData();
    }, 5000); 
  };

  useEffect(() => {
    getDataWithDelay();
  }, []); 

  return {
    apiaries,
    filteredApiaries,
    setApiaries,
    setFilteredApiaries,
    isLoading,
  };
};
