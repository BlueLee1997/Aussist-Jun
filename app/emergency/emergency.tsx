import React from 'react';
import { View, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../lib/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TText from '../components/TText';
import { Text } from 'react-native';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

export default function EmergencyPage() {
  const insets = useSafeAreaInsets();

  const emergencyContacts = [
    { number: '000',         title: 'Emergency Services',  description: 'Police, Fire, Ambulance',                  icon: 'call'   as IconName },
    { number: '131 444',     title: 'Police Assistance',   description: 'Non-emergency police assistance',         icon: 'shield' as IconName },
    { number: '1800 022 222',title: 'Health Direct',       description: '24/7 health advice and information',      icon: 'medical'as IconName }
  ];

  const symptomCategories = [
    { name: 'Fever & Flu',   icon: 'thermometer-outline' as IconName },
    { name: 'Injuries',      icon: 'bandage-outline'     as IconName },
    { name: 'Chest Pain',    icon: 'heart-outline'       as IconName },
    { name: 'Breathing',     icon: 'fitness-outline'     as IconName },
    { name: 'Stomach',       icon: 'medical-outline'     as IconName },
    { name: 'Mental Health', icon: 'brain-outline'       as IconName }
  ];

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar barStyle="light-content" />

      {/* header */}
      <View style={{ paddingTop: insets.top + 10, paddingBottom: 16, paddingHorizontal: 16, backgroundColor: theme.colors.primary }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>Emergency Services</Text>
        <TText style={{ fontSize: 16, color: 'white' }}>Quick access to emergency contacts and nearby hospitals</TText>
      </View>

      <ScrollView>
        <View style={{ padding: 16 }}>

          {/* alert banner */}
          <View style={{
            backgroundColor: '#FEF2F2',
            borderLeftWidth: 4,
            borderLeftColor: '#DC2626',
            padding: 16,
            borderRadius: 6,
            marginBottom: 24,
            flexDirection: 'row',
            alignItems: 'center'
          }}>
            <Ionicons name="warning" size={24} color="#DC2626" style={{ marginRight: 12 }} />
            <View>
              <TText style={{ fontWeight: 'bold', color: '#B91C1C', marginBottom: 4 }}>
                In an emergency, call 000
              </TText>
              <TText style={{ color: '#B91C1C' }}>
                For life-threatening situations, call Triple Zero immediately
              </TText>
            </View>
          </View>

          {/* emergency contacts */}
          <View style={{ marginBottom: 24 }}>
            <TText style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}>Emergency Contacts</TText>

            {emergencyContacts.map((c, i) => (
              <TouchableOpacity key={i} style={{
                backgroundColor: 'white',
                borderWidth: 1,
                borderColor: '#E5E7EB',
                borderRadius: 8,
                padding: 16,
                marginBottom: 12,
                flexDirection: 'row',
                alignItems: 'center'
              }}>
                <View style={{
                  backgroundColor: '#FEE2E2',
                  width: 42,
                  height: 42,
                  borderRadius: 21,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 16
                }}>
                  <Ionicons name={c.icon} size={20} color="#DC2626" />
                </View>
                <View style={{ flex: 1 }}>
                  <TText style={{ fontWeight: 'bold', marginBottom: 4 }}>{c.title}</TText>
                  <TText style={{ color: '#6B7280' }}>{c.description}</TText>
                </View>
                <TText style={{ fontWeight: 'bold', fontSize: 16 }}>{c.number}</TText>
              </TouchableOpacity>
            ))}
          </View>

          {/* symptom checker */}
          <View style={{ marginBottom: 24 }}>
            <TText style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}>Symptom Checker</TText>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
