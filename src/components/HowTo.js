import React from 'react'
import {
    Card, CardText, CardBody, CardImg,
    CardTitle, CardSubtitle, CardHeader
  } from 'reactstrap';
  
// displays individual howto passed as props from HowTos component
function HowTo(props) {
    const howto = props.howto;
    console.log(howto)
    return (
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
        </Card>
    )
}

export default HowTo;
