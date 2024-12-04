import { Hive } from '@/DataModels/HiveModel';
import { useRouter } from 'expo-router';

interface Props {
  hive: Hive | undefined
}

export const useRouting = ({hive} : Props) => {
  const router = useRouter();

  const handleOpenQueens = () => {
    router.push({
      pathname: '/queens',
      params: { hiveId: hive?.id.toString() },
    });
  };

  const handleOpenFamilies = () => {
    router.push({
      pathname: '/families',
      params: { hiveId: hive?.id.toString() },
    });
  };

  const handleOpenHarvests = () => {
    router.push({
      pathname: '/honeyCollection',
      params: { hiveId: hive?.id.toString() },
    });
  };

  const handleOpenTreatments = () => {
    router.push({
      pathname: '/treatments',
      params: { hiveId: hive?.id.toString() },
    });
  };

  return { 
    handleOpenQueens,
    handleOpenFamilies,
    handleOpenHarvests,
    handleOpenTreatments,
  };
};
