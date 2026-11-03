import React from 'react';
import { Toaster } from 'sonner';
import { ShopProvider } from './contexts/ShopContext';
import { ReviewProvider } from './contexts/ReviewContext';
import { LandingPage } from './components/LandingPage';

type PreviewPhase = 'auto' | 'open' | 'closed';

interface AppProps {
  previewPhase?: PreviewPhase;
}

export function App({ previewPhase = 'auto' }: AppProps) {
  return (
    <ShopProvider phaseOverride={previewPhase}>
      <ReviewProvider>
        <LandingPage />
        <Toaster
          position="top-center"
          toastOptions={{
            className: 'font-body',
            style: { border: '3px solid #4a2c1d', borderRadius: '18px', background: '#fff6e8', color: '#4a2c1d', boxShadow: '4px 4px 0 0 #4a2c1d' }
          }} />
        
      </ReviewProvider>
    </ShopProvider>);

}