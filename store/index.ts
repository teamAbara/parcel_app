import { create } from "zustand";

type Store = {
  authUser: String | null;
  setAuthUser: (user: String | null) => void;
  parcel_list: any[];
  setParcelList: (parcel: any[]) => void;
  parcel_list_count: number;
  setParcelListCount: (parcel_count: number) => void;
  page: String | null;
  setPage: (user: String | null) => void;

  worker_public: String;
  setWorkerPublic: (user: String) => void;

  all_parcel_list: any[];
  setAllParcelList: (parcel: any[]) => void;
};

const useStore = create<Store>(set => ({
  authUser: null,
  setAuthUser: user => set(state => ({ ...state, authUser: user })),
  all_parcel_list: [],
  setAllParcelList: parcel =>
    set(state => ({ ...state, all_parcel_list: parcel })),
  parcel_list: [],
  setParcelList: parcel => set(state => ({ ...state, parcel_list: parcel })),
  parcel_list_count: 0,
  setParcelListCount: parcel_count =>
    set(state => ({ ...state, parcel_list_count: parcel_count })),

  page: "Back",
  setPage: data => set(state => ({ ...state, page: data })),

  worker_public: "",
  setWorkerPublic: data => set(state => ({ ...state, worker_public: data })),
}));
export default useStore;
