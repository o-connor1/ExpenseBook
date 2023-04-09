import React from 'react';
import './Card.css';
function Card(props){
    const classes='card '+props.className;
return (
    <div className={classes}>
        {props.children}
        {/* props. children is a special prop, automatically passed to every component,
         that can be used to render the content included between the opening and closing tags
          when invoking a component. */}
    </div>
);

}

export default Card;