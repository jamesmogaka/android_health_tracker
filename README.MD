# Android health tracker 
A backend node.js server capable of facilitating real-time communications(consultation) between a doctor and patient in the form of messages and calls.

## Features of the system
1. [x] **Database** - To store user information, chat history, and files. *Postgresql*
    1. [x] Development of a database schema model.
    2. [ ] Testing of the model developed.
    3. [ ] Refinements to the model based on the test results.
    4. [ ] Developing a module to check data input to the database for validity.
   
2. [ ] **User authentication, authorization and creation** - A user authentication and authorization system to ensure that only authorized users can access the system functionality. *Firebase authentication*
    1. [ ] Investigate on how firebase phone no authentication works in relation to the server.(front end)
    2. [ ] Develop a user module responsible for registration of new users(patients and doctors).   
    3. [ ] Develop a module to delete a given user 
3. [ ] **Real-time communication** - The ability to send and receive messages in real-time, allowing for instant communication. *socket.io*
    1. [ ] Develop a module to handle connections and a register for the connected users.
    2. [ ] Develop a module to handle user to user messaging.
    3. [ ] Develop a module to handle sending of messages whenever the target user is offline.
4. [ ] **Group chat** - The capability to create and manage group chats, allowing multiple users to communicate in one conversation. *socket.io*
    1. [ ] Creation of group chat rooms and recording a register of all members in each group.
    2. [ ] Addition of members to groups.
    3. [ ] Removal of members.
    4. [ ] Sending of messages to group chat rooms. 
    5. [ ] Re-joining of groups after reconnection to the socket server.
5. [ ] **File sharing** - The capability to share files such as photos, videos, and documents within the chat.*socket.io*
6. [ ] **Calls** -
7. [ ] **Push notifications** - The application must be able to send push notifications to users when they receive a new message, even if the app is not currently open.
8. [ ]  **End-to-end encryption** - To ensure the security and privacy of the messages.
9.  [ ]  **Payment module** - To ensure doctors get paid for service delivery to the patients.