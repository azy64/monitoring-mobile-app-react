import { Colors } from "@/constants/Colors";
import { Animated, StyleSheet, View } from "react-native";
import { Avatar, Button, Text } from "react-native-paper";
import useGlobalStore from "@/components/store/useGlobalStore";
import { useRouter } from "expo-router";

const Main = () => {

    const logout = useGlobalStore(state=>state.logout);
    const router =useRouter();
    const outSide=()=>{
        logout()
        router.navigate("/auth");

    }
    return (
        <View>
            <Animated.View>
                <View style={styles.header}>
                    <Avatar.Icon size={50} style={styles.avatar} icon="account" />
                    <Text style={{ textAlign: "center" }}>Agent Jean</Text>
                </View>
                <View style={styles.header}>
                    <View style={styles.block}>
                    <Button
                        mode="contained"
                        onPress
                        style={styles.button}
                        icon="qrcode-scan"
                        size="30"
                    >
                        <Text style={styles.text} variant="headlineSmall">SCAN THE CP</Text>
                    </Button>
                    </View>
                    <View style={styles.block}>
                    <Button
                        mode="contained"
                        onPress
                        style={styles.button}
                        icon="view-list"
                    >
                       <Text style={styles.text} variant="headlineSmall">VIEW SCANNED CP</Text>
                    </Button>
                    </View>
                    <View style={styles.block}>
                    <Button
                        mode="contained"
                        onPress={outSide}
                        style={styles.button}
                        icon="logout-variant"
                    >
                        <Text style={styles.text} variant="headlineSmall">LOG  OUT</Text>
                    </Button>
                    </View>
                </View>

            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        margin: "auto",
        width: "90%"
    },
    avatar: {
        margin: "auto", color: "transparent",
        backgroundColor: Colors.tunawezaBlue.hexa,
        marginTop: 100
    },
    button:{
        backgroundColor: Colors.tunawezaBlue.hexa,
        fontSize:35,
        height:60,
        marginTop:"15%",
        lineHeight:50,
    },
    block:{
        minHeight:100,
        width:"90%",
        margin:"auto",
        verticalAlign:"middle",
        marginBottom:10
    },
    text:{
        color:"white",
    }

});

export default Main;