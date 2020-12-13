import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

const Preload = (props) => {
    //token from reducers/userReducer.js
    if (!props.token) {
        //if has no token go to login
        props.navigation.dispatch(StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({
                    routeName: 'Login'
                })
            ]
        }));
    } else {
        //if has token go to home screen
        props.navigation.dispatch(StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({
                    routeName: 'HomeStack'
                })
            ]
        }));
    }

    return null;
}

//redux from reducer
const mapStateToProps = (state) => {
    //get token
    return {
        token: state.userReducer.token
    };
}

//prop
export default connect(mapStateToProps)(Preload);