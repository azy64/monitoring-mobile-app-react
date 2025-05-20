import base64 from 'react-native-base64';

const decodeMessage=(encryptedText)=>{
    const content = base64.decode(encryptedText);
    return content.split("==");
}

export const decodeQrCodeConten=(encryptedText)=>{
    const content = base64.decode(encryptedText);
    let clearMessage = content.split("==");
    if(clearMessage.length<4) return null;
    return clearMessage;
}
export default decodeMessage;