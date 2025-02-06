import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const InputText = ({ 
  placeholder, 
  value, 
  onChangeText, 
  icon, 
  secureTextEntry = false, 
  style 
}) => {
  return (
    <View style={[styles.inputContainer, style]}>
      {icon && <Icon name={icon} size={20} color="#555" style={styles.icon} />}
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        placeholderTextColor="#888"
      />
    </View>
  );
};

const styles = StyleSheet.create({
//   container: {
//     flexDirection: "row",
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     paddingVertical: 8,
//     backgroundColor: "#fff",
//   },
  icon: {
    marginRight: 10,
  },
  inputContainer: { flexDirection: "row", alignItems: "center", backgroundColor: "#fff", padding: 12, borderRadius: 8, marginTop: 10 },
  input: { flex: 1, marginLeft: 10, fontSize: 16 },
});

export default InputText;