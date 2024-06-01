import { useEffect } from 'react';
import { generateRandomString, generateCodeChallenge } from '../utils/auth';

const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const redirectUri = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI;

const Landing = () => {
  const handleLogin = async () => {
    const codeVerifier = generateRandomString(64);
    const codeChallenge = await generateCodeChallenge(codeVerifier);

    localStorage.setItem('code_verifier', codeVerifier);

    const params = new URLSearchParams({
      response_type: 'code',
      client_id: clientId,
      scope: 'user-read-private user-read-email',
      code_challenge_method: 'S256',
      code_challenge: codeChallenge,
      redirect_uri: redirectUri,
    });

    window.location.href = `https://accounts.spotify.com/authorize?${params.toString()}`;
  };

  return (
    <div>
      <h1>Spotify Auth with PKCE</h1>
      <button onClick={handleLogin}>Login with Spotify</button>
    </div>
  );
};

export default Landing;