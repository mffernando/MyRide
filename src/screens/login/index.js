import React, { useState } from 'react';
import { StatusBar, Platform } from 'react-native';

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
  ActionButtonText
} from './styled';

const Login = () => {

  //states
  const [activeMenu, setActiveMenu] = useState('signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
            <Input value={name} onChangeText={text=>setName(text)} placeholder="Name" />
        }
        <Input value={email} onChangeText={text=>setEmail(text)} autoCapitalize="none" keyboardType="email-address" placeholder="E-mail" />
        <Input value={password} onChangeText={text=>setPassword(text)} placeholder="Password" />

        {
          //sign in button
          activeMenu == 'signin' &&
            <ActionButton>
              <ActionButtonText>Sign In</ActionButtonText>
            </ActionButton>
        }

        {
          //sign up button
          activeMenu == 'signup' &&
            <ActionButton>
              <ActionButtonText>Sign Up</ActionButtonText>
            </ActionButton>
        }

      </Container>
    );
  }

export default Login;