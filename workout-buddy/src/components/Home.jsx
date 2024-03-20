import { useState, useEffect } from 'react'
import { useUser } from '@clerk/clerk-react'
import '../styles/home.css'
import { useNavigate } from 'react-router-dom'

import supabase from '../supabaseClient'

const Home = () => {

    const [workouts, setWorkouts] = useState([])
    const [exercises, setExercises] = useState([]) // array from supabase
    const [formExercises, setFormExercises] = useState([]) // array of selected exercises in the form
    const navigate = useNavigate()

    // form state
    const [name, setName] = useState()
    const [preferredTime, setPreferredTime] = useState()
    const [preferredDay, setPreferredDay] = useState()



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
    
    
    const handleSubmit = async (e) => {
        e.preventDefault()

        // add to supabase / not working because of policies --> research
        const { error } = await supabase
        .from('Workouts')
        .insert({
            name: name, 
            preferred_day: preferredDay, 
            preferred_time: preferredTime, 
            email: user.primaryEmailAddress 
        })


        console.log("Form Submitted!")
        // console.log(exercises)
    }


    const addToExercises = (e, exercise) => {
        e.preventDefault()

        // remove from exercises array
        setExercises(exercises => {
            return exercises.filter(ex => ex !== exercise)
        })

        // add execises to a formExercises array
        setFormExercises( // Replace the state
        [ // with a new array
          ...formExercises, // that contains all the old items
          exercise // and one new item at the end
        ]
      );

      console.log("added to array.")
    }

    const removeExercise = (e, exercise) => {
        e.preventDefault()

        // remove from fromExercises array
        setFormExercises(formExercises => {
            return formExercises.filter(formExercise => formExercise !== exercise)
        })

        // add back into exercises array
        setExercises( // Replace the state
            [ // with a new array
            ...exercises, // that contains all the old items
            exercise // and one new item at the end
            ]
        );

        console.log("removed.")
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
                        <input 
                            type="text" 
                            name="name" 
                            placeholder="Name"
                            value={name}
                            onChange={(e) => {setName(e.target.value)}}
                        />
                    </div>
                        
                    <div className="label-group">
                        <label for="form-exercises"> Exercises: </label>
                        { formExercises && (
                            <ul className="form-exercises">
                                {formExercises.map( exercise => (
                                    <div onClick={(e) => { removeExercise(e, exercise);}} className='exercise-panel'> {exercise.name} </div>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className='label-group'>
                    <label for="exercises"> Choose: </label>
                    { exercises && (
                        <ul className='exercises' name='exercises'>
                            {exercises.map( exercise => (
                                <button onClick={(e) => { addToExercises(e, exercise)} } className="exercise"> {exercise.name} </button>
                            ))}
                        </ul>
                    )}
                    </div>

                    <div className='label-group'>
                        <label for="preferred_time"> Preferred Time: </label>
                        <input 
                            type="time" 
                            name="preferred_time" 
                            placeholder="Preferred Time"
                            value={preferredTime}
                            onChange={(e) => {setPreferredTime(e.target.value)}}
                        />
                    </div>

                    <div className='label-group'>
                        <label for="preferred_day"> Preferred Day: </label>
                        <input 
                            type="text" 
                            name="preferred_day" 
                            placeholder="Preferred Day"
                            value={preferredDay}
                            onChange={(e) => {setPreferredDay(e.target.value)}}
                        />
                    </div>

                    <button className='submit-btn' type='submit'> Create New Workout </button>
                </form>
            </div>
        </div>
    </>
    );
}
 
export default Home;