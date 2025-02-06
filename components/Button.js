import React from "react";
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Button = ({ 
  title, 
  onPress, 
  icon, 
  isLoading = false, 
  disabled = false, 
  style, 
  textStyle 
}) => {
  return (
    <TouchableOpacity 
      style={[styles.button, disabled && styles.disabled, style]} 
      onPress={onPress} 
      disabled={disabled || isLoading}
      activeOpacity={0.7}
    >
      {isLoading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <>
          {icon && <Icon name={icon} size={20} color="#fff" style={styles.icon} />}
          <Text style={[styles.text, textStyle]}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF9900",
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  disabled: {
    backgroundColor: "#ccc",
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  icon: {
    marginRight: 8,
  },
});
export default Button;