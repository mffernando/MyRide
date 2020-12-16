import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
`;

export const ItineraryArea = styled.View`
    position: absolute;
    left: 10px;
    right: 10px;
    top: 50px;
    background-color: #734046;
    border-radius: 5px;
    border-color: #e79e4f;
    border-width: 1px;
`;

export const ItineraryItem = styled.TouchableHighlight`
    padding: 15px 20px;
    border-bottom-color: #e79e4f;
    border-bottom-width: 1px;
`;

export const ItineraryLabel = styled.View`
    flex-direction: row;
    align-items: center;
    margin-bottom: 10px;
`;

export const ItineraryPoint = styled.View`
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: ${props=>props.color};
`;

export const ItineraryTitle = styled.Text`
    margin-left: 10px;
    color: #e79e4f;
`;

export const ItineraryValue = styled.Text`
    color: #e79e4f;
    font-size: 16px;
`;

export const ItineraryPlaceHolder = styled.Text`
    color: #e79e4f;
    font-size: 16px;
    text-align: center;
`;

export const RequestDetails = styled.View`
    flex-direction: row;
`;

export const RequestDetail = styled.View`
    flex: 1;
    align-items: center;
`;

export const RequestTitle = styled.Text`
    color: #e79e4f;
    font-weight: bold;
    font-size: 14px;
`;

export const RequestValue = styled.Text`
    color: #734046;
    font-size: 14px;
`;