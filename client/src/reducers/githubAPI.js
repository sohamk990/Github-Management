
export const tokenUpdate = (state="",action) => {
    switch(action.type) {        
        case "tokenUpdate":
            return action.value;
        
        default:
            return state;
    }
}

export const usernameUpdate = (state="Username",action) => {
    switch(action.type) {        
        case "usernameUpdate":
            return action.value;
        
        default:
            return state;
    }
}

export const repoUpdate = (state={},action) => {
    switch(action.type) {        
        case "repoUpdate":
            return action.value;
        
        default:
            return state;
    }
}