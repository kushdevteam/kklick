// Strain Generator - Create thousands of random cannabis strains
// with rarity-based properties and values

interface StrainProperties {
  name: string;
  type: 'sativa' | 'indica' | 'hybrid';
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  thcLevel: number;
  cbdLevel: number;
  yieldMultiplier: number;
  floweringTime: number;
  marketValue: number; // Base KUSH value for marketplace
}

// Strain name components for random generation
const strainPrefixes = [
  'Purple', 'Green', 'White', 'Blue', 'Gold', 'Silver', 'Black', 'Red', 'Orange', 'Pink',
  'Crystal', 'Diamond', 'Emerald', 'Ruby', 'Sapphire', 'Platinum', 'Cosmic', 'Nuclear',
  'Atomic', 'Electric', 'Neon', 'Laser', 'Quantum', 'Turbo', 'Super', 'Ultra', 'Mega',
  'Thunder', 'Lightning', 'Fire', 'Ice', 'Earth', 'Wind', 'Solar', 'Lunar', 'Stellar',
  'Galaxy', 'Universe', 'Infinity', 'Matrix', 'Phoenix', 'Dragon', 'Tiger', 'Lion',
  'Eagle', 'Wolf', 'Bear', 'Shark', 'Viper', 'Cobra', 'Falcon', 'Hawk', 'Raven',
  'Mystic', 'Magic', 'Spirit', 'Ghost', 'Shadow', 'Dream', 'Vision', 'Zen', 'Buddha',
  'Alpha', 'Beta', 'Gamma', 'Delta', 'Omega', 'Prime', 'Supreme', 'Royal', 'Imperial',
  'Legendary', 'Epic', 'Rare', 'Premium', 'Elite', 'Champion', 'Master', 'Grand'
];

const strainSuffixes = [
  'Kush', 'Haze', 'Diesel', 'Widow', 'Dream', 'Express', 'Cheese', 'Skunk', 'Punch',
  'Cake', 'Cookie', 'Cream', 'Berry', 'Cherry', 'Grape', 'Lemon', 'Orange', 'Mint',
  'OG', 'Auto', 'XL', 'Max', 'Plus', 'Pro', 'Elite', 'Supreme', 'King', 'Queen',
  'Warrior', 'Hunter', 'Slayer', 'Crusher', 'Destroyer', 'Annihilator', 'Dominator',
  'Thunder', 'Lightning', 'Storm', 'Tsunami', 'Volcano', 'Earthquake', 'Meteor',
  'Comet', 'Nebula', 'Supernova', 'Blackhole', 'Wormhole', 'Dimension', 'Realm',
  'Force', 'Power', 'Energy', 'Vibe', 'Flow', 'Wave', 'Pulse', 'Rhythm', 'Beat',
  'Soul', 'Heart', 'Mind', 'Brain', 'Genius', 'Wizard', 'Sorcerer', 'Mage', 'Ninja'
];

const strainMiddles = [
  '', 'Jack', 'White', 'Blue', 'Green', 'Purple', 'Golden', 'Silver', 'Crystal', 'Diamond',
  'Fire', 'Ice', 'Thunder', 'Lightning', 'Storm', 'Wind', 'Earth', 'Water', 'Air',
  'Cosmic', 'Galactic', 'Universal', 'Quantum', 'Nuclear', 'Atomic', 'Electric', 'Magnetic',
  'Psycho', 'Cyber', 'Techno', 'Retro', 'Neo', 'Meta', 'Hyper', 'Ultra', 'Super', 'Mega'
];

// Rarity weight system (higher weight = more common)
const rarityWeights = {
  common: 60,
  uncommon: 25,
  rare: 10,
  epic: 4,
  legendary: 1
};

// Type weights
const typeWeights = {
  hybrid: 50,
  sativa: 25,
  indica: 25
};

export class StrainGenerator {
  private generatedNames = new Set<string>();

  // Generate a random strain name
  private generateStrainName(): string {
    let attempts = 0;
    let name: string;
    
    do {
      const prefix = strainPrefixes[Math.floor(Math.random() * strainPrefixes.length)];
      const middle = strainMiddles[Math.floor(Math.random() * strainMiddles.length)];
      const suffix = strainSuffixes[Math.floor(Math.random() * strainSuffixes.length)];
      
      name = middle ? `${prefix} ${middle} ${suffix}` : `${prefix} ${suffix}`;
      attempts++;
      
      // If we can't find a unique name after 100 attempts, add a number
      if (attempts > 100) {
        name = `${name} #${Math.floor(Math.random() * 9999) + 1}`;
        break;
      }
    } while (this.generatedNames.has(name));
    
    this.generatedNames.add(name);
    return name;
  }

  // Select rarity based on weights
  private selectWeightedRarity(): 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' {
    const totalWeight = Object.values(rarityWeights).reduce((sum, weight) => sum + weight, 0);
    let random = Math.random() * totalWeight;
    
    for (const [rarity, weight] of Object.entries(rarityWeights)) {
      random -= weight;
      if (random <= 0) {
        return rarity as any;
      }
    }
    return 'common';
  }

  // Select strain type based on weights
  private selectWeightedType(): 'sativa' | 'indica' | 'hybrid' {
    const totalWeight = Object.values(typeWeights).reduce((sum, weight) => sum + weight, 0);
    let random = Math.random() * totalWeight;
    
    for (const [type, weight] of Object.entries(typeWeights)) {
      random -= weight;
      if (random <= 0) {
        return type as any;
      }
    }
    return 'hybrid';
  }

  // Generate properties based on rarity
  private generateRarityBasedProperties(rarity: string): Omit<StrainProperties, 'name' | 'type' | 'rarity'> {
    let baseMultiplier = 1;
    let varianceRange = 0.2;

    // Rarity affects all properties and market value
    switch (rarity) {
      case 'legendary':
        baseMultiplier = 2.5;
        varianceRange = 0.1;
        break;
      case 'epic':
        baseMultiplier = 2.0;
        varianceRange = 0.15;
        break;
      case 'rare':
        baseMultiplier = 1.5;
        varianceRange = 0.2;
        break;
      case 'uncommon':
        baseMultiplier = 1.2;
        varianceRange = 0.25;
        break;
      case 'common':
      default:
        baseMultiplier = 1.0;
        varianceRange = 0.3;
        break;
    }

    // Generate random variance within the range
    const variance = 1 + (Math.random() - 0.5) * 2 * varianceRange;
    const finalMultiplier = baseMultiplier * variance;

    // Base properties (before rarity multiplier)
    const baseTHC = 15 + Math.random() * 20; // 15-35%
    const baseCBD = Math.random() * 25; // 0-25%
    const baseYield = 100 + Math.random() * 150; // 100-250%
    const baseFlowering = 45 + Math.random() * 35; // 45-80 days
    const baseValue = 1000 + Math.random() * 4000; // 1000-5000 KUSH

    return {
      thcLevel: Math.round(Math.min(45, baseTHC * finalMultiplier)),
      cbdLevel: Math.round(Math.min(30, baseCBD * finalMultiplier)),
      yieldMultiplier: Math.round(Math.min(500, baseYield * finalMultiplier)),
      floweringTime: Math.round(Math.max(30, baseFlowering / finalMultiplier)), // Better strains flower faster
      marketValue: Math.round(baseValue * (finalMultiplier * finalMultiplier)) // Exponential value increase
    };
  }

  // Generate a single random strain
  generateRandomStrain(): StrainProperties {
    const rarity = this.selectWeightedRarity();
    const type = this.selectWeightedType();
    const name = this.generateStrainName();
    const properties = this.generateRarityBasedProperties(rarity);

    return {
      name,
      type,
      rarity,
      ...properties
    };
  }

  // Generate thousands of strains
  generateManyStrains(count: number = 5000): StrainProperties[] {
    const strains: StrainProperties[] = [];
    
    console.log(`🌱 Generating ${count} random cannabis strains...`);
    
    for (let i = 0; i < count; i++) {
      strains.push(this.generateRandomStrain());
      
      // Log progress every 1000 strains
      if ((i + 1) % 1000 === 0) {
        console.log(`📊 Generated ${i + 1}/${count} strains...`);
      }
    }
    
    // Log rarity distribution
    const rarityCount = strains.reduce((acc, strain) => {
      acc[strain.rarity] = (acc[strain.rarity] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    console.log('🎯 Strain Rarity Distribution:');
    Object.entries(rarityCount).forEach(([rarity, count]) => {
      const percentage = ((count / strains.length) * 100).toFixed(1);
      console.log(`   ${rarity}: ${count} (${percentage}%)`);
    });
    
    return strains;
  }

  // Convert to database format
  convertToDbFormat(strains: StrainProperties[]) {
    return strains.map(strain => ({
      id: `strain_${strain.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}`,
      name: strain.name,
      type: strain.type,
      rarity: strain.rarity,
      thcLevel: strain.thcLevel,
      cbdLevel: strain.cbdLevel,
      yieldMultiplier: strain.yieldMultiplier,
      floweringTime: strain.floweringTime,
      icon: 'fas fa-cannabis',
      isAvailable: true,
      baseMarketValue: strain.marketValue
    }));
  }
}

// Export singleton instance
export const strainGenerator = new StrainGenerator();