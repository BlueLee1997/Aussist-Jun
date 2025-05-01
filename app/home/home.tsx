import React, { useState, useRef } from 'react';
import {
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  StatusBar,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from '../context/TranslationContext';
import { theme } from '../lib/theme';
import TText from '../components/TText';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'ko', name: '한국어' },
  { code: 'vi', name: 'Tiếng Việt' },
  { code: 'ar', name: 'Arabic' },
];

const serviceCategories = [
  { id: 'transport', title: 'Transport', description: 'Public transport information and services in NSW', icon: 'train-outline', route: '/transport' },
  { id: 'banking', title: 'Banking', description: 'Australian banking systems and financial assistance', icon: 'card-outline', route: '/banking/banking' },
  { id: 'housing', title: 'Housing', description: 'Find accommodation and rental assistance', icon: 'home-outline', route: '/housing/housing' },
  { id: 'legal', title: 'Legal', description: 'Legal support and advice for migrants', icon: 'book-outline', route: '/legal/legal' },
  { id: 'english', title: 'Learn English', description: 'English language courses and learning resources', icon: 'school-outline', route: '/english/english' },
  { id: 'jobs', title: 'Jobs', description: 'Find jobs and understand Australian workplace', icon: 'briefcase-outline', route: '/jobs/jobs' },
  { id: 'emergency', title: 'Emergency', description: 'Quick access to emergency contacts and nearby hospitals', icon: 'alert-circle-outline', route: '/emergency/emergency' },
  { id: 'translation', title: 'Translation', description: 'Language assistance and interpreting services', icon: 'language-outline', route: '/translation/translation' },
];

const serviceImgs = [
  'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=500&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=500&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=500&auto=format&fit=crop&q=60',
];

export default function Home() {
  const { selectedLanguage, setSelectedLanguage, translateAll } = useTranslation();
  const insets = useSafeAreaInsets();
  const [searchText, setSearchText] = useState('');
  const searchInputRef = useRef<TextInput>(null);

  const clearSearch = () => {
    setSearchText('');
    searchInputRef.current?.focus();
  };

  const changeLang = async (code: string) => {
    if (code === selectedLanguage) return;
    setSelectedLanguage(code);
    await translateAll(code);
  };

  const filteredCategories = serviceCategories.filter(cat =>
    cat.title.toLowerCase().includes(searchText.toLowerCase()) ||
    cat.description.toLowerCase().includes(searchText.toLowerCase())
  );

  // 고정 메뉴 위치 계산 (키보드 영향을 받지 않도록)
  const windowHeight = Dimensions.get('window').height;
  const menuHeight = 80 + insets.bottom;
  const menuTop = windowHeight - menuHeight;

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar barStyle="light-content" />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: menuHeight + 16 }}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View style={{ paddingTop: insets.top + 10, paddingBottom: 16, paddingHorizontal: 16, backgroundColor: theme.colors.primary }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>Aussist</Text>
            <TText style={{ fontSize: 16, color: 'white' }}>Welcome to Australia</TText>
          </View>

          {/* Content */}
          <View style={{ padding: 16 }}>
            {/* Language Selector */}
            <TText style={{ fontSize: 16, fontWeight: '500', marginBottom: 8 }}>Select your language:</TText>
            <View style={{ flexDirection: 'row', marginBottom: 24 }}>
              {languages.map(l => (
                <TouchableOpacity
                  key={l.code}
                  onPress={() => changeLang(l.code)}
                  style={{
                    paddingVertical: 8,
                    paddingHorizontal: 16,
                    borderRadius: 20,
                    marginRight: 8,
                    backgroundColor: selectedLanguage === l.code ? theme.colors.primary : 'white',
                    borderWidth: 1,
                    borderColor: selectedLanguage === l.code ? theme.colors.primary : '#E5E7EB',
                  }}
                >
                  <Text style={{ color: selectedLanguage === l.code ? 'white' : '#6B7280' }}>{l.name}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Quick Actions */}
            <TText style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}>Quick Actions</TText>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingRight: 16, marginBottom: 32 }}>
              {[
                { label: 'Emergency', icon: 'call-outline', route: '/emergency/emergency' as const, bg: '#FEE2E2', color: '#DC2626' },
                { label: 'Healthcare', icon: 'medkit-outline', route: '/healthcare/healthcare' as const, bg: '#E0F2FE', color: '#0284C7' },
                { label: 'AI Translate', icon: 'language-outline', route: '/translation/translation' as const, bg: '#F3E8FF', color: '#7E22CE' },
                { label: 'Find Service', icon: 'search-outline', route: '/home/home' as const, bg: '#E3F2FD', color: '#1976D2' },
              ].map((itm, i) => (
                <TouchableOpacity key={i} style={{ alignItems: 'center', width: 80, marginRight: 16 }} onPress={() => router.push(itm.route)}>
                  <View style={{ backgroundColor: itm.bg, width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
                    <Ionicons name={itm.icon as any} size={24} color={itm.color} />
                  </View>
                  <TText style={{ textAlign: 'center', fontSize: 13 }}>{itm.label}</TText>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Search Box */}
            <View style={{
              flexDirection: 'row', alignItems: 'center', backgroundColor: 'white',
              borderRadius: 10, padding: 10, marginBottom: 24, elevation: 2,
              shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1, shadowRadius: 4,
            }}>
              <MaterialIcons name="search" size={24} color="#666" style={{ marginRight: 10 }} />
              <TextInput
                ref={searchInputRef}
                style={{ flex: 1, fontSize: 16, color: '#000' }}
                placeholder="Search services..."
                placeholderTextColor="#999"
                value={searchText}
                onChangeText={setSearchText}
                blurOnSubmit={false}
              />
              {searchText.length > 0 && (
                <TouchableOpacity onPress={clearSearch}>
                  <MaterialIcons name="close" size={28} color="#666" style={{ marginLeft: 10 }} />
                </TouchableOpacity>
              )}
            </View>

            {/* Services for you */}
            <TText style={{ fontSize:18, fontWeight:'bold', marginBottom:12 }}>Medical Services for you</TText>
            <View style={{ flexDirection:'row', flexWrap:'wrap', justifyContent:'space-between', marginBottom:24 }}>
              {['Symptom Checker','Find Hospital','Disease Information','Healthcare Support'].map((label,idx) => (
                <TouchableOpacity key={idx} style={{
                  width:'48%', backgroundColor:'white', borderRadius:8, overflow:'hidden', marginBottom:16,
                  shadowOpacity:0.1, shadowRadius:2, shadowOffset:{ width:0,height:1 }, elevation:2,
                }} onPress={() => router.push(label === 'Find Hospital' ? '/healthcare/healthcare' : '/') }>
                  <Image source={{ uri: serviceImgs[idx] }} style={{ width:'100%', height:100 }} />
                  <TText style={{ padding:8, textAlign:'center', fontWeight:'500' }}>{label}</TText>
                </TouchableOpacity>
              ))}
            </View>

            {/* Service Categories */}
            <TText style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}>Service Categories</TText>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
              {filteredCategories.map(cat => (
                <TouchableOpacity
                  key={cat.id}
                  style={{
                    width: '48%', backgroundColor: 'white', borderRadius: 8, padding: 12, marginBottom: 10,
                    shadowOpacity: 0.1, shadowRadius: 2, shadowOffset: { width: 0, height: 1 }, elevation: 2,
                  }}
                  onPress={() => router.push(cat.route as any)}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                    <View style={{ backgroundColor: theme.colors.primary + '20', width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginRight: 8 }}>
                      <Ionicons name={cat.icon as any} size={20} color={theme.colors.primary} />
                    </View>
                    <TText style={{ fontSize: 16, fontWeight: '500' }}>{cat.title}</TText>
                  </View>
                  <TText style={{ fontSize: 12, color: '#6B7280' }}>{cat.description}</TText>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Bottom Fixed Menu */}
      <View style={{
        position: 'absolute', top: menuTop, left: 0, right: 0,
        height: menuHeight, backgroundColor: 'white', borderTopWidth: 1, borderTopColor: '#E5E7EB',
        paddingTop: 12, paddingHorizontal: 16, zIndex: 10
      }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          {[
            { icon: 'home-outline', label: 'Home', route: '/home/home' },
            { icon: 'heart-outline', label: 'Favorites', route: '/favourite/favourite' },
            { icon: 'alert-circle-outline', label: 'Emergency', route: '/emergency/emergency' },
            { icon: 'person-outline', label: 'Profile', route: '/profile/profile' },
          ].map((item, index) => (
            <TouchableOpacity
              key={index}
              style={{ alignItems: 'center' }}
              onPress={() => router.push(item.route)}
            >
              <Ionicons name={item.icon as any} size={24} color={theme.colors.primary} />
              <TText style={{ fontSize: 12, marginTop: 4, color: theme.colors.primary }}>{item.label}</TText>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}
