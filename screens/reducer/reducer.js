const initialState={
    id:'',
    name:'',
    email:''
};


export const counterReducer = (state=initialState, action) =>{
    switch (action.type) {
    case 'LOGIN':
    return {
        id:action.id,
        name:action.name,
        email:action.email

    };
    
    default:
    return initialState.state;
    }
    }