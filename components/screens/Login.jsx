import Loader from "@/components/screens/Loader";
import { Colors } from "@/constants/Colors";
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Dimensions, StyleSheet, View } from "react-native";
import { Avatar, Button, Divider, Snackbar, TextInput } from 'react-native-paper';
import useGlobalStore from '../store/useGlobalStore';


const Login = () => {
    const { control, handleSubmit } = useForm();
    const emailInput = useRef(null);
    const passwordInput = useRef(null);
    const [secureText, setSecureText] = useState(true);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const width = Dimensions.get("window").width;
    const [visible, setVisible] = useState(false);
    const router = useRouter();
    const loading = useGlobalStore(state => state.loading);
    const login = useGlobalStore(state => state.login);
    const user = useGlobalStore(state => state.user);
    const updateLabel= useGlobalStore(state=>state.updateLabel);
    const updateShift = useGlobalStore(state=>state.updateShift);
    const updateCheckPoint = useGlobalStore(state=>state.updateCheckPoint);
    const updateError = useGlobalStore(state=>state.updateError);

    const onDismissSnackBar = () => setVisible(false);

    const onSubmit = (data) => {
        if (email && password) {
            login({ username: email, password });
            if (user && user.phoneNumber) {
                shiftCreationDate= new Date();
                const shift={agent:{id:user.id}, 
                shiftStartTime:shiftCreationDate, 
                shiftDate:shiftCreationDate,
                shiftEndTime:null,
                around:null
            }
                console.log("shift:",shift);
                updateShift(shift);
                updateLabel("");
                updateCheckPoint([]);
                updateError({})
                router.navigate("/main");
                
            }
        }
        else setVisible(true);


    };
    const tongleVisibleText = () => {
        setSecureText(!secureText);
        console.log("clicked: ", secureText);
    }
    return (
        <View style={styles.container}>
            <View style={{ width: (width - (width / 10)), margin: "auto" }}>
                <Avatar.Image size={144} source={require('../../assets/images/logo.png')} style={styles.avatar} />
                {/** * <Text style={styles.title} variant="displayLarge">Sign In</Text>**/}
                {loading && <Loader />}
                <TextInput
                    ref={emailInput}
                    control={control}
                    name="email"
                    label="Email"
                    right={<TextInput.Icon icon="mail" />}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="next"
                    onSubmitEditing={() => passwordInput.current.focus()}
                    style={styles.input}
                    placeholder="Email"
                    onChangeText={(email) => setEmail(email)}
                />
                <TextInput
                    ref={passwordInput}
                    control={control}
                    name="password"
                    label="Password"
                    secureTextEntry={secureText}
                    right={<TextInput.Icon icon="eye" onPress={tongleVisibleText} />}
                    returnKeyType="go"
                    onSubmitEditing={handleSubmit(onSubmit)}
                    style={styles.input}
                    placeholder="Password"
                    onChangeText={(password) => setPassword(password)}
                />
                <Button
                    mode="contained"
                    onPress={handleSubmit(onSubmit)}
                    style={styles.button}
                    icon="login"
                >
                    Login
                </Button>
                <Divider />

            </View>
            <Snackbar
                visible={visible}
                onDismiss={onDismissSnackBar}
                action={{
                    label: 'Undo',
                    onPress: () => {
                        // Do something
                    },
                }}>
                Fill all the field and submit
            </Snackbar>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    input: {
        marginVertical: 10,
    },
    button: {
        marginVertical: 20,
        borderRadius: 10,
        fontWeight: 15,
        backgroundColor: Colors.tunawezaBlue.hexa,
    },
    title: {
        marginVertical: 20,
        textAlign: "center",
        fontSize: 23,
        fontWeight: "bold",
    },
    avatar: {
        margin: "auto", color: "transparent",
        backgroundColor: "transparent",
    }
});

export default Login;