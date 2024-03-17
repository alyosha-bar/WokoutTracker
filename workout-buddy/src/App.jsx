import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { Link, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar.jsx'
import Home from "./components/Home.jsx";
import Hero from "./components/Hero.jsx";
import Workout from "./components/Workout.jsx";

function App() {

  return (
    <>
    
      <header>
        <SignedOut>
          <Navbar user={false}/>
        </SignedOut>
        <SignedIn>
          <Navbar user={true}/>
        </SignedIn>
      </header>
    <Routes>
      <Route path="/" element={ <Home /> } />
      <Route path="/hero" element={ <Hero /> } />
      <Route path="/new" element={ <> NEW EXERCISE </> } />
      <Route path="/calendar" element={ <> CALENDAR </> } />
      <Route path="/workouts/:id" element={ <Workout /> } />
    </Routes>
    </>
  )
}

export default App
