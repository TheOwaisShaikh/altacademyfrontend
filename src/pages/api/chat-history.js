// import connection from '../../lib/db';

// export default async function handler(req, res) {
//   if (req.method === 'GET') {
//     const { email, sessionId } = req.query;

//     try {
//       const [user] = await connection.execute('SELECT id FROM User WHERE email = ?', [email]);
//       if (user.length === 0) {
//         return res.status(404).json({ success: false, message: 'User not found' });
//       }

//       const userId = user[0].id;

//       // Build the base query
//       let query = 'SELECT id, title FROM Session WHERE userId = ?';
//       const queryParams = [userId];

//       // Add the sessionId condition if present
//       if (sessionId) {
//         query += ' AND id = ?';
//         queryParams.push(sessionId);
//       }

//       // Append the ORDER BY clause
//       query += ' ORDER BY createdAt DESC';

//       // Execute the query
//       const [sessions] = await connection.execute(query, queryParams);
//       console.log('Sessions fetched from database:', sessions);

//       let messages = [];
//       if (sessionId) {
//         const [history] = await connection.execute(
//           'SELECT userQuestion AS text, image, botReply FROM ChatSession WHERE sessionId = ?',
//           [sessionId]
//         );

//         messages = history.map(entry => [
//           { sender: 'user', text: entry.text, image: entry.image },
//           { sender: 'bot', text: entry.botReply },
//         ]).flat();
//       }

//       res.status(200).json({ success: true, history: { sessions, messages }, currentSessionId: sessionId });
//     } catch (error) {
//       console.error('Database error:', error);
//       res.status(500).json({ success: false, message: 'Database error' });
//     }
//   } else {
//     res.status(405).json({ success: false, message: 'Method not allowed' });
//   }
// }
// import connection from '../../lib/db';

// export default async function handler(req, res) {
//   if (req.method === 'GET') {
//     const email = Array.isArray(req.query.email) ? req.query.email[0] : req.query.email;
//     const sessionId = req.query.sessionId;
//     console.log('Received email:', email);
//     console.log('Received sessionId:', sessionId);

//     try {
//       console.log('Fetching user with email:', email);
//       const [user] = await connection.execute('SELECT id FROM User WHERE email = ?', [email]);
//       console.log('User fetch result:', user);

//       if (user.length === 0) {
//         console.log('User not found');
//         return res.status(404).json({ success: false, message: 'User not found' });
//       }

//       const userId = user[0].id;
//       console.log('User ID:', userId);

//       let query = 'SELECT id, title FROM Session WHERE userId = ?';
//       const queryParams = [userId];

//       if (sessionId) {
//         query += ' AND id = ?';
//         queryParams.push(sessionId);
//       }

//       query += ' ORDER BY createdAt DESC';

//       console.log('Executing query:', query);
//       console.log('Query params:', queryParams);

//       const [sessions] = await connection.execute(query, queryParams);
//       console.log('Sessions fetched from database:', sessions);

//       let messages = [];
//       if (sessionId) {
//         console.log('Fetching messages for session:', sessionId);
//         const [history] = await connection.execute(
//           'SELECT userQuestion AS text, image, botReply FROM ChatSession WHERE sessionId = ? ORDER BY id ASC',
//           [sessionId]
//         );
//         console.log('Message history:', history);

//         messages = history.map(entry => [
//           { sender: 'user', text: entry.text, image: entry.image },
//           { sender: 'bot', text: entry.botReply },
//         ]).flat();
//       }

//       res.status(200).json({ success: true, history: { sessions, messages }, currentSessionId: sessionId });
//     } catch (error) {
//       console.error('Database error:', error);
//       res.status(500).json({ success: false, message: 'Database error' });
//     }
//   } else {
//     res.status(405).json({ success: false, message: 'Method not allowed' });
//   }
// }
// import connection from '../../lib/db';

// export default async function handler(req, res) {
//   if (req.method === 'GET') {
//     const { email, sessionId } = req.query;

//     try {
//       const [user] = await connection.execute('SELECT id FROM User WHERE email = ?', [email]);
//       if (user.length === 0) {
//         return res.status(404).json({ success: false, message: 'User not found' });
//       }

//       const userId = user[0].id;

//       // Build the base query
//       let query = 'SELECT id, title FROM Session WHERE userId = ?';
//       const queryParams = [userId];

//       // Add the sessionId condition if present
//       if (sessionId) {
//         query += ' AND id = ?';
//         queryParams.push(sessionId);
//       }

//       // Append the ORDER BY clause
//       query += ' ORDER BY createdAt DESC';

//       // Execute the query
//       const [sessions] = await connection.execute(query, queryParams);
//       console.log('Sessions fetched from database:', sessions);

//       let messages = [];
//       if (sessionId) {
//         const [history] = await connection.execute(
//           'SELECT userQuestion AS text, image, botReply FROM ChatSession WHERE sessionId = ?',
//           [sessionId]
//         );

//         messages = history.map(entry => [
//           { sender: 'user', text: entry.text, image: entry.image },
//           { sender: 'bot', text: entry.botReply },
//         ]).flat();
//       }

//       res.status(200).json({ success: true, history: { sessions, messages }, currentSessionId: sessionId });
//     } catch (error) {
//       console.error('Database error:', error);
//       res.status(500).json({ success: false, message: 'Database error' });
//     }
//   } else {
//     res.status(405).json({ success: false, message: 'Method not allowed' });
//   }
// }




// UNCOMMENT THIS
// import connection from '../../lib/db';

// export default async function handler(req, res) {
//   if (req.method === 'GET') {
//     const email = Array.isArray(req.query.email) ? req.query.email[0] : req.query.email;
//     const sessionId = req.query.sessionId;
//     console.log('Received email:', email);
//     console.log('Received sessionId:', sessionId);

//     try {
//       console.log('Fetching user with email:', email);
//       const [user] = await connection.execute('SELECT id FROM User WHERE email = ?', [email]);
//       console.log('User fetch result:', user);

//       if (user.length === 0) {
//         console.log('User not found');
//         return res.status(404).json({ success: false, message: 'User not found' });
//       }

//       const userId = user[0].id;
//       console.log('User ID:', userId);

//       let query = 'SELECT id, title FROM Session WHERE userId = ?';
//       const queryParams = [userId];

//       if (sessionId) {
//         query += ' AND id = ?';
//         queryParams.push(sessionId);
//       }

//       query += ' ORDER BY createdAt DESC';

//       console.log('Executing query:', query);
//       console.log('Query params:', queryParams);

//       const [sessions] = await connection.execute(query, queryParams);
//       console.log('Sessions fetched from database:', sessions);

//       let messages = [];
//       if (sessionId) {
//         console.log('Fetching messages for session:', sessionId);
//         const [history] = await connection.execute(
//           'SELECT userQuestion AS text, image, botReply FROM ChatSession WHERE sessionId = ? ORDER BY id ASC',
//           [sessionId]
//         );
//         console.log('Message history:', history);

//         messages = history.map(entry => [
//           { sender: 'user', text: entry.text, image: entry.image },
//           { sender: 'bot', text: entry.botReply },
//         ]).flat();
//       }

//       res.status(200).json({ success: true, history: { sessions, messages }, currentSessionId: sessionId });
//     } catch (error) {
//       console.error('Database error:', error);
//       res.status(500).json({ success: false, message: 'Database error' });
//     }
//   } else {
//     res.status(405).json({ success: false, message: 'Method not allowed' });
//   }
// }



  // import connection from '../../lib/db';

  // export default async function handler(req, res) {
  //   if (req.method === 'GET') {
  //     const email = Array.isArray(req.query.email) ? req.query.email[0] : req.query.email;
  //     const sessionId = req.query.sessionId;
  //     console.log('Received email:', email);
  //     console.log('Received sessionId:', sessionId);

  //     try {
  //       console.log('Fetching user with email:', email);
  //       const [user] = await connection.execute('SELECT id FROM User WHERE email = ?', [email]);
  //       console.log('User fetch result:', user);

  //       if (user.length === 0) {
  //         console.log('User not found');
  //         return res.status(404).json({ success: false, message: 'User not found' });
  //       }

  //       const userId = user[0].id;
  //       console.log('User ID:', userId);

  //       let query = 'SELECT id, title FROM Session WHERE userId = ?';
  //       const queryParams = [userId];

  //       if (sessionId) {
  //         query += ' AND id = ?';
  //         queryParams.push(sessionId);
  //       }

  //       query += ' ORDER BY createdAt DESC';

  //       console.log('Executing query:', query);
  //       console.log('Query params:', queryParams);

  //       const [sessions] = await connection.execute(query, queryParams);
  //       console.log('Sessions fetched from database:', sessions);

  //       let messages = [];
  //       if (sessionId) {
  //         console.log('Fetching messages for session:', sessionId);
  //         const [history] = await connection.execute(
  //           'SELECT userQuestion AS text, image, botReply FROM ChatSession WHERE sessionId = ? ORDER BY id ASC',
  //           [sessionId]
  //         );
  //         console.log('Message history:', history);

  //         messages = history.map(entry => [
  //           { sender: 'user', text: entry.text, image: entry.image },
  //           { sender: 'bot', text: entry.botReply },
  //         ]).flat();
  //       }

  //       res.status(200).json({ success: true, history: { sessions, messages }, currentSessionId: sessionId });
  //     } catch (error) {
  //       console.error('Database error:', error);
  //       res.status(500).json({ success: false, message: 'Database error' });
  //     }
  //   } else {
  //     res.status(405).json({ success: false, message: 'Method not allowed' });
  //   }
  // }

 
  import connection from '../../lib/db';

  export default async function handler(req, res) {
      if (req.method === 'GET') {
          const email = Array.isArray(req.query.email) ? req.query.email[0] : req.query.email;
          const sessionId = req.query.sessionId;
          
          console.log('Received email:', email);
          console.log('Received sessionId:', sessionId);
  
          try {
              console.log('Fetching user with email:', email);
              const [user] = await connection.execute('SELECT id FROM User WHERE email = ?', [email]);
              console.log('User fetch result:', user);
  
              if (user.length === 0) {
                  console.log('User not found');
                  return res.status(404).json({ success: false, message: 'User not found' });
              }
  
              const userId = user[0].id;
              console.log('User ID:', userId);
  
              let query = 'SELECT id, title FROM Session WHERE userId = ?';
              const queryParams = [userId];
  
              if (sessionId) {
                  query += ' AND id = ?';
                  queryParams.push(sessionId);
              }
  
              query += ' ORDER BY createdAt DESC';
  
              console.log('Executing query:', query);
              console.log('Query params:', queryParams);
  
              const [sessions] = await connection.execute(query, queryParams);
              console.log('Sessions fetched from database:', sessions);
  
              let messages = [];
              if (sessionId) {
                  console.log('Fetching messages for session:', sessionId);
                  const [history] = await connection.execute(
                      'SELECT userQuestion AS text, image, botReply FROM ChatSession WHERE sessionId = ? ORDER BY id ASC',
                      [sessionId]
                  );
                  console.log('Message history:', history);
  
                  messages = history.map(entry => [
                      { sender: 'user', text: entry.text, image: entry.image },
                      { sender: 'bot', text: entry.botReply },
                  ]).flat();
              }
  
              res.status(200).json({ success: true, history: { sessions, messages }, currentSessionId: sessionId });
          } catch (error) {
              console.error('Database error:', error);
              res.status(500).json({ success: false, message: 'Database error' });
          }
      } else {
          res.status(405).json({ success: false, message: 'Method not allowed' });
      }
  }
  