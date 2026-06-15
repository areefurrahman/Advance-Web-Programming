import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen() {
  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}

      <View style={styles.header}>
        <View>
          <Text style={styles.smallText}>Hi Moon 👋</Text>
          <Text style={styles.title}>Welcome Back</Text>
        </View>

        <Image
          source={{
            uri: "https://i.pravatar.cc/150?img=12",
          }}
          style={styles.avatar}
        />
      </View>

      {/* Dashboard Card */}

      <View style={styles.dashboardCard}>
        <View style={styles.row}>
          <View style={styles.box}>
            <Text style={styles.label}>My Level</Text>

            <Ionicons
              name="diamond"
              size={30}
              color="#f9a826"
            />

            <Text style={styles.bigText}>Top Rated</Text>
          </View>

          <View style={styles.box}>
            <Text style={styles.label}>Success Score</Text>

            <Text style={styles.score}>9</Text>

            <View style={styles.progressBg}>
              <View style={styles.progressSuccess} />
            </View>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.box}>
            <Text style={styles.label}>Rating</Text>

            <Text style={styles.score}>5.0 </Text>

            <View style={styles.progressBg}>
              <View style={styles.progressRating} />
            </View>
          </View>

          <View style={styles.box}>
            <Text style={styles.label}>Response Rate</Text>

            <Text style={styles.score}>98%</Text>

            <View style={styles.progressBg}>
              <View style={styles.progressResponse} />
            </View>
          </View>
        </View>

        {/* Stats */}

        <View style={styles.statsRow}>
          <Text style={styles.statTitle}>Orders</Text>
          <Text style={styles.statValue}>50 / 50</Text>
        </View>

        <View style={styles.statsRow}>
          <Text style={styles.statTitle}>Clients</Text>
          <Text style={styles.statValue}>20 / 20</Text>
        </View>

        <View style={styles.statsRow}>
          <Text style={styles.statTitle}>Earnings</Text>
          <Text style={styles.statValue}>$10,000</Text>
        </View>
      </View>

      {/* Earnings Section */}

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Earnings</Text>

        <Text style={styles.view}>View Details</Text>
      </View>

      <View style={styles.earningCard}>
        <View style={styles.earningBox}>
          <Text style={styles.label}>Personal Balance</Text>
          <Text style={styles.green}>$12,562</Text>
        </View>

        <View style={styles.earningBox}>
          <Text style={styles.label}>May Earnings</Text>
          <Text style={styles.white}>$2,864</Text>
        </View>

        <View style={styles.earningBox}>
          <Text style={styles.label}>Avg. Selling Price</Text>
          <Text style={styles.white}>$125</Text>
        </View>

        <View style={styles.earningBox}>
          <Text style={styles.label}>Active Orders</Text>
          <Text style={styles.white}>12</Text>
        </View>
      </View>

      {/* Recent Orders */}

      <Text style={styles.sectionTitle}>Recent Orders</Text>

      {[1, 2, 3, 4].map((item) => (
        <View key={item} style={styles.orderCard}>
          <View>
            <Text style={styles.orderTitle}>
              Website Design Project
            </Text>

            <Text style={styles.orderClient}>
              Client #{item}
            </Text>
          </View>

          <View style={styles.status}>
            <Text style={styles.statusText}>
              In Progress
            </Text>
          </View>
        </View>
      ))}

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d0d0d",
    paddingTop: 55,
    paddingHorizontal: 18,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },

  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },

  smallText: {
    color: "#aaa",
    fontSize: 16,
  },

  title: {
    color: "#fff",
    fontSize: 34,
    fontWeight: "bold",
  },

  dashboardCard: {
    backgroundColor: "#1a1a1a",
    borderRadius: 20,
    padding: 15,
    marginBottom: 25,
  },

  row: {
    flexDirection: "row",
  },

  box: {
    flex: 1,
    padding: 12,
  },

  label: {
    color: "#aaa",
    fontSize: 14,
    marginBottom: 10,
  },

  bigText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginTop: 8,
  },

  score: {
    color: "#fff",
    fontSize: 36,
    fontWeight: "bold",
  },

  progressBg: {
    height: 8,
    backgroundColor: "#333",
    borderRadius: 10,
    marginTop: 10,
  },

  progressSuccess: {
    width: "85%",
    height: 8,
    backgroundColor: "#1DBF73",
    borderRadius: 10,
  },

  progressRating: {
    width: "95%",
    height: 8,
    backgroundColor: "#1DBF73",
    borderRadius: 10,
  },

  progressResponse: {
    width: "90%",
    height: 8,
    backgroundColor: "#1DBF73",
    borderRadius: 10,
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderColor: "#2c2c2c",
    paddingVertical: 15,
  },

  statTitle: {
    color: "#fff",
    fontSize: 16,
  },

  statValue: {
    color: "#fff",
    fontWeight: "bold",
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },

  sectionTitle: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 15,
  },

  view: {
    color: "#1DBF73",
    fontWeight: "bold",
  },

  earningCard: {
    backgroundColor: "#1a1a1a",
    borderRadius: 20,
    padding: 15,
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 30,
  },

  earningBox: {
    width: "50%",
    paddingVertical: 15,
  },

  green: {
    color: "#1DBF73",
    fontSize: 28,
    fontWeight: "bold",
  },

  white: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
  },

  orderCard: {
    backgroundColor: "#1a1a1a",
    borderRadius: 15,
    padding: 18,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  orderTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  orderClient: {
    color: "#888",
    marginTop: 5,
  },

  status: {
    backgroundColor: "#1DBF73",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  statusText: {
    color: "#fff",
    fontWeight: "bold",
  },
});