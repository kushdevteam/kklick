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

// ===== ENHANCED AUDIO SYSTEM =====

let audioContext: AudioContext | null = null;
let soundEnabled = true;
let backgroundMusicEnabled = true;
let backgroundMusicGain: GainNode | null = null;
let backgroundMusicOscillators: OscillatorNode[] = [];

// Initialize audio context
function getAudioContext(): AudioContext | null {
  if (!soundEnabled) return null;
  
  try {
    if (!audioContext) {
      audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    
    // Resume context if suspended (required for mobile)
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }
    
    return audioContext;
  } catch (error) {
    console.warn('Audio context not available:', error);
    return null;
  }
}

// Sound preference management
export function setSoundEnabled(enabled: boolean): void {
  soundEnabled = enabled;
  localStorage.setItem('kushklicker-sound-enabled', enabled.toString());
  
  // Also control background music
  if (enabled && backgroundMusicEnabled) {
    startBackgroundMusic();
  } else {
    stopBackgroundMusic();
  }
}

export function isSoundEnabled(): boolean {
  const stored = localStorage.getItem('kushklicker-sound-enabled');
  return stored === null ? true : stored === 'true';
}

// Background music preference management
export function setBackgroundMusicEnabled(enabled: boolean): void {
  backgroundMusicEnabled = enabled;
  localStorage.setItem('kushklicker-background-music-enabled', enabled.toString());
  
  if (enabled && soundEnabled) {
    startBackgroundMusic();
  } else {
    stopBackgroundMusic();
  }
}

export function isBackgroundMusicEnabled(): boolean {
  const stored = localStorage.getItem('kushklicker-background-music-enabled');
  return stored === null ? true : stored === 'true';
}

// Initialize sound settings
if (typeof window !== 'undefined') {
  soundEnabled = isSoundEnabled();
  backgroundMusicEnabled = isBackgroundMusicEnabled();
}

// Enhanced sound generation function
function createSound(frequency: number, duration: number, volume: number = 0.1, type: OscillatorType = 'sine'): void {
  const context = getAudioContext();
  if (!context) return;

  try {
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(context.destination);
    
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, context.currentTime);
    
    gainNode.gain.setValueAtTime(volume, context.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + duration);
    
    oscillator.start(context.currentTime);
    oscillator.stop(context.currentTime + duration);
  } catch (error) {
    // Silent fail
  }
}

// Multi-tone sound for complex effects
function createChord(frequencies: number[], duration: number, volume: number = 0.05): void {
  frequencies.forEach((freq, index) => {
    setTimeout(() => createSound(freq, duration, volume), index * 20);
  });
}

// === GAME SOUND EFFECTS ===

export function playClickSound(isCombo: boolean = false): void {
  if (isCombo) {
    // Enhanced combo click sound
    createChord([800, 1000, 1200], 0.15, 0.08);
    setTimeout(() => createSound(1400, 0.1, 0.06, 'triangle'), 50);
  } else {
    // Regular click sound with slight randomization
    const baseFreq = 750 + Math.random() * 100;
    createSound(baseFreq, 0.12, 0.07, 'triangle');
  }
}

export function playPurchaseSound(): void {
  // Rising chord for purchases
  createChord([440, 554, 659, 880], 0.3, 0.06);
  setTimeout(() => createSound(1109, 0.2, 0.04, 'sine'), 100);
}

export function playAchievementSound(): void {
  // Celebratory achievement fanfare
  createChord([523, 659, 784, 1047], 0.4, 0.08);
  setTimeout(() => createChord([659, 831, 988, 1319], 0.3, 0.06), 200);
  setTimeout(() => createSound(1568, 0.5, 0.05, 'sine'), 400);
}

export function playErrorSound(): void {
  // Low, discordant error sound
  createSound(220, 0.2, 0.08, 'sawtooth');
  setTimeout(() => createSound(196, 0.3, 0.06, 'sawtooth'), 100);
}

export function playNotificationSound(): void {
  // Gentle notification chime
  createChord([880, 1109], 0.25, 0.05);
}

export function playLevelUpSound(): void {
  // Ascending level up melody
  const notes = [523, 587, 659, 784, 880, 1047];
  notes.forEach((note, index) => {
    setTimeout(() => createSound(note, 0.2, 0.06, 'sine'), index * 80);
  });
}

export function playBonusSound(): void {
  // Magical bonus sound with shimmer effect
  createChord([1318, 1567, 1975], 0.4, 0.05);
  setTimeout(() => createSound(2349, 0.3, 0.04, 'triangle'), 150);
}

export function playUpgradeSound(): void {
  // Power-up sound for upgrades
  createSound(440, 0.1, 0.07, 'square');
  setTimeout(() => createSound(659, 0.15, 0.06, 'square'), 80);
  setTimeout(() => createSound(880, 0.2, 0.05, 'triangle'), 160);
}

// ===== ADDICTIVE BACKGROUND MUSIC SYSTEM =====

interface MusicNote {
  frequency: number;
  duration: number;
  volume: number;
  type?: OscillatorType;
}

let currentMelodyIndex = 0;
let beatCount = 0;
let melodySynth: OscillatorNode | null = null;
let bassSynth: OscillatorNode | null = null;
let drumSynth: OscillatorNode | null = null;

// Catchy, addictive melody inspired by popular game music
const addictiveMelody: MusicNote[] = [
  // First phrase - uplifting and catchy
  { frequency: 523.25, duration: 0.4, volume: 0.2 }, // C5
  { frequency: 587.33, duration: 0.4, volume: 0.18 }, // D5
  { frequency: 659.25, duration: 0.4, volume: 0.2 }, // E5
  { frequency: 783.99, duration: 0.6, volume: 0.22 }, // G5
  
  // Second phrase - memorable hook
  { frequency: 880.00, duration: 0.3, volume: 0.25 }, // A5
  { frequency: 783.99, duration: 0.3, volume: 0.2 }, // G5
  { frequency: 659.25, duration: 0.3, volume: 0.18 }, // E5
  { frequency: 523.25, duration: 0.9, volume: 0.2 }, // C5 (longer for resolution)
  
  // Third phrase - variation to keep it interesting
  { frequency: 440.00, duration: 0.4, volume: 0.18 }, // A4
  { frequency: 493.88, duration: 0.4, volume: 0.16 }, // B4
  { frequency: 523.25, duration: 0.4, volume: 0.2 }, // C5
  { frequency: 659.25, duration: 0.8, volume: 0.22 }, // E5
  
  // Fourth phrase - climax and return
  { frequency: 783.99, duration: 0.3, volume: 0.24 }, // G5
  { frequency: 880.00, duration: 0.3, volume: 0.26 }, // A5
  { frequency: 1046.50, duration: 0.6, volume: 0.28 }, // C6 (high point)
  { frequency: 523.25, duration: 1.2, volume: 0.2 }, // C5 (satisfying return home)
];

// Bass line that complements the melody
const bassLine: number[] = [261.63, 329.63, 392.00, 261.63]; // C4, E4, G4, C4

// Create a more sophisticated oscillator for melody/bass
function createSynth(frequency: number, volume: number, type: OscillatorType = 'triangle'): OscillatorNode | null {
  const context = getAudioContext();
  if (!context || !backgroundMusicGain) return null;

  try {
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();
    const filterNode = context.createBiquadFilter();
    
    // Add some warmth with a low-pass filter
    filterNode.type = 'lowpass';
    filterNode.frequency.setValueAtTime(2000, context.currentTime);
    filterNode.Q.setValueAtTime(1, context.currentTime);
    
    oscillator.connect(filterNode);
    filterNode.connect(gainNode);
    gainNode.connect(backgroundMusicGain);
    
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, context.currentTime);
    
    gainNode.gain.setValueAtTime(0, context.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(volume, context.currentTime + 0.01);
    
    oscillator.start(context.currentTime);
    
    return oscillator;
  } catch (error) {
    console.warn('Failed to create synth:', error);
    return null;
  }
}

// Create drum-like sounds using noise and filters
function createDrumHit(type: 'kick' | 'snare'): void {
  const context = getAudioContext();
  if (!context || !backgroundMusicGain) return;

  try {
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();
    const filterNode = context.createBiquadFilter();
    
    oscillator.connect(filterNode);
    filterNode.connect(gainNode);
    gainNode.connect(backgroundMusicGain);
    
    if (type === 'kick') {
      oscillator.frequency.setValueAtTime(60, context.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(0.1, context.currentTime + 0.1);
      gainNode.gain.setValueAtTime(0.3, context.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.2);
      filterNode.type = 'lowpass';
      filterNode.frequency.setValueAtTime(100, context.currentTime);
    } else { // snare
      oscillator.frequency.setValueAtTime(200, context.currentTime);
      gainNode.gain.setValueAtTime(0.15, context.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.1);
      filterNode.type = 'highpass';
      filterNode.frequency.setValueAtTime(1000, context.currentTime);
    }
    
    oscillator.type = 'triangle';
    oscillator.start(context.currentTime);
    oscillator.stop(context.currentTime + 0.5);
  } catch (error) {
    console.warn('Failed to create drum sound:', error);
  }
}

export function startBackgroundMusic(): void {
  if (!soundEnabled || !backgroundMusicEnabled) return;
  
  const context = getAudioContext();
  if (!context) return;

  // Stop any existing background music
  stopBackgroundMusic();

  try {
    // Create master gain node for background music
    backgroundMusicGain = context.createGain();
    backgroundMusicGain.connect(context.destination);
    backgroundMusicGain.gain.setValueAtTime(0.12, context.currentTime); // Perfect volume for addictive music

    console.log('🎵 Starting addictive background music with catchy melody and beats!');

    // Reset indices
    currentMelodyIndex = 0;
    beatCount = 0;

    // Start the addictive music loop
    startMelodyLoop();
    startBassLoop();
    startDrumLoop();
    
  } catch (error) {
    console.warn('Failed to start background music:', error);
  }
}

// Play the catchy melody in a loop with proper timing
function startMelodyLoop(): void {
  if (!soundEnabled || !backgroundMusicEnabled || !backgroundMusicGain) return;

  const context = getAudioContext();
  if (!context) {
    console.warn('No audio context available for melody');
    return;
  }

  let noteStartTime = context.currentTime;

  const playNextNote = () => {
    if (!soundEnabled || !backgroundMusicEnabled || !backgroundMusicGain) return;

    const note = addictiveMelody[currentMelodyIndex];
    
    // Create the melody note with better sound characteristics
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();
    const filterNode = context.createBiquadFilter();
    
    // Set up audio routing
    oscillator.connect(filterNode);
    filterNode.connect(gainNode);
    gainNode.connect(backgroundMusicGain);
    
    // Configure oscillator for pleasant melody sound
    oscillator.type = 'triangle';
    oscillator.frequency.setValueAtTime(note.frequency, noteStartTime);
    
    // Add slight vibrato for musicality
    const vibrato = context.createOscillator();
    const vibratoGain = context.createGain();
    vibrato.frequency.setValueAtTime(6, noteStartTime); // 6Hz vibrato
    vibratoGain.gain.setValueAtTime(8, noteStartTime); // Subtle modulation depth
    vibrato.connect(vibratoGain);
    vibratoGain.connect(oscillator.frequency);
    
    // Configure filter for warmth
    filterNode.type = 'lowpass';
    filterNode.frequency.setValueAtTime(3000, noteStartTime);
    filterNode.Q.setValueAtTime(0.5, noteStartTime);
    
    // Smooth envelope for natural attack and decay
    gainNode.gain.setValueAtTime(0, noteStartTime);
    gainNode.gain.linearRampToValueAtTime(note.volume, noteStartTime + 0.05);
    gainNode.gain.linearRampToValueAtTime(note.volume * 0.8, noteStartTime + note.duration * 0.7);
    gainNode.gain.linearRampToValueAtTime(0, noteStartTime + note.duration);
    
    // Start the note
    oscillator.start(noteStartTime);
    vibrato.start(noteStartTime);
    
    // Stop the note
    oscillator.stop(noteStartTime + note.duration);
    vibrato.stop(noteStartTime + note.duration);
    
    // Move to next note
    currentMelodyIndex = (currentMelodyIndex + 1) % addictiveMelody.length;
    noteStartTime += note.duration;
    
    // Schedule next note
    setTimeout(playNextNote, note.duration * 1000);
  };

  playNextNote();
}

// Play the bass line in sync
function startBassLoop(): void {
  if (!soundEnabled || !backgroundMusicEnabled || !backgroundMusicGain) return;

  let bassIndex = 0;
  
  const playBassNote = () => {
    if (!soundEnabled || !backgroundMusicEnabled || !backgroundMusicGain) return;

    const bassFreq = bassLine[bassIndex];
    const bass = createSynth(bassFreq, 0.08, 'sawtooth');
    if (bass) {
      bass.stop(context!.currentTime + 0.8); // Longer bass notes
    }

    bassIndex = (bassIndex + 1) % bassLine.length;
    setTimeout(playBassNote, 1000); // Bass plays every beat (1 second)
  };

  playBassNote();
}

// Add rhythmic drum pattern
function startDrumLoop(): void {
  if (!soundEnabled || !backgroundMusicEnabled || !backgroundMusicGain) return;

  const drumPattern = () => {
    if (!soundEnabled || !backgroundMusicEnabled || !backgroundMusicGain) return;

    // Kick drum on beats 1 and 3
    if (beatCount % 4 === 0 || beatCount % 4 === 2) {
      createDrumHit('kick');
    }
    
    // Snare on beats 2 and 4
    if (beatCount % 4 === 1 || beatCount % 4 === 3) {
      createDrumHit('snare');
    }

    beatCount++;
    setTimeout(drumPattern, 500); // Drums every half second (120 BPM)
  };

  drumPattern();
}

function addFrequencyModulation(): void {
  if (!soundEnabled || !backgroundMusicEnabled || backgroundMusicOscillators.length === 0) return;
  
  const context = getAudioContext();
  if (!context) return;

  backgroundMusicOscillators.forEach((osc, index) => {
    if (osc && osc.frequency) {
      // Add subtle LFO (Low Frequency Oscillator) for organic movement
      const lfo = context.createOscillator();
      const lfoGain = context.createGain();
      
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      
      lfo.frequency.setValueAtTime(0.1 + (index * 0.05), context.currentTime); // Very slow modulation
      lfo.type = 'sine';
      lfoGain.gain.setValueAtTime(0.5 + (index * 0.2), context.currentTime); // Subtle modulation depth
      
      lfo.start(context.currentTime);
    }
  });
}

export function stopBackgroundMusic(): void {
  try {
    // Stop all oscillators
    backgroundMusicOscillators.forEach(osc => {
      if (osc) {
        try {
          osc.stop();
        } catch (error) {
          // Oscillator may already be stopped
        }
      }
    });
    
    // Clear the array
    backgroundMusicOscillators = [];
    
    // Disconnect gain node
    if (backgroundMusicGain) {
      backgroundMusicGain.disconnect();
      backgroundMusicGain = null;
    }
  } catch (error) {
    console.warn('Error stopping background music:', error);
  }
}

export function setBackgroundMusicVolume(volume: number): void {
  if (backgroundMusicGain) {
    const context = getAudioContext();
    if (context) {
      // Clamp volume between 0 and 0.05 (very quiet background music)
      const clampedVolume = Math.max(0, Math.min(0.05, volume));
      backgroundMusicGain.gain.setTargetAtTime(clampedVolume, context.currentTime, 0.5);
    }
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
