import { create } from "zustand";

const useStore = create((set) => ({
  isFetching: false,
  setIsFetching: (val) => set({ isFetching: val }),

  isTextEditerOpen: false,
  setIsTextEditerOpen: (val) => set({ isTextEditerOpen: val }),

  text: "",
  setText: (val) => set({ text: val }),

  user: null,
  setUser: (val) => set({ user: val }),

  cardsData: [],
  setCardsData: (updater) =>
    set((state) => {
      if (typeof updater === "function") {
        // updater gets the previous cardsData
        return { cardsData: updater(state.cardsData) };
      }
      // otherwise just replace it
      return { cardsData: updater };
  }),

 isLoadingDatabase: false,
 setIsLoadingDatabase: (val) => set({isLoadingDatabase: val}),

 isShareModelOpen: false,
 setIsShareModelOpen: (val) => set({ isShareModelOpen: val })








}));

export default useStore;