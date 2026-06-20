import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Button,
  TouchableOpacity
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import api from '../services/api';
import { colors } from '../theme/theme';




const getIconName = (type) => {
  if (type === 'created') return 'plus-circle';
  if (type === 'status_change') return 'refresh-cw';
  if (type === 'priority_change') return 'bar-chart-2';
  if (type === 'assignee_change') return 'user';
  if (type === 'subtask_completed') return 'check-circle';
  return 'circle';
};



// Turns an ISO date string into something readable, e.g. "Jun 18, 2:30 PM"
const formatDate = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  }) + ', ' + date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });
};

export default function ActivityScreen() {
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchActivity = () => {
    setLoading(true);
    setError(null);

    api
      .get('/activityLog')
      .then((res) => {
        // Show newest first
        const sorted = res.data.slice().reverse();
        setActivity(sorted);
        setLoading(false);
      })
      .catch((err) => {
        setError('Something went wrong. Please try again.');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchActivity();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.textPrimary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity onPress={fetchActivity} style={{
          paddingVertical: 12,
          paddingHorizontal: 24,
          borderRadius: 80,
          backgroundColor: colors.surface
        }} >
          <Text style={{ color: '#FFFFFF' }}>
            Retry
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Feather name={getIconName(item.type)} size={16} color={colors.textPrimary} />
      <View style={styles.rowText}>
        <Text style={styles.detailText}>
          <Text style={styles.issueIdText}>{item.issueId}</Text> {item.detail}
        </Text>
        <Text style={styles.dateText}>{formatDate(item.timestamp)}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Activity</Text>

      <FlatList
        data={activity}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
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
  center: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: colors.error,
    fontSize: 16,
    marginBottom: 12,
  },
  header: {
    color: colors.textPrimary,
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    alignItems: 'center',
  },
  rowText: {
    marginLeft: 12,
    flex: 1,
  },
  detailText: {
    color: colors.textPrimary,
    fontSize: 14,
  },
  issueIdText: {
    color: colors.textTertiary,
  },
  dateText: {
    color: colors.textTertiary,
    fontSize: 12,
    marginTop: 4,
  },
});