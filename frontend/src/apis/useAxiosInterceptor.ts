import { useEffect } from "react";
import { NavigateFunction, useLocation } from "react-router-dom";
import customAxios from "./axios.config";

export const useAxiosInterceptor = (navigate: NavigateFunction) => {
  const location = useLocation();

  useEffect(() => {
    const responseInterceptor = customAxios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response.status === 401) {
          navigate("/login", {
            replace: true,
            state: { from: location.pathname },
          });
        }
        return Promise.reject(error);
      }
    );

    return () => {
      customAxios.interceptors.response.eject(responseInterceptor);
    };
  }, []);
};
