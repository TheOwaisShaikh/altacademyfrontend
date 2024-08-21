// import connection from '../../lib/db';

// export default async function handler(req, res) {
//   if (req.method === 'POST') {
//     const { email } = req.body;

//     try {
//       // Check if the user already exists
//       const [existingUser] = await connection.execute('SELECT * FROM User WHERE email = ?', [email]);

//       if (existingUser.length > 0) {
//         // User exists
//         res.status(200).json({ success: true, message: 'User exists', user: existingUser[0] });
//       } else {
//         // User does not exist, create a new user
//         const [result] = await connection.execute('INSERT INTO User (email) VALUES (?)', [email]);

//         if (result.insertId) {
//           res.status(201).json({ success: true, message: 'New user created', userId: result.insertId });
//         } else {
//           res.status(500).json({ success: false, message: 'Failed to create user' });
//         }
//       }
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
//   if (req.method === 'POST') {
//     const email = 'hardcoded@example.com'; // Hardcoded email

//     try {
//       // Check if the user already exists
//       const [existingUser] = await connection.execute('SELECT * FROM User WHERE email = ?', [email]);

//       if (existingUser.length > 0) {
//         // User exists
//         res.status(200).json({ success: true, message: 'User exists', user: existingUser[0] });
//       } else {
//         // User does not exist, create a new user
//         const [result] = await connection.execute('INSERT INTO User (email) VALUES (?)', [email]);

//         if (result.insertId) {
//           res.status(201).json({ success: true, message: 'New user created', userId: result.insertId });
//         } else {
//           res.status(500).json({ success: false, message: 'Failed to create user' });
//         }
//       }
//     } catch (error) {
//       console.error('Database error:', error);
//       res.status(500).json({ success: false, message: 'Database error' });
//     }
//   } else {
//     res.status(405).json({ success: false, message: 'Method not allowed' });
//   }
// }
