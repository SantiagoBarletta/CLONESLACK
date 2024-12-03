import React from 'react';
import { ChanelsScreen,  NewWorkspaceScreen, WorkspacesScreen } from './Screens';
import { Routes, Route } from 'react-router-dom';
import UserInfo from './Componets/Users/UserInfo';
import { NewChannel, Help } from './Componets';




function App() {
  return (
 
      <Routes>
        <Route path="/" element={<WorkspacesScreen />} />
        <Route path="/workspaces/:workspaceID/:channelID" element={<ChanelsScreen />} />
        <Route path="/workspaces/new" element={<NewWorkspaceScreen />} />
        <Route path="/workspaces/:workspaceID/user/:userID" element={<UserInfo />} />
        <Route path="/workspaces/:workspaceID/new-channel" element={<NewChannel />} />
        <Route path='/help' element={<Help />} />
      </Routes>
 
  )
}


export default App
