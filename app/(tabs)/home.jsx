import { View, Text, TouchableOpacity, FlatList, StyleSheet, Alert } from "react-native";
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useSession } from "@/login_extras/ctx";

import AccountBalance from "@/components/AccountBalance";


export default function HomeScreen() {
  const { signOut } = useSession();

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", onPress: () => signOut() }, // Replace with actual logout logic
    ]);
  };
  return (
    <View style={styles.container}>
      {/* Account Balance */}
      <AccountBalance />
      

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity style={styles.actionButton} onPress={handleLogout}>
          <MaterialCommunityIcons name="logout" size={28} color="#FF9900" />
          <Text style={styles.actionText}>Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="send" size={28} color="#FF9900" />
          <Text style={styles.actionText}>Send Money</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="add-circle-outline" size={28} color="#FF9900" />
          <Text style={styles.actionText}>Add Money</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <MaterialCommunityIcons name="qrcode-scan" size={28} color="#FF9900" />
          <Text style={styles.actionText}>Scan QR</Text>
        </TouchableOpacity>
      </View>

      

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  
  quickActions: { flexDirection: "row", justifyContent: "space-around", marginBottom: 20 },
  actionButton: { alignItems: "center" },
  actionText: { marginTop: 5, fontSize: 14, fontWeight: "500", color: "#333" },

  

  
});