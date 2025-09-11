type GameSection = 'game' | 'upgrades' | 'achievements' | 'leaderboard' | 'wallet' | 'tokens' | 'referral' | 'friends' | 'marketplace' | 'vip' | 'staking' | 'events' | 'guilds' | 'garden' | 'analytics';

interface DesktopNavProps {
  currentSection: GameSection;
  onSectionChange: (section: GameSection) => void;
}

export default function DesktopNav({ currentSection, onSectionChange }: DesktopNavProps) {
  const navItems = [
    { id: 'game', icon: 'logo' },
    { id: 'upgrades', icon: 'fas fa-bolt' },
    { id: 'achievements', icon: 'fas fa-trophy' },
    { id: 'leaderboard', icon: 'fas fa-crown' },
    { id: 'wallet', icon: 'fas fa-coins' },
    { id: 'tokens', icon: 'fas fa-fire' },
    { id: 'referral', icon: 'fas fa-users' },
    { id: 'friends', icon: 'fas fa-user-friends' },
    { id: 'marketplace', icon: 'fas fa-store' },
    { id: 'vip', icon: 'fas fa-gem' },
    { id: 'staking', icon: 'fas fa-piggy-bank' },
    { id: 'events', icon: 'fas fa-calendar-alt' },
    { id: 'guilds', icon: 'fas fa-shield' },
    { id: 'garden', icon: 'fas fa-seedling' },
    { id: 'analytics', icon: 'fas fa-chart-bar' },
  ];

  return (
    <nav className="hidden md:block fixed left-0 top-20 bottom-0 w-16 bg-card/95 backdrop-blur-md border-r border-border z-50" data-testid="desktop-nav">
      <div className="flex flex-col items-center py-4 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSectionChange(item.id as GameSection)}
            className={`nav-btn ${currentSection === item.id ? 'active' : ''}`}
            data-testid={`nav-${item.id}`}
          >
            {item.icon === 'logo' ? (
              <img src="/favicon.png?v=092025" alt="KUSH Character" className="w-6 h-6 object-contain" />
            ) : (
              <i className={`${item.icon} text-xl`}></i>
            )}
          </button>
        ))}
      </div>
    </nav>
  );
}
