import { gql } from "@apollo/client";

export const QUERY_USERS = gql`
    query users {
        users {
        _id
        username
        email
        }
    }
    `;

    export const QUERY_SINGLE_USER = gql`
    query singleUser($userId: ID!) {
        user(userId: $userId) {
        _id
        username
        email
        }
    }
    `;

    export const QUERY_ME = gql`
    query me {
        me {
        _id
        username
        email
        }
    }
    `;

    export const QUERY_EVENTS = gql`
    query events {
        events {
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

    export const QUERY_SINGLE_EVENT = gql`
    query event($eventId: ID!) {
        event(eventId: $eventId) {
        _id
        title
        description
        imageUrl
        likesCount
        eventDate
        createdAt
        comments {
            _id
            commentText
            createdAt
            username
        }
        }
    }
    `;

    export const QUERY_ME_EVENTS = gql`
    query me {
        me {
        _id
        username
        email
        events {
            _id
            title
            description
            imageUrl
            likesCount
            eventDate
            createdAt
        }
        }
    }
    `;

    export const QUERY_ME_COMMENTS = gql`
    query me {
        me {
        _id
        username
        email
        comments {
            _id
            commentText
            createdAt
            event {
            _id
            title
            description
            imageUrl
            likesCount
            eventDate
            createdAt
            }
        }
        }
    }
    `;

    export const QUERY_ME_LIKES = gql`
    query me {
        me {
        _id
        username
        email
        likes {
            _id
            title
            description
            imageUrl
            likesCount
            eventDate
            createdAt
        }
        }
    }
    `;
