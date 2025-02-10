import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Text } from 'react-native';
import { Redirect, Tabs } from 'expo-router';
import { useSession } from "@/login_extras/ctx";

export default function TabLayout() {
  const { session, isLoading } = useSession();  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  if (!session) {
    return <Redirect href="/login" />;
  }
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#FF9900", // Active tab color
        tabBarInactiveTintColor: "gray", // Inactive tab color        
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Offerings',
          tabBarIcon: ({ color }) => <Icon name="cart" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="wants"
        options={{
          title: 'Wants',
          tabBarIcon: ({ color }) => <Icon name="shopping" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Icon name="home" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="users"
        options={{
          title: 'Users',
          tabBarIcon: ({ color }) => <Icon name="account-group" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="transactions"
        options={{
          title: 'Transactions',
          tabBarIcon: ({ color }) => <Icon name="file-document" size={28} color={color} />,
        }}
      />
    </Tabs>
  );
}
