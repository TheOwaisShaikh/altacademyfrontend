import connection from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    const { sessionId } = req.query;

    try {
      // Delete the session from the database
      await connection.execute('DELETE FROM Session WHERE id = ?', [sessionId]);
      await connection.execute('DELETE FROM ChatSession WHERE sessionId = ?', [sessionId]);

      console.log(`Session with ID ${sessionId} has been deleted successfully.`);
      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ success: false, message: 'Database error' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}
