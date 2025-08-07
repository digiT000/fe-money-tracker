import { useQuery } from '@tanstack/react-query';
import { getUserSession } from '@/utils/api/getUserSession';

function useSession(isAuthenticated: boolean = false) {
  const { data: user, status } = useQuery({
    queryKey: ['use_session'],
    queryFn: getUserSession,
    retry: 1,
    staleTime: 1000 * 60 * 15, // 15 minutes
    refetchOnWindowFocus: false,
    enabled: isAuthenticated,
  });

  return { user, status };
}

export default useSession;
