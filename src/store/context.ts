import { Product } from '@/utils/types';
import { create } from 'zustand';

export interface StoreState {
  selectedProduct: string | null;
  setSelectedProduct: (product: string) => void;
  products: Product[];
  setProducts: (products: Product[]) => void;
}
export const useZustandStore = create<StoreState>((set) => ({
  selectedProduct: null,
  setSelectedProduct: (product: string) => set({ selectedProduct: product }),
  products: [],
  setProducts: (products: Product[]) => set({ products }),
}));