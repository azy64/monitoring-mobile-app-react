import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Snack from "./Snack";

const CheckPointViewer = ({ title, subtitle, rightIcon,comment }) => {
    const [show,setShow] = useState(false);
    const click=()=>setShow(true);
    return(
        <TouchableOpacity style={styles.frame} onPress={click}>
        <Text style={styles.header}>{title}</Text>
        <Text style={styles.subTitle}>{subtitle}</Text>
        <Text>{rightIcon}</Text>
        {show&&<Snack message={comment}/>}
    </TouchableOpacity>
    )
}

const styles=StyleSheet.create({
    frame:{
        borderCurve:"continuous",
        boxShadow:"6px 0px 10px rgba(190,190,190,.8)",
        width:"95%",
        margin:"auto",
        marginBottom:7,
        marginTop:6,
        overflowY:"scroll",
        padding:5
    },
    header:{
        fontWeight:"bold",
        fontSize:17,
        textAlign:"left"
    },
    subTitle:{
        fontSize:11,
        textAlign:"left"
    }
});
export default CheckPointViewer;