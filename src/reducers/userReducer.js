//Initial User Data
const initialState = {
    token: '',
    name: ''
};

export default (state = initialState, action) => {

    switch (action.type) {
        case 'SET_NAME':
            return { ...state, name: ßaction.payload.name };    
        break;
    }

    return state;
}