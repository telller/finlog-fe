import { create } from 'zustand';
import { getMe } from '@src/services';
import type { User } from '@src/types';

interface AuthState {
  getMe: () => Promise<void>;
  loggedIn: boolean;
  user: User | null;
  loading: boolean;
}

export const useAuthState = create<AuthState>((set) => ({
  user: null,
  loggedIn: false,
  loading: true,
  getMe: async () => {
    const { data: user }: { data: User } = await getMe();
    set({ user, loading: false, loggedIn: true });
  },
}));
