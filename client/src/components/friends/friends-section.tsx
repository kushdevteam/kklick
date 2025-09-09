import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface FriendsSectionProps {
  gameState: {
    id: string;
    username: string;
  };
}

interface Friend {
  id: string;
  username: string;
  totalKush: number;
  level: number;
}

interface FriendRequest {
  id: string;
  playerId: string;
  friendId: string;
  status: string;
  requestedAt: string;
  friend: Friend;
}

export default function FriendsSection({ gameState }: FriendsSectionProps) {
  const [searchUsername, setSearchUsername] = useState('');
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch friends list
  const { data: friends = [], isLoading: friendsLoading } = useQuery({
    queryKey: ['friends', gameState.id],
    queryFn: async () => {
      const response = await apiRequest('GET', `/api/players/${gameState.id}/friends`);
      return await response.json();
    },
  });

  // Fetch pending requests
  const { data: pendingRequests = [], isLoading: requestsLoading } = useQuery({
    queryKey: ['pending-requests', gameState.id],
    queryFn: async () => {
      const response = await apiRequest('GET', `/api/players/${gameState.id}/pending-requests`);
      return await response.json();
    },
  });

  // Send friend request mutation
  const sendRequestMutation = useMutation({
    mutationFn: async (username: string) => {
      const response = await apiRequest('POST', `/api/players/${gameState.id}/friend-requests`, {
        toPlayerUsername: username
      });
      return await response.json();
    },
    onSuccess: (data: any) => {
      console.log('Friend request response:', data);
      if (data?.success) {
        toast({
          title: "Friend Request Sent!",
          description: data.message || "Friend request sent successfully!",
        });
        setSearchUsername('');
        // Refresh pending requests
        queryClient.invalidateQueries({ queryKey: ['pending-requests', gameState.id] });
      } else {
        toast({
          title: "Failed to Send Request",
          description: data?.message || "Failed to send friend request",
          variant: "destructive",
        });
      }
    },
    onError: (error: any) => {
      console.error('Friend request error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to send friend request",
        variant: "destructive",
      });
    }
  });

  // Accept friend request mutation
  const acceptRequestMutation = useMutation({
    mutationFn: async (friendshipId: string) => {
      const response = await apiRequest('POST', `/api/friendships/${friendshipId}/accept`, {
        playerId: gameState.id
      });
      return await response.json();
    },
    onSuccess: (data: any) => {
      toast({
        title: "Friend Request Accepted!",
        description: "You are now friends!",
      });
      queryClient.invalidateQueries({ queryKey: ['friends', gameState.id] });
      queryClient.invalidateQueries({ queryKey: ['pending-requests', gameState.id] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to accept friend request",
        variant: "destructive",
      });
    }
  });

  const handleSendRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchUsername.trim()) {
      toast({
        title: "Invalid Username",
        description: "Please enter a valid username",
        variant: "destructive"
      });
      return;
    }
    sendRequestMutation.mutate(searchUsername.trim());
  };

  const handleAcceptRequest = (friendshipId: string) => {
    acceptRequestMutation.mutate(friendshipId);
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <div className="flex items-center space-x-3 mb-6">
        <i className="fas fa-user-friends text-blue-400 text-2xl"></i>
        <h2 className="text-2xl font-bold text-foreground">Friends</h2>
      </div>

      {/* Add Friend Section */}
      <div className="bg-card rounded-xl p-6 border border-blue-200 dark:border-blue-800 mb-6">
        <div className="flex items-center space-x-2 mb-4">
          <i className="fas fa-user-plus text-blue-400"></i>
          <h3 className="font-semibold text-blue-400">Add New Friend</h3>
        </div>
        
        <form onSubmit={handleSendRequest} className="space-y-3">
          <div>
            <input
              type="text"
              value={searchUsername}
              onChange={(e) => setSearchUsername(e.target.value)}
              className="w-full px-4 py-3 bg-muted border border-input rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter username to add as friend"
            />
          </div>
          
          <button
            type="submit"
            disabled={sendRequestMutation.isPending || !searchUsername.trim()}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white py-3 rounded-lg font-bold transition-all duration-200"
          >
            {sendRequestMutation.isPending ? (
              <>
                <i className="fas fa-spinner fa-spin mr-2"></i>Sending...
              </>
            ) : (
              <>
                <i className="fas fa-user-plus mr-2"></i>Send Friend Request
              </>
            )}
          </button>
        </form>
      </div>

      {/* Pending Friend Requests */}
      {/* Pending Friend Requests - Always Show */}
      <div className="bg-card rounded-xl p-6 border border-yellow-200 dark:border-yellow-800 mb-6">
        <div className="flex items-center space-x-2 mb-4">
          <i className="fas fa-clock text-yellow-400"></i>
          <h3 className="font-semibold text-yellow-400">Pending Friend Requests ({Array.isArray(pendingRequests) ? pendingRequests.length : 0})</h3>
        </div>
        
        {requestsLoading ? (
          <div className="flex items-center justify-center py-8">
            <i className="fas fa-spinner fa-spin text-yellow-400 mr-2"></i>
            <span className="text-muted-foreground">Loading pending requests...</span>
          </div>
        ) : Array.isArray(pendingRequests) && pendingRequests.length > 0 ? (
          <div className="space-y-3">
            {pendingRequests.map((request: FriendRequest) => (
              <div key={request.id} className="flex items-center justify-between bg-muted rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <i className="fas fa-user text-muted-foreground"></i>
                  <div>
                    <div className="font-semibold text-foreground">{request.friend?.username || 'Unknown User'}</div>
                    <div className="text-sm text-muted-foreground">
                      {request.friend?.totalKush?.toLocaleString() || 0} $KUSH • Level {request.friend?.level || 1}
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => handleAcceptRequest(request.id)}
                  disabled={acceptRequestMutation.isPending}
                  className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-200"
                >
                  <i className="fas fa-check mr-2"></i>Accept
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <i className="fas fa-inbox text-4xl mb-4 opacity-50"></i>
            <p className="text-lg font-semibold">No pending requests</p>
            <p className="text-sm">Friend requests you receive will appear here</p>
          </div>
        )}
      </div>

      {/* Friends List */}
      <div className="bg-card rounded-xl p-6 border border-green-200 dark:border-green-800">
        <div className="flex items-center space-x-2 mb-4">
          <i className="fas fa-users text-green-400"></i>
          <h3 className="font-semibold text-green-400">Your Friends ({Array.isArray(friends) ? friends.length : 0})</h3>
        </div>
        
        {friendsLoading ? (
          <div className="text-center py-8">
            <i className="fas fa-spinner fa-spin text-4xl text-muted-foreground mb-3"></i>
            <p className="text-muted-foreground">Loading friends...</p>
          </div>
        ) : !Array.isArray(friends) || friends.length === 0 ? (
          <div className="text-center py-8">
            <i className="fas fa-user-friends text-4xl text-muted-foreground mb-3"></i>
            <p className="text-muted-foreground">No friends yet!</p>
            <p className="text-muted-foreground text-sm mt-2">Add some friends to compete and share the fun!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {Array.isArray(friends) && friends.map((friend: Friend) => (
              <div key={friend.id} className="flex items-center justify-between bg-muted rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <i className="fas fa-user text-green-400"></i>
                  <div>
                    <div className="font-semibold text-foreground">{friend.username}</div>
                    <div className="text-sm text-muted-foreground">
                      {friend.totalKush?.toLocaleString() || 0} $KUSH • Level {friend.level || 1}
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200">
                    <i className="fas fa-gift mr-1"></i>Gift
                  </button>
                  <button className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200">
                    <i className="fas fa-gamepad mr-1"></i>Challenge
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}