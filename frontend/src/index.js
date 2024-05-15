import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import App from './App';
import Navbar from './navbar/navbar';
import reportWebVitals from './reportWebVitals';
import Search from './search/search';
import Login from './login/login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './dashboard/dashboard';
import { Provider } from 'react-redux';
import ProtectedRoute from './protectedRoute/protectedRoute';
import { store, persistor } from './store'; 
import { PersistGate } from 'redux-persist/integration/react';
import { useState } from 'react';
import YouTubePlayer from './youtubePlayer/youtubePlayer';
import { useSelector } from 'react-redux';
import Favorites from './favorite/favorite';

function AppRouter() {
    const isLoggedIn = useSelector(state => state.isLoggedIn);
    const [redirect, setRedirect] = useState(false);

    const handleLoginSuccess = () => {
        setRedirect(true);
    };

    if (redirect) {
        return <Navigate to="/home" />;
    }

    return (
        <Router>
            <div>
                <Navbar /> 
                <Routes>
                    {isLoggedIn ? (
                        <>
                            <Route path="/home" element={<Search />} />
                            <Route path="/App" element={<App />} />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path='/youtube-player/:videoId' element={<YouTubePlayer />} />
                            <Route path='/fav' element={<Favorites></Favorites>}/>
                        </>
                    ) : (
                        <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
                    )}
                </Routes>
            </div>
        </Router>
    );
}


ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <ToastContainer />
            <AppRouter />
        </PersistGate>
    </Provider>,
    document.getElementById('root')
);

reportWebVitals();
