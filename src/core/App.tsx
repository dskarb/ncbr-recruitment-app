import { ROUTES_CORE, ROUTES_PROFILES } from "commons/constants/paths";
import RequireAuth from "commons/wrappers/RequireAuth/RequireAuth";
import Dashboard from "features/Dashboard/views/Dashboard";
import AddProfile from "features/Profiles/views/AddProfile";
import EditProfile from "features/Profiles/views/EditProfile";
import ProfilesList from "features/Profiles/views/ProfilesList";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./views/Login/Login";

const App = () => {
  return (
    <Routes>
      <Route
        path={ROUTES_CORE.DASHBOARD}
        element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        }
      />
      <Route
        path={ROUTES_PROFILES.PROFILES_LIST}
        element={
          <RequireAuth>
            <ProfilesList />
          </RequireAuth>
        }
      />
      <Route
        path={ROUTES_PROFILES.ADD_PROFILE}
        element={
          <RequireAuth>
            <AddProfile />
          </RequireAuth>
        }
      />
      <Route
        path={ROUTES_PROFILES.PROFILE_EDIT(":profileId")}
        element={
          <RequireAuth>
            <EditProfile />
          </RequireAuth>
        }
      />
      <Route path={ROUTES_CORE.LOGIN} element={<Login />} />

      <Route path="*" element={<Navigate to={ROUTES_CORE.LOGIN} replace />} />
    </Routes>
  );
};

export default App;
