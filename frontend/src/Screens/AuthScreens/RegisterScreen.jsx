import React  from 'react';
import { UsersHeader, Register, UsersFooter  } from '../../Components';



function RegisterScreen() {
    
    return (
        <div className="contact-screens">
            <UsersHeader/>
            <Register/>
            <UsersFooter />
      </div>
    );
}

export default RegisterScreen;