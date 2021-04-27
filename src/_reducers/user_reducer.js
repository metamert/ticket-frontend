
let us= localStorage.getItem("user", "user")
const intialState = {user:us}




export default function (state = intialState, action) {
  switch (action.type) {
    case "add_user":
      return {...state,user:"admin"}

      case "delete_user":
        return {...state,user:null}
    default:
      return state;
  }
}
