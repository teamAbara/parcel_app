import { create } from "zustand";

type Store = {
  authUser: String | null;
  setAuthUser: (user: String | null) => void;

  page: String | null;
  setPage: (user: String | null) => void;
};

const useStore = create<Store>(set => ({
  authUser: null,
  setAuthUser: user => set(state => ({ ...state, authUser: user })),

  page: "Back",
  setPage: data => set(state => ({ ...state, page: data })),
}));
export default useStore;
