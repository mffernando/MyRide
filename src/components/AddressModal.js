import React, { useState, useEffect } from 'react';
import { Modal } from 'react-native';
import styled from 'styled-components/native';
import Geocoder from 'react-native-geocoding';

//config Maps Api
import { MapsApi } from '../config';

//styles
const ModalArea = styled.View`
    flex: 1;
    background-color: #E79E4F;
`;
const ModalHeader = styled.View`
    flex-direction: row;
    align-items: center;
    padding: 20px;
`;

const ModalClose = styled.TouchableHighlight`
    width: 40px;
    height: 40px;
    justify-content: center;
    align-items: center;
    background-color: #FF0000;
    border-radius: 20px;
`;

const ModalCloseText = styled.Text``;

const ModalInput = styled.TextInput`
    margin-left: 20px;
    font-size: 18px;
    color: #734046;
`;

const ModalResults = styled.View``;

const ModalResult = styled.TouchableHighlight`
    padding: 20px;
`;

const ModalResultText = styled.Text`
    color: #734046;
    font-size: 16px;
`;

let timer;

export default (props) => {

    //state
    const [results, setResults] = useState([]);
    const [searchText, setSearchText] = useState('');

    //effect monitoring geocodade change
    useEffect(()=>{
        Geocoder.init(MapsApi, {language:'pt-br'});
    }, []);

    //effec monitoring text change
    useEffect(()=>{
        if (searchText) {
            //search timer
            if (timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(async ()=>{
                //wait one second to search
                console.log("searching...");
                const geo = await Geocoder.from(searchText);
                console.log("Results: ", geo.results.length);
                //if find
                if (geo.results.length > 0) {

                    let tempResults = [];

                    for (let i in geo.results) { 
                        tempResults.push({
                            address: geo.results[i].formatted_address,
                            latitude: geo.results[i].geometry.location.lat,
                            longitude: geo.results[i].geometry.location.lng
                        });
                    }
                    setResults(tempResults);
                } else {
                    //reset results
                    setResults([]);
                }
            }, 1000) //1000 = 1 sec
        }
    }, [searchText]);


    //functions
    const handleCloseAction = () => {
        //close and reset search
        props.visibleAction(false);
        setResults([]);
        setSearchText('');
    }

    const handleResultClick = (item) => {
        props.clickAction(props.field, item); //select item
        props.visibleAction(false); //close modal
    }

    //reset search
    const handleClose = () => {
        setResults([]);
        setSearchText('');
    }

        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={props.visible}
                onShow={handleClose}
            >
                <ModalArea>
                    <ModalHeader>
                        <ModalClose onPress={handleCloseAction} underlayColor="#EE0000" >
                            <ModalCloseText>X</ModalCloseText>
                        </ModalClose>
                        <ModalInput value={searchText} onChangeText={text=>setSearchText(text)} autoFocus={true} placeholder={props.title} placeholderTextColor="#734046" />
                    </ModalHeader>
                    <ModalResults>
                        {
                            //show results array
                            results.map((item, key)=>(
                                <ModalResult key={key} onPress={()=>handleResultClick(item)} >
                                    <ModalResultText>{item.address}</ModalResultText>
                                </ModalResult>
                            ))
                        }
                    </ModalResults>
                </ModalArea>
            </Modal>
        );
}