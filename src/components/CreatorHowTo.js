import React from 'react'
import {Button, ButtonGroup} from 'reactstrap';
import {
    Card, CardText, CardBody, CardImg,
    CardTitle, CardSubtitle, CardHeader, CardFooter
  } from 'reactstrap';

// displays individual howto
function CreatorHowTo({howto, handleEdit, handleDelete}) {

    return (
        <div className='creator-howto-wrapper'>
            <Card>
                <CardImg top width="100%" src={howto.image} alt={howto.title} />
                <CardHeader> 
                    <CardTitle>{howto.title}</CardTitle>
                    <CardSubtitle>{howto.author}</CardSubtitle>
                </CardHeader>
                <CardBody>
                    {howto.paragraphs.map(paragraph => (
                        <CardText>{paragraph}</CardText>
                    ))}
                </CardBody>
                <CardFooter>
                    <div className='creator-buttons'>
                        <ButtonGroup size='lg'>
                            <Button color='info' onClick={() => handleEdit(howto.id)}>Edit</Button>
                            <Button color='info' onClick={() => handleDelete(howto.id)}>Delete</Button>
                        </ButtonGroup>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}

export default CreatorHowTo;
