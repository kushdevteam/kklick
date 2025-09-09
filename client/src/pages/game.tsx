import { useState, useEffect } from "react";
import Header from "@/components/navigation/header";
import MobileNav from "@/components/navigation/mobile-nav";
import DesktopNav from "@/components/navigation/desktop-nav";
import MainClicker from "@/components/game/main-clicker";
import StatsDisplay from "@/components/game/stats-display";
import ComprehensiveFeatures from "@/components/game/comprehensive-features";
import UpgradeList from "@/components/upgrades/upgrade-list";
import AchievementList from "@/components/achievements/achievement-list";
import Leaderboard from "@/components/leaderboard/leaderboard";
import WalletSection from "@/components/wallet/wallet-section";
import ReferralSection from "@/components/referral/referral-section";
import FriendsSection from "@/components/friends/friends-section";
import TokenDashboard from "@/components/tokens/token-dashboard";
import MarketplaceSection from "@/components/marketplace/marketplace-section";
import VIPSection from "@/components/vip/vip-section";
import StakingSection from "@/components/staking/staking-section";
import EventsSection from "@/components/events/events-section";
import GuildsSection from "@/components/guilds/guilds-section";
import GrowGarden from "@/components/game/grow-garden";
import NewUserTutorial from "@/components/tutorial/new-user-tutorial";
import PlayerAnalytics from "@/components/analytics/player-analytics";
import { useGameState } from "@/hooks/use-game-state";

type GameSection = 'game' | 'upgrades' | 'achievements' | 'leaderboard' | 'wallet' | 'tokens' | 'referral' | 'friends' | 'marketplace' | 'vip' | 'staking' | 'events' | 'guilds' | 'garden' | 'analytics';

export default function Game() {
  const [currentSection, setCurrentSection] = useState<GameSection>('game');
  const { gameState, isLoading, refetchGameState, isPlayerReady } = useGameState();

  // Floating click effects container
  const [clickEffects, setClickEffects] = useState<Array<{ id: number; x: number; y: number; value: number }>>([]);

  const addClickEffect = (x: number, y: number, value: number) => {
    const id = Date.now();
    setClickEffects(prev => [...prev, { id, x, y, value }]);
    setTimeout(() => {
      setClickEffects(prev => prev.filter(effect => effect.id !== id));
    }, 1000);
  };

  if (isLoading || !isPlayerReady || !gameState?.id) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900/20 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading Kush Klicker...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900/20 to-slate-900 flex flex-col" data-testid="game-container">
      <Header currentSection={currentSection} onSectionChange={setCurrentSection} />
      <MobileNav currentSection={currentSection} onSectionChange={setCurrentSection} />
      <DesktopNav currentSection={currentSection} onSectionChange={setCurrentSection} />

      {/* Main Content */}
      <main className="flex-1 pt-16 pb-20 md:pb-4 md:pl-16 min-h-0 game-container overflow-y-auto mobile-scroll" 
           style={{ paddingBottom: 'calc(80px + env(safe-area-inset-bottom))' }}>
        
        {/* Game Section */}
        {currentSection === 'game' && (
          <section className="game-section mobile-scroll section-fade-in" data-testid="section-game">
            <div className="container mx-auto px-2 md:px-4 py-2 md:py-6 max-w-4xl mobile-scroll touch-action-manipulation">
              
              {/* Compact Mobile Banner */}
              <div className="bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg p-2 md:p-4 mb-3 md:mb-6 text-center border border-primary/30 mobile-compact touch-action-manipulation transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
                <div className="inline-flex items-center space-x-1 bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-medium mb-1">
                  <i className="fas fa-broadcast-tower text-xs"></i>
                  <span className="mobile-text">Live on Telegram</span>
                </div>
                <h2 className="text-lg md:text-3xl font-bold text-foreground mb-1 md:mb-2">
                  <span className="text-primary">KUSH Klicker</span>
                </h2>
                <p className="text-muted-foreground text-xs md:text-base max-w-2xl mx-auto mb-2 md:mb-4 mobile-text">
                  Click to mine cannabis and earn crypto tokens with enhanced features
                </p>
              </div>

              <StatsDisplay gameState={gameState} />
              <MainClicker gameState={gameState} onClickEffect={addClickEffect} />
              
              {/* Comprehensive Game Features */}
              <div className="mt-6">
                <ComprehensiveFeatures playerId={gameState.id} />
              </div>
            </div>
          </section>
        )}

        {/* Upgrades Section */}
        {currentSection === 'upgrades' && isPlayerReady && (
          <section className="game-section mobile-scroll section-slide-in" data-testid="section-upgrades">
            <div className="mobile-scroll touch-action-manipulation p-2 md:p-4">
              <UpgradeList gameState={gameState} />
            </div>
          </section>
        )}


        {/* Achievements Section */}
        {currentSection === 'achievements' && isPlayerReady && (
          <section className="game-section mobile-scroll section-fade-in" data-testid="section-achievements">
            <div className="mobile-scroll touch-action-manipulation p-2 md:p-4">
              <AchievementList gameState={gameState} />
            </div>
          </section>
        )}

        {/* Leaderboard Section */}
        {currentSection === 'leaderboard' && (
          <section className="game-section mobile-scroll section-fade-in" data-testid="section-leaderboard">
            <div className="mobile-scroll">
              <Leaderboard />
            </div>
          </section>
        )}

        {/* Wallet Section */}
        {currentSection === 'wallet' && isPlayerReady && (
          <section className="game-section mobile-scroll" data-testid="section-wallet">
            <div className="mobile-scroll">
              <WalletSection gameState={gameState} />
            </div>
          </section>
        )}

        {/* Tokens Section */}
        {currentSection === 'tokens' && isPlayerReady && (
          <section className="game-section mobile-scroll section-slide-in" data-testid="section-tokens">
            <div className="mobile-scroll">
              <TokenDashboard gameState={gameState} />
            </div>
          </section>
        )}

        {/* Analytics Section */}
        {currentSection === 'analytics' && isPlayerReady && (
          <section className="game-section mobile-scroll section-fade-in" data-testid="section-analytics">
            <div className="container mx-auto px-2 md:px-4 py-2 md:py-6 max-w-6xl mobile-scroll">
              <PlayerAnalytics playerId={gameState.id} />
            </div>
          </section>
        )}

        {/* Referral Section */}
        {currentSection === 'referral' && isPlayerReady && (
          <section className="game-section mobile-scroll" data-testid="section-referral">
            <div className="mobile-scroll">
              <ReferralSection gameState={gameState} />
            </div>
          </section>
        )}

        {/* Friends Section */}
        {currentSection === 'friends' && isPlayerReady && (
          <section className="game-section mobile-scroll" data-testid="section-friends">
            <div className="mobile-scroll">
              <FriendsSection gameState={gameState} />
            </div>
          </section>
        )}

        {/* Marketplace Section */}
        {currentSection === 'marketplace' && isPlayerReady && (
          <section className="game-section mobile-scroll section-fade-in" data-testid="section-marketplace">
            <div className="container mx-auto px-2 md:px-4 py-2 md:py-6 max-w-4xl mobile-scroll">
              <MarketplaceSection onSectionChange={setCurrentSection} />
            </div>
          </section>
        )}

        {/* VIP Section */}
        {currentSection === 'vip' && isPlayerReady && (
          <section className="game-section mobile-scroll" data-testid="section-vip">
            <div className="container mx-auto px-2 md:px-4 py-2 md:py-6 max-w-4xl mobile-scroll">
              <VIPSection />
            </div>
          </section>
        )}

        {/* Staking Section */}
        {currentSection === 'staking' && isPlayerReady && (
          <section className="game-section mobile-scroll section-slide-in" data-testid="section-staking">
            <div className="container mx-auto px-2 md:px-4 py-2 md:py-6 max-w-4xl mobile-scroll">
              <StakingSection />
            </div>
          </section>
        )}

        {/* Events Section */}
        {currentSection === 'events' && isPlayerReady && (
          <section className="game-section mobile-scroll" data-testid="section-events">
            <div className="container mx-auto px-2 md:px-4 py-2 md:py-6 max-w-4xl mobile-scroll">
              <EventsSection />
            </div>
          </section>
        )}

        {/* Guilds Section */}
        {currentSection === 'guilds' && isPlayerReady && (
          <section className="game-section mobile-scroll guild-mobile-scroll" data-testid="section-guilds">
            <div className="container mx-auto px-2 md:px-4 py-2 md:py-6 max-w-4xl pb-8 mobile-scroll">
              <GuildsSection />
            </div>
          </section>
        )}

        {/* Garden Section */}
        {currentSection === 'garden' && isPlayerReady && (
          <section className="game-section mobile-scroll" data-testid="section-garden">
            <div className="container mx-auto px-2 md:px-4 py-2 md:py-6 max-w-4xl mobile-scroll">
              <GrowGarden playerId={gameState.id} gameState={gameState} />
            </div>
          </section>
        )}

      </main>

      {/* Floating Click Effects */}
      <div className="fixed inset-0 pointer-events-none z-30" data-testid="click-effects">
        {clickEffects.map(effect => (
          <div
            key={effect.id}
            className="floating-text absolute text-primary font-bold text-xl"
            style={{
              left: effect.x - 15,
              top: effect.y - 10,
            }}
          >
            +{effect.value}
          </div>
        ))}
      </div>

      {/* Analytics Section */}
      {currentSection === 'analytics' && isPlayerReady && (
        <section className="game-section mobile-scroll section-fade-in" data-testid="section-analytics">
          <div className="container mx-auto px-2 md:px-4 py-2 md:py-6 max-w-6xl mobile-scroll">
            <PlayerAnalytics playerId={gameState.id} />
          </div>
        </section>
      )}

      {/* Tutorial Component */}
      <NewUserTutorial refetchGameState={refetchGameState} />
    </div>
  );
}
