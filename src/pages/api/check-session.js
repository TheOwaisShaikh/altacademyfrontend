import connection from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { sessionId } = req.query;

    try {
      const [session] = await connection.execute(
        'SELECT id FROM Session WHERE id = ? AND endedAt IS NULL',
        [sessionId]
      );

      if (session.length > 0) {
        console.log(`Session ID ${sessionId} is active.`);
        res.status(200).json({ success: true, active: true });
      } else {
        console.log(`Session ID ${sessionId} is not active.`);
        res.status(200).json({ success: true, active: false });
      }
    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ success: false, message: 'Database error' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}
