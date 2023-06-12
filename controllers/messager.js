const pool = require('../config/db_config');


function saveMessage(roomId, senderId, content, timestamp) {
    const query = 'INSERT INTO message (sender_id, room_id, sender_type, message_content, message_timestamp) VALUES ($1, $2, $3, $4)';
    const values = [roomId, senderId, content, timestamp];
    pool.query(query, values).then(() =>{
        console.log('Message saved successfully');
    }).catch((error) =>{
        console.error('Error saving message:', error);
    })
    ;
}

function getMessagesByRoom(roomId) {
    const query = 'SELECT sender_id, room_id, sender_type, message_content, message_timestamp FROM message WHERE room_id = $1 ORDER BY timestamp DESC';
    const values = [roomId];
    pool.query(query, values).then((result)=>{
        const messages = result.rows;
        return messages;
      })
      .catch((error)=> {
        console.error('Error retrieving messages:', error);
      })
}
//
// Retrieve last message of every room
function getLastMessages() {
    const query = `
      SELECT m.sender_id, m.room_id, m.sender_type, m.message_content, m.message_timestamp
      FROM message m
      WHERE m.timestamp = (
        SELECT MAX(timestamp)
        FROM message
        WHERE room_id = m.room_id
      )
      ORDER BY m.timestamp DESC;
    `;
    pool.query(query).then((result)=>{
      return result.rows;
    }).catch((error) =>{
      return `Error retrieving messages:${error}`;
  });
  }

module.exports = {
    saveMessage,
    getMessagesByRoom,
    getLastMessages
}