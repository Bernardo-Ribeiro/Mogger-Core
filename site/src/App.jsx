import React, { useState } from 'react';
import Navbar from './components/Navbar';
import FloatingBubbles from './components/FloatingBubbles';
import Hero from './components/Hero';
import AeroGadgets from './components/AeroGadgets';
import CarrinhoViewer from './components/CarrinhoViewer';
import MascoteChad from './components/MascoteChad';
import TrackSimulator from './components/TrackSimulator';
import EquipeSection from './components/EquipeSection';
import Footer from './components/Footer';
import MsnToast from './components/MsnToast';

export default function App() {
  const [isGadgetsOpen, setIsGadgetsOpen] = useState(true);
  const [activeWallpaper, setActiveWallpaper] = useState('biosphere'); // 'biosphere' | 'skyline'

  const toggleGadgets = () => {
    setIsGadgetsOpen((prev) => !prev);
  };

  const handleExploreClick = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen relative font-segoe selection:bg-lime-400 selection:text-black">
      {/* Dynamic Background Elements: Wallpapers (from User / Archive), Bubbles, Sun Rays, Butterfly */}
      <FloatingBubbles activeWallpaper={activeWallpaper} />

      {/* Navigation Bar */}
      <Navbar 
        onOpenGadgets={toggleGadgets} 
        isGadgetsOpen={isGadgetsOpen} 
        currentWallpaper={activeWallpaper}
        onSelectWallpaper={setActiveWallpaper}
      />

      {/* Windows Vista Sidebar Gadgets */}
      <AeroGadgets 
        isOpen={isGadgetsOpen} 
        onClose={() => setIsGadgetsOpen(false)} 
        currentWallpaper={activeWallpaper}
        onSelectWallpaper={setActiveWallpaper}
      />

      {/* Main Content Sections */}
      <main className="relative z-10 space-y-8">
        <Hero onExploreClick={handleExploreClick} />
        <CarrinhoViewer />
        <MascoteChad />
        <TrackSimulator />
        <EquipeSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* MSN Messenger Toast Notification */}
      <MsnToast />
    </div>
  );
}
