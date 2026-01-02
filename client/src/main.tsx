import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { CssBaseline, GlobalStyles } from '@mui/material'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
  <CssBaseline/>
  <GlobalStyles
    styles={{
      body: {
        backgroundColor: "#FFD500",
      },
    }}
  />
      <App />
  </BrowserRouter>
)
