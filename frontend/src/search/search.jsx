import React, { useState, useEffect } from 'react';
import { Container, InputGroup, FormControl, Button, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import './search.css';
import { Link } from 'react-router-dom';
import Spotify from '../spotifyPlayer/spotifyPlayer';


const SPOTIFY_CLIENT_ID = "fc00e50de4ed4be7bb06faa37378a36e";
const SPOTIFY_CLIENT_SECRET = "b4563d6250554cb4951d69b88848b4e5";

function Search() {
    const [searchInput, setSearchInput] = useState("");
    const [spotifyAccessToken, setSpotifyAccessToken] = useState("");
    const [spotifyTracks, setSpotifyTracks] = useState([]);
    const [youtubeResults, setYoutubeResults] = useState([]);
    const [spotifyURI, setSpotifyURI] = useState(null);
    const [favorites, setFavorites] = useState([]);

    const addToFavorites = async (trackId) => {
        try {
            const response = await axios.post(
                'http://localhost:8080/fav/music',
                { link: trackId },
                {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token'),
                    },
                }
            );
            if (response.data.ok) {
                setFavorites(prevFavorites => [...prevFavorites, trackId]);
            }
        } catch (error) {
            console.error('Error adding to favorites:', error);
        }
    };
    

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
            console.log("token" + localStorage.getItem('token'));

                const response = await axios.get('http://localhost:8080/fav/music', {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token'),
                    },
                });
                if (response.data.ok) {
                    setFavorites(response.data.data.map(favorite => favorite.link));
                }
            } catch (error) {
                console.error('Error fetching favorites:', error);
            }
        };

        fetchFavorites();
    }, []);
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
                setSpotifyAccessToken(response.data.access_token);
            } catch (error) {
                console.error('Error fetching Spotify access token:', error);
            }
        };

        if (!searchInput) {
            fetchSpotifyAccessToken();
        }

        fetchLatestYoutubeVideos();
    }, [searchInput]);

    async function fetchLatestYoutubeVideos() {
        try {
            const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
                params: {
                    part: 'snippet',
                    maxResults: 3,
                    order: 'date',
                    key: 'AIzaSyBjOUzjmLx_gtoGVkPXjtm8v39JGLOybNo',
                },
            });
            setYoutubeResults(response.data.items);
        } catch (error) {
            console.error('Error fetching YouTube data:', error);
        }
    }


    async function search() {
        console.log("Search for " + searchInput);
        var spotifyTrackParameters = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + spotifyAccessToken
            }
        }
        var spotifyTracks = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=track', spotifyTrackParameters)
            .then(response => response.json())
            .then(data => data.tracks.items);

        console.log(spotifyTracks);
        setSpotifyTracks(spotifyTracks);

        try {
            const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
                params: {
                    part: 'snippet',
                    maxResults: 6,
                    q: searchInput,
                    key: 'AIzaSyBjOUzjmLx_gtoGVkPXjtm8v39JGLOybNo',
                },
            });
            setYoutubeResults(response.data.items);
        } catch (error) {
            console.error('Error fetching YouTube data:', error);
        }
    }

    return (
        <div className="container">
            <Container>
                <InputGroup className="mb-3" size='lg'>
                    <FormControl
                        placeholder="Search for Artist"
                        type='input'
                        onKeyPress={event => {
                            if (event.key === "Enter") {
                                search();
                            }
                        }}
                        onChange={event => setSearchInput(event.target.value)}
                    />
                    <Button onClick={event => { search() }}>
                        Search
                    </Button>
                </InputGroup>
            </Container>
            <div className="section-title">Spotify Tracks</div>
            <Row className="mx-2 row-cols-1 row-cols-md-2 row-cols-lg-3">
                {spotifyTracks.slice(0, 6).map(track => (
                    <Col key={track.id} xs={12} md={4} className="card-item mb-3">
                        <Card>
                            <Card.Img src={track.album.images[0].url} alt={track.album.name} className='img'/>
                            <Card.Body>
                                <Card.Title>{track.name}</Card.Title>
                                <Card.Text>{track.artists.map(artist => artist.name).join(", ")}</Card.Text>
                                <Button onClick={() => setSpotifyURI(track.uri)}>Play</Button>
                                <Button onClick={() => addToFavorites(track.id)}>Like</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <div className="section-title">YouTube Videos</div>
            <Row className="mx-2 row-cols-1 row-cols-md-2 row-cols-lg-3">
                {youtubeResults.map((item) => (
                    <Col key={item.id.videoId} xs={12} md={4} className="card-item mb-3">
                        <Card>
                            <Card.Img src={item.snippet.thumbnails.medium.url} alt={item.snippet.title} className='img'/>
                            <Card.Body>
                                <Card.Title>{item.snippet.title}</Card.Title>
                                <Card.Text>{item.snippet.description}</Card.Text>
                                <Link to={`/youtube-player/${item.id.videoId}`}>Watch</Link>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            {spotifyURI && <Spotify accessToken={spotifyAccessToken} uris={[spotifyURI]} />}
        </div>
    );
}

export default Search;
