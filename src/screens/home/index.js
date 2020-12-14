import React, { useRef, useState } from 'react';
import { StatusBar } from 'react-native';
import MapView from 'react-native-maps';

//styles
import {
    Container
} from './styled';

const Home = () => {

    //ref
    const map = useRef();

    //state
    const [mapLocation, setMapLocation] = useState({
        center: {
            latitude: 37.78825,
            longitude: -122.4324
        },
        zoom: 16,
        pitch: 0,
        altitude: 0,
        heading: 0
    });

    return (
        <Container>
            <StatusBar barStyle="light-content" backgroundColor="#734046" />
            <MapView
                ref={map}
                style={{flex:1}}
                provider="google"
                camera={mapLocation}
            >
            </MapView>
        </Container>
    )
}

export default Home;