import connection from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }

    try {
      const [user] = await connection.execute('SELECT id FROM User WHERE email = ?', [email]);

      if (user.length === 0) {
        const [result] = await connection.execute('INSERT INTO User (email) VALUES (?)', [email]);
        const userId = result.insertId;

        await connection.execute('INSERT INTO Session (userId, title) VALUES (?, ?)', [userId, 'Welcome']);

        return res.status(200).json({ success: true, message: 'User created and logged in' });
      }

      res.status(200).json({ success: true, message: 'User logged in' });
    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ success: false, message: 'Database error' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}
