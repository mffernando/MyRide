import { createDrawerNavigator } from 'react-navigation-drawer';
import CustomDrawer from '../components/CustomDrawer';

import Home from '../screens/home';

export default createDrawerNavigator({
    Home
}, {
    contentComponent: CustomDrawer
}
);