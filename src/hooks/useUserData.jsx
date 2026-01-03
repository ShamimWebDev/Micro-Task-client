import { useContext, useEffect, useState, useCallback } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { axiosPublic } from "./useAxios";

export const useUserData = () => {
  const { user } = useContext(AuthContext);
  const [dbUser, setDbUser] = useState(null);
  const [isUserLoading, setIsUserLoading] = useState(true);

  const fetchUserData = useCallback(() => {
    if (user?.email) {
      setIsUserLoading(true);
      axiosPublic
        .get(`/users/role/${user.email}`)
        .then((res) => {
          setDbUser(res.data);
          setIsUserLoading(false);
        })
        .catch(() => {
          setIsUserLoading(false);
        });
    } else {
      setIsUserLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  // Refetch function to update data after actions like payment
  const refetch = () => {
    fetchUserData();
  };

  return [dbUser, isUserLoading, refetch];
};
