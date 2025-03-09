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
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [rate, setRate] = useState("");
  const [image, setSelectedImage] = useState(null);
  const [loadingdescription, setLoadingDescription] = useState(false);
  const [showDescription, setShowDescription] = useState(false);  
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { ltype } = useLocalSearchParams();
  const categories = ['Electronics',''];
  // Handle Form Submission
  const handleSubmit = async () => {
    if (!category || !title || !description || !rate || !image) {
      alert("Please fill all fields.");
      return;
    }
    setError("");
    setLoading(true);

    let formData = new FormData();
    formData.append("image", {uri: image,name: "upload.jpg",type: "image/jpeg"});
    formData.append("category", category);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("rate", rate);
    formData.append("listing_type", ltype);
    try {
      const response = await api.post('/listings/',formData,{headers: { "Content-Type": "multipart/form-data" }});
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
    setLoadingDescription(true);
    let url = "https://shihas.stackschools.com/ajax/stackcoinai/"; 
    try {
      // const response = await axios.get(`${url}?details=${title}`);
      const response = await {data: 'This is a Dummy description for testing purpose'};
      setDescription(response.data);
      setShowDescription(true);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoadingDescription(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Add a New {ltype==='O'? 'Offering':'Want'}</Text>
      <Dropdown style={styles.input} onChange={setCategory} label="Category" items={categories} />
      {/* Title Input */}
      <TextInput style={styles.input} placeholder="Title" value={title} onChangeText={setTitle} />

      {showDescription ? (
        <View>
          {/* Description TextArea */}
          <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Description"
              value={description}
              onChangeText={setDescription}
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
      ) : (<Button title="Generate description from title" onPress={handleGenerateDetail} isLoading={loadingdescription} />)}

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