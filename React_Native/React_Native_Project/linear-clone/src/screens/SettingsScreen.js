
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../theme/theme';

const ACCENT_OPTIONS = [
  { name: 'Periwinkle', color: '#5E6AD2' },
  { name: 'Green', color: '#4CB782' },
  { name: 'Orange', color: '#E2B203' },
  { name: 'Red', color: '#EB5757' },
];

export default function SettingsScreen() {
  const [selectedAccent, setSelectedAccent] = useState('Periwinkle');

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>

      {/* Profile section */}
      <View style={styles.profileRow}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>AR</Text>
        </View>
        <View>
          <Text style={styles.profileName}>Areef ur Rahman</Text>
          <Text style={styles.profileEmail}>l1f23bsse0389@ucp.edu.pk</Text>
        </View>
      </View>

      {/* Theme section */}
      <Text style={styles.sectionTitle}>Theme</Text>
      <View style={styles.themeBox}>
        <View style={styles.themeRow}>
          <Feather name="moon" size={18} color={colors.accent} />
          <Text style={styles.themeRowText}>Dark</Text>
          <Feather name="check" size={18} color={colors.accent} />
        </View>
      </View>

      {/* Accent color section */}
      <Text style={styles.sectionTitle}>Accent Color</Text>
      <View style={styles.accentRow}>
        {ACCENT_OPTIONS.map((option) => (
          <TouchableOpacity
            key={option.name}
            style={styles.accentOption}
            onPress={() => setSelectedAccent(option.name)}
          >
            <View style={[styles.accentDot, { backgroundColor: option.color }]}>
              {selectedAccent === option.name && (
                <Feather name="check" size={14} color="#fff" />
              )}
            </View>
            <Text style={styles.accentLabel}>{option.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* About section */}
      <Text style={styles.sectionTitle}>About</Text>
      <View style={styles.aboutBox}>
        <Text style={styles.aboutText}>Linear Clone, AWP Project</Text>
        <Text style={styles.aboutSubText}>Built with React Native & Expo</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 30,
    paddingHorizontal: 16,
  },
  header: {
    color: colors.textPrimary,
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 28,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  avatarText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  profileName: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
  profileEmail: {
    color: colors.textTertiary,
    fontSize: 13,
    marginTop: 2,
  },
  sectionTitle: {
    color: colors.textSecondary,
    fontSize: 13,
    marginBottom: 10,
    marginTop: 8,
  },
  themeBox: {
    backgroundColor: colors.surface,
    borderRadius: 10,
    padding: 14,
    marginBottom: 20,
  },
  themeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  themeRowText: {
    color: colors.textPrimary,
    fontSize: 14,
    flex: 1,
    marginLeft: 10,
  },
  accentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    borderRadius: 10,
    padding: 14,
    marginBottom: 20,
  },
  accentOption: {
    alignItems: 'center',
  },
  accentDot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  accentLabel: {
    color: colors.textSecondary,
    fontSize: 11,
  },
  aboutBox: {
    backgroundColor: colors.surface,
    borderRadius: 10,
    padding: 14,
  },
  aboutText: {
    color: colors.textPrimary,
    fontSize: 14,
  },
  aboutSubText: {
    color: colors.textTertiary,
    fontSize: 12,
    marginTop: 4,
  },
});