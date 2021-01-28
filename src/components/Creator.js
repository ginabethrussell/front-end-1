import React, {useState, useEffect, useContext} from 'react';
import { UserContext, userContext } from '../contexts/UserContext';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import axios from 'axios';
import CreatorHowTo from './CreatorHowTo';
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
  } from "reactstrap";
// Sample Data - will come from API
import testHowtos from '../data/howtos'

const initialCreator = {
        id: '',
        username: "",
        role: ""
}

const initialFormValues = {
    title: '',
    author: '',
    paragraphs: ['']
}
function Creator() {
    const { user, setUser } = useContext(UserContext);
    const [creator, setCreator] = useState(initialCreator);
    const [creatorHowtos, setCreatorHowtos] = useState([]);
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [formValues, setFormValues] = useState(initialFormValues);
    
    // request user from api and check for role, permission to create
    useEffect(() => {
        // get user with userid
        // sample users
        const userSubscriber = {
            id: 1,
            username: "user1",
            password: "password",
            role: "subscriber"
          }
             
          const userCreator ={
            id: 2,
            username: "user2",
            password: "abc123",
            role: "creator"
          } 
        // axiosWithAuth().get(`http://reqres.in/api/user/${user.id}`)
        axios.get(`https://reqres.in/api/user/2`)
        .then(res => {
            console.log(res);
            // setCreator({
            //     ...creator, 
            //     id: userSubscriber.id, 
            //     username: userSubscriber.username,
            //     role: userSubscriber.role
            // });
            setCreator({
                ...creator, 
                id: userCreator.id, 
                username: userCreator.username,
                role: userCreator.role
            });
        })
        .catch(err => console.log(err))
    }, [])

    // every time user changes, if user is creator, request howtos from api
    // filter by creator.id matches user.id to list user's howtos
    useEffect(() => {
        // get all howtos and filter for creators howtos
        if (creator.role === 'creator'){
            axios.get('https://reqres.in/api/users')
            .then(res => {
                console.log(res);
                console.log(testHowtos);
                console.log(creator.id);
                const creatorHowTos = testHowtos.filter(howto => howto.creator_id === creator.id);
                console.log(creatorHowTos);
                setCreatorHowtos(creatorHowTos);
            })
            .catch(err => {
                console.log(err)
            })
        }
    }, [creator])

    const handleEdit = (id) => {
        console.log("creator wants to edit HowTo #", id);
    }

    const handleDelete = (id) => {
        console.log("creator wants to delete HowTo #", id);
        //axiosWithAuth().delete('https://route/id)
        setCreatorHowtos(creatorHowtos.filter(howto => howto.id !== id))
    }

    const handleAdd = () => {
        console.log('creator wants to add a howto');
        setIsAdding(true);
    }

    const handleChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        })
    }

    const addParagraphField = () => {
        setFormValues({
            ...formValues,
            paragraphs: [...formValues.paragraphs, '']
        })
    }

    const addHowto = (e) => {
        e.preventDefault();
        // submit api request to post new howto
        setIsAdding(false);
    }

    if (creator.role !== 'creator') {
        return (
            <div className='not-creator-message'>
                You do not currently have permission to create content.
            </div>
        )
    }
    return (
        <div>
            <h2>{creator.username}'s Creator Dashboard</h2>
            {!isAdding && (<Button size='md' color='info' onClick={handleAdd}>Add a How-To</Button>)}
            {isAdding && (
                <div className='form-wrapper'>
                    <Form onSubmit={addHowto}>
                        <FormGroup>
                            <Label for='title'>Title</Label>
                            <Input type='text' 
                                id='title'
                                name='title'
                                placeholder='enter a title'
                                value={formValues.title}
                                onChange={handleChange}
                                required
                                />
                        </FormGroup>
                        <FormGroup>
                            <Label for='author'>Author</Label>
                            <Input type='text' 
                                id='author'
                                name='author'
                                placeholder='enter your name or username'
                                value={formValues.author}
                                onChange={handleChange}
                                required
                                />
                        </FormGroup>
                        {formValues.paragraphs.map((paragraph, index) =>(
                            <FormGroup>
                            <Label for='paragraph'>Paragraph</Label>
                            <Input type='textarea' 
                                id='paragraph'
                                name={`paragraph${index}`}
                                placeholder='enter your content'
                                value={formValues.paragraphs[index]}
                                onChange={handleChange}
                                required
                                />
                            </FormGroup>
                        ) )}
                        <Button onClick={addParagraphField}>+ paragraph</Button>
                        <Button type='submit'>Add How-To</Button>
                    </Form>
                
                </div>
                
            )}
            
            <div className='creator-howtos'> 
                {creatorHowtos.map(howto => (
                 <div className='creator-howto'>
                    <CreatorHowTo key={howto.id} howto={howto} handleEdit={handleEdit} handleDelete={handleDelete}/>
                </div>
                ))}
            </div>
            
            <p>Edit a tutorial</p> 
            <p>Add a tutorial</p>
        </div>
    )
}

export default Creator
