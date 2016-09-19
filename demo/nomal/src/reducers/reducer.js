/**
 * Created by daishun on 2016/9/19.
 */
const  defaultSate={
    appList:[]
}

function todos(state =defaultSate, action) {
    switch (action.type) {
        case 'SET_APPLIST':
            return  Object.assign({}, state, {
                appList:action.data
            });
        default:
            return state;
    }
}

export default todos;
