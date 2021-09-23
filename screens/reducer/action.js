
    export const login = ({id, name, email}) => {
        console.log("액션 도착",id,name,email)
        return {
        type:'LOGIN',
        id:id,
        name:name,
        email:email
        }
        }


