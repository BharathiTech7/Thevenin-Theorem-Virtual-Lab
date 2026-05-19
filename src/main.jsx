import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import WalkthroughProvider from './walkthrough/WalkthroughProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WalkthroughProvider>
      <App />
    </WalkthroughProvider>
  </StrictMode>,
)
