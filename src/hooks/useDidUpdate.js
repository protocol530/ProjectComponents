import { useRef, useEffect } from 'react';

export const useDidUpdate = (cb = () => {}, deeps = []) => {
  const ref = useRef(false);

  useEffect(() => {
    if (ref.current) {
      cb();
    } else {
      ref.current = true;
    }
  }, [cb, ...deeps]);
};
