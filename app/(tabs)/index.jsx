import { StyleSheet, Appearance, Platform, SafeAreaView, TouchableOpacity, ActivityIndicator, ScrollView, FlatList, View, Text, Image } from "react-native";
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';

import { Colors } from '@/constants/Colors';
import MENU_IMAGES from '@/constants/MenuImages'
import api from '@/constants/api'

export default function OfferingScreen() {
    
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter(); // Use Expo Router for navigation
    const colorScheme = Appearance.getColorScheme()
    const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;
    const styles = createStyles(theme, colorScheme)
    const Container = Platform.OS === 'web' ? ScrollView : SafeAreaView;
    const separatorComp = <View style={styles.separator} />
    const headerComp = <Text style={{ margin:10, fontSize:24 }}>All Offerings</Text>
    const footerComp = <Text style={{ color: theme.text }}>End of Menu</Text>


    useEffect(() => {
        fetchData();
    }, []);
    
    const fetchData = async () => {
        try {
            const response = await api.get('/api/v1/listings/');
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
                source={MENU_IMAGES[item.id - 1]}
                style={styles.menuImage}
            />            
        </TouchableOpacity>
    );
    return (
        <Container>
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
        </Container>
    )
}

function createStyles(theme, colorScheme) {
    return StyleSheet.create({
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
        }
    })
}