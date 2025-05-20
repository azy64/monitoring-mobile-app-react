import loginUser, { saveShift } from "@/components/service/authService";
import CONSTANTS from "@/constants/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const initValue ={agent:null,around:null,shiftDate:null,shiftStartTime:null,shiftEndTime:null};
const useGlobalStore= create(persist((set)=>({
    token:null,
    refreshToken:null,
    shift:initValue,
    controlPoint:{},
    around:{},
    currentLabel:"",
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
    logout(){
        endShift();
        //saveShift(token,shift);
        logOutOf();
    },
    setSinister(value){
        set({sinister:value});
    },
    updateCheckPoint(newValue){
        set({checkPoints:newValue});
    },
    updateConrolPoint(value){
        set({controlPoint:{id:value}});
    },
    updateAround(value){
        set({Around:{id:value}});
    },
    updateLabel(value){
        set({currentLabel:value});
    }

}),{name:CONSTANTS.STORE_NAME, storage: createJSONStorage(() =>  AsyncStorage),}))

const setUser=(data)=>{
    useGlobalStore.setState((state)=>({
        ...state,
        user:data.user,isAuthenticated:true,loading:false,
        token:data.access_token,refreshToken:data.refresh_token
    }
    ))
}
const endShift=()=>{
    useGlobalStore.setState((state)=>({
        ...state, shift:{...state.shift,shiftEndTime:new Date(),around:state.around}
    }))
}
const logOutOf=()=>{
    useGlobalStore.persist.clearStorage();
}
export default useGlobalStore;