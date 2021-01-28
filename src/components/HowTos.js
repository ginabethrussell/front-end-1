import React from 'react'

// Sample Data - will come from API
import howtos from '../data/howtos'
import users from '../data/users'

function HowTos() {
    console.log(howtos);
    console.log(users)
    return (
        <div>
            <p>User/Subscriber dashboard</p>
            <p>PrivateRoute for loggedin user/subscriber and user/creator</p>
            <p>View all tutorials</p>
            <p>Search for a tutorial</p>
            <p>Like a tutorial</p>
            <p>Save a tutorial?</p>
        </div>
    )
}

export default HowTos
