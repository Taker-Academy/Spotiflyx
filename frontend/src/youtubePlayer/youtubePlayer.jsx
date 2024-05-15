import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function YouTubePlayer() {
    const { videoId } = useParams();
    const [videoInfo, setVideoInfo] = useState(null);

    useEffect(() => {
        const fetchVideoInfo = async () => {
            try {
                const response = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
                    params: {
                        part: 'snippet, statistics',
                        id: videoId,
                        key: 'AIzaSyBjOUzjmLx_gtoGVkPXjtm8v39JGLOybNo',
                    },
                });
                setVideoInfo(response.data.items[0]);
            } catch (error) {
                console.error('Error fetching video info:', error);
            }
        };

        fetchVideoInfo();
    }, [videoId]);

    return (
        <div className="youtube-player">
            {videoInfo && (
                <>
                    <h2>{videoInfo.snippet.title}</h2>
                    <p>Chaîne: {videoInfo.snippet.channelTitle}</p>
                    <p>Likes: {videoInfo.statistics.likeCount}</p>
                    <iframe
                        width="100%"
                        height="500"
                        src={`https://www.youtube.com/embed/${videoId}`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </>
            )}
        </div>
    );
}

export default YouTubePlayer;
