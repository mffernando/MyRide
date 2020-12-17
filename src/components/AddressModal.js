import React from 'react';
import { Modal } from 'react-native';
import styled from 'styled-components/native';

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

const ModalTitle = styled.Text`
    margin-left: 20px;
    font-size: 18px;
    font-weight: bold;
    color: #734046;
`;

export default (props) => {

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
                        <ModalTitle>{ props.title }</ModalTitle>
                    </ModalHeader>
                </ModalArea>
            </Modal>
        );
}