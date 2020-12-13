import styled from 'styled-components/native';

export const Container = styled.KeyboardAvoidingView`
    flex: 1;
    background-color: #FFF;
`;

export const Header = styled.SafeAreaView`
    padding-top: 20px
    background-color: #734046;
    justify-content: center;
    align-items: center;
`;

export const HeaderTitle = styled.Text`
    font-size: 28px;
    color: #e79e4f;
`;

export const Menu = styled.View`
    background-color: #734046;
    flex-direction: row;
    padding-left: 20px;
`;

export const MenuItem = styled.TouchableHighlight`
    padding: 20px;
    border-bottom-width: 5px;
    border-bottom-color: ${props=>props.active?'#e79e4f':'#734046'};
`;

export const MenuItemText = styled.Text`
    color: #e79e4f;
    font-size: 16px;
`;

export const Input = styled.TextInput`
    margin: 10px 20px;
    border-bottom-width: 2px;
    border-bottom-color: #734046;
    height: 40px;
    font-size: 16px;
    color: #734046;
`;

export const ActionButton = styled.TouchableHighlight`
    background-color: #734046;
    justify-content: center;
    align-items: center;
    height: 40px;
    border-radius: 5px;
    margin: 20px;
`;

export const ActionButtonText = styled.Text`
    color: #e79e4f;
    font-size: 16px;
`;

export const LoadingArea = styled.View`
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.5);
    justify-content: center;
    align-items: center;
`;