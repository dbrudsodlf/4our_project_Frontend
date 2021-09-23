// const initialState={
//     id:'',
//     name:'',
//     email:''
// };


export const counterReducer = (state={ id:'',name:'',email:'',cookbtn:0}, action) =>{
    switch (action.type) {
    case 'LOGIN':
    return {
        id:action.id,
        name:action.name,
        email:action.email
    };
   
    default:
    return state;
    }
    }