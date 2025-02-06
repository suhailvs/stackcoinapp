import { useState } from 'react';
import { StyleSheet, View, Text } from "react-native";
import InputText from "@/components/InputText";
import Button from "@/components/Button";
import ErrorMessage from "@/components/ErrorMessage";
import { useSession } from "@/login_extras/ctx";

export default function Login() {
  const { signIn } = useSession();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    
    setError("");  // Clear previous errors
    setLoading(true);
    
    try {
      const userData = await signIn(username, password);      
    } catch (err) {
      setError(err.message); // Show error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
       
      <InputText
        placeholder="Enter your username"
        icon="account"
        onChangeText={setUsername}
      />
      <InputText
        placeholder="Enter your password"
        icon="key-outline"
        onChangeText={setPassword}
        secureTextEntry
      />
      
      <ErrorMessage message={error} onClose={() => setError("")} />
      <Button title="Login" onPress={handleLogin} isLoading={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5", padding: 20, justifyContent:"center" },  
  error: { color: "red", marginBottom: 10 },
});
