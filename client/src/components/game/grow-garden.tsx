import React, { useState, useEffect } from "react";
import { useToast } from '@/hooks/use-toast';

interface GrowGardenProps {
  playerId: string;
  gameState: {
    id: string;
    totalKush: number;
    [key: string]: any;
  };
}

interface StrainGenetic {
  id: string;
  name: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  thcLevel: number;
  cbdLevel: number;
  yieldMultiplier: number;
  floweringTime: number;
  description: string;
  discoveredBy?: string;
}

interface GardenPlot {
  id: string;
  plotNumber: number;
  isOccupied: boolean;
  strainId?: string;
  plantedStrainId?: string;
  plantedAt?: Date;
  currentGrowthStage: 'seedling' | 'vegetative' | 'flowering' | 'harvest' | 'empty';
  growthStage: 'seedling' | 'vegetative' | 'flowering' | 'harvest' | 'empty';
  harvestReadyAt?: Date;
  waterLevel: number;
  fertilizerLevel: number;
  lightLevel: number;
  healthLevel: number;
}

interface GardenSupply {
  supplyType: 'water' | 'fertilizer' | 'seeds' | 'nutrients' | 'ph_strips';
  quantity: number;
  lastPurchased: Date;
}

const RARITY_COLORS = {
  common: 'text-gray-400 border-gray-400',
  uncommon: 'text-green-400 border-green-400',
  rare: 'text-blue-400 border-blue-400', 
  epic: 'text-purple-400 border-purple-400',
  legendary: 'text-yellow-400 border-yellow-400'
};

const GROWTH_STAGE_ICONS = {
  empty: 'fa-seedling text-gray-500',
  seedling: 'fa-leaf text-green-300',
  vegetative: 'fa-tree text-green-500',
  flowering: 'fa-cannabis text-purple-400',
  harvest: 'fa-gem text-yellow-400'
};

export default function GrowGarden({ playerId, gameState }: GrowGardenProps) {
  const [activeSubTab, setActiveSubTab] = useState<'plots' | 'strains' | 'breeding' | 'supplies' | 'history'>('plots');
  const [strainGenetics, setStrainGenetics] = useState<StrainGenetic[]>([]);
  const [loading, setLoading] = useState(true);
  const [gardenPlots, setGardenPlots] = useState<GardenPlot[]>([]);
  const [gardenSupplies, setGardenSupplies] = useState<GardenSupply[]>([]);
  const [harvestHistory, setHarvestHistory] = useState<any[]>([]);
  const [selectedStrain, setSelectedStrain] = useState<StrainGenetic | null>(null);
  const [selectedPlot, setSelectedPlot] = useState<GardenPlot | null>(null);
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchGardenData();
  }, [playerId]);

  const fetchGardenData = async () => {
    setLoading(true);
    try {
      // Fetch strain genetics
      const strainsResponse = await fetch('/api/garden/strains');
      if (strainsResponse.ok) {
        const strains = await strainsResponse.json();
        setStrainGenetics(Array.isArray(strains) ? strains : []);
      } else {
        setStrainGenetics([]);
      }

      // Fetch player's garden plots
      const plotsResponse = await fetch(`/api/garden/plots/${playerId}`);
      if (plotsResponse.ok) {
        const plots = await plotsResponse.json();
        setGardenPlots(Array.isArray(plots) ? plots : []);
      } else {
        setGardenPlots([]);
      }

      // Fetch player's supplies
      const suppliesResponse = await fetch(`/api/garden/supplies/${playerId}`);
      if (suppliesResponse.ok) {
        const supplies = await suppliesResponse.json();
        setGardenSupplies(Array.isArray(supplies) ? supplies : []);
      } else {
        setGardenSupplies([]);
      }

      // Fetch player's harvest history
      const harvestResponse = await fetch(`/api/garden/harvest-history/${playerId}`);
      if (harvestResponse.ok) {
        const history = await harvestResponse.json();
        setHarvestHistory(Array.isArray(history) ? history : []);
      } else {
        setHarvestHistory([]);
      }
    } catch (error) {
      console.error('Error fetching garden data:', error);
      setStrainGenetics([]);
      setGardenPlots([]);
      setGardenSupplies([]);
      setHarvestHistory([]);
    }
    setLoading(false);
  };

  const plantStrain = async (plotId: string, strainId: string) => {
    try {
      const response = await fetch('/api/garden/plant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playerId, plotId, strainId })
      });
      
      const result = await response.json();
      
      if (response.ok && result.success) {
        toast({
          title: "🌱 Planted Successfully",
          description: `Planted strain in plot successfully!`,
        });
        setSelectedStrain(null);
        setSelectedPlot(null);
        // Force refresh the garden data
        await fetchGardenData();
      } else {
        toast({
          title: "❌ Planting Failed",
          description: result.message || 'Failed to plant strain',
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error planting strain:', error);
      toast({
        title: "❌ Error",
        description: 'Failed to plant strain - connection error',
        variant: "destructive"
      });
    }
  };

  const harvestPlant = async (plotId: string) => {
    try {
      const response = await fetch('/api/garden/harvest', {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playerId, plotId })
      });
      
      const result = await response.json();
      
      if (response.ok && result.success) {
        toast({
          title: "🎉 Harvest Complete",
          description: `Harvested plant and earned rewards!`,
        });
        await fetchGardenData();
      } else {
        toast({
          title: "❌ Harvest Failed",
          description: result.message || 'Failed to harvest plant',
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error harvesting plant:', error);
      toast({
        title: "❌ Error",
        description: 'Failed to harvest plant - connection error',
        variant: "destructive"
      });
    }
  };

  const crossBreedStrains = async (parent1Id: string, parent2Id: string) => {
    try {
      const response = await fetch('/api/garden/crossbreed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playerId, parent1Id, parent2Id })
      });
      
      const result = await response.json();
      
      if (response.ok && result.success) {
        toast({
          title: "🧬 Breeding Success!",
          description: result.message || 'Successfully created 2 new strains!',
        });
        await fetchGardenData();
      } else {
        toast({
          title: "❌ Breeding Failed",
          description: result.message || 'Failed to cross-breed strains',
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error cross-breeding strains:', error);
      toast({
        title: "❌ Error",
        description: 'Failed to cross-breed strains - connection error',
        variant: "destructive"
      });
    }
  };

  const buyGardenPlot = async () => {
    try {
      const response = await fetch('/api/garden/buy-plot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playerId })
      });
      
      const result = await response.json();
      
      if (response.ok && result.success) {
        toast({
          title: "🏺 Plot Unlocked!",
          description: `New garden plot unlocked for 5,000 KUSH!`,
        });
        await fetchGardenData();
      } else {
        toast({
          title: "❌ Purchase Failed",
          description: result.message || 'Failed to unlock garden plot',
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error buying garden plot:', error);
      toast({
        title: "❌ Error",
        description: 'Failed to unlock garden plot - connection error',
        variant: "destructive"
      });
    }
  };

  const sellStrainToMarketplace = async (strainId: string, price: number) => {
    try {
      const response = await fetch('/api/marketplace/list', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sellerId: playerId, strainId, price, quantity: 1 })
      });
      
      const result = await response.json();
      
      if (response.ok && result.success) {
        toast({
          title: "🌱 Strain Listed!",
          description: `Your strain has been listed for ${price.toLocaleString()} KUSH on the marketplace!`,
        });
        await fetchGardenData();
      } else {
        toast({
          title: "❌ Listing Failed",
          description: result.message || 'Failed to list strain for sale',
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error listing strain:', error);
      toast({
        title: "❌ Error",
        description: 'Failed to list strain - connection error',
        variant: "destructive"
      });
    }
  };

  const buySupplies = async (supplyType: string, quantity: number) => {
    // Check if player has enough KUSH before making the request
    const costs: Record<string, number> = { 
      water: 100,
      fertilizer: 500, 
      seeds: 1000,
      nutrients: 300,
      ph_strips: 200
    };
    
    const totalCost = costs[supplyType] * quantity;
    
    if (gameState.totalKush < totalCost) {
      toast({
        title: "❌ Insufficient KUSH",
        description: `You need ${totalCost.toLocaleString()} KUSH but only have ${gameState.totalKush.toLocaleString()} KUSH. Keep clicking and earning to afford supplies!`,
        variant: "destructive"
      });
      return;
    }
    
    try {
      const response = await fetch('/api/garden/buy-supplies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playerId, supplyType, quantity })
      });
      
      const result = await response.json();
      
      if (response.ok && result.success) {
        toast({
          title: "✅ Purchase Successful",
          description: `Bought ${quantity}x ${supplyType.replace('_', ' ')} for ${totalCost.toLocaleString()} KUSH`,
        });
        await fetchGardenData();
      } else {
        toast({
          title: "❌ Purchase Failed",
          description: result.message || 'Failed to buy supplies',
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error buying supplies:', error);
      toast({
        title: "❌ Error",
        description: 'Failed to buy supplies - connection error',
        variant: "destructive"
      });
    }
  };

  const getSupplyQuantity = (supplyType: string): number => {
    const supply = gardenSupplies.find(s => s.supplyType === supplyType);
    return supply?.quantity || 0;
  };

  const subTabs = [
    { id: 'plots', label: 'Garden', icon: 'fa-seedling', color: 'text-green-400' },
    { id: 'strains', label: 'Strains', icon: 'fa-cannabis', color: 'text-purple-400' },
    { id: 'breeding', label: 'Breeding', icon: 'fa-dna', color: 'text-blue-400' },
    { id: 'supplies', label: 'Supplies', icon: 'fa-flask', color: 'text-yellow-400' },
    { id: 'history', label: 'History', icon: 'fa-history', color: 'text-orange-400' }
  ];

  const SubTabButton = ({ tab }: { tab: typeof subTabs[0] }) => (
    <button
      onClick={() => setActiveSubTab(tab.id as any)}
      className={`flex flex-col items-center space-y-1 px-2 py-2 rounded-lg text-xs transition-all ${
        activeSubTab === tab.id 
          ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
          : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
      }`}
    >
      <i className={`fas ${tab.icon} ${activeSubTab === tab.id ? tab.color : ''}`}></i>
      <span className="font-medium">{tab.label}</span>
    </button>
  );

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-green-900/20 to-emerald-800/20 rounded-xl p-6 border border-green-500/20">
        <div className="flex items-center justify-center space-x-3">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-400"></div>
          <span className="text-green-400">Loading Garden...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-900/30 to-emerald-800/30 rounded-xl p-4 border border-green-500/20">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
              <i className="fas fa-seedling text-white text-xl"></i>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-green-400">🌱 Grow Garden System</h2>
              <p className="text-green-300/80 text-sm">Cultivate premium strains and breed new genetics</p>
            </div>
          </div>
          <button
            onClick={() => setShowHowToPlay(!showHowToPlay)}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white text-sm font-medium transition-all flex items-center space-x-2"
            data-testid="button-how-to-play">
            <i className="fas fa-question-circle"></i>
            <span>How to Play</span>
          </button>
        </div>
      </div>

      {/* How to Play Modal/Guide */}
      {showHowToPlay && (
        <div className="mb-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl p-6 border border-blue-500/20">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <i className="fas fa-book text-blue-400"></i>
              <h3 className="text-xl font-semibold text-blue-400">🎮 Complete Garden Guide</h3>
            </div>
            <button
              onClick={() => setShowHowToPlay(false)}
              className="text-gray-400 hover:text-white">
              <i className="fas fa-times"></i>
            </button>
          </div>
          
          <div className="space-y-6">
            {/* Step 1 */}
            <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/20">
              <h4 className="text-green-400 font-bold mb-2">📦 Step 1: Buy Essential Supplies</h4>
              <p className="text-sm text-muted-foreground mb-2">Go to the <strong>Supplies</strong> tab and purchase:</p>
              <ul className="text-sm space-y-1 text-muted-foreground ml-4">
                <li>• <strong>Seeds (1000 KUSH):</strong> Required to plant anything</li>
                <li>• <strong>Water (100 KUSH):</strong> Essential for plant growth</li>
                <li>• <strong>Fertilizer (500 KUSH):</strong> Speeds up growth and increases yield</li>
                <li>• <strong>Nutrients (300 KUSH):</strong> Improves plant quality and potency</li>
                <li>• <strong>pH Strips (200 KUSH):</strong> Test soil conditions</li>
              </ul>
            </div>

            {/* Step 2 */}
            <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-500/20">
              <h4 className="text-purple-400 font-bold mb-2">🌱 Step 2: Plant Your Garden</h4>
              <ol className="text-sm space-y-1 text-muted-foreground ml-4">
                <li>1. Go to the <strong>Garden</strong> tab</li>
                <li>2. Click on an empty plot (gray box)</li>
                <li>3. Select a strain from the <strong>Strains</strong> tab</li>
                <li>4. Click the selected plot again to plant</li>
              </ol>
            </div>

            {/* Step 3 */}
            <div className="bg-yellow-500/10 rounded-lg p-4 border border-yellow-500/20">
              <h4 className="text-yellow-400 font-bold mb-2">🚿 Step 3: Care for Your Plants</h4>
              <p className="text-sm text-muted-foreground mb-2">Plants need regular care:</p>
              <ul className="text-sm space-y-1 text-muted-foreground ml-4">
                <li>• Water plants regularly (uses your water supply)</li>
                <li>• Apply fertilizer to boost growth</li>
                <li>• Monitor growth stages: seedling → vegetative → flowering → ready</li>
              </ul>
            </div>

            {/* Step 4 */}
            <div className="bg-orange-500/10 rounded-lg p-4 border border-orange-500/20">
              <h4 className="text-orange-400 font-bold mb-2">💎 Step 4: Harvest & Profit</h4>
              <ul className="text-sm space-y-1 text-muted-foreground ml-4">
                <li>• Wait for plants to reach "ready" stage</li>
                <li>• Click on mature plants to harvest</li>
                <li>• Earn KUSH rewards based on strain quality</li>
                <li>• Check <strong>History</strong> tab to see past harvests</li>
              </ul>
            </div>

            {/* Step 5 */}
            <div className="bg-cyan-500/10 rounded-lg p-4 border border-cyan-500/20">
              <h4 className="text-cyan-400 font-bold mb-2">🧬 Step 5: Advanced Breeding</h4>
              <p className="text-sm text-muted-foreground mb-2">Create new strains in the <strong>Breeding</strong> tab:</p>
              <ul className="text-sm space-y-1 text-muted-foreground ml-4">
                <li>• Combine two different strains</li>
                <li>• Create unique genetics with better properties</li>
                <li>• Higher quality strains = better KUSH rewards</li>
              </ul>
            </div>

            <div className="bg-blue-500/10 rounded-lg p-3 border border-blue-500/20">
              <div className="flex items-center space-x-2">
                <i className="fas fa-lightbulb text-yellow-400"></i>
                <span className="text-yellow-400 font-semibold">Pro Tips:</span>
              </div>
              <ul className="text-sm space-y-1 text-muted-foreground mt-2 ml-4">
                <li>• Start small - buy a few seeds and supplies first</li>
                <li>• Keep enough supplies in stock for ongoing care</li>
                <li>• Higher THC/CBD strains give better rewards</li>
                <li>• Experiment with breeding to create premium strains</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Garden System Guide */}
      <div className="mb-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl p-4 border border-green-500/20">
        <div className="flex items-center space-x-2 mb-3">
          <i className="fas fa-info-circle text-green-400"></i>
          <h3 className="text-lg font-semibold text-green-400">🌱 How Garden Works</h3>
        </div>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div>
            <strong className="text-green-300">1. Buy Supplies:</strong>
            <p className="text-muted-foreground">Purchase seeds (1000 KUSH), water (100 KUSH), fertilizer (500 KUSH) and other supplies</p>
          </div>
          <div>
            <strong className="text-green-300">2. Plant & Care:</strong>
            <p className="text-muted-foreground">Plant strains in plots, water and fertilize them to help growth</p>
          </div>
          <div>
            <strong className="text-green-300">3. Harvest & Breed:</strong>
            <p className="text-muted-foreground">Harvest grown plants for KUSH rewards and breed new strains</p>
          </div>
        </div>
        <div className="mt-3 text-xs text-yellow-400">
          💰 Your KUSH: {gameState?.totalKush?.toLocaleString() || '0'} | 💡 Tip: Start with buying seeds, then plant them in your garden plots!
        </div>
      </div>

      {/* Sub-tabs */}
      <div className="bg-card/50 rounded-xl p-2 border border-border/50">
        <div className="grid grid-cols-5 gap-1">
          {subTabs.map((tab) => (
            <SubTabButton key={tab.id} tab={tab} />
          ))}
        </div>
      </div>

      {/* Garden Plots */}
      {activeSubTab === 'plots' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Array.from({ length: Math.max(6, gardenPlots.length + 1) }, (_, i) => {
              const plot = Array.isArray(gardenPlots) ? gardenPlots.find(p => p.plotNumber === i + 1) : null;
              const strain = plot?.strainId ? strainGenetics.find(s => s.id === plot.strainId) : null;
              
              return (
                <div key={i} className="bg-gradient-to-br from-card to-card/80 rounded-xl p-4 border border-green-500/20 hover:border-green-500/40 transition-all cursor-pointer"
                     onClick={() => setSelectedPlot(plot || null)}>
                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full flex items-center justify-center mx-auto border-2 border-green-500/30">
                      <i className={`fas ${plot?.strainId ? GROWTH_STAGE_ICONS[plot.growthStage] || GROWTH_STAGE_ICONS.seedling : GROWTH_STAGE_ICONS.empty} text-2xl`}></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Plot {i + 1}</h4>
                      {plot && strain && (
                        <div className="space-y-1">
                          <p className="text-xs text-green-400">{strain.name}</p>
                          <p className="text-xs text-muted-foreground capitalize">{plot.growthStage}</p>
                          {plot.growthStage === 'harvest' && (
                            <button 
                              onClick={(e) => { e.stopPropagation(); harvestPlant(plot.id); }}
                              className="px-2 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded text-xs font-medium hover:from-yellow-400 hover:to-orange-400 transition-all">
                              🌾 Harvest
                            </button>
                          )}
                        </div>
                      )}
                      {(!plot || !plot.strainId) && (
                        <p className="text-xs text-gray-500">Empty</p>
                      )}
                    </div>
                  </div>
                  
                  {plot && plot.strainId && (
                    <div className="mt-3 space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-blue-400">💧 Water</span>
                        <span>{plot.waterLevel || 100}%</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-yellow-400">🧪 Fertilizer</span>
                        <span>{plot.fertilizerLevel || 100}%</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-green-400">❤️ Health</span>
                        <span>{plot.healthLevel || 100}%</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {selectedPlot && !selectedPlot.strainId && (
            <div className="bg-gradient-to-br from-card to-card/80 rounded-xl p-6 border border-green-500/20">
              <h3 className="text-lg font-bold text-green-400 mb-4">🌱 Plant Strain - Plot {selectedPlot.plotNumber}</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {strainGenetics.slice(0, 6).map(strain => (
                  <div key={strain.id} 
                       className={`p-3 rounded-lg border ${RARITY_COLORS[strain.rarity]} bg-gradient-to-br from-card/50 to-card cursor-pointer hover:from-card hover:to-card/80 transition-all`}
                       onClick={() => plantStrain(selectedPlot.id, strain.id)}>
                    <div className="text-center space-y-2">
                      <i className="fas fa-cannabis text-2xl"></i>
                      <h4 className="font-semibold text-sm">{strain.name}</h4>
                      <p className="text-xs opacity-80 capitalize">{strain.rarity}</p>
                      <div className="text-xs space-y-1">
                        <div>THC: {strain.thcLevel}%</div>
                        <div>Yield: +{strain.yieldMultiplier}%</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Strain Genetics */}
      {activeSubTab === 'strains' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {strainGenetics.map(strain => (
              <div key={strain.id} className={`bg-gradient-to-br from-card to-card/80 rounded-xl p-4 border ${RARITY_COLORS[strain.rarity]}`}>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-lg">{strain.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize border ${RARITY_COLORS[strain.rarity]}`}>
                      {strain.rarity}
                    </span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">{strain.description}</p>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-green-400">THC Potency</span>
                        <span>{strain.thcLevel}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-blue-400">CBD Potency</span>
                        <span>{strain.cbdLevel}%</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-yellow-400">Yield</span>
                        <span>+{strain.yieldMultiplier}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-purple-400">Flowering Time</span>
                        <span>{strain.floweringTime} days</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-muted/20 rounded-lg p-3">
                    <h4 className="text-sm font-semibold text-muted-foreground mb-2">Genetics Profile</h4>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>Flowering: {strain.floweringTime || 'N/A'} days</div>
                      <div>THC: {strain.thcLevel || 'N/A'}%</div>
                      <div>CBD: {strain.cbdLevel || 'N/A'}%</div>
                      <div>Yield: +{strain.yieldMultiplier || 100}%</div>
                    </div>
                  </div>
                  
                  {/* Marketplace Actions - Only show for grown strains */}
                  {harvestHistory.some(h => h.strainId === strain.id) ? (
                    <div className="bg-green-500/10 rounded-lg p-3 border border-green-500/20">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-semibold text-green-400">💰 Sell on Marketplace</h4>
                          <p className="text-xs text-muted-foreground">List this grown strain for other players to buy</p>
                        </div>
                        <button
                          onClick={() => {
                            const price = prompt(`Enter sale price for ${strain.name} (in KUSH):`);
                            if (price && Number(price) > 0) {
                              sellStrainToMarketplace(strain.id, Number(price));
                            }
                          }}
                          className="px-3 py-1.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg text-xs font-medium hover:from-green-400 hover:to-emerald-400 transition-all"
                        >
                          🌱 List for Sale
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-amber-500/10 rounded-lg p-3 border border-amber-500/20">
                      <div className="text-center">
                        <h4 className="text-sm font-semibold text-amber-400">🌱 Grow This Strain First!</h4>
                        <p className="text-xs text-muted-foreground">You must grow and harvest this strain before selling it</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Cross-Breeding */}
      {activeSubTab === 'breeding' && (
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-card to-card/80 rounded-xl p-6 border border-blue-500/20">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto">
                <i className="fas fa-dna text-white text-2xl"></i>
              </div>
              <div>
                <h3 className="text-xl font-bold text-blue-400">🧬 Strain Breeding Lab</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Combine two parent strains to create unique hybrid genetics! Cost: 10 SEEDS
                </p>
              </div>
            </div>
          </div>

          {/* Breeding Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-card to-card/80 rounded-xl p-4 border border-blue-500/20">
              <h4 className="text-blue-400 font-semibold mb-3">🧬 Parent Strain 1</h4>
              <div className="grid grid-cols-2 gap-2">
                {strainGenetics.slice(0, 4).map(strain => (
                  <div key={strain.id} 
                       className={`p-3 rounded-lg border ${RARITY_COLORS[strain.rarity]} bg-gradient-to-br from-card/50 to-card cursor-pointer hover:from-card hover:to-card/80 transition-all text-center`}
                       onClick={() => setSelectedStrain(strain)}>
                    <i className="fas fa-cannabis text-xl mb-2"></i>
                    <h5 className="font-semibold text-xs">{strain.name}</h5>
                    <p className="text-xs opacity-80 capitalize">{strain.rarity}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-card to-card/80 rounded-xl p-4 border border-purple-500/20">
              <h4 className="text-purple-400 font-semibold mb-3">🧬 Parent Strain 2</h4>
              <div className="grid grid-cols-2 gap-2">
                {strainGenetics.slice(2, 6).map(strain => (
                  <div key={strain.id} 
                       className={`p-3 rounded-lg border ${RARITY_COLORS[strain.rarity]} bg-gradient-to-br from-card/50 to-card cursor-pointer hover:from-card hover:to-card/80 transition-all text-center`}>
                    <i className="fas fa-cannabis text-xl mb-2"></i>
                    <h5 className="font-semibold text-xs">{strain.name}</h5>
                    <p className="text-xs opacity-80 capitalize">{strain.rarity}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Breeding Action */}
          <div className="bg-gradient-to-br from-card to-card/80 rounded-xl p-4 border border-green-500/20">
            <div className="text-center space-y-3">
              <button 
                onClick={() => {
                  if (strainGenetics.length >= 2) {
                    crossBreedStrains(strainGenetics[0].id, strainGenetics[1].id);
                  }
                }}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg font-medium hover:from-blue-400 hover:to-purple-400 transition-all">
                🧬 Cross-Breed Strains (10 SEEDS)
              </button>
              <p className="text-xs text-muted-foreground">Creates 2 unique hybrids with traits from both parents!</p>
            </div>
          </div>
        </div>
      )}

      {/* Supplies */}
      {activeSubTab === 'supplies' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { type: 'garden_plot', name: 'Garden Plot', icon: '🏺', cost: 5000, description: 'Unlock new growing space' },
              { type: 'water', name: 'Premium Water', icon: '💧', cost: 100, description: 'Keep plants hydrated' },
              { type: 'fertilizer', name: 'Organic Fertilizer', icon: '🧪', cost: 500, description: 'Boost plant growth' },
              { type: 'seeds', name: 'Quality Seeds', icon: '🌱', cost: 1000, description: 'Plant new strains' },
              { type: 'nutrients', name: 'Plant Nutrients', icon: '💊', cost: 300, description: 'Enhanced nutrition' },
              { type: 'ph_strips', name: 'pH Test Strips', icon: '📊', cost: 200, description: 'Monitor soil pH' }
            ].map(supply => (
              <div key={supply.type} className="bg-gradient-to-br from-card to-card/80 rounded-xl p-4 border border-yellow-500/20">
                <div className="text-center space-y-3">
                  <div className="text-3xl">{supply.icon}</div>
                  <div>
                    <h4 className="font-semibold text-foreground">{supply.name}</h4>
                    {supply.type === 'garden_plot' ? (
                      <p className="text-sm text-muted-foreground">Plots Unlocked: {Math.max(6, gardenPlots.length)}</p>
                    ) : (
                      <p className="text-sm text-muted-foreground">Owned: {getSupplyQuantity(supply.type)}</p>
                    )}
                    <p className="text-xs text-muted-foreground mb-1">{supply.description}</p>
                    <p className="text-xs text-yellow-400">💰 {supply.cost.toLocaleString()} KUSH</p>
                  </div>
                  <button 
                    onClick={() => supply.type === 'garden_plot' ? buyGardenPlot() : buySupplies(supply.type, 1)}
                    className={`w-full px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      gameState?.totalKush >= supply.cost
                        ? 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400'
                        : 'bg-gray-600 cursor-not-allowed opacity-50'
                    }`}
                    disabled={gameState?.totalKush < supply.cost}>
                    {gameState?.totalKush >= supply.cost ? 
                      (supply.type === 'garden_plot' ? 'Unlock Plot' : 'Buy 1x') : 
                      `Need ${supply.cost.toLocaleString()} KUSH`}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Harvest History */}
      {activeSubTab === 'history' && (
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-card to-card/80 rounded-xl p-4 border border-orange-500/20">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                <i className="fas fa-history text-white text-xl"></i>
              </div>
              <div>
                <h3 className="text-lg font-bold text-orange-400">📊 Harvest History</h3>
                <p className="text-orange-300/80 text-sm">Track your cultivation success</p>
              </div>
            </div>

            {/* Mock Harvest History Data */}
            <div className="space-y-3">
              {[
                { strain: "OG Kush", yield: "2.3x", kush: 1250, date: "2 hours ago", quality: "Premium" },
                { strain: "Blue Dream", yield: "1.8x", kush: 980, date: "1 day ago", quality: "Good" },
                { strain: "White Widow", yield: "3.1x", kush: 2100, date: "3 days ago", quality: "Excellent" }
              ].map((harvest, i) => (
                <div key={i} className="bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-lg p-3 border border-orange-500/20">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <i className="fas fa-cannabis text-orange-400"></i>
                      <div>
                        <h4 className="font-semibold text-sm">{harvest.strain}</h4>
                        <p className="text-xs text-muted-foreground">{harvest.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-green-400">+{harvest.kush.toLocaleString()} KUSH</div>
                      <div className="text-xs text-orange-400">Yield: {harvest.yield} • {harvest.quality}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats Summary */}
            <div className="mt-6 grid grid-cols-3 gap-3">
              <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-lg p-3 border border-green-500/20 text-center">
                <div className="text-lg font-bold text-green-400">12</div>
                <div className="text-xs text-muted-foreground">Total Harvests</div>
              </div>
              <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-lg p-3 border border-yellow-500/20 text-center">
                <div className="text-lg font-bold text-yellow-400">2.4x</div>
                <div className="text-xs text-muted-foreground">Avg Yield</div>
              </div>
              <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg p-3 border border-purple-500/20 text-center">
                <div className="text-lg font-bold text-purple-400">18.2k</div>
                <div className="text-xs text-muted-foreground">Total KUSH</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}