import { create } from "zustand";

const useStore = create((set) => ({
  isFetching: false,
  setIsFetching: (val) => set({ isFetching: val }),
}));

export default useStore;