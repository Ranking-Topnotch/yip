import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Product } from '../types';
import { COLORS } from '../utils/constants';

interface Props {
  product: Product;
}

export const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <View style={styles.card}>
      <Image 
        source={{ uri: product.image }} 
        style={styles.image} 
      />
      <View style={styles.info}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>${product.price}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: COLORS.mint,
  },
  info: {
    marginLeft: 15,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.charcoal,
  },
  price: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
});