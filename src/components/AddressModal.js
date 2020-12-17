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
            //search
        }
    }, [searchText]);


    //functions
    const handleCloseAction = () => {
        props.visibleAction(false);
    }

        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={props.visible}
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
                                <ModalResult key={key} >
                                    <ModalResultText>{item.address}</ModalResultText>
                                </ModalResult>
                            ))
                        }

                        <ModalResult>
                            <ModalResultText>Origin</ModalResultText>
                        </ModalResult>
                    </ModalResults>
                </ModalArea>
            </Modal>
        );
}