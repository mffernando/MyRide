import React, { useRef, useState, useEffect } from 'react';
import { ActivityIndicator, StatusBar } from 'react-native';
import MapView from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import MapViewDirections from 'react-native-maps-directions';

//config Maps Api
import { MapsApi } from '../../config';

//api
import useApi from '../../useApi';

//styles
import {
    Container,
    ItineraryArea,
    ItineraryItem,
    ItineraryLabel,
    ItineraryPoint,
    ItineraryTitle,
    ItineraryValue,
    ItineraryPlaceHolder,
    RequestDetails,
    RequestDetail,
    RequestTitle,
    RequestValue,
    RequestButtons,
    RequestButton,
    RequestButtonText,
    LoadingArea,
    MenuArea,
    MenuImage
} from './styled';

//modal
import AddressModal from '../../components/AddressModal';
import DriverModal from '../../components/DriverModal';

const Home = (props) => {

    //ref
    const map = useRef();

    //api
    const api = useApi();

    //state
    const [mapLocation, setMapLocation] = useState({
        center: {
            latitude: -25.477753,
            longitude: -49.2916961
        },
        zoom: 16,
        pitch: 0,
        altitude: 0,
        heading: 0
    });
    const [fromLocation, setFromLocation] = useState({});
    const [toLocation, setToLocation] = useState({});
    const [showDirections, setShowDirections] = useState(false);
    const [requestDistance, setRequestDistance] = useState(0);
    const [requestTime, setRequestTime] = useState(0);
    const [requestPrice, setRequestPrice] = useState(0);
    const [modalTitle, setModalTitle] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [modalField, setModalField] = useState('');
    const [loading, setLoading] = useState(false);
    const [driverInfo, setDriverInfo] = useState({});
    const [driverModalVisible, setDriverModalVisible] = useState(false);

    //initialize / effect
    useEffect(()=> {
        Geocoder.init(MapsApi, {language:'pt-br'});
        getMyCurrentPosition();
    }, []);

    //monitoring "from - to" and create the route
    useEffect(()=>{
        //create the route
        if (fromLocation.center && toLocation.center) {
            setShowDirections(true);
        }
    }, [toLocation]);

    //monitoring when from location change
    useEffect(()=>{
        //if exists
        if (fromLocation.center) {
            setMapLocation(fromLocation);
        }
    }, [fromLocation]);

    //get user position
    const getMyCurrentPosition = () => {
        Geolocation.getCurrentPosition(async (info) => {
            //get location name from coords
            const geo = await Geocoder.from(info.coords.latitude, info.coords.longitude);
            //console.log("coords: ", info.coords);
            console.log("geo ", geo);

            //if has result
            if (geo.results.length > 0) {
                const location = {
                    //first location name result
                    name: geo.results[0].formatted_address,
                    center: {
                        latitude: info.coords.latitude,
                        longitude: info.coords.longitude
                    },
                    zoom: 16,
                    pitch: 0,
                    altitude: 0,
                    heading: 0
                };
                //set user current location
                setMapLocation(location);
                //set user initial location
                setFromLocation(location);
            }

        }, (error) => {
            
        });
    }

    //functions
    const handleFromClick = () => {
        //open modal
        setModalTitle("Origin");
        setModalField('from');
        setModalVisible(true);
    }

    //get destination
    const handleToClick = async () => {
        setModalTitle("Destiny");
        setModalField('to');
        setModalVisible(true);
    }

    //update zoom
    const handleDirectionsReady = async (response) => {
        //distance
        setRequestDistance(response.distance);
        //duration
        setRequestTime(response.duration);
        //price
        const priceRequest = await api.getRequestPrice(response.distance);
        if (!priceRequest.error) {
            setRequestPrice(priceRequest.price); 
        }
        
        //map zoom
        map.current.fitToCoordinates(response.coordinates, {
            edgePadding: {
                left: 10,
                right: 10,
                bottom: 10,
                top: 1200
            }
        });
        console.log(response);
    }

    //request cancel
    const handleRequestCancel = () => {
        //reset location and values
        setToLocation({});
        setShowDirections(false);
        setRequestDistance(0);
        setRequestTime(0)
        setRequestPrice(0);
        setMapLocation(fromLocation); //reset origin
    }

    const handleRequestDriver = async () => {
        //loading
        setLoading(true);
        //find driver
        const driver = await api.findDriver({
            fromLatitude: fromLocation.center.latitude,
            fromLongitue: fromLocation.center.longitude,
            toLatitude: toLocation.center.latitude,
            toLongitude: toLocation.center.longitude
        });
        setLoading(false);

        if (!driver.error) {
            //find driver
            setDriverInfo(driver.driver);
            setDriverModalVisible(true);

            //cancel button reset
            handleRequestCancel();
        } else {
            //not find
            alert(driver.error);
        }

    }

    //reset map when change
    const handleMapChange = async () => {
        const mapCamera = await map.current.getCamera();
        mapCamera.altitude = 0;
        setMapLocation(mapCamera);
    }

    const handleModalClick = (field, address) => {
        console.log("Field: ", field);
        console.log("Address: ", address);

        const location = {
            //first location name result
            name: address.address,
            center: {
                latitude: address.latitude,
                longitude: address.longitude
            },
            zoom: 16,
            pitch: 0,
            altitude: 0,
            heading: 0
        };

        switch (field) {
            case 'from':
                setFromLocation(location);  
            break;
            case 'to':
                setToLocation(location);  
            break;
        }

    }

    //open drawer menu
    const handleMenu = () => {
        props.navigation.openDrawer();
    }

    return (
        <Container>
            <StatusBar barStyle="light-content" backgroundColor="#734046" />
            <DriverModal 
                driver={driverInfo}
                visible={driverModalVisible}
                visibleAction={setDriverModalVisible}
            />
            <AddressModal 
                title={modalTitle}
                visible={modalVisible}
                visibleAction={setModalVisible}
                field={modalField}
                clickAction={handleModalClick}
            />
            <MapView
                ref={map}
                style={{flex:1}}
                provider="google"
                camera={mapLocation}
                onRegionChangeComplete={handleMapChange}
            >
                {
                    //set origin pin location
                    fromLocation.center &&
                        <MapView.Marker pinColor="black" coordinate={fromLocation.center} />
                }
                {
                    //set destiny pin location
                    toLocation.center &&
                        <MapView.Marker pinColor="green" coordinate={toLocation.center} />
                }
                {
                    //create route
                    showDirections &&
                    <MapViewDirections
                    origin={fromLocation.center}
                    destination={toLocation.center}
                    strokeWidth={5}
                    strokeColor="#e79e4f"
                    apikey={MapsApi}
                    onReady={handleDirectionsReady}
                    />
                }
            </MapView>
            <MenuArea onPress={handleMenu} underlayColor="transparent" >
                <MenuImage source={require('../../assets/menu.png')} />
            </MenuArea>
            <ItineraryArea>
                <ItineraryItem onPress={handleFromClick} underlayColor="#A05344" >
                    <>
                        <ItineraryLabel>
                            <ItineraryPoint color="#00FF00" />
                            <ItineraryTitle>ORIGIN</ItineraryTitle>
                        </ItineraryLabel>
                        {
                            //if has location
                            fromLocation.name &&
                                <ItineraryValue>{ fromLocation.name }</ItineraryValue>
                        }
                        {
                            //if has no location
                            !fromLocation.name &&
                                <ItineraryPlaceHolder>Origin</ItineraryPlaceHolder>
                        }
                    </>
                </ItineraryItem>
                <ItineraryItem onPress={handleToClick} underlayColor="#A05344" >
                    <>
                        <ItineraryLabel>
                            <ItineraryPoint color="#00FF00" />
                            <ItineraryTitle>DESTINATION</ItineraryTitle>
                        </ItineraryLabel>
                        {
                            //if has location
                            toLocation.name &&
                                <ItineraryValue>{ toLocation.name }</ItineraryValue>
                        }
                        {
                            //if has no location
                            !toLocation.name &&
                                <ItineraryPlaceHolder>Destination</ItineraryPlaceHolder>
                        }
                    </>
                </ItineraryItem>
            </ItineraryArea>
            {
                //if has "from - to" location show"
                fromLocation.center && toLocation.center &&
                    <ItineraryItem>
                        <>
                            <RequestDetails>
                                <RequestDetail>
                                    <RequestTitle>Distance</RequestTitle>
                                    <RequestValue>{ requestDistance > 0?`${requestDistance.toFixed(1)} km`:'km' }</RequestValue>
                                </RequestDetail>
                                <RequestDetail>
                                    <RequestTitle>Time</RequestTitle>
                                    <RequestValue>{ requestTime > 0?`${requestTime.toFixed(0)} min`:'min' }</RequestValue>
                                </RequestDetail>
                                <RequestDetail>
                                    <RequestTitle>Value</RequestTitle>
                                    <RequestValue>{ requestPrice > 0?`R$ ${requestPrice.toFixed(2)}`:'R$' }</RequestValue>
                                </RequestDetail>
                            </RequestDetails>
                            <RequestButtons>
                                <RequestButton color="#00CC00" onPress={handleRequestDriver}>
                                    <RequestButtonText>Request Driver</RequestButtonText>
                                </RequestButton>
                                <RequestButton color="#CC0000" onPress={handleRequestCancel}>
                                    <RequestButtonText>Cancel</RequestButtonText>
                                </RequestButton>
                            </RequestButtons>
                        </>
                    </ItineraryItem>
            }
            {
                //loading
                loading &&
                    <LoadingArea>
                        <ActivityIndicator size="large" color="#FFFFFF" />
                    </LoadingArea>
            }
        </Container>
    )
}

export default Home;