import { UserButton, SignInButton, SignedIn, SignedOut, useClerk} from "@clerk/clerk-react";
import { Link, useNavigate} from "react-router-dom";

import '../styles/nav.css'
import { useEffect } from "react";

const Navbar = (user) => {

    const { signOut } = useClerk();
    const navigate = useNavigate();

    return (
        <>
            <SignedIn>
                <div className="nav-container">
                    <nav className="navbar">
                        <div className="nav-group">
                            <Link to="/"> Home </Link>
                            <Link to="/new"> Add / Register Workouts </Link>
                            <Link to="/calendar"> View Calendar </Link>
                            <button className="sign-out-btn" onClick={() => signOut(() => navigate('/'))}>
                                Sign Out
                            </button>
                            <UserButton className="user-btn" />
                        </div> 
                    </nav>
                </div>
            </SignedIn>
            <SignedOut>
                <nav className="navbar">
                    <div className="nav-group">
                        <SignInButton className='sign-out-btn'></SignInButton>
                    </div>
                </nav>
            </SignedOut>
        </>
    );
}
 
export default Navbar;