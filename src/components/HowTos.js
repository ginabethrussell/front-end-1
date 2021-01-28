import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../contexts/UserContext';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import HowTo from './HowTo';

import { Label, Input } from 'reactstrap';
// Sample Data - will come from API
import testHowtos from '../data/howtos'


// component will display all existing howtos for logged in user
function HowTos() {
    const { user } = useContext(UserContext);
    const [howtos, setHowtos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchterm, setSearchterm] = useState('');
    const [filteredHowtos, setFilteredHowtos] = useState(howtos)

    const handleChange = e => {
        setSearchterm(e.target.value);
    }
  
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

    useEffect(() => {
       setFilteredHowtos(howtos.filter(howto => howto.title.toLowerCase().includes(searchterm.toLowerCase())))
    }, [searchterm, howtos])


    return (
        <div className='howtos-wrapper'>
            <div className='howto-header'>
                <h2>Welcome {user.username}</h2>    
                <div className='formgroup'>
                    <Label for='searchterm'>Search by Title</Label>
                    <Input type='text' name='searchterm' id='searchterm' value={searchterm} onChange={handleChange}/>
                </div>
            </div>
            { isLoading? (<p>How-Tos are Loading</p>): (
                <>
                {filteredHowtos.map(howto => (
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
