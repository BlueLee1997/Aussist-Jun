import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useNavigation } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const symptoms = [
  'Symptom 1',
  'Symptom 2',
  'Symptom 3',
  'Symptom 4',
  'Symptom 5',
  'Symptom 6',
  'Symptom 7',
  'Symptom 8',
  'Symptom 9',
  'Symptom 10',
];

export default function SymptomChecker() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [searchText, setSearchText] = useState('');
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const toggleSymptom = (symptom: string) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptom));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };

  const goToResult = () => {
    if (selectedSymptoms.length > 0) {
      router.push({
        pathname: '/symptoms/result',
      });
    }
  };

  const clearSearch = () => {
    setSearchText('');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Please select your current symptoms"
          value={searchText}
          onChangeText={setSearchText}
        />
        {searchText.length > 0 && (
          <TouchableOpacity onPress={clearSearch}>
            <Ionicons name="close-circle" size={20} color="#999" />
          </TouchableOpacity>
        )}
      </View>

      {/* Emergency Call Section */}
      <View style={styles.emergencyCard}>
        <Text style={styles.emergencyTitle}>Emergency Call</Text>
        <Text style={styles.emergencyDescription}>
          For immediate assistance in an emergency, please use the numbers below:
        </Text>
        <Text style={styles.emergencySubtitle}>Fire: 000</Text>
        <Text style={styles.emergencySubtitle}>Ambulance: 000</Text>
        <Text style={styles.emergencySubtitle}>Police: 000</Text>
        <Text style={styles.emergencyNote}>
          In a critical situation, these contacts provide the quickest route to safety and emergency services. Ensure your phone is location-enabled to allow for swift assistance.
        </Text>
      </View>

      {/* Symptoms List */}
      <ScrollView style={styles.symptomsContainer}>
        {symptoms
          .filter(symptom => symptom.toLowerCase().includes(searchText.toLowerCase()))
          .map((symptom, index) => (
            <TouchableOpacity
              key={index}
              style={styles.symptomItem}
              onPress={() => toggleSymptom(symptom)}
            >
              <Text style={styles.symptomText}>{symptom}</Text>
              <View style={[
                styles.checkCircle,
                selectedSymptoms.includes(symptom) && styles.checkCircleSelected
              ]}>
                {selectedSymptoms.includes(symptom) && (
                  <View style={styles.checkInner} />
                )}
              </View>
            </TouchableOpacity>
          ))}
      </ScrollView>

      {/* Next Button */}
      <TouchableOpacity
        style={[
          styles.nextButton,
          selectedSymptoms.length === 0 && styles.nextButtonDisabled
        ]}
        onPress={goToResult}
        disabled={selectedSymptoms.length === 0}
      >
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  emergencyCard: {
    backgroundColor: '#fff3f3',
    padding: 16,
    margin: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#ff4444',
  },
  emergencyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#ff4444',
  },
  emergencyDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  emergencySubtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  emergencyNote: {
    fontSize: 12,
    color: '#666',
    marginTop: 12,
    fontStyle: 'italic',
  },
  symptomsContainer: {
    flex: 1,
    padding: 16,
  },
  symptomItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  symptomText: {
    fontSize: 16,
    color: '#333',
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkCircleSelected: {
    borderColor: '#4CAF50',
    backgroundColor: '#4CAF50',
  },
  checkInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#fff',
  },
  nextButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    margin: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  nextButtonDisabled: {
    backgroundColor: '#ccc',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 