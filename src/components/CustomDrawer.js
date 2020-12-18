import React from 'react';
import { ScrollView, SafeAreaView } from 'react-native';
import { DrawerItems } from 'react-navigation-drawer';
import { connect } from 'react-redux';

//styles
import styled from 'styled-components/native';

const Header = styled.View`
    padding: 20px;
    border-bottom-width: 1px;
    border-bottom-color: #e79e4f;
    flex-direction: row;
    align-items: center;
    margin-bottom: 20px;
`;

const UserAvatar = styled.View`
    width: 40px;
    height: 40px;
    border-radius: 20px;
    background-color: #e79e4f;
`;

const UserInfo = styled.View`
    margin-left: 10px;
`;

const UserName = styled.Text`
    color: #734046;
    font-size: 16px;
    font-weight: bold;
`;

const LogoutButton = styled.TouchableHighlight`
    height: 25px;
    justify-content: center;
`;

const LogoutButtonText = styled.Text`
    color: #734046;
    font-size: 16px;
    font-weight: bold;
`;


const CustomDrawer = (props) => {

    //functions

    //reset token and logout
    const handleLogout = () => {
        //reset token]
        props.setToken('');
        //redirect to preload screen
        props.navigation.navigate('Preload');
    }

    return (
        <ScrollView>
            <SafeAreaView style={{flex:1}} >
                <Header>
                    <UserAvatar />
                    <UserInfo>
                        <UserName>{props.name}</UserName>
                        <LogoutButton onPress={handleLogout} underlayColor="transparent" >
                            <LogoutButtonText>Logout</LogoutButtonText>
                        </LogoutButton>
                    </UserInfo>
                </Header>
                <DrawerItems {...props} />
            </SafeAreaView>
        </ScrollView>
    );
}

//redux from reducer
const mapStateToProps = (state) => {
    //get name
    return {
        name: state.userReducer.name
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
  export default connect(mapStateToProps, mapDispatchToProps)(CustomDrawer);