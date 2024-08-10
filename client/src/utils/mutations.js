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
    mutation addEvent($title: String!, $description: String!, $imageUrl: String!, $eventDate: String!) {
        addEvent(title: $title, description: $description, imageUrl: $imageUrl, eventDate: $eventDate) {
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

    export const ADD_COMMENT = gql`
    mutation addComment($eventId: ID!, $commentText: String!) {
        addComment(eventId: $eventId, commentText: $commentText) {
        _id
        commentText
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

    export const REMOVE_COMMENT = gql`
    mutation removeComment($eventId: ID!, $commentId: ID!) {
        removeComment(eventId: $eventId, commentId: $commentId) {
        _id
        commentText
        createdAt
        username
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

    export const UPDATE_COMMENT = gql`
    mutation updateComment($eventId: ID!, $commentId: ID!, $commentText: String!) {
        updateComment(eventId: $eventId, commentId: $commentId, commentText: $commentText) {
        _id
        commentText
        createdAt
        username
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


