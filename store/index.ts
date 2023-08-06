import { create } from "zustand";

type Store = {
  authUser: String | null;

  setAuthUser: (user: String | null) => void;
};

const useStore = create<Store>(set => ({
  authUser: null,

  setAuthUser: user => set(state => ({ ...state, authUser: user })),
}));
export default useStore;
