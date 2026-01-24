import { axiosClient } from "@/services/GlobalApi";
import { useEffect, useRef, useState } from "react";
import {
    FlatList,
    View,
    Image,
    Dimensions,
    StyleSheet,
} from "react-native";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = width * 0.88;
const SPACING = 16;

type SliderType = {
    name: string;
    image: { url: string };
};

export default function Sliders() {
    const [slidersData, setSlidersData] = useState<SliderType[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const flatListRef = useRef<FlatList>(null);

    const GetSliders = async () => {
        try {
            const response = await axiosClient.get("/sliders?populate=*");
            setSlidersData(response.data?.data || []);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        GetSliders();
    }, []);

    const onScrollEnd = (event: any) => {
        const index = Math.round(
            event.nativeEvent.contentOffset.x / (ITEM_WIDTH + SPACING)
        );
        setActiveIndex(index);
    };

    return (
        <View style={styles.container}>
            <FlatList
                ref={flatListRef}
                data={slidersData}
                horizontal
                showsHorizontalScrollIndicator={false}
                snapToInterval={ITEM_WIDTH + SPACING}
                decelerationRate="fast"
                contentContainerStyle={{ paddingHorizontal: SPACING }}
                onMomentumScrollEnd={onScrollEnd}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Image
                            source={{ uri: item?.image?.url }}
                            style={styles.image}
                        />
                    </View>
                )}
            />

            {/* Pagination dots */}
            <View style={styles.dotsContainer}>
                {slidersData.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.dot,
                            activeIndex === index && styles.activeDot,
                        ]}
                    />
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
    },
    card: {
        width: ITEM_WIDTH,
        height: 200,
        marginRight: SPACING,
        borderRadius: 20,
        overflow: "hidden",
        backgroundColor: "#fff",
        elevation: 5, // Android shadow
        shadowColor: "#000", // iOS shadow
        shadowOpacity: 0.15,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
    },
    image: {
        width: "100%",
        height: "100%",
    },
    dotsContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 12,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#ccc",
        marginHorizontal: 4,
    },
    activeDot: {
        backgroundColor: "#000",
        width: 18,
    },
});
