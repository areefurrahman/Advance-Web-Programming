import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Button,
  TouchableOpacity,
  Modal,
  FlatList,
  TextInput,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import api from '../services/api';
import { colors, priorityMeta, statusMeta } from '../theme/theme';

const PRIORITY_OPTIONS = ['urgent', 'high', 'medium', 'low', 'none'];
const STATUS_OPTIONS = ['backlog', 'todo', 'in_progress', 'done', 'canceled'];

export default function IssueDetailScreen({ route, navigation }) {
  const { issueId } = route.params;

  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [priorityModalVisible, setPriorityModalVisible] = useState(false);
  const [statusModalVisible, setStatusModalVisible] = useState(false);

  const fetchIssue = () => {
    setLoading(true);
    setError(null);

    api
      .get('/issues/' + issueId)
      .then((res) => {
        setIssue(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Something went wrong. Please try again.');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchIssue();
  }, []);

  // Called when the user taps a priority option inside the popup.
  const selectPriority = (newPriority) => {
    setIssue({ ...issue, priority: newPriority });
    setPriorityModalVisible(false);

    api.patch('/issues/' + issueId, { priority: newPriority }).catch((err) => {});
  };

  // Called when the user taps a status option inside the popup.
  const selectStatus = (newStatus) => {
    setIssue({ ...issue, status: newStatus });
    setStatusModalVisible(false);

    api.patch('/issues/' + issueId, { status: newStatus }).catch((err) => {});
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.accent} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
        <Button title="Retry" onPress={fetchIssue} color={colors.accent} />
      </View>
    );
  }

  // "canceled" is not in statusMeta (theme.js only has backlog/todo/
  // in_progress/done), so handle it separately for the chip too.
  const status =
    issue.status === 'canceled'
      ? { label: 'Canceled', color: colors.textTertiary }
      : statusMeta[issue.status];

  const priority = priorityMeta[issue.priority];

  return (
    <View style={styles.container}>
      {/* Top bar: back arrow + "..." menu */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="chevron-left" size={26} color={colors.textPrimary} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Feather name="more-horizontal" size={22} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>

      <Text style={styles.issueId}>{issue.id}</Text>
      <Text style={styles.issueTitle}>{issue.title}</Text>

      {/* Property chips row */}
      <View style={styles.chipsBox}>
        <View style={styles.chipsRow}>
          {/* Status chip — tapping this opens the status popup */}
          <TouchableOpacity
            style={styles.chip}
            onPress={() => setStatusModalVisible(true)}
          >
            <View style={[styles.statusCircle, { borderColor: status.color }]} />
            <Text style={styles.chipText}>{status.label}</Text>
          </TouchableOpacity>

          {/* Priority chip — tapping this opens the priority popup */}
          <TouchableOpacity
            style={styles.chip}
            onPress={() => setPriorityModalVisible(true)}
          >
            <Feather name="bar-chart-2" size={14} color={priority.color} />
            <Text style={styles.chipText}>{priority.label}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.description}>Add description...</Text>

      <TouchableOpacity style={styles.subIssueButton}>
        <Feather name="plus" size={16} color={colors.textPrimary} />
        <Text style={styles.subIssueText}>Sub-issue</Text>
      </TouchableOpacity>

      <Text style={styles.activityHeader}>Activity</Text>
      <View style={styles.activityRow}>
        <View style={styles.activityDot} />
        <View>
          <Text style={styles.activityText}>Areef ur Rahman created the issue</Text>
          <Text style={styles.activityDate}>June 20, 2026 at 2:05pm</Text>
        </View>
      </View>

      {/* Comment bar pinned to the bottom */}
      <View style={styles.commentBar}>
        <Feather name="plus" size={18} color={colors.textTertiary} />
        <TextInput
          placeholder="Comment"
          placeholderTextColor={colors.textTertiary}
          style={styles.commentInput}
        />
      </View>

      {/* Priority popup, shown in the middle of the screen */}
      <Modal
        visible={priorityModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setPriorityModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setPriorityModalVisible(false)}
        >
          <View style={styles.popup}>
            <Text style={styles.popupTitle}>Set priority</Text>
            <FlatList
              data={PRIORITY_OPTIONS}
              keyExtractor={(item) => item}
              renderItem={({ item }) => {
                const option = priorityMeta[item];
                return (
                  <TouchableOpacity
                    style={styles.popupOption}
                    onPress={() => selectPriority(item)}
                  >
                    <Feather name="bar-chart-2" size={16} color={option.color} />
                    <Text style={styles.popupOptionText}>{option.label}</Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Status popup, shown in the middle of the screen */}
      <Modal
        visible={statusModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setStatusModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setStatusModalVisible(false)}
        >
          <View style={styles.popup}>
            <Text style={styles.popupTitle}>Set status</Text>
            <FlatList
              data={STATUS_OPTIONS}
              keyExtractor={(item) => item}
              renderItem={({ item }) => {
                const option =
                  item === 'canceled'
                    ? { label: 'Canceled', color: colors.textTertiary }
                    : statusMeta[item];

                return (
                  <TouchableOpacity
                    style={styles.popupOption}
                    onPress={() => selectStatus(item)}
                  >
                    <View
                      style={[styles.statusCircle, { borderColor: option.color }]}
                    />
                    <Text style={styles.popupOptionText}>{option.label}</Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </TouchableOpacity>
      </Modal>
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
    marginBottom: 16,
  },
  issueId: {
    color: colors.textTertiary,
    fontSize: 14,
  },
  issueTitle: {
    color: colors.textPrimary,
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 4,
    marginBottom: 14,
  },
  chipsBox: {
    backgroundColor: colors.surface,
    borderRadius: 10,
    padding: 10,
    marginBottom: 16,
  },
  chipsRow: {
    flexDirection: 'row',
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceHover,
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginRight: 8,
  },
  chipText: {
    color: colors.textPrimary,
    fontSize: 13,
    marginLeft: 6,
  },
  statusCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
  },
  description: {
    color: colors.textTertiary,
    fontSize: 15,
    marginBottom: 16,
  },
  subIssueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 24,
  },
  subIssueText: {
    color: colors.textPrimary,
    fontSize: 13,
    marginLeft: 6,
  },
  activityHeader: {
    color: colors.textSecondary,
    fontSize: 14,
    marginBottom: 12,
  },
  activityRow: {
    flexDirection: 'row',
  },
  activityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: colors.textTertiary,
    marginRight: 10,
    marginTop: 5,
  },
  activityText: {
    color: colors.textPrimary,
    fontSize: 14,
  },
  activityDate: {
    color: colors.textTertiary,
    fontSize: 12,
    marginTop: 2,
  },
  commentBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 24,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginTop: 'auto',
    marginBottom: 20,
  },
  commentInput: {
    color: colors.textPrimary,
    fontSize: 14,
    marginLeft: 10,
    flex: 1,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    backgroundColor: colors.surfaceElevated,
    borderRadius: 12,
    padding: 16,
    width: 260,
  },
  popupTitle: {
    color: colors.textSecondary,
    fontSize: 13,
    marginBottom: 10,
  },
  popupOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  popupOptionText: {
    color: colors.textPrimary,
    fontSize: 14,
    marginLeft: 10,
  },
});