import React from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../lib/theme';
import TText from '../components/TText';

export default function FavouriteScreen() {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ paddingTop: insets.top + 10, paddingBottom: 16, paddingHorizontal: 16, backgroundColor: theme.colors.primary }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>Favourites</Text>
        <TText style={{ fontSize: 16, color: 'white' }}>Your saved services</TText>
      </View>

      <ScrollView style={{ flex: 1, padding: 16 }}>
        <TText style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 16 }}>Saved Services</TText>
        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          <TText style={{ color: '#666', fontSize: 16 }}>No saved services yet</TText>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
} 