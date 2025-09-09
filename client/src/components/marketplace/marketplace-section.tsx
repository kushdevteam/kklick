import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useGameState } from '@/hooks/use-game-state';

interface MarketplaceListing {
  id: string;
  sellerId: string;
  itemType: string;
  itemId: string;
  quantity: number;
  pricePerUnit: number;
  currency: string;
  sellerName?: string;
  itemName?: string;
}

type GameSection = 'game' | 'upgrades' | 'achievements' | 'leaderboard' | 'wallet' | 'tokens' | 'referral' | 'friends' | 'marketplace' | 'vip' | 'staking' | 'events' | 'guilds' | 'garden';

interface MarketplaceSectionProps {
  onSectionChange?: (section: GameSection) => void;
}

export default function MarketplaceSection({ onSectionChange }: MarketplaceSectionProps) {
  const [listings, setListings] = useState<MarketplaceListing[]>([]);
  const [loading, setLoading] = useState(true);
  const { gameState } = useGameState();
  const { toast } = useToast();

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const response = await fetch('/api/marketplace/listings');
      if (response.ok) {
        const data = await response.json();
        setListings(data);
      }
    } catch (error) {
      console.error('Error fetching marketplace listings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = async (listingId: string) => {
    try {
      const response = await fetch('/api/marketplace/purchase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          buyerId: gameState?.id,
          listingId
        })
      });

      const result = await response.json();
      
      if (response.ok) {
        toast({
          title: "Purchase Successful!",
          description: result.message,
        });
        fetchListings(); // Refresh listings
      } else {
        toast({
          title: "Purchase Failed",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to complete purchase",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse bg-card/50 h-32 rounded-lg"></div>
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
            <i className="fas fa-store text-primary"></i>
            Strain Marketplace
          </CardTitle>
          <CardDescription>
            Buy and sell cannabis strains with other players using KUSH tokens
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid gap-4">
        {listings.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center">
              <i className="fas fa-seedling text-4xl text-muted-foreground mb-4"></i>
              <p className="text-muted-foreground">No strains listed for sale yet</p>
              <p className="text-sm text-muted-foreground mt-2">
                Be the first to list your rare strains!
              </p>
            </CardContent>
          </Card>
        ) : (
          listings.map((listing) => (
            <Card key={listing.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold">{listing.itemName || `Strain ${listing.itemId.slice(0, 8)}`}</h3>
                      <Badge variant="secondary">x{listing.quantity}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Seller: {listing.sellerName || listing.sellerId.slice(0, 8)}...
                    </p>
                    <div className="flex items-center gap-4">
                      <span className="text-lg font-bold text-primary">
                        {listing.pricePerUnit.toLocaleString()} KUSH
                      </span>
                      <span className="text-sm text-muted-foreground">
                        Total: {(listing.pricePerUnit * listing.quantity).toLocaleString()} KUSH
                      </span>
                    </div>
                  </div>
                  <Button 
                    onClick={() => handlePurchase(listing.id)}
                    disabled={!gameState || gameState.totalKush < (listing.pricePerUnit * listing.quantity)}
                  >
                    <i className="fas fa-shopping-cart mr-2"></i>
                    Buy Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <Card>
        <CardContent className="pt-4">
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              Want to sell your strains? Visit the Garden section to list your crops!
            </p>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onSectionChange?.('garden')}
              data-testid="button-go-to-garden"
            >
              <i className="fas fa-seedling mr-2"></i>
              Go to Garden
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}