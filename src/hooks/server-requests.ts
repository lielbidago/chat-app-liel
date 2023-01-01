import { Message } from '../types/message';
import { mockUsers } from '../assets/mockUsers'; // todo: remove this line after server implementation

const endpoint = '../assets/'; // todo: add endpoint (server) address (starting with http://)
// const endpoint = 'http://localhost:3060';

/**
 * GET Request to get the list of messages
 **/
export async function getMessages() {
  // todo: replace this with fetch to get the messages from the server
  // const { mockMessages } = await import(`${endpoint}/mockMessages`);

  // // todo: this should be implemented in the server. Chat Messages should already have the authors' names.
  // // todo: remove this mapping when getting the data from the server
  // const mockMessagesWithNames = mockMessages.map((message: Message) => {
  //   const author = mockUsers.find(user => user.id === message.authorId);
  //   const authorName = author && author.name;
  //   return { ...message, authorName };
  // });

  // return mockMessagesWithNames;

  const res = await fetch('http://localhost:3060/users/all');
  const mockMessagesWithNames = await res.json();

  return mockMessagesWithNames;
}

/**
 * GET request to get the full list of users - id + name
 **/
export async function getUsers() {
  // todo: replace this with fetch to get the user list from the server
  // const { mockUsers } = await import(`${endpoint}/mockUsers`);
  // return mockUsers;

  const res = await fetch('http://localhost:3060/users/names-and-id');
  const users = await res.json();

  return users;
}


/**
 * GET request to get the full details of a user
 **/
export async function getUserDetails(userId: number) {
  // todo: replace this with fetch to get the user details from the server.
  //  For mocking example, we're calling an external JSON service.
  //  You can use mockUserDetails.ts for the list of user details in the server.

  // const res = await fetch(`https://jsonplaceholder.typicode.com/users?id=${userId}`);
  // return (await res.json())[0];

  const res = await fetch(`http://localhost:3060/users/${userId}`);
  const user = await res.json();

  return user;
  
}

/**
 * POST request to add a message. The message contains: id, body, timestamp, authorId
 **/
export async function addNewMessage(message: Message) {
  // todo: implement sending a new message to the server
  const res = await fetch(`http://localhost:3060/users/add-message`, 
  {method:'POST',headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }, body: JSON.stringify({message})});

  const m = await res.json();
  return m;
}

/**
 * POST request to change the user's like of a message
 **/
export async function changeMessageLikes(messageId: number, userId: number, like: boolean) {
  // todo: implement sending a rquest to change the like of a message by the user
  const res = await fetch(`http://localhost:3060/users/change-likes`, 
  {method:'POST',headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }, body: JSON.stringify({likeDetails:{messageId,userId, like}})});

  const m = await res.json();
  return m;
}
