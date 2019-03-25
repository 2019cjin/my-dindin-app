import {createStore} from 'redux';

const types = {
    updater: 'updater',
}

export default function(state, action) {
    if (action.type === types.updater)    {
        //merge snapshot with overall state
        state = {...state, ...action.payload}
    }
    return state
}

const initialState = {}