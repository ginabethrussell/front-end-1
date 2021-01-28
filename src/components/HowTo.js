import React from 'react'
// displays individual howto
function HowTo(props) {
    const howto = props.howto;

    return (
        <div className='howto-wrapper'>
            <h3>{howto.title}</h3>
            <h5>{howto.author}</h5>
            {howto.paragraphs.map(paragraph => (
                <p>{paragraph}</p>
            ))}
        </div>
    )
}

export default HowTo;
