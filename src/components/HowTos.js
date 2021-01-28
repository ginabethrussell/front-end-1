import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../contexts/UserContext';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import HowTo from './HowTo';

// Sample Data - will come from API
import testHowtos from '../data/howtos'


// component will display all existing howtos for logged in user
function HowTos() {
    const { user } = useContext(UserContext);
    const [howtos, setHowtos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
  
    // get all howtos from the api and display when component mounts
    useEffect(()=> {
        axiosWithAuth().get('https://reqres.in/api/users')
        .then(res => {
            console.log(res);
            setError('');
            setIsLoading(false);
            setHowtos(testHowtos)
        })
        .catch(err => console.log(err))
    },[])
    return (
        <div className='howtos-wrapper'>
            <h2>Welcome {user.username}</h2>
            { isLoading? (<p>How-Tos are Loading</p>): (
                <>
                {howtos.map(howto => (
                    <HowTo key={howto.id} howto={howto}/>
                ))}
                </>
            )}
            {/* <p>PrivateRoute for loggedin user/subscriber and user/creator</p>
            <p>View all tutorials</p>
            <p>Search for a tutorial</p>
            <p>Like a tutorial</p>
            <p>Save a tutorial?</p> */}
        </div>
    )
}

export default HowTos
