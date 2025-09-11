import { useState } from "react";
import { useLocation, Link } from "wouter";

export default function Landing() {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [, navigate] = useLocation();

  const handleEnterGame = () => {
    setLoading(true);
    setProgress(0);

    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            navigate("/game");
          }, 500);
          return 100;
        }
        return prev + Math.random() * 15 + 5; // Random progress increments
      });
    }, 150);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900/20 to-slate-900 flex items-center justify-center" data-testid="loading-screen">
        <div className="text-center max-w-md mx-auto px-4">
          {/* Loading Icon */}
          <div className="mb-8">
            <div className="w-20 h-20 mx-auto relative">
              <div className="absolute inset-0 rounded-full border-4 border-primary/20"></div>
              <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
              <div className="absolute inset-2 rounded-full bg-primary/10 flex items-center justify-center">
                <img src="/favicon.png?v=092025" alt="KUSH Character" className="w-8 h-8 object-contain" />
              </div>
            </div>
          </div>

          {/* Loading Text */}
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Loading <span className="text-primary">KUSH Klicker</span>
          </h2>
          <p className="text-muted-foreground mb-6">Preparing your cannabis empire...</p>

          {/* Progress Bar */}
          <div className="w-full bg-card rounded-full h-3 mb-4 border border-primary/30">
            <div 
              className="bg-gradient-to-r from-primary to-accent h-full rounded-full transition-all duration-300 ease-out"
              style={{ width: `${Math.min(progress, 100)}%` }}
            ></div>
          </div>

          {/* Progress Text */}
          <p className="text-sm text-muted-foreground">
            {Math.round(Math.min(progress, 100))}% Complete
          </p>

          {/* Loading Messages */}
          <div className="mt-6 text-sm text-muted-foreground">
            {progress < 25 && "Germinating seeds..."}
            {progress >= 25 && progress < 50 && "Growing plants..."}
            {progress >= 50 && progress < 75 && "Harvesting KUSH..."}
            {progress >= 75 && progress < 100 && "Preparing workspace..."}
            {progress >= 100 && "Ready to klick!"}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900/20 to-slate-900 flex items-center justify-center relative overflow-hidden" data-testid="landing-page">
      {/* Animated Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Main Content */}
      <div className="text-center max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Logo/Title Section */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 mb-6 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 border-2 border-primary/30">
            <img src="/favicon.png?v=092025" alt="KUSH Character" className="w-12 h-12 object-contain" />
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-3 sm:mb-4 leading-tight">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              KUSH
            </span>
            <span className="text-foreground"> Klicker</span>
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-3 sm:mb-2 px-2">
            The Ultimate Cannabis Clicker Game
          </p>
          
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium border border-primary/30">
            <i className="fas fa-coins"></i>
            <span className="hidden xs:inline">Play to Earn Real Solana Tokens</span>
            <span className="xs:hidden">Earn Real Solana Tokens</span>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-xl p-4 sm:p-6">
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <i className="fas fa-mouse-pointer text-primary text-xl"></i>
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">Click to Earn</h3>
            <p className="text-muted-foreground text-xs sm:text-sm">Click the KUSH button to earn currency and build your cannabis empire</p>
          </div>

          <div className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-xl p-4 sm:p-6">
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <i className="fas fa-arrow-up text-primary text-xl"></i>
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">Upgrade & Grow</h3>
            <p className="text-muted-foreground text-xs sm:text-sm">Purchase upgrades and grow lights to multiply your earning power</p>
          </div>

          <div className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-xl p-4 sm:p-6">
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <i className="fas fa-trophy text-primary text-xl"></i>
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">Compete & Win</h3>
            <p className="text-muted-foreground text-xs sm:text-sm">Complete achievements and climb leaderboards for real token rewards</p>
          </div>
        </div>

        {/* Enter Game Button */}
        <div className="space-y-3 sm:space-y-4">
          <button
            onClick={handleEnterGame}
            className="kush-button text-primary-foreground font-bold text-lg sm:text-xl px-8 sm:px-12 py-3 sm:py-4 rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95 min-h-[48px] touch-manipulation"
            data-testid="button-enter-game"
          >
            <i className="fas fa-play mr-2 sm:mr-3"></i>
            Enter Game
          </button>
          
          <p className="text-xs sm:text-sm text-muted-foreground px-2">
            <i className="fas fa-info-circle mr-1"></i>
            Works best in Telegram WebApp
          </p>
        </div>

        {/* Secondary Action Buttons */}
        <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row justify-center gap-2 sm:gap-3">
          <a 
            href="https://pump.fun/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:from-yellow-600 hover:to-orange-600 px-4 py-3 sm:py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95 min-h-[44px] touch-manipulation text-center"
            data-testid="button-buy-pump"
          >
            <i className="fas fa-coins mr-2"></i>
            Buy Token
          </a>
          <Link href="/whitepaper">
            <button 
              className="w-full sm:w-auto bg-card/40 backdrop-blur-sm border border-primary/30 text-primary hover:bg-primary/10 px-4 py-3 sm:py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95 min-h-[44px] touch-manipulation"
              data-testid="button-whitepaper"
            >
              <i className="fas fa-file-alt mr-2"></i>
              Whitepaper
            </button>
          </Link>
        </div>

        {/* Social Links */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 max-w-md mx-auto">
          <button 
            onClick={() => window.open('https://t.me/kushklicker', '_blank')}
            className="bg-card/30 backdrop-blur-sm border border-primary/20 rounded-lg px-4 py-3 sm:py-2 hover:bg-primary/10 transition-all duration-200 hover:scale-105 active:scale-95 min-h-[44px] touch-manipulation"
            data-testid="button-telegram"
          >
            <span className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              <i className="fab fa-telegram mr-2 text-primary"></i>
              <span className="hidden xs:inline">Join our Telegram</span>
              <span className="xs:hidden">Telegram</span>
            </span>
          </button>
          <button 
            onClick={() => window.open('https://discord.gg/XGpMKuET66', '_blank')}
            className="bg-card/30 backdrop-blur-sm border border-primary/20 rounded-lg px-4 py-3 sm:py-2 hover:bg-primary/10 transition-all duration-200 hover:scale-105 active:scale-95 min-h-[44px] touch-manipulation"
            data-testid="button-discord"
          >
            <span className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              <i className="fab fa-discord mr-2 text-primary"></i>
              <span className="hidden xs:inline">Discord Community</span>
              <span className="xs:hidden">Discord</span>
            </span>
          </button>
          <button 
            onClick={() => window.open('https://x.com/KushKlicker', '_blank')}
            className="bg-card/30 backdrop-blur-sm border border-primary/20 rounded-lg px-4 py-3 sm:py-2 hover:bg-primary/10 transition-all duration-200 hover:scale-105 active:scale-95 min-h-[44px] touch-manipulation"
            data-testid="button-twitter"
          >
            <span className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              <i className="fab fa-x-twitter mr-2 text-primary"></i>
              <span className="hidden xs:inline">Follow on X</span>
              <span className="xs:hidden">Twitter</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}