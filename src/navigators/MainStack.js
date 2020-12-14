import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

//Screens
import Preload from '../screens/Preload';
import Login from '../screens/login';
import HomeDrawer from './HomeDrawer';

export default createAppContainer(createStackNavigator({
    Preload,
    Login,
    HomeDrawer
}, {
    initialRouterName: 'Preload',
    defaultNavigationOptions: {
        headerShown: false
    }
}));