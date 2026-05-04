import React, { useState } from 'react';
import { 
  StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList, Image 
} from 'react-native';
import { useProducts } from '../context/ProductContext';
import { ProductCard } from '../components/ProductCard';
import { pickImage } from '../utils/imagePicker';
import { COLORS } from '../utils/constants';

export default function HomeScreen() {
  const { products, addProduct } = useProducts();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState<string | null>(null);

  const handlePickImage = async () => {
    const uri = await pickImage();
    if (uri) setImage(uri);
  };

  const handleAdd = () => {
    if (!name || !price || !image) return;
    addProduct({ name, price, image });
    
    setName('');
    setPrice('');
    setImage(null);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProductCard product={item} />}
        ListHeaderComponent={
          <View style={styles.form}>
            <Text style={styles.label}>Product Upload ({products.length}/5)</Text>
            
            <TouchableOpacity style={styles.imagePlaceholder} onPress={handlePickImage}>
              {image ? (
                <Image source={{ uri: image }} style={styles.previewImage} />
              ) : (
                <Text style={styles.imageText}>+ Tap to Select Photo</Text>
              )}
            </TouchableOpacity>

            <TextInput 
              style={styles.input} 
              placeholder="Product Name" 
              value={name} 
              onChangeText={setName} 
            />
            <TextInput 
              style={styles.input} 
              placeholder="Price" 
              keyboardType="numeric" 
              value={price} 
              onChangeText={setPrice} 
            />

            <TouchableOpacity 
              style={[styles.button, !image && { opacity: 0.6 }]} 
              onPress={handleAdd}
              disabled={!image}
            >
              <Text style={styles.buttonText}>Submit Product</Text>
            </TouchableOpacity>
          </View>
        }
        contentContainerStyle={{ padding: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  form: { marginBottom: 30 },
  label: { fontSize: 18, fontWeight: 'bold', color: COLORS.charcoal, marginBottom: 15 },
  imagePlaceholder: {
    height: 150,
    backgroundColor: '#F0F0F0',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#DDD',
    overflow: 'hidden'
  },
  previewImage: { width: '100%', height: '100%' },
  imageText: { color: COLORS.charcoal, fontWeight: '500' },
  input: {
    backgroundColor: '#F5F5F5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  button: {
    backgroundColor: COLORS.mint,
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: { color: COLORS.charcoal, fontWeight: 'bold' },
});