import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Snackbar } from 'react-native-paper';

const Snack = ({message}) => {
    const [visible, setVisible] = React.useState(true);

    const onToggleSnackBar = () => setVisible(!visible);

    const onDismissSnackBar = () => setVisible(false);

    return (
        <View style={styles.container}>
           {/** <Button onPress={onToggleSnackBar}>{visible ? 'Hide' : 'Show'}</Button>*/}
            <Snackbar
                visible={visible}
                onDismiss={onDismissSnackBar}
                action={{
                    label: 'close',
                    onPress: () => {
                        // Do something
                    },
                }}>
                {message}
            </Snackbar>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
});

export default Snack;