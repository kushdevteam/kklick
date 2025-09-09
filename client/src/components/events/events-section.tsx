import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useGameState } from '@/hooks/use-game-state';

interface SeasonalEvent {
  id: string;
  name: string;
  description: string;
  theme: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  specialRewards: string[];
  participantCount: number;
  requirements?: string;
  multiplier?: number;
  challengeType?: 'clicking' | 'harvesting' | 'trading' | 'social';
  maxParticipants?: number;
  prizePool?: number;
}

interface DailyChallenge {
  id: string;
  title: string;
  description: string;
  type: 'clicks' | 'kush' | 'upgrades' | 'social';
  target: number;
  progress: number;
  reward: number;
  isCompleted: boolean;
  timeRemaining: number;
}

export default function EventsSection() {
  const [events, setEvents] = useState<SeasonalEvent[]>([]);
  const [dailyChallenges, setDailyChallenges] = useState<DailyChallenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [challengesLoading, setChallengesLoading] = useState(true);
  const [joinedEvents, setJoinedEvents] = useState<Set<string>>(new Set());
  const { gameState } = useGameState();
  const { toast } = useToast();

  useEffect(() => {
    fetchEvents();
    fetchDailyChallenges();
  }, []);
  
  const fetchDailyChallenges = async () => {
    try {
      // Mock daily challenges for enhanced seasonal system
      const mockChallenges: DailyChallenge[] = [
        {
          id: 'daily-clicks',
          title: 'Click Champion',
          description: 'Perform 500 clicks today',
          type: 'clicks',
          target: 500,
          progress: Math.floor(Math.random() * 300),
          reward: 2500,
          isCompleted: false,
          timeRemaining: 14 * 3600 // 14 hours in seconds
        },
        {
          id: 'daily-kush',
          title: 'KUSH Collector',
          description: 'Earn 10,000 KUSH today',
          type: 'kush',
          target: 10000,
          progress: Math.floor(Math.random() * 8000),
          reward: 5000,
          isCompleted: false,
          timeRemaining: 14 * 3600
        },
        {
          id: 'weekend-social',
          title: 'Social Weekend',
          description: 'Invite 3 new friends',
          type: 'social',
          target: 3,
          progress: Math.floor(Math.random() * 2),
          reward: 15000,
          isCompleted: false,
          timeRemaining: 2 * 24 * 3600 // 2 days
        }
      ];
      setDailyChallenges(mockChallenges);
    } catch (error) {
      console.error('Error fetching daily challenges:', error);
    } finally {
      setChallengesLoading(false);
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/events/active');
      if (response.ok) {
        const data = await response.json();
        setEvents(data);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleJoinEvent = async (eventId: string) => {
    try {
      const response = await fetch('/api/events/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          playerId: gameState?.id || '',
          eventId
        })
      });

      const result = await response.json();
      
      if (response.ok) {
        setJoinedEvents(prev => new Set(prev).add(eventId));
        toast({
          title: "🎉 Event Joined!",
          description: result.message,
          className: "bg-gradient-to-r from-blue-500 to-purple-600 text-white border-blue-400",
        });
        fetchEvents(); // Refresh events
      } else {
        toast({
          title: "Failed to Join Event",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to join event",
        variant: "destructive",
      });
    }
  };

  const handleClaimChallenge = async (challengeId: string) => {
    // Mock claiming for now - would be replaced with real API
    setDailyChallenges(prev => prev.map(challenge => 
      challenge.id === challengeId 
        ? { ...challenge, isCompleted: true }
        : challenge
    ));
    
    const challenge = dailyChallenges.find(c => c.id === challengeId);
    if (challenge) {
      toast({
        title: "🎉 Challenge Completed!",
        description: `Earned ${challenge.reward} KUSH bonus!`,
        className: "bg-gradient-to-r from-green-500 to-emerald-600 text-white border-green-400",
      });
    }
  };

  const getTimeRemaining = (endDate: string) => {
    const now = new Date();
    const end = new Date(endDate);
    const diff = end.getTime() - now.getTime();
    
    if (diff <= 0) return 'Event ended';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days}d ${hours}h left`;
    return `${hours}h left`;
  };

  const getEventIcon = (theme: string) => {
    switch (theme) {
      case '420day': return 'fas fa-leaf';
      case 'harvest': return 'fas fa-wheat';
      case 'winter': return 'fas fa-snowflake';
      case 'spring': return 'fas fa-seedling';
      case 'summer': return 'fas fa-sun';
      case 'halloween': return 'fas fa-ghost';
      case 'newyear': return 'fas fa-fireworks';
      case 'valentine': return 'fas fa-heart';
      default: return 'fas fa-calendar-star';
    }
  };

  const getEventColor = (theme: string) => {
    switch (theme) {
      case '420day': return 'text-green-400 bg-green-100';
      case 'harvest': return 'text-orange-400 bg-orange-100';
      case 'winter': return 'text-blue-400 bg-blue-100';
      case 'spring': return 'text-green-500 bg-green-100';
      case 'summer': return 'text-yellow-400 bg-yellow-100';
      case 'halloween': return 'text-orange-500 bg-orange-100';
      case 'newyear': return 'text-purple-500 bg-purple-100';
      case 'valentine': return 'text-pink-500 bg-pink-100';
      default: return 'text-purple-400 bg-purple-100';
    }
  };

  const getChallengeIcon = (type: string) => {
    switch (type) {
      case 'clicks': return 'fas fa-mouse-pointer';
      case 'kush': return 'fas fa-coins';
      case 'upgrades': return 'fas fa-bolt';
      case 'social': return 'fas fa-users';
      default: return 'fas fa-trophy';
    }
  };
  
  const formatTimeRemaining = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 24) {
      const days = Math.floor(hours / 24);
      return `${days}d ${hours % 24}h`;
    }
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  if (loading && challengesLoading) {
    return (
      <div className="space-y-4">
        <div className="skeleton h-32 w-full rounded-lg"></div>
        <div className="skeleton h-48 w-full rounded-lg"></div>
        <div className="skeleton h-32 w-full rounded-lg"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 touch-action-manipulation">
      {/* Daily Challenges Section */}
      <Card className="touch-responsive mobile-card-enhanced">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <i className="fas fa-trophy text-yellow-500 animate-pulse"></i>
            Daily Challenges
          </CardTitle>
          <CardDescription>
            Complete daily tasks for bonus KUSH rewards
          </CardDescription>
        </CardHeader>
        <CardContent>
          {challengesLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="skeleton h-16 w-full rounded-lg"></div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {dailyChallenges.map((challenge) => {
                const progress = Math.min((challenge.progress / challenge.target) * 100, 100);
                return (
                  <div key={challenge.id} className={`p-3 rounded-lg border bg-card/50 transition-all duration-300 hover:scale-[1.02] mobile-card-enhanced ${
                    challenge.isCompleted ? 'border-green-500 bg-green-500/10 animate-success-pulse' : 'border-border'
                  }`} data-testid={`challenge-${challenge.id}`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <i className={`${getChallengeIcon(challenge.type)} text-primary`}></i>
                        <h4 className="font-semibold text-sm">{challenge.title}</h4>
                        {challenge.isCompleted && (
                          <Badge className="bg-green-500 text-white animate-pulse">
                            ✓ Complete
                          </Badge>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-primary">
                          +{challenge.reward.toLocaleString()} KUSH
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {formatTimeRemaining(challenge.timeRemaining)}
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">{challenge.description}</p>
                    
                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">
                          Progress: {challenge.progress.toLocaleString()}/{challenge.target.toLocaleString()}
                        </span>
                        <span className="text-primary font-medium">{Math.round(progress)}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-500 ease-out ${
                            progress === 100 ? 'bg-gradient-to-r from-green-500 to-emerald-600 animate-pulse' : 'bg-primary'
                          }`}
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    {progress >= 100 && !challenge.isCompleted && (
                      <Button 
                        className="w-full mt-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white animate-pulse mobile-button-enhanced touch-action-manipulation"
                        onClick={() => handleClaimChallenge(challenge.id)}
                        data-testid={`button-claim-${challenge.id}`}
                      >
                        <i className="fas fa-gift mr-2"></i>
                        Claim Reward
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Seasonal Events Section */}
      <Card className="touch-responsive mobile-card-enhanced">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <i className="fas fa-calendar-star text-primary animate-seasonal-shimmer"></i>
            Seasonal Events
          </CardTitle>
          <CardDescription>
            Join limited-time events for exclusive rewards and special strains
          </CardDescription>
        </CardHeader>
      </Card>

      {events.length === 0 ? (
        <Card className="mobile-card-enhanced">
          <CardContent className="pt-6 text-center">
            <i className="fas fa-calendar text-4xl text-muted-foreground mb-4 animate-float"></i>
            <p className="text-muted-foreground">No active events at the moment</p>
            <p className="text-sm text-muted-foreground mt-2">
              Check back later for exciting seasonal events!
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {events.map((event) => (
            <Card key={event.id} className={`hover:shadow-lg transition-all duration-300 hover:scale-[1.02] mobile-card-enhanced touch-responsive ${
              event.isActive ? 'border-primary animate-pulse' : 'opacity-75'
            } ${joinedEvents.has(event.id) ? 'ring-2 ring-primary/50' : ''}`} data-testid={`event-${event.id}`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="flex items-center gap-2">
                      <i className={`${getEventIcon(event.theme)} text-primary ${event.isActive ? 'animate-pulse' : ''}`}></i>
                      {event.name}
                      {event.multiplier && (
                        <Badge className="bg-accent text-accent-foreground animate-bounce">
                          {event.multiplier}x Bonus
                        </Badge>
                      )}
                    </CardTitle>
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge className={getEventColor(event.theme)}>
                        {event.theme.toUpperCase()}
                      </Badge>
                      <Badge variant={event.isActive ? "default" : "secondary"} className={event.isActive ? 'animate-pulse' : ''}>
                        {event.isActive ? "Active" : "Ended"}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {event.participantCount} participants
                      </span>
                      {event.maxParticipants && (
                        <span className="text-xs text-muted-foreground">
                          / {event.maxParticipants} max
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right text-sm text-muted-foreground">
                    {event.isActive ? getTimeRemaining(event.endDate) : 'Event ended'}
                  </div>
                </div>
                <CardDescription>{event.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {event.specialRewards.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold mb-2 flex items-center gap-1">
                        <i className="fas fa-gift text-primary"></i>
                        Special Rewards:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {event.specialRewards.map((reward, index) => (
                          <Badge key={index} variant="outline" className="animate-fade-in-up">
                            {reward}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {event.prizePool && (
                    <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-3 rounded-lg border border-primary/20">
                      <div className="flex items-center gap-2">
                        <i className="fas fa-trophy text-yellow-500"></i>
                        <span className="font-semibold">Prize Pool:</span>
                        <span className="text-primary font-bold">{event.prizePool.toLocaleString()} KUSH</span>
                      </div>
                    </div>
                  )}
                  
                  {event.requirements && (
                    <div>
                      <h4 className="text-sm font-semibold mb-1 flex items-center gap-1">
                        <i className="fas fa-list-check text-muted-foreground"></i>
                        Requirements:
                      </h4>
                      <p className="text-sm text-muted-foreground">{event.requirements}</p>
                    </div>
                  )}

                  {event.isActive && (
                    <Button 
                      className={`w-full mobile-button-enhanced touch-action-manipulation transition-all duration-300 ${
                        joinedEvents.has(event.id) 
                          ? 'bg-green-500 hover:bg-green-600' 
                          : 'bg-primary hover:bg-primary/90'
                      }`}
                      onClick={() => handleJoinEvent(event.id)}
                      disabled={joinedEvents.has(event.id)}
                      data-testid={`button-join-event-${event.id}`}
                    >
                      <i className={`${joinedEvents.has(event.id) ? 'fas fa-check' : 'fas fa-play'} mr-2`}></i>
                      {joinedEvents.has(event.id) ? 'Joined!' : 'Join Event'}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Upcoming Events Teaser */}
      <Card className="mobile-card-enhanced touch-responsive">
        <CardContent className="pt-4">
          <div className="text-center space-y-3">
            <h4 className="font-semibold flex items-center justify-center gap-2">
              <i className="fas fa-calendar-clock text-accent animate-pulse"></i>
              Upcoming Seasonal Events
            </h4>
            <p className="text-sm text-muted-foreground mb-4">
              Events rotate seasonally and offer exclusive strains and massive rewards!
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-green-100/10 hover:bg-green-100/20 transition-colors">
                <i className="fas fa-leaf text-green-400 text-lg"></i>
                <span className="text-green-400 font-medium">420 Day</span>
                <span className="text-xs text-muted-foreground">April 20</span>
              </div>
              <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-orange-100/10 hover:bg-orange-100/20 transition-colors">
                <i className="fas fa-wheat text-orange-400 text-lg"></i>
                <span className="text-orange-400 font-medium">Harvest</span>
                <span className="text-xs text-muted-foreground">Fall Season</span>
              </div>
              <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-orange-100/10 hover:bg-orange-100/20 transition-colors">
                <i className="fas fa-ghost text-orange-500 text-lg"></i>
                <span className="text-orange-500 font-medium">Halloween</span>
                <span className="text-xs text-muted-foreground">October 31</span>
              </div>
              <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-blue-100/10 hover:bg-blue-100/20 transition-colors">
                <i className="fas fa-snowflake text-blue-400 text-lg"></i>
                <span className="text-blue-400 font-medium">Winter</span>
                <span className="text-xs text-muted-foreground">December</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}