// ===== SHARED LEVELING SYSTEM =====
// Can be used by both frontend and backend

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

/**
 * Update player level and prestige based on earned KUSH
 */
export function updatePlayerLeveling(player: any, kushEarned: number): { level: number; prestige: number; totalEarnedKush: number } {
  // Update total earned KUSH
  const newTotalEarnedKush = (player.totalEarnedKush || 0) + kushEarned;
  
  // Calculate new level
  const newLevel = calculateLevel(newTotalEarnedKush);
  
  return {
    level: newLevel,
    prestige: player.prestige || 0,
    totalEarnedKush: newTotalEarnedKush
  };
}