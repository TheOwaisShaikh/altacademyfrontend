import connection from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { sessionId } = req.query;

    try {
      const [session] = await connection.execute(
        'UPDATE Session SET endedAt = NOW() WHERE id = ?',
        [sessionId]
      );

      if (session.affectedRows > 0) {
        console.log(`Session ID ${sessionId} has been ended.`);
        res.status(200).json({ success: true });
      } else {
        console.log(`Session ID ${sessionId} could not be found.`);
        res.status(404).json({ success: false, message: 'Session not found' });
      }
    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ success: false, message: 'Database error' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}
