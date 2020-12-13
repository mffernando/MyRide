import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

//Screens
import Preload from '../screens/Preload';
import Login from '../screens/login';
//import HomeSctack from './HomeSctack';

export default createAppContainer(createStackNavigator({
    Preload,
    Login,
    //HomeSctack
}, {
    initialRouterName: 'Preload',
    defaultNavigationOptions: {
        headerShown: false
    }
}));