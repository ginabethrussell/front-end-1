import React from 'react'
import {Button, ButtonGroup} from 'reactstrap';
// displays individual howto
function CreatorHowTo({howto, handleEdit, handleDelete}) {

    return (
        <div className='creator-howto-wrapper'>
            <div className='creator-buttons'>
                <ButtonGroup size='lg'>
                    <Button color='info' onClick={() => handleEdit(howto.id)}>Edit</Button>
                    <Button color='info' onClick={() => handleDelete(howto.id)}>Delete</Button>
                </ButtonGroup>
            </div>
            <h3>{howto.title}</h3>
            <h5>{howto.author}</h5>
            {howto.paragraphs.map(paragraph => (
                <p>{paragraph}</p>
            ))}
        </div>
    )
}

export default CreatorHowTo;
