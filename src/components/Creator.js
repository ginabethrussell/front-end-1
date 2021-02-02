import React, { useState, useEffect, useContext } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import CreatorHowTo from './CreatorHowTo';
import { UserContext } from '../contexts/UserContext';
import deny from '../deny.svg';
import {
    Button,
    ButtonGroup,
    Form,
    FormGroup,
    Label,
    Input,
    Spinner
  } from "reactstrap";
import axios from 'axios';

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
    const [creator, setCreator] = useState(initialCreator);
    const [creatorHowtos, setCreatorHowtos] = useState([]);
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState('');
    const [buttonText, setButtonText] = useState('Add How-To');
    const [formValues, setFormValues] = useState(initialFormValues);
    const {user} = useContext(UserContext);
    
    // request user from api and check for role, permission to create
    useEffect(() => {
        // get user with userid
        console.log(user.id)
    
        // use user.id pulled from UserContext to request user info to verify creator permissions
        const id = user.id;
        console.log('id', id)
        // axiosWithAuth().get(`http://localhost:4000/users/${id}`)
        axiosWithAuth().get(`https://gbr-how-to.herokuapp.com/users/${id}`)
        .then(res => {
            console.log('getting users id from server', res.data);
            setCreator({
                ...creator, 
                id: res.data.id, 
                username: res.data.username,
                role: res.data.role
            });
        })
        .catch(err => console.log(err))
    }, [])

    // every time user changes, if user is creator, request howtos from api
    // filter by creator.id matches user.id to list creator's howto content
    useEffect(() => {
        // get all howtos and filter for creators howtos
        if (creator.role === 'creator'){
            //axiosWithAuth().get(`http://localhost:4000/howtos`)
            axiosWithAuth().get('https://gbr-how-to.herokuapp.com/howtos')
            .then(res => {
                console.log('getting howtos from server for creator page', res.data);
                console.log(creator.id);
                const creatorHowTos = res.data.filter(howto => howto.creator_id === creator.id);
                console.log(creatorHowTos);
                setCreatorHowtos(creatorHowTos);
            })
            .catch(err => {
                console.log(err)
            })
        }
    }, [creator])

    useEffect(() => {
        if (isEditing) {
            setIsAdding(true);
        }
    }, [isEditing])

    const handleEdit = (id) => {
        console.log("creator wants to edit HowTo #", id);
        setIsEditing(true);
        setButtonText('Update How-To');
        setEditingId(id);
        setFormValues(creatorHowtos.filter(howto => howto.id === id)[0]);
        window.scrollTo(0, 0);
    }

    const handleDelete = (id) => {
        console.log("creator wants to delete HowTo #", id);
        // complete authorized delete request with id in route
        axiosWithAuth().delete(`https://gbr-how-to.herokuapp.com/howtos/${id}`)
        //axiosWithAuth().delete(`http://localhost:4000/howtos/${id}`)
        .then(res => {
            console.log('delete response from server', res.data);
            axiosWithAuth().get(`https://gbr-how-to.herokuapp.com/howtos`)
            //axiosWithAuth().get('http://localhost:4000/howtos')
            .then(res => {
                console.log('resetting howto state after delete', res.data);
                const creatorHowTos = res.data.filter(howto => howto.creator_id === creator.id);
                setCreatorHowtos(creatorHowTos);
            })
        })
        .catch(err => console.log(err))
        window.scrollTo(0, 0);
    }

    const handleAdd = () => {
        console.log('creator wants to add a howto');
        setIsAdding(true);
        setIsEditing(false);
    }

    const handleChange = (e) => {
        if (e.target.name.includes("paragraph")) {
            const name = e.target.name;
            const index = name.slice(9);
            const newParagraphs = formValues.paragraphs;
            newParagraphs[Number(index)] = e.target.value;
            setFormValues({
              ...formValues,
              paragraphs: [...newParagraphs]
            });
          } else {
            setFormValues({
              ...formValues,
              [e.target.name]: e.target.value,
            });
        }
    };
   
    const addParagraphField = () => {
        setFormValues({
            ...formValues,
            paragraphs: [...formValues.paragraphs, '']
        });
    }
    
    const cancel = () => {
        setIsAdding(false);
        setIsEditing(false);
        setButtonText('Add How-To');
        setFormValues(initialFormValues);
    }

    const removeEmptyParagraphs = () => {
        const newHowTo = formValues;
        const filledParagraphs = formValues.paragraphs.filter((paragraph) => paragraph !== "");
        newHowTo.paragraphs = filledParagraphs;
        return newHowTo;
    }

    const addOrUpdateHowto = (e) => {
        e.preventDefault();
        const newHowTo = removeEmptyParagraphs();
        if(isEditing){
            axiosWithAuth().put(`https://gbr-how-to.herokuapp.com/howtos/${editingId}`, newHowTo)
            //axiosWithAuth().put(`http://localhost:4000/howtos/${editingId}`, newHowTo)
            .then(res =>{
                console.log("editing response from server", res.data);
                const updatedHowtos = [...creatorHowtos];
                const update = updatedHowtos.map(howto => {
                if(howto.id === editingId){
                    return res.data;
                }
                    return howto
                });
                setCreatorHowtos(update);
                setIsEditing(false);
                setButtonText('Add How-To');
                setIsAdding(false);
            })
            .catch(err => console.log(err));
        }else if(isAdding){
            // change id to Number for db
            newHowTo.creator_id = creator.id;
            // submit api request to post new howto
            axiosWithAuth().post(`https://gbr-how-to.herokuapp.com/howtos`, newHowTo)
            //axiosWithAuth().post(`http://localhost:4000/howtos`, newHowTo)
            .then(res => {
                console.log('response to adding howto from server', res.data);
                // const addedHowto = res.data;
                setCreatorHowtos(res.data);
                setIsAdding(false);
            })
            .catch(err => console.log(err)) 
        }
        setFormValues(initialFormValues);
    }

    if (creator.role === '') {
        return (
            <p className='loading'><Spinner/> ...Loading Creator... <Spinner/></p>
        )
    }else if (creator.role !== 'creator') {
        return (
            <div className='not-creator-message'>
                <img src={deny} alt='denied icon' width='200px' />
                <p>You do not currently have permission to create content.</p>
            </div>
        )
    }
    return (
        <div className='creator-dashboard'>
            <div className='creator-header'>
            <h2>{creator.username}'s Creator Dashboard</h2>
            {!isAdding && (<Button size='md' color='info' onClick={handleAdd}>Add a How-To</Button>)}
            </div>
            {isAdding && (
                <div className='form-wrapper'>
                    <Form onSubmit={addOrUpdateHowto}>
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
                            <Label for='paragraph'>{`Paragraph ${index + 1}`}</Label>
                            <Input className='paragraph-input' type='textarea' 
                                id='paragraph'
                                name={`paragraph${index}`}
                                placeholder='enter your content'
                                value={formValues.paragraphs[index]}
                                onChange={handleChange}
                                />
                            </FormGroup>
                        ) )}
                        <div className='form-controls'>
                            <div className='top-row'>
                                <Button color='info' size='sm' onClick={addParagraphField}>+</Button>
                            </div>
                            <div className='row'>
                            <ButtonGroup>
                                <Button color='info' onClick={cancel}>Cancel</Button>
                                <Button color='info' type='submit'>{buttonText}</Button>
                            </ButtonGroup>
                            </div>
                        </div>
                    </Form>
                
                </div>
                
            )}
            
            {creatorHowtos.map(howto => (
                <>
                <CreatorHowTo key={howto.id} howto={howto} handleEdit={handleEdit} handleDelete={handleDelete}/>
            </>
            ))}
        
        </div>
    )
}

export default Creator
