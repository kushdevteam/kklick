import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface FriendsSystemProps {
  playerId: string;
}

export default function FriendsSystem({ playerId }: FriendsSystemProps) {
  const [activeTab, setActiveTab] = useState<'friends' | 'requests' | 'add'>('friends');
  const [usernameToAdd, setUsernameToAdd] = useState('');
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: friends } = useQuery({
    queryKey: ['friends', playerId],
    queryFn: async () => {
      const response = await apiRequest('GET', `/api/players/${playerId}/friends`);
      return response.json();
    },
    enabled: !!playerId,
  });

  const addFriendMutation = useMutation({
    mutationFn: async (toPlayerUsername: string) => {
      const response = await apiRequest('POST', `/api/players/${playerId}/friend-requests`, {
        toPlayerUsername
      });
      return response.json();
    },
    onSuccess: (data) => {
      if (data.success) {
        toast({
          title: "✉️ Friend Request Sent!",
          description: data.message,
          className: "bg-green-500/10 border-green-500/30",
        });
        setUsernameToAdd('');
      } else {
        toast({
          title: "Request Failed",
          description: data.message,
          variant: "destructive",
        });
      }
    },
    onError: (error) => {
      console.error('Add friend error:', error);
      toast({
        title: "Error",
        description: "Failed to send friend request. Please try again.",
        variant: "destructive",
      });
    }
  });

  const handleAddFriend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!usernameToAdd.trim()) return;
    
    addFriendMutation.mutate(usernameToAdd.trim());
  };

  const TabButton = ({ tab, label, icon }: { tab: string, label: string, icon: string }) => (
    <button
      onClick={() => setActiveTab(tab as any)}
      className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm transition-all ${
        activeTab === tab 
          ? 'bg-primary text-primary-foreground' 
          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
      }`}
    >
      <i className={`fas ${icon}`}></i>
      <span>{label}</span>
    </button>
  );

  return (
    <div className="bg-gradient-to-br from-card to-card/80 rounded-xl p-4 border border-primary/20 shadow-xl">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary/80 rounded-full flex items-center justify-center">
          <i className="fas fa-users text-white text-sm"></i>
        </div>
        <h3 className="text-lg font-bold text-foreground">👫 Friends</h3>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-4 bg-muted/30 p-1 rounded-lg">
        <TabButton tab="friends" label="Friends" icon="fa-user-friends" />
        <TabButton tab="add" label="Add" icon="fa-user-plus" />
      </div>

      {/* Content */}
      {activeTab === 'friends' && (
        <div className="space-y-3">
          {friends && friends.length > 0 ? (
            friends.map((friend: any) => (
              <div key={friend.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                    <i className="fas fa-user text-primary text-xs"></i>
                  </div>
                  <div>
                    <p className="font-medium text-sm">{friend.username}</p>
                    <p className="text-xs text-muted-foreground">Level {friend.level || 1}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded hover:bg-accent/80 transition-colors">
                    Gift
                  </button>
                  <button className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded hover:bg-primary/80 transition-colors">
                    View
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <i className="fas fa-user-friends text-2xl text-muted-foreground mb-2"></i>
              <p className="text-muted-foreground text-sm">No friends yet</p>
              <p className="text-xs text-muted-foreground">Add friends to compete and send gifts!</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'add' && (
        <div className="space-y-4">
          <form onSubmit={handleAddFriend} className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                🔍 Add Friend by Username
              </label>
              <input
                type="text"
                value={usernameToAdd}
                onChange={(e) => setUsernameToAdd(e.target.value)}
                placeholder="Enter username (e.g., @username)"
                className="w-full px-3 py-2 bg-muted border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                disabled={addFriendMutation.isPending}
              />
            </div>
            <button
              type="submit"
              disabled={!usernameToAdd.trim() || addFriendMutation.isPending}
              className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              {addFriendMutation.isPending ? 'Sending...' : 'Send Friend Request'}
            </button>
          </form>

          <div className="bg-accent/10 rounded-lg p-3 border border-accent/20">
            <h4 className="text-sm font-medium text-accent mb-2">💡 Friend Benefits</h4>
            <ul className="text-xs text-accent/80 space-y-1">
              <li>• Send and receive KUSH gifts</li>
              <li>• Compete on friend leaderboards</li>
              <li>• Share achievements and progress</li>
              <li>• Team up for guild challenges</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}