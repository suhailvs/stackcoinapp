import { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, Linking} from "react-native";
import { useRouter, useLocalSearchParams } from 'expo-router';
import SkeletonLoader from "@/components/SkeletonLoader";

import api from '@/constants/api'
import Markdown from 'react-native-markdown-display';
import { MaterialIcons } from "@expo/vector-icons"; // Call icon

const OfferingDetailPage = ( ) => {
  const [offering, setOffering] = useState([]);
  const [loading, setLoading] = useState(true);

  const { id, category } = useLocalSearchParams(); // Get passed data
  const router = useRouter();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
      try {
          const response = await api.get(`/listings/${id}/`);
          setOffering(response.data);
      } catch (error) {
          console.error('Error fetching data:', error);
      } finally {
          setLoading(false);
      }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    }).format(date);
  };
  
  const handleAddToCart = () => {
    // Add to cart logic
    alert("Work in progress!");
  };

  const handleBuyNow = () => {
    // Navigate to payment screen
    // navigation.navigate("Checkout", { offering });
    router.push({ pathname: 'screens/sendmoney/amount', params:{'id':offering.user.id, 'username':offering.user.username, 'first_name':offering.user.first_name} })
  };
  const handleCallPress = () => {
    Linking.openURL(`tel:${offering.user.username}`);
  };


  return (
    <ScrollView style={styles.container}>
      {loading ? (
        <View>
          <SkeletonLoader width={100} height={20} />
          <SkeletonLoader width={200} height={15} />
          <SkeletonLoader width={250} height={15} />
        </View>
      ) : (
        <View>
          {/* Product Title and Price */}
          <Text style={styles.productTitle}>{offering.title}</Text>
          <Text style={styles.productPrice}>₹{offering.rate}</Text>
          {/* Formatted Date */}
          <Text style={styles.dateLabel}>Added on: {formatDate(offering.created_at)}</Text>
          {/* Product Image   */}
          <View style={styles.imageContainer}>
            <Image source={{ uri: offering.image }} style={styles.productImage} />
          </View>
          
          {/* Product Description */}          
          <Markdown>{offering.description}</Markdown>

          {/* Reviews 
          <View style={styles.reviewsContainer}>
            <Icon name="star" size={20} color="#FF9900" />
            <Text style={styles.reviewsText}>{}</Text>
          </View>*/}

          {/* Advertiser Details */}
          <View>
            <Text style={styles.advertiserItem}>Advertiser Details:</Text>
            
            <Text style={styles.advertiserTitle}>{offering.user.first_name}</Text>
            <Text style={[offering.user.amount > 0 ? styles.positive : styles.negative]}>
              Balance: ₹{offering.user.balance} Rs
            </Text>
            <Text style={styles.advertiserDate}>Last login: {formatDate(offering.user.last_login)}</Text>
               

            <View style={styles.phoneView}>
              <Text style={styles.phoneLabel}>Contact Customer:</Text>
              <TouchableOpacity onPress={handleCallPress}  style={styles.phoneContainer}>
                <MaterialIcons name="phone" size={20} color="#fff" />
                <Text style={styles.phoneText}>{offering.user.username}</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* Add to Cart and Buy Now Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
              <Text style={styles.buttonText}>Add to Cart</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buyNowButton} onPress={handleBuyNow}>
              <Text style={styles.buttonText}>Buy Now</Text>
            </TouchableOpacity>
          </View>
          
          {/* These 3 text boxes are to add some margin Bottom */}
          <Text></Text>
          <Text></Text>
          <Text></Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  imageContainer: { alignItems: "center", marginBottom: 20 },
  productImage: { width: "100%", height: 300, borderRadius: 10 },
  productTitle: { fontSize: 24, fontWeight: "bold", color: "#232F3E", marginTop: 10, borderBottomWidth: 1, borderBottomColor: "#ddd"},
  productPrice: { fontSize: 20, color: "#FF9900", marginTop: 10 },
  dateLabel: {fontSize: 16,fontWeight: "bold",color: "gray",marginRight: 5,},
  reviewsContainer: { flexDirection: "row", alignItems: "center", marginTop: 15 },
  reviewsText: { fontSize: 16, color: "#555", marginLeft: 10 },
  buttonContainer: { marginTop: 20, flexDirection: "row", justifyContent: "space-between" },
  addToCartButton: { backgroundColor: "#232F3E", padding: 15, borderRadius: 8, width: "48%" },
  buyNowButton: { backgroundColor: "#FF9900", padding: 15, borderRadius: 8, width: "48%" },
  buttonText: { color: "#fff", fontSize: 16, textAlign: "center", fontWeight: "bold" },

  phoneView: {
    marginTop:10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#000", // Amazon Pay Black
    padding: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5, // For Android shadow
    color: "#fff",
  },
  phoneLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginRight: 10,
  },
  phoneContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  phoneText: {
    fontSize: 16,
    color: "#fff",
    marginLeft: 5,
    textDecorationLine: "underline",
  },

  advertiserItem: { fontSize: 20, borderBottomWidth: 1, borderBottomColor: "#ddd" },
  advertiserTitle: { fontSize: 16, fontWeight: "500" },
  
  advertiserDate: { fontSize: 12, color: "gray", marginTop: 2 },
  positive: { color: "green" },
  negative: { color: "red" },
});

export default OfferingDetailPage;