import * as React from 'react';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import { Colors } from "@/constants/Colors";

const Loader = () => (
        <ActivityIndicator size={60} animating={true} color={Colors.tunawezaBlue.hexa} />
);

export default Loader;