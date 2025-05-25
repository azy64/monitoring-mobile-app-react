import base64 from 'react-native-base64';

const decodeMessage=(encryptedText)=>{
    let content= null;
    try{
        content = base64.decode(encryptedText);
    }
    catch(error){
        return null
    }
    
    if(!content.includes("==")) return null
    return content.split("==");
}

export const decodeQrCodeConten=(encryptedText)=>{
    let content=null;
    try{
        content = base64.decode(encryptedText);
    }
    catch(error){
        return null;
    }
    
    if(!content.includes("==")) return null
    let clearMessage = content.split("==");
    if(clearMessage.length<4) return null;
    return clearMessage;
}
export default decodeMessage;