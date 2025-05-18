import CONSTANTS from "@/constants/constants";

function loginUser(username,password,callBack){
    let requestHeader = new Headers();
    requestHeader.set("Content-Type","application/json");
    fetch(CONSTANTS.AUTH_LOGIN,{
        method: "POST",
        body: JSON.stringify({username,password}),
        headers:requestHeader
    })
    .then(result=>result.json())
    .then(data=>{
        console.log(data)
        callBack(data);
    })
    . catch((error) =>{
        console.log(error);
    });
}
export default loginUser;
