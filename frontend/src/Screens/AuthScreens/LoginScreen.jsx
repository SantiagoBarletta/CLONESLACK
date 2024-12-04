import React  from 'react';
import { UsersHeader, Login, UsersFooter  } from '../../Components';



function LoginScreen() {
    
    return (
        <div className="contact-screens">
            <UsersHeader/>
            <Login/>
            <UsersFooter />
      </div>
    );
}

export default LoginScreen;