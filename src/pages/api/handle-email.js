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
export default function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', 'https://altacademy.org');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        console.log('Received OPTIONS request');
        return res.status(200).end(); // End the preflight request
    }

    if (req.method === 'POST') {
        console.log('POST request received');
        console.log('Request body:', req.body);  // Log the entire request body

        const { email } = req.body;

        // Validate email
        if (!email) {
            console.error('Email is required but not provided.');
            return res.status(400).json({ success: false, message: 'Email is required.' });
        }

        console.log('Received email:', email);

        // Respond with the email
        return res.status(200).json({ success: true, email: email, message: 'Email received successfully.' });
    } else {
        console.log(`Received ${req.method} request, but only POST is allowed`);
        res.setHeader('Allow', ['POST', 'OPTIONS']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
