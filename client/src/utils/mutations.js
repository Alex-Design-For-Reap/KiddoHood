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
mutation AddComment($text: String!, $userId: ID!, $eventId: ID!) {
  addComment(text: $text, userId: $userId, eventId: $eventId) {
    userId {
      username
    }
    _id
    createdAt
    eventId {
      _id
    }
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

export const DELETE_EVENT = gql`
mutation deleteEvent($deleteEventId: ID!) {
    deleteEvent(id: $deleteEventId) {
      _id
      createdAt
      description
      eventDate
      imageUrl
      likesCount
      location
      title
    }
  }
`;



export const DELETE_USER = gql`
  mutation deleteUser($userId: ID!) {
    deleteUser(userId: $userId) {
      _id
      username
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
mutation Mutation($updateEventId: ID!, $title: String, $description: String, $imageUrl: String, $location: String, $eventDate: String, $likesCount: Int) {
  updateEvent(id: $updateEventId, title: $title, description: $description, imageUrl: $imageUrl, location: $location, eventDate: $eventDate, likesCount: $likesCount) {
    _id
    title
    location
    imageUrl
    eventDate
    description
    likesCount
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


