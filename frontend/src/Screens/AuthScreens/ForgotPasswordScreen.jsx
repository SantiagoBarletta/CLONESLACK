import React, { useState } from 'react';
import { UsersHeader, ForgotPassword, UsersFooter  } from '../../Components';



function ForgotPasswordScreen() {
    
    return (
        <div className="contact-screens">
            <UsersHeader/>
            <ForgotPassword/>
            <UsersFooter />
      </div>
    );
}

export default ForgotPasswordScreen;
