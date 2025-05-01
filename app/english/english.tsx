import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Stack } from 'expo-router';

const freeClasses = [
  {
    id: '1',
    name: 'AMEP (Adult Migrant English Program)',
    desc: 'Free English classes for eligible migrants and humanitarian entrants',
    url: 'https://immi.homeaffairs.gov.au/settling-in-australia/amep/about-the-program',
    icon: 'school',
  },
  {
    id: '2',
    name: 'TAFE NSW English Courses',
    desc: 'Various English courses from beginner to advanced levels',
    url: 'https://www.tafensw.edu.au/courses/english-courses',
    icon: 'account-balance',
  },
];

const onlineResources = [
  {
    id: '1',
    name: 'Duolingo',
    desc: 'Free language learning app with daily lessons',
    url: 'https://www.duolingo.com',
    icon: 'language',
  },
  {
    id: '2',
    name: 'BBC Learning English',
    desc: 'Free videos, audio lessons and quizzes',
    url: 'https://www.bbc.co.uk/learningenglish',
    icon: 'ondemand-video',
  },
];

const communityGroups = [
  {
    id: '1',
    name: 'City of Sydney Libraries',
    desc: 'Free English conversation groups and resources',
    url: 'https://www.cityofsydney.nsw.gov.au/libraries',
    icon: 'groups',
  },
  {
    id: '2',
    name: 'NSW State Library',
    desc: 'Language learning resources and conversation classes',
    url: 'https://www.sl.nsw.gov.au/',
    icon: 'local-library',
  },
];

const englishTests = [
  {
    id: '1',
    name: 'IELTS',
    desc: 'International English Language Testing System',
    url: 'https://ielts.com.au',
    icon: 'rate-review',
  },
  {
    id: '2',
    name: 'PTE Academic',
    desc: 'Pearson Test of English Academic',
    url: 'https://www.pearsonpte.com',
    icon: 'assignment',
  },
];

export default function EnglishScreen() {
  return (
    <>
      <Stack.Screen 
        options={{
          title: 'Learn English',
          headerBackTitle: 'Back'
        }} 
      />
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          {/* Free Classes Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Free & Affordable Classes</Text>
            <Text style={styles.sectionDesc}>Government-funded and affordable English programs</Text>
            {freeClasses.map(program => (
              <TouchableOpacity
                key={program.id}
                style={styles.card}
                onPress={() => Linking.openURL(program.url)}
              >
                <View style={styles.cardHeader}>
                  <View style={styles.iconContainer}>
                    <MaterialIcons name={program.icon as any} size={30} color="#222" />
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.siteName}>{program.name}</Text>
                  </View>
                </View>
                <Text style={styles.siteDesc}>{program.desc}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Online Resources Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Online Resources</Text>
            <Text style={styles.sectionDesc}>Free online tools and apps for learning English</Text>
            {onlineResources.map(resource => (
              <TouchableOpacity
                key={resource.id}
                style={styles.card}
                onPress={() => Linking.openURL(resource.url)}
              >
                <View style={styles.cardHeader}>
                  <View style={styles.iconContainer}>
                    <MaterialIcons name={resource.icon as any} size={30} color="#222" />
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.siteName}>{resource.name}</Text>
                  </View>
                </View>
                <Text style={styles.siteDesc}>{resource.desc}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Community Groups Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Community Groups</Text>
            <Text style={styles.sectionDesc}>Local groups and libraries offering English support</Text>
            {communityGroups.map(group => (
              <TouchableOpacity
                key={group.id}
                style={styles.card}
                onPress={() => Linking.openURL(group.url)}
              >
                <View style={styles.cardHeader}>
                  <View style={styles.iconContainer}>
                    <MaterialIcons name={group.icon as any} size={30} color="#222" />
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.siteName}>{group.name}</Text>
                  </View>
                </View>
                <Text style={styles.siteDesc}>{group.desc}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* English Tests Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>English Tests</Text>
            <Text style={styles.sectionDesc}>Official English language proficiency tests</Text>
            {englishTests.map(test => (
              <TouchableOpacity
                key={test.id}
                style={styles.card}
                onPress={() => Linking.openURL(test.url)}
              >
                <View style={styles.cardHeader}>
                  <View style={styles.iconContainer}>
                    <MaterialIcons name={test.icon as any} size={30} color="#222" />
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.siteName}>{test.name}</Text>
                  </View>
                </View>
                <Text style={styles.siteDesc}>{test.desc}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#222',
  },
  sectionDesc: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  siteName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
  siteDesc: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
}); 