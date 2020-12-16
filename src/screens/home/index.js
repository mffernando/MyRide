import React, { useRef, useState, useEffect } from 'react';
import { StatusBar } from 'react-native';
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
    RequestValue
} from './styled';

const Home = () => {

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

    }

    //get destination
    const handleToClick = async () => {
        const geo = await Geocoder.from('Curitiba, PR');
        //if find
        if (geo.results.length > 0) {
            const location = {
                //first location name result
                name: geo.results[0].formatted_address,
                center: {
                    latitude: geo.results[0].geometry.location.lat,
                    longitude: geo.results[0].geometry.location.lng
                },
                zoom: 16,
                pitch: 0,
                altitude: 0,
                heading: 0
            };
            //set location
            setToLocation(location);
        }
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
                left: 50,
                right: 50,
                bottom: 50,
                top: 800
            }
        });
        console.log(response);
    }

    return (
        <Container>
            <StatusBar barStyle="light-content" backgroundColor="#734046" />
            <MapView
                ref={map}
                style={{flex:1}}
                provider="google"
                camera={mapLocation}
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
                </>
            </ItineraryItem>
        </Container>
    )
}

export default Home;