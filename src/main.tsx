import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { GameStateProvider } from './context/GameStateContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GameStateProvider>
      <App />
    </GameStateProvider>
  </React.StrictMode>,
)
