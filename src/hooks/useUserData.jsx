import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { axiosPublic } from "./useAxios";

export const useUserData = () => {
  const { user } = useContext(AuthContext);
  const [dbUser, setDbUser] = useState(null);
  const [isUserLoading, setIsUserLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
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

  return [dbUser, isUserLoading];
};
