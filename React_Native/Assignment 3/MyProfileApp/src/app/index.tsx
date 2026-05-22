import React, { useState } from 'react';

import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    alert('Profile Submitted Successfully');
  };

  return (

    <SafeAreaView style={styles.container}>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >

        <ScrollView
          showsVerticalScrollIndicator={false}
        >

          <View style={styles.header}>
            <Text style={styles.title}>
              My Profile
            </Text>
          </View>

          <View style={styles.profileCard}>

            <Image
              source={require('../../assets/profile.webp')}
              style={styles.profileImage}
            />

            <Text style={styles.profileName}>
              Student Profile
            </Text>

            <Text style={styles.profileSubText}>
              React Native Developer
            </Text>

          </View>

          <View style={styles.inputSection}>

            <Text style={styles.sectionTitle}>
              Personal Information
            </Text>

            <TextInput
              placeholder="Enter Your Name"
              placeholderTextColor="#777"
              style={styles.input}
              value={name}
              onChangeText={setName}
            />

            <TextInput
              placeholder="Enter Your Email"
              placeholderTextColor="#777"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />

            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit}
            >
              <Text style={styles.buttonText}>
                Submit
              </Text>
            </TouchableOpacity>

          </View>

          <View style={styles.resultCard}>

            <Text style={styles.resultText}>
              Your Name is: {name}
            </Text>

            <Text style={styles.resultText}>
              Your Email is: {email}
            </Text>
          </View>

          <View style={styles.detailsCard}>

            <Text style={styles.sectionTitle}>
              Student Details
            </Text>

            <Text style={styles.detailItem}>
              Department: Software Engineering
            </Text>

            <Text style={styles.detailItem}>
              Semester: 6th Semester
            </Text>

            <Text style={styles.detailItem}>
              University: UCP Lahore
            </Text>

            <Text style={styles.detailItem}>
              Course 1: Advance Web Programming
            </Text>

            <Text style={styles.detailItem}>
              Course 2: Computer Communication and Networks
            </Text>

            <Text style={styles.detailItem}>
              Course 3: Software Design and Architecture
            </Text>

            <Text style={styles.detailItem}>
              Course 4: Formal Methods in Software Engineering
            </Text>

            <Text style={styles.detailItem}>
              Skill: React Native Development
            </Text>

            <Text style={styles.detailItem}>
              Skill: Java Programming
            </Text>

            <Text style={styles.detailItem}>
              Skill: UI/UX Design
            </Text>

            <Text style={styles.detailItem}>
              Hobby: Fitness Training
            </Text>

            <Text style={styles.detailItem}>
              Hobby: Technology Research
            </Text>

            <Text style={styles.detailItem}>
              Hobby: Graphic Designing
            </Text>

            <Text style={styles.detailItem}>
              Interest: Artificial Intelligence
            </Text>

            <Text style={styles.detailItem}>
              Interest: Business and Startups
            </Text>

            <Text style={styles.detailItem}>
              Goal: Become Cloude Engineer
            </Text>

            <Text style={styles.detailItem}>
              Favorite Framework: Nextjs
            </Text>

            <Text style={styles.detailItem}>
              Favorite Language: js
            </Text>

            <Text style={styles.detailItem}>
              Project: Al-Rafah Digital alrafahdigital.com
            </Text>

            <Text style={styles.detailItem}>
              Status: Active Student Developer
            </Text>

          </View>
        </ScrollView>

      </KeyboardAvoidingView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#000',
  },

  header: {
    alignItems: 'center',
    marginTop: 20,
  },

  title: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },

  profileCard: {
    backgroundColor: '#111',
    marginHorizontal: 20,
    marginTop: 30,
    borderRadius: 25,
    alignItems: 'center',
    padding: 25,
    borderWidth: 1,
    borderColor: '#222',
  },

  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 65,
    marginBottom: 20,
  },

  profileName: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },

  profileSubText: {
    color: '#999',
    marginTop: 5,
    fontSize: 15,
  },

  inputSection: {
    marginTop: 30,
    marginHorizontal: 20,
    backgroundColor: '#111',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#222',
  },

  sectionTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
  },

  input: {
    backgroundColor: '#1a1a1a',
    color: '#fff',
    padding: 16,
    borderRadius: 14,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#333',
    fontSize: 16,
  },

  button: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 10,
  },

  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },

  resultCard: {
    marginHorizontal: 20,
    marginTop: 25,
    backgroundColor: '#111',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#222',
    marginBottom: 40,
  },

  resultText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
  },

  detailsCard: {
  marginHorizontal: 20,
  marginBottom: 40,
  backgroundColor: '#111',
  borderRadius: 20,
  padding: 20,
  borderWidth: 1,
  borderColor: '#222',
},

detailItem: {
  color: '#ddd',
  fontSize: 16,
  marginBottom: 14,
  lineHeight: 22,
},

});