import { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons"; // User & Send icons
import api from '@/constants/api'
import SkeletonLoader from "@/components/SkeletonLoader";
import { useRouter } from 'expo-router';
const Users = ({page}) => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // Use Expo Router for navigation
  // Filter contacts based on search
  const filteredContacts = data.filter(contact =>
    contact.first_name.toLowerCase().includes(search.toLowerCase()) ||
    contact.username.includes(search)
  );

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
        const response = await api.get('/users/');
        setData(response.data);
    } catch (error) {
        console.error('Error fetching data:', error);
    } finally {
        setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View>
          <SkeletonLoader width={100} height={20} />
          <SkeletonLoader width={200} height={15} />
          <SkeletonLoader width={250} height={15} />
        </View>
      ) : (
        <View>
          {/* Title */}
          <Text style={styles.title}>{page}</Text>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchBar}
              placeholder="Search users..."
              value={search}
              onChangeText={setSearch}
            />
          </View>

          {/* User List */}
          <FlatList
            data={filteredContacts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={styles.contactItem} 
                onPress={() => router.push({ pathname: 'screens/sendmoney/amount', params: { id: item.id, username: item.username, first_name: item.first_name } })}
              >
                {/* User Avatar */}
                {item.profile_picture ? (
                  <Image source={{ uri: item.profile_picture }} style={styles.avatar} />
                ) : (
                  <MaterialIcons name="account-circle" size={50} color="#ccc" />
                )}

                {/* User Info */}
                <View style={styles.contactInfo}>
                  <Text style={styles.contactName}>{item.first_name}</Text>
                  <Text style={styles.contactDetails}>{item.username} • Balance: {item.balance}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
    )}
    </View>
  );
};

export default Users;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",  // WhatsApp header color
    textAlign: "center",
    paddingVertical: 15,
  },
  searchContainer: {
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
  searchBar: {
    backgroundColor: "#f0f0f0",
    padding: 12,
    borderRadius: 10,
    fontSize: 16,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  contactInfo: {
    marginLeft: 12,
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  contactDetails: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  
});
