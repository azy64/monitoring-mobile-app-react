import useGlobalStore, { endShift } from "@/components/store/useGlobalStore";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import { Animated, StyleSheet, View } from "react-native";
import { Avatar, Button, Chip, Text, Snackbar } from "react-native-paper";
import Snack from "./Snack";

const Main = () => {

    const logout = useGlobalStore(state=>state.logout);
    const user= useGlobalStore(state=>state.user);
    const shift= useGlobalStore(state=>state.shift);
    const token= useGlobalStore(state=>state.token);
    const error= useGlobalStore(state=>state.error);
    const updateError= useGlobalStore(state=>state.updateError);
    const router =useRouter();
    const outSide=()=>{
        endShift();
        console.log("shift:",shift);
        if(shift.around){
            logout(token,shift)
            router.navigate("/auth");
        }
        else alert("Please scan at least one Control Point before log out !")
        
    }
    return (
        <View>
            <Animated.View>
                <View style={styles.header}>
                    <Avatar.Icon size={50} style={styles.avatar} icon="account" />
                    <Text style={{ textAlign: "center" }}>{user.phoneNumber?user.phoneNumber:"Unknown user"}</Text>
                    <Chip icon="clipboard-text-clock" onPress={() => console.log('Pressed')}>
                        <Text style={{ textAlign: "center",fontWeight:"bold" }}>{shift?shift.shiftStartTime.toLocaleString():""}</Text>
                    </Chip>
                </View>
                <View style={styles.header}>
                    <View style={styles.block}>
                    <Button
                        mode="contained"
                        onPress={()=>router.navigate("/scanner")}
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
                        onPress={()=>router.navigate("/view")}
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
            {error.checkPointError && 
                    <Snackbar
                    visible={error.checkPointError}
                    onDismiss={()=>{updateError({})}}
                    action={{
                        label: 'close',
                        onPress: () => {
                           updateError({})
                        },
                    }}>
                   Something wrong happened! we did'nt save your scan, please repeat it again
                </Snackbar>
                }
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