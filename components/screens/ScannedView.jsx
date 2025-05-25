import CheckPointViewer from "@/components/screens/CheckPointViewer";
import { Dimensions, ScrollView } from "react-native";
import useGlobalStore from "../store/useGlobalStore";

const ScannedView=()=>{
    const checkPoints = useGlobalStore(state=>state.checkPoints);
    const height= Dimensions.get("window").height;
    return(
        <ScrollView style={{height:height,border:"1px solid red"}} >
            {
                checkPoints.map((item,index)=>(<CheckPointViewer title={item.label||"My title"} key={item.checkedDate}
                    subtitle={(index+1)+". "+item.checkedDate.toLocaleString()}
                    comment={item.commentString}
                    rightIcon={<></>}
                    />))
            }
            </ScrollView>
    );
}
export default ScannedView;