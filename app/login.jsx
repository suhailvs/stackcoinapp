import { Button, StyleSheet, TextInput } from "react-native";
import { Text, View } from "@/components/Themed";
import { useSession } from "@/login_extras/ctx";

import { useState } from 'react';

export default function Login() {
  const { signIn } = useSession();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    signIn(username, password);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to StackCoin! 🌈 </Text>
      <Text style={styles.paragraph}>
      There are many ways of exchanging what we have and 
      can do for the things we need. 'Money' is just one 
      of them. The internet revolution has brought us new 
      ways of exchanging things, without the unnecessary 
      step of acquiring money first.
      </Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <TextInput onChangeText={setUsername} placeholder="Username" style={styles.input} />
      <TextInput
        onChangeText={setPassword} 
        placeholder="Password"
        secureTextEntry
        style={styles.input}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: "center",
  },

  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  input: {
    width: "80%",
    borderWidth: 1,
    borderColor: "#000",
    padding: 10,
    margin: 10,
    borderRadius: 4,
  },
});
