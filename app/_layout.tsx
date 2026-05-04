import { Stack } from 'expo-router';
import { ProductProvider } from '../context/ProductContext';
import { COLORS } from '../utils/constants';

export default function RootLayout() {
  return (
    <ProductProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: COLORS.charcoal,
          },
          headerTintColor: COLORS.mint,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitle: 'Product Tracker',
        }}
      />
    </ProductProvider>
  );
}