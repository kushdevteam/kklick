import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useGameState } from '@/hooks/use-game-state';

interface VIPBenefits {
  hasVIP: boolean;
  tier: string | null;
  benefits: {
    kushMultiplier: number;
    seedsBonus: number;
    exclusiveStrains: string[];
    prioritySupport: boolean;
  };
}

export default function VIPSection() {
  const [vipStatus, setVipStatus] = useState<VIPBenefits | null>(null);
  const [loading, setLoading] = useState(true);
  const { gameState } = useGameState();
  const { toast } = useToast();

  useEffect(() => {
    if (gameState?.id) {
      fetchVIPStatus();
    }
  }, [gameState?.id]);

  const fetchVIPStatus = async () => {
    try {
      const response = await fetch(`/api/vip/benefits/${gameState?.id}`);
      if (response.ok) {
        const data = await response.json();
        setVipStatus(data);
      }
    } catch (error) {
      console.error('Error fetching VIP status:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async (tier: string) => {
    try {
      const response = await fetch('/api/vip/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          playerId: gameState?.id,
          tier
        })
      });

      const result = await response.json();
      
      if (response.ok) {
        toast({
          title: "VIP Subscription Activated!",
          description: result.message,
        });
        fetchVIPStatus(); // Refresh VIP status
      } else {
        toast({
          title: "Subscription Failed",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to activate VIP subscription",
        variant: "destructive",
      });
    }
  };

  const vipTiers = [
    {
      name: 'Silver',
      price: 5000,
      kushMultiplier: 150,
      seedsBonus: 50,
      color: 'text-gray-400',
      bg: 'bg-gray-100',
      features: ['1.5x KUSH Multiplier', '+50 Bonus Seeds', '1 Exclusive Strain', 'Priority Queue']
    },
    {
      name: 'Gold',
      price: 10000,
      kushMultiplier: 200,
      seedsBonus: 100,
      color: 'text-yellow-400',
      bg: 'bg-yellow-100',
      features: ['2x KUSH Multiplier', '+100 Bonus Seeds', '2 Exclusive Strains', 'Priority Support']
    },
    {
      name: 'Platinum',
      price: 20000,
      kushMultiplier: 300,
      seedsBonus: 200,
      color: 'text-blue-400',
      bg: 'bg-blue-100',
      features: ['3x KUSH Multiplier', '+200 Bonus Seeds', '2 Exclusive Strains', 'Premium Support']
    },
    {
      name: 'Diamond',
      price: 35000,
      kushMultiplier: 500,
      seedsBonus: 500,
      color: 'text-purple-400',
      bg: 'bg-purple-100',
      features: ['5x KUSH Multiplier', '+500 Bonus Seeds', '2 Exclusive Strains', 'VIP Support']
    }
  ];

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse bg-card/50 h-32 rounded-lg"></div>
        <div className="animate-pulse bg-card/50 h-32 rounded-lg"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <i className="fas fa-crown text-primary"></i>
            VIP Memberships
          </CardTitle>
          <CardDescription>
            Unlock exclusive benefits, multipliers, and premium strains
          </CardDescription>
        </CardHeader>
      </Card>

      {vipStatus?.hasVIP && (
        <Card className="border-primary">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <i className="fas fa-star text-primary"></i>
              Your VIP Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Badge className={`${vipTiers.find(t => t.name.toLowerCase() === vipStatus.tier)?.color}`}>
                {vipStatus.tier?.toUpperCase()} VIP
              </Badge>
              <div className="space-y-1">
                <p className="text-sm"><strong>{vipStatus.benefits.kushMultiplier}%</strong> KUSH Multiplier</p>
                <p className="text-sm"><strong>+{vipStatus.benefits.seedsBonus}</strong> Bonus Seeds</p>
                <p className="text-sm"><strong>{vipStatus.benefits.exclusiveStrains.length}</strong> Exclusive Strains</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {vipTiers.map((tier) => (
          <Card key={tier.name} className={`relative ${vipStatus?.tier === tier.name.toLowerCase() ? 'border-primary' : ''}`}>
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${tier.color}`}>
                <i className="fas fa-gem"></i>
                {tier.name} VIP
              </CardTitle>
              <CardDescription>
                <span className="text-2xl font-bold text-primary">{tier.price.toLocaleString()}</span> KUSH/hour
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mb-4">
                {tier.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <i className="fas fa-check text-primary text-sm"></i>
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
              
              {vipStatus?.tier === tier.name.toLowerCase() ? (
                <Badge variant="secondary" className="w-full justify-center py-2">
                  <i className="fas fa-check mr-2"></i>
                  Active Subscription
                </Badge>
              ) : (
                <Button
                  className="w-full"
                  onClick={() => handleSubscribe(tier.name.toLowerCase())}
                  disabled={!gameState || gameState.totalKush < tier.price}
                >
                  <i className="fas fa-crown mr-2"></i>
                  Subscribe Now
                </Button>
              )}
              
              {!gameState || gameState.totalKush < tier.price ? (
                <p className="text-xs text-muted-foreground text-center mt-2">
                  Need {(tier.price - (gameState?.totalKush || 0)).toLocaleString()} more KUSH
                </p>
              ) : null}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}