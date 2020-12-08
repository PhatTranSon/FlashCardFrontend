import axios from 'axios';
import qs from 'qs';

//Get token from storage
import { getAccessToken } from './Authentication';

//Set root url
axios.defaults.baseURL = "https://flashcards-api.net";

//Helper method to make www-form-urlencoded request
function makeRequest(url, body, type="get", authorization=false) {
    //Configuration
    const config = authorization ? 
    {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Bearer ${getAccessToken()}`
        }
    } :
    {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
    }

    //Make request
    if (type === "get") {
        return axios.get(url, qs.stringify(body), config);
    } else if (type === "post") {
        return axios.post(url, qs.stringify(body), config);
    } else if (type === "put") {
        return axios.put(url, qs.stringify(body), config);
    } else if (type === "delete") {
        return axios.delete(url, qs.stringify(body), config);
    }
}

//Get all collections
function getAllCollections() {
    return axios({
        method: 'GET',
        url: '/collections',
        headers: {
            'Authorization': `Bearer ${getAccessToken()}`
        }
    });
}

//Get one card with id
function getOneCollection(id) {
    return axios({
        method: 'GET',
        url: `/collections/${id}`,
        headers: {
            'Authorization': `Bearer ${getAccessToken()}`
        }
    });
}

//Get user collections
function getMyCollections() {
    return axios({
        method: 'GET',
        url: '/mine/collections',
        headers: {
            'Authorization': `Bearer ${getAccessToken()}`
        }
    });
} 

//Get liked collections
function getLikedCollections() {
    return axios({
        method: 'GET',
        url: '/mine/collections/liked',
        headers: {
            'Authorization': `Bearer ${getAccessToken()}`
        }
    });
} 

//Delete a user collection
function deleteCollection(id) {
    return axios({
        method: 'DELETE',
        url: `/collections/${id}`,
        headers: {
            'Authorization': `Bearer ${getAccessToken()}`
        }
    });
}

//Like and Unlike collection
function likeCollection(id) {
    return makeRequest('/collections/likes', { collectionId: id }, 'post', true);
}

function unlikeCollection(id) {
    return makeRequest('/collections/unlikes', { collectionId: id }, 'post', true);
}

//Create a collection
function createCollection(title, description, color) {
    //Make urlencoded request with authorization
    return makeRequest('/collections', { title, description, color }, 'post', true);
}

function updateCollection(id, title, description, color) {
    return makeRequest(`/collections/${id}`, { title, description, color }, 'put', true);
}

//Get all cards
function getAllCards() {
    return axios({
        method: 'GET',
        url: '/cards',
        headers: {
            'Authorization': `Bearer ${getAccessToken()}`
        }
    });
}

//Get liked cards
function getLikedCards() {
    return axios({
        method: 'GET',
        url: '/mine/cards/liked',
        headers: {
            'Authorization': `Bearer ${getAccessToken()}`
        }
    });
}

//Get my cards
function getMyCards() {
    return axios({
        method: 'GET',
        url: '/mine/cards/',
        headers: {
            'Authorization': `Bearer ${getAccessToken()}`
        }
    });
}

//Get all cards from collection
function getCardsFromCollection(id) {
    return makeRequest('/cardsfromcollection', { collectionId: id }, 'post', true);
}

//Create cards
function createCard(collectionId, title, phonetic, description, color) {
    return makeRequest('/cards', { collectionId, title, phonetic, description, color }, 'post', true);
}

//Delete card
function deleteCard(id) {
    return makeRequest('/cards/delete', { id }, 'post', true);
}

//Like and Unlike card
function likeCard(id) {
    return makeRequest('/cards/likes', { cardId: id }, 'post', true);
}

function unlikeCard(id) {
    return makeRequest('/cards/unlikes', { cardId: id }, 'post', true);
}

function updateCard(id, title, description, phonetic, color) {
    return makeRequest('/cards', { id, title, description, phonetic, color }, 'put', true);
}

//Get all scores
function getAllScores() {
    return axios({
        method: 'GET',
        url: '/tests',
        headers: {
            'Authorization': `Bearer ${getAccessToken()}`
        }
    });
}

//Submit score
function submitScore(collectionId, rightQuestions, totalQuestions) {
    return makeRequest( `/tests/${collectionId}`, { rightQuestions, totalQuestions }, 'post', true);
}

//Get score from specific collection
function getCollectionScores(id) {
    return axios({
        method: 'GET',
        url: `/tests/${id}`,
        headers: {
            'Authorization': `Bearer ${getAccessToken()}`
        }
    });
}

export {
    //Collection operations
    getAllCollections,
    getOneCollection,
    getMyCollections,
    createCollection,
    updateCollection,
    deleteCollection,
    likeCollection,
    unlikeCollection,
    getLikedCollections,

    //Card operations
    getAllCards,
    getCardsFromCollection,
    getMyCards,
    getLikedCards,
    createCard,
    likeCard,
    updateCard,
    unlikeCard,
    deleteCard,

    //Score operations
    getAllScores,
    getCollectionScores,
    submitScore
}
