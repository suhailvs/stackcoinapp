import { useState } from "react";
import { View, Text, TextInput, ScrollView, StyleSheet } from "react-native";
import Button from "@/components/Button";
import ImagePickerComponent from "@/components/ImagePickerComponent";
import Dropdown from "@/components/Dropdown";
import { useLocalSearchParams, useRouter } from 'expo-router';
import axios from "axios";
import api from '@/constants/api'
import ErrorMessage from "@/components/ErrorMessage";

const AddListingScreen = () => {

  const router = useRouter();
  const [category, setCategory] = useState(null);
  const [heading, setHeading] = useState("");
  const [detail, setDetails] = useState("");
  const [rate, setRate] = useState("");
  const [image, setSelectedImage] = useState(null);
  const [loadingdetails, setLoadingDetails] = useState(false);
  const [showDetails, setShowDetails] = useState(false);  
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { ltype } = useLocalSearchParams();
  const categories = ['Electronics',''];
  // Handle Form Submission
  const handleSubmit = async () => {
    if (!category || !heading || !detail || !rate || !image) {
      alert("Please fill all fields.");
      return;
    }
    setError("");
    setLoading(true);

    let formData = new FormData();
    formData.append("img", {uri: image,name: "upload.jpg",type: "image/jpeg"});
    formData.append("category", category);
    formData.append("heading", heading);
    formData.append("detail", detail);
    formData.append("rate", rate);
    formData.append("listing_type", ltype);
    try {
      const response = await api.post('/api/v1/listings/',formData,{headers: { "Content-Type": "multipart/form-data" }});
      router.replace({ pathname: '/'});
    } catch (error) {
      if (error.response) {
        setError(JSON.stringify(error.response.data)|| "Invalid response");
      } else if (error.request) {
        setError("Network error. Please try again.");
      } else {
        console.log(error)
        setError("Something went wrong. Please try again.");
      }      
    } finally {
      setLoading(false);      
    }    
  };

  const handleGenerateDetail = async () => {
    setLoadingDetails(true);
    let url = "https://shihas.stackschools.com/ajax/stackcoinai/"; 
    try {
      // const response = await axios.get(`${url}?details=${heading}`);
      const response = await {data: 'This is a Dummy detail for testing purpose'};
      setDetails(response.data);
      setShowDetails(true);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoadingDetails(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Add a New {ltype==='O'? 'Offering':'Want'}</Text>
      <Dropdown style={styles.input} onChange={setCategory} label="Category" items={categories} />
      {/* Heading Input */}
      <TextInput style={styles.input} placeholder="Heading" value={heading} onChangeText={setHeading} />

      {showDetails ? (
        <View>
          {/* Details TextArea */}
          <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Details"
              value={detail}
              onChangeText={setDetails}
              multiline
          />
          {/* Rate Input */}
          <TextInput style={styles.input} placeholder="Rate" value={rate} onChangeText={setRate} />  

          {/* Show Camera View */}
          <ImagePickerComponent onImageSelected={setSelectedImage} />
          
          {/* Submit Button */}
          <ErrorMessage message={error} onClose={() => setError("")} />
          <Button title="Add Listing" style={styles.submitButton} onPress={handleSubmit} isLoading={loading} />
        </View>        
      ) : (<Button title="Generate detail from heading" onPress={handleGenerateDetail} isLoading={loadingdetails} />)}

      {/* These 3 text boxes are to add some margin Bottom */}
      <Text></Text>
      <Text></Text>
      <Text></Text>
    </ScrollView>
  );
};

export default AddListingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f4f4f4",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    fontSize: 16,
  },
  textArea: {
    height: 380,
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: "#28a745",
    padding: 14
  },
});