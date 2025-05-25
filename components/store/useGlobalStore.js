import loginUser, { saveCheckPoint, saveShift } from "@/components/service/authService";
import CONSTANTS from "@/constants/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const initValue ={agent:null,around:null,shiftDate:null,shiftStartTime:null,shiftEndTime:null};
const useGlobalStore= create(persist((set)=>({
    token:null,
    refreshToken:null,
    shift:initValue,
    error:{},
    controlPoint:{},
    around:{},
    currentLabel:[],
    checkPoints:[],
    sinister:"",
    user:{},
    loading:false,
    isAuthenticated:false,
    controlPoints:[],
    login(user){
        set({loading:true});
        loginUser(user.username,user.password,setUser);
    },
    updateShift(data){
        set((state)=>({...state,shift:data}));
    },
    logout(token, shift){
        //endShift();
        saveShift(token,shift);
        logOutOf();
    },
    setSinister(value){
        set({sinister:value});
    },
    updateCheckPoint(newValue){
        set({checkPoints:newValue});
    },
    updateControlPoint(value){
        set({controlPoint:{id:value}});
    },
    updateAround(value){
        set({around:{id:value}});
    },
    updateLabel(value){
        set({currentLabel:value});
    },
    createCheckPoint(token,payload){
        saveCheckPoint(token,payload,checkPointCallBack);
    },
    updateError(value){
        set({error:value});
    },

}),{name:CONSTANTS.STORE_NAME, storage: createJSONStorage(() =>  AsyncStorage),}))

const setUser=(data)=>{
    useGlobalStore.setState((state)=>({
        ...state,
        user:data.user,isAuthenticated:true,loading:false,
        token:data.access_token,refreshToken:data.refresh_token
    }
    ))
}
export const endShift=()=>{
    useGlobalStore.setState((state)=>({
        ...state, shift:{...state.shift,shiftEndTime:new Date(),around:state.around}
    }))
}
const logOutOf=()=>{
    //console.log("****State before deconnect:****", useGlobalStore.getState())
    useGlobalStore.persist.clearStorage();
    //console.log("***Deconnect:***", useGlobalStore.getState())
}
const checkPointCallBack=(data)=>{
    if(!data.id){
        useGlobalStore.setState((state)=>({
            ...state, error:{checkPointError:500},
            checkPoints:[...state.checkPoints].slice(0,state.checkPoints.length-1),
            currentLabel:[...state.currentLabel].slice(0,state.currentLabel.length-1)
        }))
    }
}
export default useGlobalStore;