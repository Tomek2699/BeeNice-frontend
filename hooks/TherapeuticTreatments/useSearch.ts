import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import SearchHelper from '@/helpers/searchHelper';
import { TherapeuticTreatment } from '@/DataModels/TherapeuticTreatmentModel';

interface Props {
    therapeuticTreatments: TherapeuticTreatment[];
    setFilteredTherapeuticTreatments: Dispatch<SetStateAction<TherapeuticTreatment[]>>;
}

export const useSearch = ({ therapeuticTreatments, setFilteredTherapeuticTreatments } : Props) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    const filteredData = SearchHelper.search(searchQuery, therapeuticTreatments, ['treatmentDate']);
    setFilteredTherapeuticTreatments(filteredData);
  }, [therapeuticTreatments, searchQuery]);

  return { handleSearch };
};
