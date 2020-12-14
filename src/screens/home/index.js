import React, { useRef } from 'react';
import { StatusBar } from 'react-native';
import MapView from 'react-native-maps';

//styles
import {
    Container
} from './styled';

const Home = () => {

    const map = useRef();

    return (
        <Container>
            <StatusBar barStyle="light-content" backgroundColor="#734046" />
            <MapView
                ref={map}
                style={{flex:1}}
                provider="google"
            >
            </MapView>
        </Container>
    )
}

export default Home;