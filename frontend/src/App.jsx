import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  ChanelsScreen,
  NewWorkspaceScreen,
  WorkspacesScreen,
  LoginScreen,
  RegisterScreen,
  ForgotPasswordScreen,
  RecoveryPasswordScreen
} from "./Screens";

import { NewChannel, Help, UserInfo } from "./Components";
import ProtectedRoute from "./Components/ProtectedRoute";
import EditProfile from "./Components/Users/EditProfile";






const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginScreen />} />
      
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
      <Route path="/recovery-password/:reset_token" element={<RecoveryPasswordScreen />} />
      {/* Rutas protegidas */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<WorkspacesScreen />} />
        <Route path="/workspaces/:workspaceID/:channelID" element={<ChanelsScreen />} />
        <Route path="/workspaces/new" element={<NewWorkspaceScreen />} />
        <Route path="/workspaces/:workspaceID/user/:userID" element={<UserInfo />} />
        <Route path="/workspaces/:workspaceID/new-channel" element={<NewChannel />} />
        <Route path="/help" element={<Help />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        

      </Route>
    </Routes>
  );
};

export default App;
