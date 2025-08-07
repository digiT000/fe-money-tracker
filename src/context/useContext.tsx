'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from 'react';
import axios from '@/lib/axios';
import SessionSync from '@/components/shared/SessionSync';

type ActionTypes = 'SET_USER' | 'FETCHING_ERROR' | 'FETCHING_USER';

interface PartnerProps {
  id: string;
  name: string;
}

interface UserProp {
  email: string;
  name: string;
  isVerified: boolean;
  isCompleteOnboarding: boolean;
  partner: PartnerProps;
}

export interface PayloadUser {
  user: null | UserProp;
  accessToken: null | string;
  status: 'IDLE' | 'LOADING' | 'SUCCESS' | 'ERROR';
}

interface ActionReducer {
  type: ActionTypes;
  payload?: PayloadUser;
}
interface Actions {
  saveUserData: (userData: PayloadUser) => void;
  fetchingError: () => void;
  fetchingUser: () => void;
  revalidateUser: () => void;
}

const UserContextAction = createContext<null | Actions>(null);
const UserContextState = createContext<PayloadUser | null>(null);

const initialState: PayloadUser = {
  user: null,
  accessToken: null,
  status: 'LOADING',
};

function userReducer(state: PayloadUser, action: ActionReducer): PayloadUser {
  switch (action.type) {
    case 'SET_USER':
      if (action.payload) {
        return {
          ...state,
          user: action.payload.user,
          accessToken: action.payload.accessToken,
          status: 'SUCCESS',
        };
      }
      return { ...state };
    case 'FETCHING_USER':
      return {
        ...state,
        status: 'LOADING',
      };
    case 'FETCHING_ERROR':
      return {
        ...state,
        status: 'ERROR',
      };
  }
}

export function UserContextProvider({
  children,
  isAuthencated,
}: {
  children: React.ReactNode;
  isAuthencated: boolean;
}) {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const revalidateUser = useCallback(async () => {
    if (state.status === 'LOADING') {
      return;
    }

    try {
      dispatch({
        type: 'FETCHING_USER',
      });
      const response = await axios.post(
        '/auth/get-session',
        {},
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        // const emailVerified: boolean = response?.data?.isVerified;

        dispatch({
          type: 'SET_USER',
          payload: response.data,
        });
      }
    } catch (e) {
      dispatch({ type: 'FETCHING_ERROR' });
    }
  }, [state.status]);

  const actions: Actions = useMemo(
    () => ({
      fetchingUser: () => {
        dispatch({ type: 'FETCHING_USER' });
      },
      saveUserData: (userData: PayloadUser) => {
        dispatch({
          type: 'SET_USER',
          payload: userData,
        });
      },
      revalidateUser: revalidateUser,
      fetchingError: () => {
        dispatch({
          type: 'FETCHING_ERROR',
        });
      },
    }),
    []
  );

  return (
    <UserContextState.Provider value={state}>
      <UserContextAction value={actions}>
        <SessionSync isAuthenticated={isAuthencated} />
        {children}
      </UserContextAction>
    </UserContextState.Provider>
  );
}

// --- 5. Create Custom Hooks for easy consumption ---

export function useUserState() {
  const context = useContext(UserContextState);
  if (context === null) {
    throw new Error('useUserState must be used within a UserContextProvider');
  }
  return context;
}

export function useUserActions() {
  const context = useContext(UserContextAction);
  if (context === null) {
    throw new Error('useUserActions must be used within a UserContextProvider');
  }
  return context;
}

UserContextAction.displayName = 'UserContextActionProvider';
UserContextState.displayName = 'UserContextStateProvider';
