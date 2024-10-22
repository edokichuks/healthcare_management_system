
import { create } from 'zustand';

//Defining the shape of the store
interface NavState {
  activeSideNav: string;
  setActiveSideNav: (value: string) => void;
  gridView: boolean;
  setGridView: () => void;
  contentAsset: { detailsOne: string; detailsTwo: string; firstTag: string; secTag: string; size: number; }[];
  contentHome: { detailsOne: string; detailsTwo: string; firstTag: string; secTag: string; size: number; }[];
  activeTab: string;
  setActiveTab: (value: string) => void;
}

// Create the store
const useNavStore = create<NavState>((set) => ({
  activeSideNav: "home",
  gridView: false,
  activeTab: "asset",
  contentHome: [
    { detailsOne: 'Collection Name', detailsTwo: 'Modified by Lorem Ipsum today', firstTag: 'Fashion Weaver', secTag: 'Collection', size: 102 },
    { detailsOne: 'Piece Name', detailsTwo: 'Modified by Lorem Ipsum today', firstTag: 'Fashion Weaver', secTag: 'Piece', size: 8 },
    { detailsOne: 'Collection Name', detailsTwo: 'Modified by Lorem Ipsum today', firstTag: 'Fashion Weaver', secTag: 'Collection', size: 86 },
    { detailsOne: 'Storyboard Name', detailsTwo: 'Modified by Lorem Ipsum today', firstTag: 'Story Teller', secTag: 'Storyboard', size: 102 },
    { detailsOne: 'Moodboard Name', detailsTwo: 'Modified by Lorem Ipsum today', firstTag: 'Mood Vision', secTag: 'Moodboard', size: 102 },
    { detailsOne: 'Collection Name', detailsTwo: 'Modified by Lorem Ipsum today', firstTag: 'Fashion Weaver', secTag: 'Collection', size: 102 },
    { detailsOne: 'Collection Name', detailsTwo: 'Modified by Lorem Ipsum today', firstTag: 'Fashion Weaver', secTag: 'Collection', size: 102 },
    {detailsOne: 'Piece Name', detailsTwo: 'Modified by Lorem Ipsum today', firstTag: 'Fashion Weaver', secTag: 'Piece', size: 102 },
],
  contentAsset: [
    { detailsOne: 'File Name', detailsTwo: 'Modified by Lorem Ipsum today', firstTag: 'Fashion Weaver', secTag: 'Draft', size: 102 },
    { detailsOne: 'File Name', detailsTwo: 'Modified by Lorem Ipsum today', firstTag: 'Fashion Weaver', secTag: 'AI Generated', size: 102 },
    { detailsOne: 'File Name', detailsTwo: 'Modified by Lorem Ipsum today', firstTag: 'Fashion Weaver', secTag: '', size: 102 },
    { detailsOne: 'File Name', detailsTwo: 'Modified by Lorem Ipsum today', firstTag: 'Fashion Weaver', secTag: '', size: 102 },
    { detailsOne: 'File Name', detailsTwo: 'Modified by Lorem Ipsum today', firstTag: 'Mood Vision', secTag: 'AI Generated', size: 102 },
    { detailsOne: 'File Name', detailsTwo: 'Modified by Lorem Ipsum today', firstTag: 'Fashion Weaver', secTag: 'AI Generated', size: 102 },
    { detailsOne: 'File Name', detailsTwo: 'Modified by Lorem Ipsum today', firstTag: 'Fashion Weaver', secTag: 'AI Generated', size: 102 },
    { detailsOne: 'File Name', detailsTwo: 'Modified by Lorem Ipsum today', firstTag: 'Fashion Weaver', secTag: 'Draft', size: 102 },
],
  setActiveSideNav: (value: string) => set(() => ({ activeSideNav: value })),
  setActiveTab: (value: string) => set(() => ({ activeTab: value })),
  setGridView: () => set((state) => ({gridView: !state.gridView})),
}));

export default useNavStore;
