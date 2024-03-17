import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

import supabase from '../supabaseClient'

const Workout = () => {

    const { id } = useParams();
    const { user } = useUser()

    const [workout, setWorkout] = useState();
        
    useEffect( () => {
        const fetchWorkout = async () => {
            const {data, error} = await supabase
            .from("Workouts")
            .select()
            // .eq("user_email", `${user.primaryEmailAddress}`)
            .eq("name", `${id}`)

            if(data) {
                setWorkout(data)
                console.log(data)
            } else {
                console.log("error")
            }
            
        }

        fetchWorkout()
    }, [])

    return (  
        <>
            {workout && (
                <div>
                    <h3> {workout[0].name}</h3>
                    <div>
                        <p> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatum blanditiis cum culpa nam odit itaque vel voluptates nobis maxime soluta? Voluptas nemo vitae fugiat, aut enim numquam harum nesciunt reprehenderit?</p>
                    </div>
                </div>
            )}
        </>
    );
}
 
export default Workout;