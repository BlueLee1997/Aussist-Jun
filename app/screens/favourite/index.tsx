import React from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { theme } from '../../_lib/theme';
import TText from '../../_components/TText';
import { useFavourites, FavouriteItem } from '../../_context/FavouriteContext';
import { Linking } from 'react-native';
import { useTranslation } from '../../_context/TranslationContext';

const categoryImgs: { [key: string]: any } = {
  transport: require('../assets/images/home-transport.jpg'),
  banking: require('../assets/images/home-banking.jpg'),
  housing: require('../assets/images/home-housing.jpg'),
  legal: require('../assets/images/home-legal.jpg'),
  english: require('../assets/images/home-learn.jpg'),
  jobs: require('../assets/images/home-jobs.jpg'),
};

const serviceImgs = [
  require('../assets/images/Symptom.jpg'),
  require('../assets/images/Hospital.jpg'),
  require('../assets/images/Disease.jpg'),
  require('../assets/images/Healthcare.jpg'),
];

export default function FavouriteScreen() {
  const insets = useSafeAreaInsets();
  const { favourites, removeFavourite } = useFavourites();

  const handleRemove = (id: string) => {
    removeFavourite(id);
  };

  const handlePress = (item: FavouriteItem) => {
    if (item.url) {
      Linking.openURL(item.url);
    } else if (item.route) {
      router.push(item.route as any);
    }
  };

  const getImageSource = (item: FavouriteItem) => {
    if (item.id.startsWith('medical-')) {
      const idx = parseInt(item.id.split('-')[1]);
      return serviceImgs[idx];
    }
    return categoryImgs[item.id] || null;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ paddingTop: insets.top + 10, paddingBottom: 16, paddingHorizontal: 16, backgroundColor: theme.colors.primary }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>Favourites</Text>
        <TText style={{ fontSize: 16, color: 'white' }}>Your saved services</TText>
      </View>

      <ScrollView style={{ flex: 1, padding: 16 }}>
        {favourites.length > 0 ? (
          favourites.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.card}
              onPress={() => handlePress(item)}
            >
              <View style={styles.cardContent}>
                <Image 
                  source={getImageSource(item)} 
                  style={styles.image}
                />
                <View style={styles.textContainer}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.description}>{item.description}</Text>
                </View>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => handleRemove(item.id)}
                >
                  <MaterialIcons name="favorite" size={24} color="#0284C7" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <MaterialIcons name="favorite-border" size={48} color="#666" />
            <TText style={styles.emptyText}>No saved services yet</TText>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  removeButton: {
    padding: 8,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
}); 