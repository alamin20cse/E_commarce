
import { useState, useEffect } from "react";
import useUser from "./useUser";



const useAdmin = () => {
  const [users, loading,] =useUser()
  const [isAdmin, setIsAdmin] = useState(false);
  console.log(users);

  useEffect(() => {
    if (!loading && users?.role === "admin") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [users, loading]);

  return [isAdmin, loading];
};

export default useAdmin;