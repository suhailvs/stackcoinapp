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
        <Text style={styles.title}>{page}</Text>
        <View style={{padding: 20}}>      
            <TextInput
              style={styles.searchBar}
              placeholder="Search contacts..."
              value={search}
              onChangeText={setSearch}
            />
        </View>
      
        <FlatList
          data={filteredContacts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.contactItem}>
              <TouchableOpacity style={styles.contactInfo} onPress={() => {
                  router.push({ pathname: 'screens/sendmoney/amount', params:{'id':item.id, 'username':item.username, 'first_name':item.first_name} })
                  }
              }>     
                <MaterialIcons name="account-circle" size={50} color="#ccc" />
                <View>
                  <Text style={styles.contactName}>{item.first_name}</Text>
                  <Text style={styles.contactPhone}>{item.username}</Text>
                  <Text style={styles.contactPhone}>amount: {item.amount}</Text>
                </View>
              </TouchableOpacity>
            </View>
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
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 15,
    textAlign: "center",
  },
  searchBar: {
    backgroundColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 15,
  },
 
  contactItem: { padding: 15, borderBottomWidth: 1, borderBottomColor: "#ddd" },
  contactInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  contactName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#666",
    marginLeft: 10,
  },
  contactPhone: {
    fontSize: 14,
    color: "#ccc",
    marginLeft: 10,
  },
  
});
