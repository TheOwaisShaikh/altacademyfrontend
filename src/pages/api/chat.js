// import connection from '../../lib/db';
// import { formidable } from 'formidable';
// import fs from 'fs';
// import path from 'path';

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export default async function handler(req, res) {
//   if (req.method === 'POST') {
//     const uploadDir = path.join(process.cwd(), 'public/uploads');

//     if (!fs.existsSync(uploadDir)) {
//       fs.mkdirSync(uploadDir, { recursive: true });
//     }

//     const form = formidable({
//       uploadDir,
//       keepExtensions: true,
//     });

//     form.parse(req, async (err, fields, files) => {
//       if (err) {
//         console.error('Form parsing error:', err);
//         res.status(500).json({ success: false, message: 'Form parsing error' });
//         return;
//       }

//       const { email, text } = fields;
//       let imageUrl = null;

//       if (files.image && files.image[0]) {
//         const file = files.image[0];
//         const originalFilename = file.originalFilename;
//         const fileExtension = path.extname(originalFilename);
//         const newFilename = file.newFilename + fileExtension;
//         const filePath = path.join(uploadDir, newFilename);
//         fs.renameSync(file.filepath, filePath);
//         imageUrl = `/uploads/${newFilename}`;
//       }

//       try {
//         let [user] = await connection.execute('SELECT id FROM User WHERE email = ?', [email]);

//         if (user.length === 0) {
//           const [newUser] = await connection.execute('INSERT INTO User (email) VALUES (?)', [email]);
//           user = [{ id: newUser.insertId }];
//         }

//         const userId = user[0].id;
//         let sessionId;

//         // Check if there's an ongoing session that has not been ended
//         let [ongoingSession] = await connection.execute(
//           'SELECT id FROM Session WHERE userId = ? AND endedAt IS NULL ORDER BY createdAt DESC LIMIT 1',
//           [userId]
//         );

//         if (ongoingSession.length === 0) {
//           const title = text || 'New Chat Session';

//           // Insert a new session and get its ID
//           const [newSession] = await connection.execute(
//             'INSERT INTO Session (userId, title) VALUES (?, ?)',
//             [userId, title]
//           );

//           sessionId = newSession.insertId; // Get the newly generated session ID
//         } else {
//           sessionId = ongoingSession[0].id;
//         }

//         // Save the chat session to the database
//         await connection.execute(
//           'INSERT INTO ChatSession (userId, sessionId, userQuestion, image, botReply) VALUES (?, ?, ?, ?, ?)',
//           [userId, sessionId, text, imageUrl, 'Thanks for using me!']
//         );

//         res.status(200).json({ success: true, reply: 'Thanks for using me!', imageUrl, sessionId });
//       } catch (error) {
//         console.error('Database error:', error);
//         res.status(500).json({ success: false, message: 'Database error' });
//       }
//     });
//   } else {
//     res.status(405).json({ success: false, message: 'Method not allowed' });
//   }
// }
    // import connection from '../../lib/db';
    // import { formidable } from 'formidable';
    // import fs from 'fs';
    // import path from 'path';

    // export const config = {
    // api: {
    //     bodyParser: false,
    // },
    // };

    // export default async function handler(req, res) {
    // if (req.method === 'POST') {
    //     const uploadDir = path.join(process.cwd(), 'public/uploads');

    //     if (!fs.existsSync(uploadDir)) {
    //     fs.mkdirSync(uploadDir, { recursive: true });
    //     }

    //     const form = formidable({
    //     uploadDir,
    //     keepExtensions: true,
    //     });

    //     form.parse(req, async (err, fields, files) => {
    //     if (err) {
    //         console.error('Form parsing error:', err);
    //         return res.status(500).json({ success: false, message: 'Form parsing error' });
    //     }

    //     const email = Array.isArray(fields.email) ? fields.email[0] : fields.email;
    //     const text = Array.isArray(fields.text) ? fields.text[0] : fields.text;
    //     console.log('Received email:', email);
    //     console.log('Received text:', text);

    //     let imageUrl = null;

    //     if (files.image && files.image[0]) {
    //         const file = files.image[0];
    //         const originalFilename = file.originalFilename;
    //         const fileExtension = path.extname(originalFilename);
    //         const newFilename = file.newFilename + fileExtension;
    //         const filePath = path.join(uploadDir, newFilename);
    //         fs.renameSync(file.filepath, filePath);
    //         imageUrl = `/uploads/${newFilename}`;
    //     }

    //     try {
    //         console.log('Fetching user with email:', email);
    //         let [user] = await connection.execute('SELECT id FROM User WHERE email = ?', [email]);
    //         console.log('User fetch result:', user);

    //         let userId;
    //         if (user.length === 0) {
    //         console.log('User not found, creating new user');
    //         const [newUser] = await connection.execute('INSERT INTO User (email) VALUES (?)', [email]);
    //         userId = newUser.insertId;
    //         console.log('New user created with ID:', userId);
    //         } else {
    //         userId = user[0].id;
    //         }
    //         console.log('User ID:', userId);

    //         let sessionId;
    //         console.log('Checking for ongoing session');
    //         let [ongoingSession] = await connection.execute(
    //         'SELECT id FROM Session WHERE userId = ? AND endedAt IS NULL ORDER BY createdAt DESC LIMIT 1',
    //         [userId]
    //         );
    //         console.log('Ongoing session result:', ongoingSession);

    //         if (ongoingSession.length === 0) {
    //         const title = text || 'New Chat Session';
    //         console.log('Creating new session with title:', title);
    //         const [newSession] = await connection.execute(
    //             'INSERT INTO Session (userId, title) VALUES (?, ?)',
    //             [userId, title]
    //         );
    //         sessionId = newSession.insertId;
    //         console.log('New session created with ID:', sessionId);
    //         } else {
    //         sessionId = ongoingSession[0].id;
    //         console.log('Using existing session with ID:', sessionId);
    //         }

    //         console.log('Inserting chat message');
    //         await connection.execute(
    //         'INSERT INTO ChatSession (userId, sessionId, userQuestion, image, botReply) VALUES (?, ?, ?, ?, ?)',
    //         [userId, sessionId, text, imageUrl, 'Thanks for using me!']
    //         );

    //         res.status(200).json({ success: true, reply: 'Thanks for using me!', imageUrl, sessionId });
    //     } catch (error) {
    //         console.error('Database error:', error);
    //         res.status(500).json({ success: false, message: 'Database error' });
    //     }
    //     });
    // } else {
    //     res.status(405).json({ success: false, message: 'Method not allowed' });
    // }
    // }

    // import connection from '../../lib/db';
    // import { formidable } from 'formidable';
    // import fs from 'fs';
    // import path from 'path';
    // import axios from 'axios';
    
    // export const config = {
    //   api: {
    //     bodyParser: false,
    //   },
    // };
    
    // export default async function handler(req, res) {
    //   if (req.method === 'POST') {
    //     const uploadDir = path.join(process.cwd(), 'public/uploads');
    
    //     if (!fs.existsSync(uploadDir)) {
    //       fs.mkdirSync(uploadDir, { recursive: true });
    //     }
    
    //     const form = formidable({
    //       uploadDir,
    //       keepExtensions: true,
    //     });
    
    //     form.parse(req, async (err, fields, files) => {
    //       if (err) {
    //         console.error('Form parsing error:', err);
    //         return res.status(500).json({ success: false, message: 'Form parsing error' });
    //       }
    
    //       const email = Array.isArray(fields.email) ? fields.email[0] : fields.email;
    //       const text = Array.isArray(fields.text) ? fields.text[0] : fields.text;
    //       console.log('Received email:', email);
    //       console.log('Received text:', text);
    
    //       let imageUrl = null;
    //       let imageFile = null;
    
    //       if (files.image && files.image[0]) {
    //         const file = files.image[0];
    //         const originalFilename = file.originalFilename;
    //         const fileExtension = path.extname(originalFilename);
    //         const newFilename = file.newFilename + fileExtension;
    //         const filePath = path.join(uploadDir, newFilename);
    //         fs.renameSync(file.filepath, filePath);
    //         imageUrl = `/uploads/${newFilename}`;
    //         imageFile = fs.createReadStream(filePath);
    //       }
    
    //       try {
    //         console.log('Fetching user with email:', email);
    //         let [user] = await connection.execute('SELECT id FROM User WHERE email = ?', [email]);
    //         console.log('User fetch result:', user);
    
    //         let userId;
    //         if (user.length === 0) {
    //           console.log('User not found, creating new user');
    //           const [newUser] = await connection.execute('INSERT INTO User (email) VALUES (?)', [email]);
    //           userId = newUser.insertId;
    //           console.log('New user created with ID:', userId);
    //         } else {
    //           userId = user[0].id;
    //         }
    //         console.log('User ID:', userId);
    
    //         let sessionId;
    //         console.log('Checking for ongoing session');
    //         let [ongoingSession] = await connection.execute(
    //           'SELECT id FROM Session WHERE userId = ? AND endedAt IS NULL ORDER BY createdAt DESC LIMIT 1',
    //           [userId]
    //         );
    //         console.log('Ongoing session result:', ongoingSession);
    
    //         if (ongoingSession.length === 0) {
    //           const title = text || 'New Chat Session';
    //           console.log('Creating new session with title:', title);
    //           const [newSession] = await connection.execute(
    //             'INSERT INTO Session (userId, title) VALUES (?, ?)',
    //             [userId, title]
    //           );
    //           sessionId = newSession.insertId;
    //           console.log('New session created with ID:', sessionId);
    //         } else {
    //           sessionId = ongoingSession[0].id;
    //           console.log('Using existing session with ID:', sessionId);
    //         }
    
    //         console.log('Sending data to Django backend...');
    //         const formData = new FormData();
    //         formData.append('question', text);
    //         formData.append('session_id', sessionId);
    
    //         if (imageFile) {
    //           formData.append('image', imageFile);
    //         }
    
    //         const djangoResponse = await axios.post('http://localhost:8000/chatbot/', formData, {
    //             headers: {
    //               'Content-Type': 'multipart/form-data',
    //             },
    //           });
    
    //         const botReply = djangoResponse.data.response;
    
    //         console.log('Inserting chat message');
    //         await connection.execute(
    //           'INSERT INTO ChatSession (userId, sessionId, userQuestion, image, botReply) VALUES (?, ?, ?, ?, ?)',
    //           [userId, sessionId, text, imageUrl, botReply]
    //         );
    
    //         res.status(200).json({ success: true, reply: botReply, imageUrl, sessionId });
    //       } catch (error) {
    //         console.error('Database or Django error:', error);
    //         res.status(500).json({ success: false, message: 'Database or Django error' });
    //       }
    //     });
    //   } else {
    //     res.status(405).json({ success: false, message: 'Method not allowed' });
    //   }
    // } //this one is perfect code
    import formidable from 'formidable';
    import fs from 'fs';
    import path from 'path';
    import connection from '../../lib/db'; // Assuming you have a connection setup for MySQL
    import axios from 'axios';
    
    export const config = {
      api: {
        bodyParser: false, // Disabling bodyParser so that formidable can handle the request
      },
    };
    
    export default async function handler(req, res) {
      if (req.method === 'POST') {
        const uploadDir = path.join(process.cwd(), 'public/uploads');
        
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }
    
        const form = formidable({
          uploadDir,
          keepExtensions: true,
          multiples: false,
        });
    
        form.parse(req, async (err, fields, files) => {
          if (err) {
            console.error('Form parsing error:', err);
            return res.status(500).json({ success: false, message: 'Form parsing error' });
          }
    
          // Extract email from the fields object
          const email = String(fields.email || '').trim(); 
          let text = String(fields.question || '').trim(); 
    
          // Initialize image variables
          let imageUrl = null;
          let imageFile = null;
    
          if (files.image) {
            const file = Array.isArray(files.image) ? files.image[0] : files.image;
            console.log('Received image:', file);
            const originalFilename = file.originalFilename;
            const fileExtension = path.extname(originalFilename);
            const newFilename = file.newFilename + fileExtension;
            const filePath = path.join(uploadDir, newFilename);
            fs.renameSync(file.filepath, filePath);
            imageUrl = `/uploads/${newFilename}`;
            imageFile = fs.readFileSync(filePath); // Read file as Buffer
          } else {
            console.error('No image file found in the request');
          }
    
          // If no text is provided but an image is present, use the image as the "text" for processing.
          if (!text && imageFile) {
            text = 'Image provided';  // Placeholder text, you can customize this
          } else if (!text && !imageFile) {
            // If both text and image are missing, return an error
            return res.status(400).json({ success: false, message: 'Either a question or an image is required.' });
          }
    
          try {
            console.log('Fetching user with email:', email);
            let [user] = await connection.execute('SELECT id FROM User WHERE email = ?', [email]);
            console.log('User fetch result:', user);
    
            let userId;
            if (user.length === 0) {
              console.log('User not found, creating new user');
              const [newUser] = await connection.execute('INSERT INTO User (email) VALUES (?)', [email]);
              userId = newUser.insertId;
              console.log('New user created with ID:', userId);
            } else {
              userId = user[0].id;
            }
            console.log('User ID:', userId);
    
            let sessionId;
            console.log('Checking for ongoing session');
            let [ongoingSession] = await connection.execute(
              'SELECT id FROM Session WHERE userId = ? AND endedAt IS NULL ORDER BY createdAt DESC LIMIT 1',
              [userId]
            );
            console.log('Ongoing session result:', ongoingSession);
    
            if (ongoingSession.length === 0) {
              const title = text || 'New Chat Session';
              console.log('Creating new session with title:', title);
              const [newSession] = await connection.execute(
                'INSERT INTO Session (userId, title) VALUES (?, ?)',
                [userId, title]
              );
              sessionId = newSession.insertId;
              console.log('New session created with ID:', sessionId);
            } else {
              sessionId = ongoingSession[0].id;
              console.log('Using existing session with ID:', sessionId);
            }
    
            if (!sessionId) {
              console.error('Session ID is required.');
              return res.status(400).json({ success: false, message: 'Session ID is required.' });
            }
    
            console.log('Sending data to Django backend...');
            const formData = new FormData();
            formData.append('email', email); 
            formData.append('session_id', sessionId);
            formData.append('question', text);
            
            if (imageFile) {
              const blob = new Blob([imageFile]); 
              formData.append('image', blob, imageUrl); 
            }
    
            const djangoResponse = await axios.post('http://127.0.0.1:8000/chatbot/', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
    
            const botReply = djangoResponse.data.response;
    
            console.log('Inserting chat message');
            await connection.execute(
              'INSERT INTO ChatSession (userId, sessionId, userQuestion, image, botReply) VALUES (?, ?, ?, ?, ?)',
              [userId, sessionId, text, imageUrl, botReply]
            );
    
            res.status(200).json({ success: true, reply: botReply, imageUrl, sessionId });
          } catch (error) {
            console.error('Database or Django error:', error);
            res.status(500).json({ success: false, message: 'Database or Django error' });
          }
        });
      } else {
        res.status(405).json({ success: false, message: 'Method not allowed' });
      }
    }
    

// const djangoResponse = await axios.post('http://127.0.0.1:8000/chatbot/', formData, {
//     headers: {
//       'Content-Type': 'multipart/form-data',
//     },
//   });

// import connection from '../../lib/db';
// import { formidable } from 'formidable';
// import fs from 'fs';
// import path from 'path';
// import axios from 'axios';
// import { Blob } from 'buffer'; // Import Blob for environments that don't have it

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export default async function handler(req, res) {
//   if (req.method === 'POST') {
//     const uploadDir = path.join(process.cwd(), 'public/uploads');

//     // Ensure the upload directory exists
//     if (!fs.existsSync(uploadDir)) {
//       fs.mkdirSync(uploadDir, { recursive: true });
//     }

//     const form = formidable({
//       uploadDir,
//       keepExtensions: true,
//       multiples: false, // Ensure only one file is uploaded at a time
//     });

//     form.parse(req, async (err, fields, files) => {
//       if (err) {
//         console.error('Form parsing error:', err);
//         return res.status(500).json({ success: false, message: 'Form parsing error' });
//       }
    
//       console.log('Parsed fields:', fields);
//       console.log('Parsed files:', files);

//       const email = Array.isArray(fields.email) ? fields.email[0] : fields.email;
//       const text = Array.isArray(fields.question) ? fields.question[0] : fields.question;

//       console.log('Received email:', email);
//       console.log('Received text:', text);

//       if (!email || !text) {
//         return res.status(400).json({ success: false, message: 'Email and text are required.' });
//       }

//       let imageUrl = null;
//       let imageFile = null;

//       if (files.image) {
//         const file = Array.isArray(files.image) ? files.image[0] : files.image;
//         const originalFilename = file.originalFilename;
//         const fileExtension = path.extname(originalFilename);
//         const newFilename = file.newFilename + fileExtension;
//         const filePath = path.join(uploadDir, newFilename);
//         fs.renameSync(file.filepath, filePath); // Rename file to include extension
//         imageUrl = `/uploads/${newFilename}`;
//         imageFile = fs.readFileSync(filePath); // Read file as Buffer
//       }

//       try {
//         console.log('Fetching user with email:', email);
//         let [user] = await connection.execute('SELECT id FROM User WHERE email = ?', [email]);
//         console.log('User fetch result:', user);

//         let userId;
//         if (user.length === 0) {
//           console.log('User not found, creating new user');
//           const [newUser] = await connection.execute('INSERT INTO User (email) VALUES (?)', [email]);
//           userId = newUser.insertId;
//           console.log('New user created with ID:', userId);
//         } else {
//           userId = user[0].id;
//         }
//         console.log('User ID:', userId);

//         let sessionId;
//         console.log('Checking for ongoing session');
//         let [ongoingSession] = await connection.execute(
//           'SELECT id FROM Session WHERE userId = ? AND endedAt IS NULL ORDER BY createdAt DESC LIMIT 1',
//           [userId]
//         );
//         console.log('Ongoing session result:', ongoingSession);

//         if (ongoingSession.length === 0) {
//           const title = text || 'New Chat Session';
//           console.log('Creating new session with title:', title);
//           const [newSession] = await connection.execute(
//             'INSERT INTO Session (userId, title) VALUES (?, ?)',
//             [userId, title]
//           );
//           sessionId = newSession.insertId;
//           console.log('New session created with ID:', sessionId);
//         } else {
//           sessionId = ongoingSession[0].id;
//           console.log('Using existing session with ID:', sessionId);
//         }

//         console.log('Sending data to Django backend...');
//         const formData = new FormData();
//         formData.append('question', text);
//         formData.append('session_id', sessionId);
//         formData.append('email', email); // Add email to the form data

//         if (imageFile) {
//           const blob = new Blob([imageFile]); // Convert Buffer to Blob
//           formData.append('image', blob, newFilename); // Append Blob with a filename
//         }

//         const djangoResponse = await axios.post('http://127.0.0.1:8000/chatbot/', formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         });

//         const botReply = djangoResponse.data.response;

//         console.log('Inserting chat message');
//         await connection.execute(
//           'INSERT INTO ChatSession (userId, sessionId, userQuestion, image, botReply) VALUES (?, ?, ?, ?, ?)',
//           [userId, sessionId, text, imageUrl, botReply]
//         );

//         res.status(200).json({ success: true, reply: botReply, imageUrl, sessionId });
//       } catch (error) {
//         console.error('Database or Django error:', error);
//         res.status(500).json({ success: false, message: 'Database or Django error' });
//       }
//     });
//   } else {
//     res.status(405).json({ success: false, message: 'Method not allowed' });
//   }
// }
