import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const res = await fetch('/api/handle-email', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await res.json();

        if (data.success && data.email) {
          setEmail(data.email);
          handleLogin(data.email);  // Automatically attempt to log in
        } else {
          setLoading(false); // Stop loading if no email is found
          console.error('No email found or failed to fetch email');
        }
      } catch (err) {
        setLoading(false); // Stop loading if an error occurs
        console.error('Failed to fetch email:', err);
      }
    };

    fetchEmail();
  }, []);

  const handleLogin = async (loginEmail) => {
    const userEmail = loginEmail || email;

    if (!userEmail.trim()) {
      setError('Email is required');
      setLoading(false); // Stop loading if email is not provided
      return;
    }

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: userEmail }),
      });

      const data = await res.json();

      if (data.success) {
        sessionStorage.setItem('userEmail', userEmail);
        router.push('/'); // Redirect to the chat page
      } else {
        setError(data.message || 'Login failed');
        setLoading(false); // Stop loading if login fails
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred during login');
      setLoading(false); // Stop loading if an error occurs
    }
  };

  // Show a loading spinner or custom icon while loading
  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <img src="/path/to/your/loading-spinner.gif" alt="Loading..." /> {/* Replace with your custom spinner or image */}
      </div>
    );
  }

  return (
    <div>
      <h1>Login</h1>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={() => handleLogin()}>Login</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
