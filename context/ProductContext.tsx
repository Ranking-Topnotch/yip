import React, { createContext, useContext, useState } from 'react';
import { Alert } from 'react-native';
import { Product } from '../types';
import { MAX_PRODUCT_LIMIT } from '../utils/constants';

interface ProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  const addProduct = (newProduct: Omit<Product, 'id'>) => {
    if (products.length >= MAX_PRODUCT_LIMIT) {
      Alert.alert("Limit Reached", `You can only upload up to ${MAX_PRODUCT_LIMIT} products.`);
      return;
    }
    
    const productWithId = { ...newProduct, id: Date.now().toString() };
    setProducts([...products, productWithId]);
  };

  return (
    <ProductContext.Provider value={{ products, addProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error('useProducts must be used within ProductProvider');
  return context;
};