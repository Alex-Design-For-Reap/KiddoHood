import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
        token
        user {
            _id
            username
        }
        }
    }
    `;

export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
    token
    user {
        _id
        username
    }
    }
}
`;

export const ADD_EVENT = gql`
mutation addEevent($title: String!, $description: String!, $location: String!, $eventDate: String!, $imageUrl: String) {
    addEvent(title: $title, description: $description, location: $location, eventDate: $eventDate, imageUrl: $imageUrl) {
        _id
        title
        location
        description
        imageUrl
        eventDate
        createdAt
        userId {
        _id
        }
    }
}
`;

export const ADD_COMMENT = gql`
mutation addComment($eventId: ID!, $text: String!) {
    addComment(eventId: $eventId, text: $text) {
    _id
    text
    createdAt
    username
    }
}
`;

export const LIKE_EVENT = gql`
mutation likeEvent($eventId: ID!) {
    likeEvent(eventId: $eventId) {
    _id
    likesCount
    }
}
`;

export const REMOVE_EVENT = gql`
mutation removeEvent($eventId: ID!) {
    removeEvent(eventId: $eventId) {
    _id
    title
    description
    imageUrl
    likesCount
    eventDate
    createdAt
    }
}
`;


export const REMOVE_USER = gql`
mutation removeUser {
    removeUser {
    _id
    username
    email
    }
}
`;

export const UPDATE_USER = gql`
mutation updateUser($username: String!, $email: String!, $password: String!) {
    updateUser(username: $username, email: $email, password: $password) {
    _id
    username
    email
    }
}
`;

export const UPDATE_EVENT = gql`
mutation updateEvent($eventId: ID!, $title: String!, $description: String!, $imageUrl: String!, $eventDate: String!) {
    updateEvent(eventId: $eventId, title: $title, description: $description, imageUrl: $imageUrl, eventDate: $eventDate) {
    _id
    title
    description
    imageUrl
    likesCount
    eventDate
    createdAt
    }
}
`;


export const UPDATE_LIKES = gql`
mutation updateLikes($eventId: ID!, $likesCount: Int!) {
    updateLikes(eventId: $eventId, likesCount: $likesCount) {
    _id
    likesCount
    }
}
`;


