import React, { useState } from 'react';
import { StatusBar, Platform, Text, ActivityIndicator } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

//api
import useApi from '../../useApi';

//styled
import {
  Container,
  Header,
  HeaderTitle,
  Menu,
  MenuItem,
  MenuItemText,
  Input,
  ActionButton,
  ActionButtonText,
  LoadingArea
} from './styled';

const Login = (props) => {

  //api
  const api = useApi();

  //states
  const [activeMenu, setActiveMenu] = useState('signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  //functions
  const handleSignIn = async () => {
    //validate
    if (email && password) {
      setLoading(true);
      const response = await api.signin(email, password);
      console.log(response);
      setLoading(false);

    if (response.error) {
      console.log(response.error);
    } else {
      //save token on the reducer
      props.setToken(response.token);
      //redirect to home page
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
    }
  }

  const handleSignUp = async () => {
    //validate
    if (name && email && password) {
      setLoading(true);
      const response = await api.signup(name, email, password);
      console.log(response);
      setLoading(false);

    if (response.error) {
      alert(response.error);
    } else {
      //save token on the reducer
      props.setToken(response.token);
      //redirect to home page
        //if has token go to home screen
        props.navigation.dispatch(StackActions.reset({
          index: 0,
          actions: [
              NavigationActions.navigate({
                  routeName: 'HomeDrawer'
              })
          ]
      }));
      }
    }
  }

    return (
      <Container behavior={Platform.OS === 'ios'?'padding':null} >
        <StatusBar barStyle="light-content" backgroundColor="#734046" />
        <Header>
          <HeaderTitle>My Ride</HeaderTitle>
        </Header>
        <Menu>
          <MenuItem active={activeMenu == 'signin'} onPress={()=>setActiveMenu('signin')} underlayColor="transparent">
            <MenuItemText>Sign In</MenuItemText>
          </MenuItem>
          <MenuItem active={activeMenu == 'signup'} onPress={()=>setActiveMenu('signup')} underlayColor="transparent">
            <MenuItemText>Sign Up</MenuItemText>
          </MenuItem>
        </Menu>

        {
          //sign in and sign up fields
          activeMenu == 'signup' &&
            <Input editable={!loading} value={name} onChangeText={text=>setName(text)} placeholder="Name" />
        }
        <Input editable={!loading} value={email} onChangeText={text=>setEmail(text)} autoCapitalize="none" keyboardType="email-address" placeholder="E-mail" />
        <Input editable={!loading} value={password} onChangeText={text=>setPassword(text)} placeholder="Password" secureTextEntry={true} />

        {
          //sign in button
          activeMenu == 'signin' &&
            <ActionButton disabled={loading} onPress={handleSignIn}>
              <ActionButtonText>Sign In</ActionButtonText>
            </ActionButton>
        }

        {
          //sign up button
          activeMenu == 'signup' &&
            <ActionButton onPress={handleSignUp}>
              <ActionButtonText>Sign Up</ActionButtonText>
            </ActionButton>
        }

        {/* <Text>token: {props.token}</Text> */}

        {
          //loading area
          loading &&
          <LoadingArea>
            <ActivityIndicator size="large" color="#FFFFFF" />
          </LoadingArea>
        }

      </Container>
    );
  }

//redux from reducer
const mapStateToProps = (state) => {
  //get token
  return {
      token: state.userReducer.token
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setToken:(token)=>dispatch({
      type: 'SET_TOKEN',
      payload: {token}
    })
  };
}

//prop
export default connect(mapStateToProps, mapDispatchToProps)(Login);