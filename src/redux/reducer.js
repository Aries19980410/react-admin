
var obj = {
    name:'123',
    age:'18'
}

export function data(state=obj,action){
    switch (action.type) {
       case "ADD":
        return state + action.data;
        default:
            return state;
    }
}