import React  from 'react';
import { UsersHeader, RecoveryPassword, UsersFooter  } from '../../Components';



function RecoveryPasswordScreen() {
    
    return (
        <div className="contact-screens">
            <UsersHeader/>
            <RecoveryPassword/>
            <UsersFooter />
      </div>
    );
}

export default RecoveryPasswordScreen;