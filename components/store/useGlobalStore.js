import CONSTANTS from "@/constants/constants";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import loginUser from "@/components/service/auth";

const useGlobalStore= create(persist((set)=>({
    token:null,
    refreshToken:null,
    user:{},
    loading:false,
    isAuthenticated:false,
    controlPoint:[],
    login(user){
        console.log("login process start...!")
        set({loading:true});
        loginUser(user.username,user.password,setUser);
    },
    logout(){
        set({
            user:{},token:null, refreshToken:null,isAuthenticated:false,controlPoint:[]
        })
    }

}),{name:CONSTANTS.STORE_NAME}))

const setUser=(data)=>{
    useGlobalStore.setState((state)=>({
        user:data.user,isAuthenticated:true,loading:false,
        token:data.access_token,refreshToken:data.refresh_token
    }
    ))
}
export default useGlobalStore;