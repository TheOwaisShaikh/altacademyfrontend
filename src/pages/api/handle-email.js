// // /pages/api/handle-email.js

// export default function handler(req, res) {
//     // Set CORS headers to allow requests from https://altacademy.org
//     res.setHeader('Access-Control-Allow-Origin', 'https://altacademy.org');
//     res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

//     // Handle preflight requests (OPTIONS)
//     if (req.method === 'OPTIONS') {
//         return res.status(200).end(); // End the preflight request
//     }

//     if (req.method === 'POST') {
//         const { email } = req.body;

//         // Check if the email is provided
//         if (!email) {
//             return res.status(400).json({ success: false, message: 'Email is required.' });
//         }

//         // Handle the email data (e.g., save it to a database, log it, etc.)
//         console.log('Received email:', email);

//         // Respond with success
//         return res.status(200).json({ success: true, message: 'Email received successfully.' });
//     } else {
//         // Handle any other HTTP methods
//         res.setHeader('Allow', ['POST', 'OPTIONS']);
//         res.status(405).end(`Method ${req.method} Not Allowed`);
//     }
// }
// export default function handler(req, res) {
//     // Set CORS headers
//     res.setHeader('Access-Control-Allow-Origin', 'https://altacademy.org');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
//     // Handle preflight requests
//     if (req.method === 'OPTIONS') {
//         console.log('Received OPTIONS request');
//         return res.status(200).end(); // End the preflight request
//     }

//     if (req.method === 'POST') {
//         console.log('POST request received');
//         console.log('Request headers:', req.headers);
//         console.log('Request body:', req.body); // Log the entire request body

//         try {
//             const { email } = req.body;

//             if (!email) {
//                 console.error('Email is required but not provided.');
//                 return res.status(400).json({ success: false, message: 'Email is required.' });
//             }

//             console.log('Received valid email:', email);
//             return res.status(200).json({ success: true, email: email, message: 'Email received successfully.' });

//         } catch (error) {
//             console.error('Error processing request:', error);
//             return res.status(500).json({ success: false, message: 'Internal Server Error' });
//         }
//     } else {
//         console.log(`Received ${req.method} request, but only POST is allowed`);
//         res.setHeader('Allow', ['POST', 'OPTIONS']);
//         return res.status(405).end(`Method ${req.method} Not Allowed`);
//     }
// }

// Temporary in-memory storage for demonstration (not for production)
let receivedEmail = null;

export default function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', 'https://altacademy.org');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    if (req.method === 'OPTIONS') {
        return res.status(200).end(); 
    }

    if (req.method === 'POST') {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ success: false, message: 'Email is required.' });
        }

        // Store the received email temporarily
        receivedEmail = email;

        // Log the received email to the console
        console.log('Received email:', email);

        return res.status(200).json({ success: true, email: email, message: 'Email received successfully.' });
    } else if (req.method === 'GET') {
        // Return the stored email if available
        if (receivedEmail) {
            return res.status(200).json({ success: true, email: receivedEmail });
        } else {
            return res.status(404).json({ success: false, message: 'No email found.' });
        }
    } else {
        res.setHeader('Allow', ['POST', 'GET', 'OPTIONS']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
