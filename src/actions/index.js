import axios from 'axios';

export const FETCH_POSTS = 'fetch_posts';
export const CREATE_POST = 'create_post';
export const FETCH_POST = 'fetch_post';
export const DELETE_POST = 'delete_post';
export const EDIT_POST = 'edit_post';

const ROOT_URL = 'http://reduxblog.herokuapp.com/api/';
const API_KEY = '?key=TRAVELBAG123';// random unique key.

export function fetchPosts() {
    const request = axios.get(`${ROOT_URL}/posts${API_KEY}`);
    
    return {
        type: FETCH_POSTS,
        payload: request//The redux-promise propert will automatically resolve this axios call. 
    };
}

export function createPost(values, callback) {
    const request = axios.post(`${ROOT_URL}/posts${API_KEY}`, values)
    .then(() => callback());//once the post is done call the callback to navigate to the post_index page.

    return {
        type: CREATE_POST,
        payload: request
    };
}

export function fetchPost(id) {
    const request = axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`);

    return {
        type: FETCH_POST,
        payload: request
    };
}

export function deletePost(id, callback) {
    const request = axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`)
    .then(() => callback());

    return {
        type: DELETE_POST,
        payload: id
    };
}