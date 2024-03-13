import { useUser } from '@clerk/clerk-react'
import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

const Hero = () => {
    
    const { user } = useUser()
    const navigate = useNavigate();

    useEffect( () => {
        if(user) {
            navigate('/')
        }
    }, [user])

    return ( 
    <>
    HERO!!
    </>
    );
}
 
export default Hero;