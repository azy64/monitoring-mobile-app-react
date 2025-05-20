import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import TunawezaDialog from '@/components/screens/TunawezaDialog';
import decodeMessage from '@/components/service/utilitiesService';
import useGlobalStore from '../store/useGlobalStore';
import Snack from '@/components/screens/Snack';
import { State } from 'react-native-gesture-handler';

export default function Scanner() {
    const [facing, setFacing] = useState("back");
    const [permission, requestPermission] = useCameraPermissions();
    const [show, setShow] = useState(false);
    const [showSnack, setShowSnack] = useState(false);
    const router = useRouter();
    const updateControlPoint = useGlobalStore(state => state.updateControlPoint);
    const updateAround = useGlobalStore(state => state.around);
    const currentLabel = useGlobalStore(state => state.currentLabel);

    if (!permission) {
        // Camera permissions are still loading.
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
            <View style={styles.container}>
                <Text style={styles.message}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }

    const process = (data) => {
        const information = decodeMessage(data);
        if (information[1] !== currentLabel) {
            updateAround(information[0]);
            updateControlPoint(information[3]);
            console.log("data:", information);
            setShow(true)
        }
        else setShowSnack(true);

        //router.back();
    }

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    return (
        <View style={styles.container}>
            {show ? <TunawezaDialog /> :
                <CameraView style={styles.camera} facing={facing}
                    barcodeScannerSettings={{ barcodeTypes: ["qr"], }}
                    onBarcodeScanned={(barcodeScannedResult) => process(barcodeScannedResult.data)}
                >
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                            <Text style={styles.text}>Flip Camera</Text>
                        </TouchableOpacity>
                    </View>
                </CameraView>
            }
            {showSnack&&<Snack message={"You have already scanned this Qr"}/>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64,
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
});
