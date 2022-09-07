import { useLocation } from 'react-router';

const usePage = (): number | undefined => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get('page');
  const result = page ? +page : undefined;
  return result;
};

export default usePage;
