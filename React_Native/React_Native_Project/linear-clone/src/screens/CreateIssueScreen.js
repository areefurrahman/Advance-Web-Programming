import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import api from '../services/api';
import { colors, priorityMeta, statusMeta } from '../theme/theme';

const PRIORITY_OPTIONS = ['urgent', 'high', 'medium', 'low', 'none'];
const STATUS_OPTIONS = ['backlog', 'todo', 'in_progress', 'done', 'canceled'];

export default function CreateIssueScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('backlog');
  const [priority, setPriority] = useState('none');
  const [priorityModalVisible, setPriorityModalVisible] = useState(false);
  const [statusModalVisible, setStatusModalVisible] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const statusInfo = statusMeta[status];
  const priorityInfo = priorityMeta[priority];

  const selectPriority = (newPriority) => {
    setPriority(newPriority);
    setPriorityModalVisible(false);
  };

  const selectStatus = (newStatus) => {
    setStatus(newStatus);
    setStatusModalVisible(false);
  };

  const handleSave = () => {
    if (title.trim() === '') {
      return;
    }

    setSaving(true);

    const newIssue = {
      id: 'ENG-' + Math.floor(Math.random() * 900 + 100),
      title: title,
      description: description,
      status: status,
      priority: priority,
      subtasks: [],
    };

    api
      .post('/issues', newIssue)
      .then(() => {
        setSaving(false);
        setShowToast(true);

        setTimeout(() => {
          navigation.goBack();
        }, 1200);
      })
      .catch((err) => {
        setSaving(false);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="x" size={20} color={colors.textPrimary} />
        </TouchableOpacity>

        <View style={styles.teamPill}>
          <Feather name="zap" size={12} color={colors.success} />
          <Text style={styles.teamPillText}>Project Name</Text>
        </View>

        <TouchableOpacity onPress={handleSave} disabled={saving}>
          <Feather name="arrow-up" size={20} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.titleInput}
        placeholder="Issue title"
        placeholderTextColor={colors.textTertiary}
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={styles.descriptionInput}
        placeholder="Description..."
        placeholderTextColor={colors.textTertiary}
        value={description}
        onChangeText={setDescription}
        multiline={true}
      />

      <View style={styles.chipsBox}>
        <View style={styles.chipsRow}>
          {/* Status chip — opens the status popup */}
          <TouchableOpacity
            style={styles.chip}
            onPress={() => setStatusModalVisible(true)}
          >
            <View style={[styles.statusCircle, { borderColor: statusInfo.color }]} />
            <Text style={styles.chipText}>{statusInfo.label}</Text>
          </TouchableOpacity>

          {/* Priority chip — opens the priority popup */}
          <TouchableOpacity
            style={styles.chip}
            onPress={() => setPriorityModalVisible(true)}
          >
            <Feather name="bar-chart-2" size={14} color={priorityInfo.color} />
            <Text style={styles.chipText}>{priorityInfo.label}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Priority popup */}
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

      {/* Status popup */}
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
                // "canceled" is not in statusMeta (theme.js only has
                // backlog/todo/in_progress/done), so handle it separately.
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

      {/* Confirmation toast */}
      {showToast && (
        <View style={styles.toast}>
          <Text style={styles.toastText}>Issue created</Text>
        </View>
      )}
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
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  teamPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  teamPillText: {
    color: colors.textPrimary,
    fontSize: 13,
    marginLeft: 6,
  },
  titleInput: {
    color: colors.textPrimary,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  descriptionInput: {
    color: colors.textSecondary,
    fontSize: 15,
    marginBottom: 24,
  },
  chipsBox: {
    backgroundColor: colors.surface,
    borderRadius: 10,
    padding: 10,
    marginTop: 'auto',
    marginBottom: 20,
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
  toast: {
    position: 'absolute',
    bottom: 80,
    left: 16,
    right: 16,
    backgroundColor: colors.surface,
    borderRadius: 24,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  toastText: {
    color: colors.textPrimary,
    fontSize: 14,
  },
});