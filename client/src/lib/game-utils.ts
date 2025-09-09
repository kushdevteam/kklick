export function formatNumber(num: number): string {
  if (num < 1000) return num.toString();
  if (num < 1000000) return (num / 1000).toFixed(1) + 'K';
  if (num < 1000000000) return (num / 1000000).toFixed(1) + 'M';
  return (num / 1000000000).toFixed(1) + 'B';
}

export function calculateUpgradeCost(baseCost: number, currentQuantity: number, costMultiplier: number): number {
  const multiplier = Math.pow(costMultiplier / 100, currentQuantity);
  return Math.floor(baseCost * multiplier);
}

export function generateRandomUsername(): string {
  const adjectives = ['Green', 'High', 'Chill', 'Blazed', 'Mellow', 'Cosmic', 'Zen', 'Fresh'];
  const nouns = ['Grower', 'Smoker', 'Farmer', 'Master', 'King', 'Queen', 'Legend', 'Pro'];
  
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const number = Math.floor(Math.random() * 1000);
  
  return `${adjective}${noun}${number}`;
}

export function getAchievementProgress(player: any, achievement: any): number {
  switch (achievement.requirementType) {
    case 'total_kush':
      return player.totalKush;
    case 'total_clicks':
      return player.totalClicks;
    case 'upgrades_bought':
      // This would need to be calculated based on player upgrades
      return 0;
    default:
      return 0;
  }
}

export function playClickSound(): void {
  // Web Audio API implementation for click sound
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  } catch (error) {
    // Silent fail if audio context is not available
  }
}

// ===== LEVELING SYSTEM =====

/**
 * Calculate KUSH required for a specific level
 * Uses exponential scaling: level 1 = 100, level 2 = 300, level 3 = 600, etc.
 */
export function getKushRequiredForLevel(level: number): number {
  if (level <= 1) return 0;
  
  // Exponential scaling: level^2.2 * 50
  return Math.floor(Math.pow(level, 2.2) * 50);
}

/**
 * Calculate total KUSH needed to reach a specific level
 */
export function getTotalKushForLevel(level: number): number {
  let total = 0;
  for (let i = 2; i <= level; i++) {
    total += getKushRequiredForLevel(i);
  }
  return total;
}

/**
 * Calculate current level based on total KUSH earned
 * Max level is 55 (prestige unlock)
 */
export function calculateLevel(totalEarnedKush: number): number {
  if (totalEarnedKush < 0) return 1;
  
  // Binary search for efficient level calculation
  let level = 1;
  while (level < 55) {
    const kushForNextLevel = getTotalKushForLevel(level + 1);
    if (totalEarnedKush < kushForNextLevel) {
      break;
    }
    level++;
  }
  
  return Math.min(level, 55);
}

/**
 * Calculate KUSH needed for next level
 */
export function getKushForNextLevel(totalEarnedKush: number, currentLevel: number): number {
  if (currentLevel >= 55) return 0; // Max level reached
  
  const kushForNextLevel = getTotalKushForLevel(currentLevel + 1);
  return Math.max(0, kushForNextLevel - totalEarnedKush);
}

/**
 * Calculate level progress (0-100%)
 */
export function getLevelProgress(totalEarnedKush: number, currentLevel: number): number {
  if (currentLevel >= 55) return 100; // Max level
  
  const kushForCurrentLevel = getTotalKushForLevel(currentLevel);
  const kushForNextLevel = getTotalKushForLevel(currentLevel + 1);
  const kushInCurrentLevel = totalEarnedKush - kushForCurrentLevel;
  const kushNeededForLevel = kushForNextLevel - kushForCurrentLevel;
  
  return Math.min(100, Math.max(0, (kushInCurrentLevel / kushNeededForLevel) * 100));
}

/**
 * Check if prestige is unlocked (level 55)
 */
export function canPrestige(level: number): boolean {
  return level >= 55;
}

/**
 * Get level display text with prestige
 */
export function getLevelDisplayText(level: number, prestige: number): string {
  if (prestige > 0) {
    return `P${prestige}-${level}`;
  }
  return `${level}`;
}
