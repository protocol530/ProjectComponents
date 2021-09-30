import { useEffect } from 'react';
import { useImmer } from 'use-immer';
import _ from 'lodash';

const initalWindowSize = {
  width: 0,
  height: 0,
};

export const useResizeWindow = () => {
  const [state, setState] = useImmer(initalWindowSize);

  const setSize = () => {
    setState((draft) => {
      draft.width = window.innerWidth;
      draft.height = window.innerHeight;
    });
  };

  window.addEventListener('resize', _.throttle(setSize, 150));

  useEffect(() => {
    setSize();
    return () => {
      window.removeEventListener('resize', _.throttle(setSize, 150));
    };
  }, []);

  return state;
};
