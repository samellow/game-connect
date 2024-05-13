
import { createRoot } from 'react-dom/client';
import App from './App'; 
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import React from 'react';
import { AuthContextProvider } from './context/AuthContext';
import { SocketContextProvider } from './context/SocketContext';
import { GamersRankingContextProvider } from './context/GamersRankingContext';
const root = document.getElementById('root');
const rootContainer = createRoot(root);
rootContainer.render(
    <React.StrictMode>
        <AuthContextProvider>
          <GamersRankingContextProvider>

          <SocketContextProvider>

            <BrowserRouter>
                <App />
            </BrowserRouter>
          </SocketContextProvider>
          </GamersRankingContextProvider>
        </AuthContextProvider>


    
    </React.StrictMode>
);
