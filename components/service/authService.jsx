import CONSTANTS from "@/constants/constants";

const loginUser=(username,password,callBack)=>{
    let requestHeader = new Headers();
    requestHeader.set("Content-Type","application/json");
    fetch(CONSTANTS.AUTH_LOGIN,{
        method: "POST",
        body: JSON.stringify({username,password}),
        headers:requestHeader
    })
    .then(result=>{
        //console.log("resultat:",result);
        return result.json();
    })
    .then(data=>{
        //console.log("data reading:",data.user)
        callBack(data);
    })
    . catch((error) =>{
        console.log("something wrong happened:",error);
    });
}

export const saveShift=(token,shift)=>{
    let requestHeader = new Headers();
    requestHeader.set("Content-Type","application/json");
    requestHeader.set("Authorization",`Bearer ${token}`);
    requestHeader.set("Access-Control-Allow-Origin","*");
    requestHeader.set("Accept","*");
    fetch(`${CONSTANTS.BASE_URL}${CONSTANTS.SHIFT_URL}`,{
        method: "POST",
        body: JSON.stringify(shift),
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

export const saveCheckPoint=(token,checkPoint,callBack)=>{
    //console.log("****payload*****:",payload);
    let requestHeader = new Headers();
    requestHeader.set("Content-Type","application/json");
    requestHeader.set("Authorization",`Bearer ${token}`);
    requestHeader.set("Access-Control-Allow-Origin","*");
    requestHeader.set("Accept","*");
    fetch(`${CONSTANTS.BASE_URL}${CONSTANTS.CHECK_POINT_URL}`,{
        method: "POST",
        body: JSON.stringify(checkPoint),
        headers:requestHeader
    })
    .then(result=>result.json())
    .then(data=>{
        console.log("checkpoint saved:",data.status)
        callBack(data);
    })
    . catch((error) =>{
        console.log("something wrong happened:",error);
    });
}
export default loginUser;
