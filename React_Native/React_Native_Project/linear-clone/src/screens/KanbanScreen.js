import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Button,
  TouchableOpacity,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import api from '../services/api';
import { colors, statusMeta } from '../theme/theme';

const STATUS_ORDER = ['backlog', 'todo', 'in_progress', 'done'];

export default function KanbanScreen({ navigation }) {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchIssues = () => {
    setLoading(true);
    setError(null);

    api
      .get('/issues')
      .then((res) => {
        setIssues(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Something went wrong. Please try again.');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchIssues();
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
        <TouchableOpacity onPress={fetchIssues} style={{
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






  const listData = [];

  STATUS_ORDER.forEach((statusKey) => {
    const issuesInGroup = issues.filter((issue) => issue.status === statusKey);


    if (issuesInGroup.length > 0) {


      // Add a header row for this group
      listData.push({ type: 'header', statusKey });



      // Add each issue in this group right after its header
      issuesInGroup.forEach((issue) => {
        listData.push({ type: 'issue', issue });
      });
    }
  });

  const renderRow = ({ item }) => {
    // Section header row
    if (item.type === 'header') {
      const status = statusMeta[item.statusKey];
      return <Text style={styles.sectionHeader}>{status.label}</Text>;
    }

    // Issue row
    const issue = item.issue;
    const status = statusMeta[issue.status];

    return (
      <TouchableOpacity
        style={styles.issueRow}
        onPress={() => navigation.navigate('IssueDetail', { issueId: issue.id })}
      >
        <Text style={styles.dots}>•••</Text>
        <View style={[styles.statusCircle, { borderColor: status.color }]} />
        <Text style={styles.issueTitle}>{issue.title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.header}>Issues</Text>
        <TouchableOpacity onPress={() => navigation.navigate('CreateIssue')}>
          <Feather name="edit" size={20} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={listData}
        renderItem={renderRow}
        keyExtractor={(item, index) =>
          item.type === 'header' ? item.statusKey : item.issue.id
        }
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
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  header: {
    color: colors.textPrimary,
    fontSize: 26,
    fontWeight: 'bold',
  },
  sectionHeader: {
    color: colors.textSecondary,
    fontSize: 13,
    marginTop: 16,
    marginBottom: 8,
  },
  issueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  dots: {
    color: colors.textTertiary,
    fontSize: 14,
    marginRight: 10,
  },
  statusCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    marginRight: 12,
  },
  issueTitle: {
    color: colors.textPrimary,
    fontSize: 15,
    flex: 1,
  },
});