import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

export const FETCH_PROTECTED_DATA_SUCCESS = 'FETCH_PROTECTED_DATA_SUCCESS';
export const fetchProtectedDataSuccess = data => ({
    type: FETCH_PROTECTED_DATA_SUCCESS,
    data
});

export const FETCH_PROTECTED_DATA_ERROR = 'FETCH_PROTECTED_DATA_ERROR';
export const fetchProtectedDataError = error => ({
    type: FETCH_PROTECTED_DATA_ERROR,
    error
});

export const DATA_FROM_API = 'DATA_FROM_API';
export const receivedData = data => ({
    type: DATA_FROM_API,
    data
});

export const FIND_DATA = 'FIND_DATA';
export const findData = data => ({
    type: FIND_DATA,
});

export const fetchProtectedData = () => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/protected`, {
        method: 'GET',
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(({data}) => dispatch(fetchProtectedDataSuccess(data)))
        .catch(err => {
            dispatch(fetchProtectedDataError(err));
        });
};

//const YOUTUBE_URL = "https://www.googleapis.com/youtube/v3/search";
export const getDataFromApi = (searchTerm) => (dispatch, getState) => {
    console.log(searchTerm)
    console.log(getState());
    dispatch(findData());
  var url = new URL("https://www.googleapis.com/youtube/v3/search")
    var query = {
        part: 'snippet',
        key: 'AIzaSyAbmxlTomU6l61ZBgF3pzXXaGzodxAqB5s',
        maxResults: 5,
        type: 'video',
        q: searchTerm
    }
    Object.keys(query).forEach(key => url.searchParams.append(key, query[key]))

/*let response = await fetch(url)
let data = await response.json()
console.log(data)
return data*/

return fetch(url)
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    console.log(myJson);
    dispatch(receivedData(myJson));
  });
}