import { useState, useEffect } from 'react'
import { useUser } from '@clerk/clerk-react'
import '../styles/home.css'
import { useNavigate } from 'react-router-dom'

import supabase from '../supabaseClient'

const Home = () => {

    const [workouts, setWorkouts] = useState([])
    const [exercises, setExercises] = useState([])
    const navigate = useNavigate()

    const { user } = useUser()

    useEffect( () => {

        const getExercises = async () => {
            const {data, error} = await supabase
            .from("Exercises")
            .select()

            if(data) {
                setExercises(data)
            } else {
                console.log("error")
            }
        }


        const getWorkouts = async () => {
            const {data, error} = await supabase
            .from("Workouts")
            .select("name, preferred_day, preferred_time")
            .eq("user_email", `${user.primaryEmailAddress}`)

            if(data) {
                setWorkouts(data)
            } else {
                console.log("error")
            }
        }


        if (user) {
            getWorkouts()
            getExercises()
        } else {
            navigate('/hero')
        }
        
        
        // fetch exercises for the fetched workouts


    }, [user])




    const openWorkout = (name) => {
        navigate(`/workouts/${name}`)
    }
    
    
    const handleSubmit = (e) => {
        e.preventDefault()

        console.log("Form Submitted!")
        console.log(exercises)
    }


    return ( 
    <>
        <div className="home">
            <div className="workouts">
            {workouts && (
                <ul className='exercises-list'>
                    {workouts.map(workout => (
                        <li key={workout.name} onClick={() => { openWorkout(workout.name) }}>
                            <div className="exercise-card">
                                <h2> {workout.name}</h2>
                                <div className='calendar-group'>
                                    <h4> {workout.preferred_day}</h4>
                                    <h4> {workout.preferred_time}</h4>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            </div>
            <div className="new-workout">
                <form onSubmit={(e) => {handleSubmit(e)}}>
                    <h2 className="title"> Add a New Workout </h2>
                    <div className="label-group">
                        <label for="name">Name: </label>
                        <input type="text" name="name" placeholder="Name"/>
                    </div>

                    <div className='label-group'>
                        <label for="preferred_day"> Preferred Day: </label>
                        <input type="text" name="preferred_day" placeholder="Preferred Day"/>
                    </div>
                        
                    <div className="label-group">
                        <label for="exercises"> Exercises: </label>
                    { exercises && (
                        <ul className='exercises' name='exercises'>
                            {exercises.map( exercise => (
                                <div className="exercise"> {exercise.name} </div>
                            ))}
                        </ul>
                    )}
                    </div>

                    <div className='label-group'>
                        <label for="preferred_time"> Preferred Time: </label>
                        <input type="time" name="preferred_time" placeholder="Preferred Time"/>
                    </div>

                    <button className='submit-btn' type='submit'> Create New Workout </button>
                </form>
            </div>
        </div>
    </>
    );
}
 
export default Home;