import React, { useState, useEffect } from 'react';
import { Modal } from 'react-native';
import styled from 'styled-components/native';
import { AirbnbRating } from 'react-native-ratings';

//api
import useApi from '../useApi';

//styles
const ModalArea = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: #E79E4F;
`;

const DriverAvatar = styled.Image`
    width: 120px;
    height: 120px;
    border-radius: 60px;
`;

const DriverName = styled.Text`
    margin: 20px;
    font-size: 26px;
    font-weight: bold;
    color: #734046;
`;

const DriverStars = styled.Text`
    color: #734046;
    font-size: 16px;
    font-weight: bold;
`;

const DriverCarInfo = styled.View`
    width: 100%;
    margin: 20px;
    border-top-width: 1px;
    border-top-color: #734046;
    border-bottom-width: 1px;
    border-bottom-color: #734046;
    align-items: center;
    padding: 20px;
`;

const DriverCar = styled.Text`
    color: #734046;
    font-size: 16px
`;

const DriverCarColor = styled.Text`
    color: #734046;
    font-size: 16px
`;

const DriverCarPlate = styled.Text`
    color: #734046;
    font-size: 16px
`;

const TripButton = styled.TouchableHighlight`
    width: 80%;
    height: 50px;
    background-color: #734046;
    border-radius: 5px;
    justify-content: center;
    align-items: center;
`;

const TripButtonText = styled.Text`
    font-size: 16px;
    color: #FFFFFF;
`;

const DriverHeadLine = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color: #734046;
    margin-bottom: 20px;
`;

const RatingTitle = styled.Text`
    margin: 20px;
    font-size: 16px;
    font-weight: bold;
    color: #734046; 
`;

export default (props) => {

    //api
    const api = useApi();

    //state
    const [showStars, setShowStars] = useState(false);

    //functions
    const handleFinishTrip = () => {
        setShowStars(true);
    }

    //finish trip and rate
    const handleRating = async (rating) => {
        //rate
        await api.setRating(rating);
        //close modal
        props.visibleAction(false);

        alert('Thanks')
    }

        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={props.visible}
            >
                <ModalArea>
                    <DriverHeadLine>Your Driver is </DriverHeadLine>
                    <DriverAvatar source={{uri:props.driver.avatar}} />
                    <DriverName>{ props.driver.name }</DriverName>
                    <DriverStars>{ props.driver.stars } stars</DriverStars>
                    {
                        //show driver info
                        !showStars &&
                            <>
                                <DriverCarInfo>
                                    <DriverCar>{ props.driver.carName }</DriverCar>
                                    <DriverCarColor>{ props.driver.carColor }</DriverCarColor>
                                    <DriverCarPlate>{ props.driver.carPlate }</DriverCarPlate>
                                </DriverCarInfo>
                                <TripButton onPress={handleFinishTrip} >
                                    <TripButtonText>End Trip</TripButtonText>
                                </TripButton>
                            </>
                    }
                    {
                        //show driver rating after trip
                        showStars &&
                        <>
                            <RatingTitle>Please, rate the driver!</RatingTitle>
                            <AirbnbRating 
                                count={5}
                                reviews={['Very Bad', 'Bad', 'Ok', 'Good', 'Very Good']}
                                defaultRating={5}
                                onFinishRating={handleRating}
                            />
                        </>
                    }
                </ModalArea>
            </Modal>
        );
}