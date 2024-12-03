import React, { useState } from 'react';
import './WorkspacesScreen.css';
import { WorkspacesHeader, WorkspacesList, WorkspacesFooter  } from '../../Componets';


function WorkspacesScreen() {
    
    return (
        <div className="contact-screens">
            <WorkspacesHeader />
            <WorkspacesList />
            <WorkspacesFooter />
      </div>
    );
}

export default WorkspacesScreen;
