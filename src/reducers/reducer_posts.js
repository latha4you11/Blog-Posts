import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions/index';
import _ from 'lodash';

export default function(state = {}, action) {
    switch(action.type) {
        case FETCH_POSTS:
            return _.mapKeys(action.payload.data, 'id');//mapKeys is a func of lodash which takes an object array as 1st argue and 
            //2nd argue is a property that we want to pull out of each of the object and make it the key to the resultant object.
        case FETCH_POST:
            // const post = action.payload.data;
            // const newState = {...state};
            // newState[post.id] = post;
            // return newState;
            //es6 syntax for above is:
            return { ...state, [action.payload.data.id]: action.payload.data}
        case DELETE_POST:
            return _.omit(state, action.payload);//updates the local state by deleting the needed post.
        default:
            return state;
    }
}