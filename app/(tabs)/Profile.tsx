import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
} from "react-native";
import React from "react";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

export default function Profile() {
    const { user } = useUser();
    const { signOut } = useAuth();
    const router = useRouter();

    const name =
        user?.fullName ||
        [user?.firstName, user?.lastName].filter(Boolean).join(" ");

    const email = user?.primaryEmailAddress?.emailAddress;
    const avatar = user?.imageUrl;

    const getInitials = () => {
        if (!name) return "";
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase();
    };

    const handleLogout = async () => {
        await signOut();
        router.replace("/");
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                {avatar ? (
                    <Image source={{ uri: avatar }} style={styles.avatar} />
                ) : (
                    <View style={styles.avatarFallback}>
                        <Text style={styles.initials}>{getInitials()}</Text>
                    </View>
                )}
                <Text style={styles.name}>{name || "User"}</Text>
                <Text style={styles.email}>{email}</Text>
            </View>

            {/* Info Card */}
            <View style={styles.card}>
                <View style={styles.row}>
                    <Text style={styles.label}>Full Name</Text>
                    <Text style={styles.value}>{name}</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Email</Text>
                    <Text style={styles.value}>{email}</Text>
                </View>
            </View>

            {/* Logout */}
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9FAFB",
        paddingHorizontal: 20,
    },
    header: {
        alignItems: "center",
        marginTop: 40,
        marginBottom: 30,
    },
    avatar: {
        width: 110,
        height: 110,
        borderRadius: 55,
        marginBottom: 12,
    },
    avatarFallback: {
        width: 110,
        height: 110,
        borderRadius: 55,
        backgroundColor: "#4F46E5",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 12,
    },
    initials: {
        color: "#fff",
        fontSize: 36,
        fontWeight: "700",
    },
    name: {
        fontSize: 22,
        fontWeight: "600",
        marginTop: 6,
    },
    email: {
        fontSize: 14,
        color: "#6B7280",
        marginTop: 4,
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 14,
        padding: 18,
        marginBottom: 40,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
    },
    row: {
        marginBottom: 14,
    },
    label: {
        fontSize: 13,
        color: "#6B7280",
        marginBottom: 4,
    },
    value: {
        fontSize: 16,
        fontWeight: "500",
    },
    logoutButton: {
        backgroundColor: "#EF4444",
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: "center",
    },
    logoutText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
});
