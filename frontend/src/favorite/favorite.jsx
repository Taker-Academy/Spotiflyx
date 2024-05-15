import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Row, Col, Button } from 'react-bootstrap';

const SPOTIFY_CLIENT_ID = "fc00e50de4ed4be7bb06faa37378a36e";
const SPOTIFY_CLIENT_SECRET = "b4563d6250554cb4951d69b88848b4e5";

function Favorites() {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:8080/fav/music', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response.data.ok) {
                    const favoriteIds = response.data.data.map(favorite => favorite.id);
                    const favoritesWithDetails = await Promise.all(favoriteIds.map(async id => {
                        const trackDetails = await fetchTrackDetails(id);
                        return trackDetails;
                    }));
                    setFavorites(favoritesWithDetails);
                }
            } catch (error) {
                console.error('Error fetching favorites:', error);
            }
        };

        fetchFavorites();
    }, []);

    const fetchTrackDetails = async (trackId) => {
      try {
          const token = await getSpotifyAccessToken();
          const response = await axios.get(`https://api.spotify.com/v1/tracks/${trackId}`, {
              headers: {
                  Authorization: `Bearer ${token}`
              }
          });
          const track = response.data;
          console.log("token" + track.id)
          return {
              id: track.id,
              title: track.name,
              artist: track.artists.map(artist => artist.name).join(', '),
              cover: track.album.images[0].url 
                      };
      } catch (error) {
          console.error('Error fetching track details:', error);
          return null;
      }
  };
  
  const getSpotifyAccessToken = async () => {
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
          return response.data.access_token;
      } catch (error) {
          console.error('Error fetching Spotify access token:', error);
          throw error;
      }
  };
  

    const handleRemoveFavorite = async (favoriteId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:8080/fav/music/${favoriteId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setFavorites(favorites.filter(favorite => favorite.id !== favoriteId));
        } catch (error) {
            console.error('Error removing favorite:', error);
        }
    };

    return (
        <div>
            <h2>Your Favorites</h2>
            <Row className="mx-2 row-cols-1 row-cols-md-2 row-cols-lg-3">
                {favorites.map((favorite, index) => (
                    <Col key={index} xs={12} md={4} className="card-item mb-3">
                        {favorite ? (
                            <Card>
                                <Card.Img variant="top" src={favorite.cover} />
                                <Card.Body>
                                    <Card.Title>{favorite.title}</Card.Title>
                                    <Card.Text>By {favorite.artist}</Card.Text>
                                    <Button variant="danger" onClick={() => handleRemoveFavorite(favorite.id)}>Remove</Button>
                                </Card.Body>
                            </Card>
                        ) : (
                            <div>No track found</div>
                        )}
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default Favorites;
