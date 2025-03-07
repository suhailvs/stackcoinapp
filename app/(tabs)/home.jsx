import { View, Text, TouchableOpacity, FlatList, StyleSheet, Alert } from "react-native";
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useSession } from "@/login_extras/ctx";
import { useRouter } from 'expo-router';
import AccountBalance from "@/components/AccountBalance";


export default function HomeScreen() {
  const { signOut } = useSession();
  const router = useRouter(); // Use Expo Router for navigation
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
          <MaterialCommunityIcons name="logout" size={40} color="#FF9900" />
          <Text style={styles.actionText}>Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={() => {
            router.push({ pathname: 'screens/sendmoney/contact' })
            }
        }>
          <Ionicons name="send" size={40} color="#FF9900" />
          <Text style={styles.actionText}>Send Money</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.quickActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="cart" size={40} color="#FF9900" />
          <Text style={styles.actionText}>My Offerings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <MaterialCommunityIcons name="shopping" size={40} color="#FF9900" />
          <Text style={styles.actionText}>My Wants</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa", padding: 20 },  
  quickActions: { flexDirection: "row", justifyContent: "space-between",borderRadius: 15, marginBottom: 20, padding: 20, backgroundColor: "#fff", },
  actionButton: { alignItems: "center", justifyContent: "center", width: 120, },
  actionText: { fontSize: 14, fontWeight: "500", color: "#333" },
});

