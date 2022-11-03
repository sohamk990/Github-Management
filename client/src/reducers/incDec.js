const initialState=0;

const changeNum = (state=initialState,action) => {
    switch(action.type) {
        case "INC":
            return state+action.value;
        case "DEC":
            return state-action.value;
        default:
            return state;
    }
}
export default changeNum