import * as React from 'react';
import { View } from 'react-native';
import { Button, Dialog, Portal, PaperProvider, Text } from 'react-native-paper';
import Selection from "@/components/screens/Selection";
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import useGlobalStore from '../store/useGlobalStore';
import { State } from 'react-native-gesture-handler';

const TunawezaDialog = () => {
    const [visible, setVisible] = React.useState(false);
    const [selectValue, setSelectValue] = React.useState("");
    const checkPoints = useGlobalStore(State => State.checkPoints);
    const updateCheckPoint = useGlobalStore(state => state.updateCheckPoint);
    const currentLabel = useGlobalStore(state => state.currentLabel);
    const user = useGlobalStore(state => state.user);
    const controlPoint = useGlobalStore(state => state.controlPoint);
    const createCheckPoint = useGlobalStore(state=>state.createCheckPoint)
    const token = useGlobalStore(state=>state.token);
    const router = useRouter();

    const done = () => {
        const checkPoint = {
            checkedDate: new Date(),label:currentLabel[currentLabel.length-1],
            commentString: selectValue, checkedPresence: true, agent: { id: user.id }, controlPoint
        }
        updateCheckPoint([...checkPoints, checkPoint]);
        const checkPointChanged={checkedDate: new Date(),commentString: selectValue, checkedPresence: true,
            agent: { id: user.id }, controlPoint}
        console.log("saving:",checkPointChanged);
        createCheckPoint(token,checkPointChanged);
        alert("checkpoint saved!")
        router.back();
    }
    const showDialog = () => setVisible(true);

    const hideDialog = () => setVisible(false);
    const sinistre = ["Fusiaide", "Meutre", "Degat des eaux"];

    return (
        <PaperProvider>
            <View>
                <Button onPress={showDialog}>Show Dialog</Button>
                <Text style={{ textAlign: "center", fontWeight: "bold" }}> Select a sinister as a comment</Text>
                <Selection items={sinistre} setValue={setSelectValue} />
                <Button style={{ backgroundColor: Colors.tunawezaRed.hexa }} onPress={done}>Done</Button>
                <Portal>
                    <Dialog visible={visible} onDismiss={hideDialog}>
                        <Dialog.Title>Alert</Dialog.Title>
                        <Dialog.Content>
                            <Text variant="bodyMedium">This is simple dialog</Text>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={hideDialog}>Done</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </View>
        </PaperProvider>
    );
};

export default TunawezaDialog;