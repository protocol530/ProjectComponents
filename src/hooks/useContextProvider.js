import { createContext } from 'react';
import { useImmer } from 'use-immer';

const initalState = {};
export const StateContext = createContext(initalState);
export const SetContext = createContext(() => {});

export const useContextProvider = ({ children }) => {
  const [state, setState] = useImmer(initalState);

  return (
    <StateContext.Provider value={state}>
      <SetContext.Provider value={setState}>{children}</SetContext.Provider>
    </StateContext.Provider>
  );
};
