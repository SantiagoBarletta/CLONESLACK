import React, { useState } from 'react';

import { NewWorkspace, NewWorkspaceHeader } from '../../Componets';


function NewWorkspaceScreen() {
    
    return (
        <div className="contact-screens">
            <NewWorkspaceHeader />
            <NewWorkspace />
      </div>
    );
}

export default NewWorkspaceScreen;
