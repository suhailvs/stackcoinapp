import { StyleSheet, Appearance, Platform, SafeAreaView, TouchableOpacity, ActivityIndicator, ScrollView, FlatList, View, Text, Image } from "react-native";
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { AntDesign } from "@expo/vector-icons";
import { Colors } from '@/constants/Colors';
import api from '@/constants/api'
import globalStyles from "@/components/Styles"; 

export default function Listings({ltype}) {
    
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter(); // Use Expo Router for navigation
    const colorScheme = Appearance.getColorScheme()
    const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;
    const styles = createStyles(theme, colorScheme)
    const Container = Platform.OS === 'web' ? ScrollView : SafeAreaView;
    const separatorComp = <View style={styles.separator} />
    const headerComp = <Text style={globalStyles.title}>All {ltype==='O'? 'Offerings':'Wants'}</Text>
    const footerComp = <Text style={{ color: theme.text }}>End of Menu</Text>


    useEffect(() => {
        fetchData();
    }, []);
    
    const fetchData = async () => {
        try {
            const response = await api.get(`/listings/?type=${ltype}`);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };
    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.row} onPress={() => {
            router.push({ pathname: 'screens/offering_details', params:{'id':item.id, 'category':item.category} })
            }
        }>            
            <View style={styles.menuTextRow}>
                <Text style={[styles.menuItemTitle, styles.menuItemText]}>{item.category}</Text>
                <Text style={styles.menuItemText}>{item.heading}</Text>
            </View>
            <Image
                source={{uri: item.img}}
                style={styles.menuImage}
            />            
        </TouchableOpacity>
    );
    return (
        <Container style={globalStyles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
            <FlatList
                data={data}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.contentContainer}
                ItemSeparatorComponent={separatorComp}
                ListHeaderComponent={headerComp}
                ListFooterComponent={footerComp}
                ListFooterComponentStyle={styles.footerComp}
                ListEmptyComponent={<Text>No items</Text>}
                renderItem={renderItem}
            />
           
            )}
             {/* Floating Add Button */}
             <TouchableOpacity style={styles.fab} onPress={() => {
                router.push({ pathname: 'screens/new_listing', params:{'ltype':ltype} })}}>
                <AntDesign name="plus" size={30} color="white" />
            </TouchableOpacity>
        </Container>
    )
}

function createStyles(theme, colorScheme) {
    return StyleSheet.create({
        container: {
            flex: 1,
            
          },
        contentContainer: {
            paddingTop: 10,
            paddingBottom: 20,
            paddingHorizontal: 12,
            backgroundColor: theme.background,
        },
        separator: {
            height: 1,
            backgroundColor: colorScheme === 'dark' ? 'papayawhip' : "#000",
            width: '50%',
            maxWidth: 300,
            marginHorizontal: 'auto',
            marginBottom: 10,
        },
        footerComp: {
            marginHorizontal: 'auto',
        },
        row: {
            flexDirection: 'row',
            width: '100%',
            maxWidth: 600,
            height: 100,
            marginBottom: 10,
            borderStyle: 'solid',
            borderColor: colorScheme === 'dark' ? 'papayawhip' : '#000',
            borderWidth: 1,
            borderRadius: 20,
            overflow: 'hidden',
            marginHorizontal: 'auto',
        },
        menuTextRow: {
            width: '65%',
            paddingTop: 10,
            paddingLeft: 10,
            paddingRight: 5,
            flexGrow: 1,
        },
        menuItemTitle: {
            fontSize: 18,
            textDecorationLine: 'underline',
        },
        menuItemText: {
            color: theme.text,
        },
        menuImage: {
            width: 100,
            height: 100,
        },
        fab: {
            position: "absolute",
            bottom: 20,
            right: 20,
            backgroundColor: "#007bff", // Blue color
            width: 60,
            height: 60,
            borderRadius: 30,
            justifyContent: "center",
            alignItems: "center",
            elevation: 5, // Shadow for Android
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 3,
          },
    })
}