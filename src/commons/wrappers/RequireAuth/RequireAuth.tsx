import { ROUTES_CORE } from "commons/constants/paths";
import { selectIsAuthenticated } from "core/store/authSlice";
import { useAppSelector } from "core/store/hooks";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

export interface RequireAuthProps {
  children: ReactNode;
}

const RequireAuth = ({ children }: RequireAuthProps) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  if (isAuthenticated) {
    return <>{children}</>;
  }
  return <Navigate to={ROUTES_CORE.LOGIN} />;
};

export default RequireAuth;
