import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

export const useRedirect = (selector, url) => {
  const router = useRouter();
  const condition = useSelector(selector);

  if (condition) {
    router.push(url);
  }
};
