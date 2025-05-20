import CONSTANTS from "@/constants/constants";

const loginUser=(username,password,callBack)=>{
    let requestHeader = new Headers();
    requestHeader.set("Content-Type","application/json");
    console.log("trying connection... with:",CONSTANTS.AUTH_LOGIN);
    fetch(CONSTANTS.AUTH_LOGIN,{
        method: "POST",
        body: JSON.stringify({username,password}),
        headers:requestHeader
    })
    .then(result=>{
        console.log("resultat:",result);
        return result.json();
    })
    .then(data=>{
        console.log("data reading:",data.user)
        callBack(data);
    })
    . catch((error) =>{
        console.log("something wrong happened:",error);
    });
}

export const saveShift=(token,payload)=>{
    let requestHeader = new Headers();
    requestHeader.set("Content-Type","application/json");
    requestHeader.set("Authorization",`Bearer ${token}`);
    fetch(`${CONSTANTS.BASE_URL}${CONSTANTS.SHIFT_URL}`,{
        method: "POST",
        body: JSON.stringify({payload}),
        headers:requestHeader
    })
    .then(result=>result.json())
    .then(data=>{
        console.log("shift saved:",data)
    })
    . catch((error) =>{
        console.log("something wrong happened:",error);
    });
}
export default loginUser;
