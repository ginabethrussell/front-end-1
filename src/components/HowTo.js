import React from 'react'
import {
    Card, CardText, CardBody, CardImg,
    CardTitle, CardSubtitle, CardHeader,
    Button
  } from 'reactstrap';
import like from '../like.png';

const likeButton = {
    margin:'8px',
    fontSize: '1.6rem',
}
  
// displays individual howto passed as props from HowTos component
function HowTo(props) {
    const howto = props.howto;
    const handleLike = props.handleLike;


    console.log(howto)
    return (
        <Card>
            <CardImg top width="100%" src={howto.image} alt={howto.title} />
            <CardHeader>
                <CardTitle>{howto.title}</CardTitle>
                <CardSubtitle>{howto.author}</CardSubtitle>
                <Button color='info' style={likeButton} onClick={()=> handleLike(howto.id)}><img height='20px' src={like} alt='thumbs up' /><span style={{margin: '3px 5px'}}>{howto.likes}</span></Button>
            </CardHeader>
            <CardBody> 
                {howto.paragraphs.map(paragraph => (
                    <CardText>{paragraph}</CardText>
                ))}
            </CardBody>
        </Card>
    )
}

export default HowTo;
