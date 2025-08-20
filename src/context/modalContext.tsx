'use client';

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

interface ModalActionContext {
  openModal: () => void;
  closeModal: () => void;
}

const ModalStateContext = createContext<null | boolean>(null);
const ModalActionContext = createContext<null | ModalActionContext>(null);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const actionValue: ModalActionContext = useMemo(() => {
    return {
      closeModal: () => setIsOpen(false),
      openModal: () => setIsOpen(true),
    };
  }, []);

  return (
    <ModalStateContext.Provider value={isOpen}>
      <ModalActionContext.Provider value={actionValue}>
        {children}
      </ModalActionContext.Provider>
    </ModalStateContext.Provider>
  );
}

export function useModalState() {
  const context = useContext(ModalStateContext);
  if (context === null) {
    throw new Error('useModalState must be used within a UserContextProvider');
  }
  return context;
}

export function useModalAction() {
  const context = useContext(ModalStateContext);
  if (context === null) {
    throw new Error('useModalAction must be used within a UserContextProvider');
  }
  return context;
}
