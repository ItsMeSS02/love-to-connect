

import NoFriendsFound from "./NoFriendsFound";
import FriendCard from "./FriendCard";
import { useQuery } from "@tanstack/react-query";
import { getUserFriends } from "../lib/api";

const FriendList = () => {
  const { data: friends, isLoading: loadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  return (
   <>

      <div className="p-4">
        <h2 className="text-2xl font-bold text-center">Friends</h2>
         <div className="divider mt-0 mb-4" />
             {loadingFriends ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg" />
          </div>
        ) : friends.length === 0 ? (
          <NoFriendsFound />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 x2:grid-cols-4 gap-5">
            {friends.map((friend) => (
              <FriendCard key={friend._id} friend={friend} />
            ))}
          </div>
        )}
      </div>
    
   </>
  )
}

export default FriendList
