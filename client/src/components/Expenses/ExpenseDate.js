import React from 'react';
import './ExpenseDate.css';

function ExpenseDate(props){

    const year = props.date.slice(0,4)
    const month = props.date.slice(5,7)
    const day = props.date.slice(8,10)

    return (
    <div className='expense-date'>
        <div className='expense-date__month'>{month}</div>
        <div className='expense-date__day'>{day}</div>
        <div className='expense-date__year'>{year}</div>
    </div>
    );

}

export default ExpenseDate;