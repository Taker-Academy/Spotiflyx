import React, { useState, useEffect } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';
import axios from 'axios';

const SPOTIFY_CLIENT_ID = "fc00e50de4ed4be7bb06faa37378a36e";
const SPOTIFY_CLIENT_SECRET = "b4563d6250554cb4951d69b88848b4e5";

function Spotify() {
    const [accessToken, setAccessToken] = useState("");

    useEffect(() => {
        const fetchSpotifyAccessToken = async () => {
            try {
                const response = await axios.post('https://accounts.spotify.com/api/token', null, {
                    params: {
                        grant_type: 'client_credentials',
                    },
                    headers: {
                        Authorization: 'Basic ' + btoa(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET),
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                });
                setAccessToken(response.data.access_token);
            } catch (error) {
                console.error('Error fetching Spotify access token:', error);
            }
        };

        fetchSpotifyAccessToken();
    }, []);

    return (
        <SpotifyPlayer
            token={accessToken}
            uris={[]}
            autoPlay={true}
            magnifySliderOnHover={true}
            styles={{
                bgColor: '#333',
                color: '#fff',
                loaderColor: '#fff',
                sliderColor: '#1cb954',
                savedColor: '#fff',
                trackArtistColor: '#ccc',
                trackNameColor: '#fff',
            }}
        />
    );
}

export default Spotify;
