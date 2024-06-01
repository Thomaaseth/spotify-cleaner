import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const redirectUri = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI;

const Callback = () => {
  const router = useRouter();
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const fetchToken = async (code) => {
      const codeVerifier = localStorage.getItem('code_verifier');

      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: clientId,
          grant_type: 'authorization_code',
          code,
          redirect_uri: redirectUri,
          code_verifier: codeVerifier,
        }),
      });

      const data = await response.json();

      if (data.access_token) {
        localStorage.setItem('access_token', data.access_token);
        setAccessToken(data.access_token);
      }
    };

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      fetchToken(code);
    }
  }, [router]);

  return (
    <div>
      {accessToken ? (
        <div>
          <h1>Access Token Obtained Successfully!</h1>
          <p>Access Token: {accessToken}</p>
        </div>
      ) : (
        <h1>Logging in...</h1>
      )}
    </div>
  );
};

export default Callback;