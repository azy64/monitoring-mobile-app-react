import {useState} from 'react';
//import { List } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';

const Selection = ({ items, setValue }) => {
    //const [expanded, setExpanded] = useState(true);
    const [selectedLanguage, setSelectedLanguage] = useState()
    //const handlePress = () => setExpanded(!expanded);
    console.log("valeur selectionné:",selectedLanguage);

    return (
        <Picker
            selectedValue={selectedLanguage}
            onValueChange={(itemValue, itemIndex) =>{
                setValue(itemValue);
                setSelectedLanguage(itemValue);
                }
            }>
                {
                    items.map(element => (<Picker.Item label={element} value={element} key={element} />))
                }
            <Picker.Item label="Java" value="java" />
            <Picker.Item label="JavaScript" value="js" />
        </Picker>

    );
};

export default Selection;