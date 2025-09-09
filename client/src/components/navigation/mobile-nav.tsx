import { useState } from 'react';

type GameSection = 'game' | 'upgrades' | 'achievements' | 'leaderboard' | 'wallet' | 'tokens' | 'referral' | 'friends' | 'marketplace' | 'vip' | 'staking' | 'events' | 'guilds' | 'garden' | 'analytics';

interface MobileNavProps {
  currentSection: GameSection;
  onSectionChange: (section: GameSection) => void;
}

export default function MobileNav({ currentSection, onSectionChange }: MobileNavProps) {
  const [pressedButton, setPressedButton] = useState<string | null>(null);
  
  const handleNavClick = (sectionId: string) => {
    // Add mobile haptic feedback simulation
    setPressedButton(sectionId);
    setTimeout(() => setPressedButton(null), 150);
    
    // Trigger Telegram WebApp haptic feedback if available
    if (window.Telegram?.WebApp?.HapticFeedback) {
      window.Telegram.WebApp.HapticFeedback.impactOccurred('light');
    }
    
    onSectionChange(sectionId as GameSection);
  };
  const navItems = [
    { id: 'game', icon: 'fas fa-cannabis', label: 'Mine' },
    { id: 'upgrades', icon: 'fas fa-bolt', label: 'Upgrades' },
    { id: 'wallet', icon: 'fas fa-coins', label: 'Wallet' },
    { id: 'tokens', icon: 'fas fa-fire', label: 'Tokens' },
    { id: 'referral', icon: 'fas fa-users', label: 'Referral' },
    { id: 'friends', icon: 'fas fa-user-friends', label: 'Friends' },
    { id: 'marketplace', icon: 'fas fa-store', label: 'Market' },
    { id: 'vip', icon: 'fas fa-gem', label: 'VIP' },
    { id: 'staking', icon: 'fas fa-piggy-bank', label: 'Stake' },
    { id: 'events', icon: 'fas fa-calendar-alt', label: 'Events' },
    { id: 'guilds', icon: 'fas fa-shield', label: 'Guilds' },
    { id: 'garden', icon: 'fas fa-seedling', label: 'Garden' },
    { id: 'analytics', icon: 'fas fa-chart-bar', label: 'Stats' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-t border-border md:hidden shadow-lg" data-testid="mobile-nav" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <div className="flex items-center overflow-x-auto scrollbar-hide py-2 px-1" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavClick(item.id)}
            className={`nav-btn flex-shrink-0 flex flex-col items-center justify-center px-2 py-1 min-w-[55px] touch-action-manipulation transition-all duration-200 ${
              currentSection === item.id ? 'active' : ''
            } ${pressedButton === item.id ? 'animate-mobile-touch-bounce scale-95' : ''}`}
            data-testid={`nav-${item.id}`}
          >
            <i className={`${item.icon} text-lg mb-1`}></i>
            <span className="text-xs leading-tight">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
