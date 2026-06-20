import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import api from '../services/api';
import { colors, priorityMeta, statusMeta } from '../theme/theme';

export default function DashboardScreen({ navigation }) {
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
        <TouchableOpacity onPress={fetchIssues} style={styles.retryButton}>
          <Text style={{ color: '#FFFFFF' }}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const totalCount = issues.length;
  const inProgressCount = issues.filter((i) => i.status === 'in_progress').length;
  const doneCount = issues.filter((i) => i.status === 'done').length;
  const backlogCount = issues.filter((i) => i.status === 'backlog').length;

  const progressPercent = totalCount === 0 ? 0 : Math.round((doneCount / totalCount) * 100);

  const highPriorityIssues = issues.filter(
    (i) => i.priority === 'urgent' || i.priority === 'high'
  );



  const renderIssue = ({ item }) => {
    const status = statusMeta[item.status];

    return (
      <TouchableOpacity
        style={styles.issueRow}
        onPress={() => navigation.navigate('IssueDetail', { issueId: item.id })}
      >
        <Text style={styles.dots}>•••</Text>
        <View style={[styles.statusCircle, { borderColor: status.color }]} />
        <Text style={styles.issueTitle}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={highPriorityIssues}
        renderItem={renderIssue}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View style={{ flex:1}}>
            <Text style={styles.greeting}>Welcome back 👋</Text>
            <Text style={styles.header}>Areef ur Rahman</Text>


            <View style={{ flex: 1, gap: 10 }}>

              {/* Stat cards row */}
              <View style={styles.cardsRow}>
                <View style={[styles.card, { backgroundColor: colors.surface  }]}>
                  <Feather name="layers" size={18} color={colors.textPrimary} />
                  <Text style={styles.cardNumber}>{totalCount}</Text>
                  <Text style={styles.cardLabel}>Total</Text>
                </View>
                <View style={[styles.card, { backgroundColor: colors.surface }]}>
                  <Feather name="loader" size={18} color={colors.textPrimary} />
                  <Text style={styles.cardNumber}>{inProgressCount}</Text>
                  <Text style={styles.cardLabel}>In Progress</Text>
                </View>
                <View style={[styles.card, { backgroundColor: colors.surface }]}>
                  <Feather name="check-circle" size={18} color={colors.textPrimary} />
                  <Text style={styles.cardNumber}>{doneCount}</Text>
                  <Text style={styles.cardLabel}>Done</Text>
                </View>
              </View>

              {/* Progress bar card */}
              <View style={styles.progressCard}>
                <View style={styles.progressTopRow}>
                  <Text style={styles.progressTitle}>Overall Progress</Text>
                  <Text style={styles.progressPercent}>{progressPercent}%</Text>
                </View>
                <View style={styles.progressTrack}>
                  <View style={[styles.progressFill, { width: progressPercent + '%' }]} />
                </View>
                <Text style={styles.progressSubText}>
                  {doneCount} of {totalCount} issues completed · {backlogCount} in backlog
                </Text>
              </View>

              <View style={styles.sectionTitleRow}>

                <Text style={styles.sectionTitle}>High Priority Issues</Text>
              </View>
            </View>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 16,
    paddingTop: 30,
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
  retryButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 80,
    backgroundColor: colors.surface,
  },
  greeting: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  header: {
    color: colors.textPrimary,
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 2,
    marginBottom: 20,
  },
  cardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    flex: 1,
    borderRadius: 14,
    padding: 14,
    marginRight: 8,
    borderTopColor: colors.border,
    borderTopWidth: 1,
  },
  cardNumber: {
    color: colors.textPrimary,
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
  },
  cardLabel: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 2,
  },
  progressCard: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 16,
    marginBottom: 24,
    borderTopColor: colors.border,
    borderTopWidth: 1,
  },
  progressTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  progressTitle: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '600',
  },
  progressPercent: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '600',
  },
  progressTrack: {
    height: 8,
    backgroundColor: colors.surfaceHover,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: 8,
    backgroundColor: colors.accent,
    borderRadius: 4,
  },
  progressSubText: {
    color: colors.textTertiary,
    fontSize: 12,
    marginTop: 10,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
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