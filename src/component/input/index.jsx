import React, { useState } from 'react';
import { Input } from 'antd';
import './style.scss';
import { addTodo, searchTodo } from '../todo-list/todoSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
export default function InputTodo (props) {
    const dispatch = useDispatch();
    const searchValue = useSelector(state => state.searchValue);
    const [ value, setValue ] = useState(searchValue || props.todoTitle);

    const onChange  = (e) => {
        const value = e.target.value;
        setValue(value);
        if (!props.id) {
            dispatch(searchTodo(value))
        }
    }

    const onSubmit = () => {
        if (!props.id) {
            const newTodo = {
                id: Math.random().toString().substring(2),
                todoTitle: value
            };
            dispatch(addTodo(newTodo))
            setValue('');

            dispatch(searchTodo(''))
        } 
        else {
            props.update(props.id, value);
        }
    }

    return ( 
        <div>
            <Input
                className={['input-text', props.className].join(' ')}
                defaultValue={props.defaultValue} 
                value={value}
                placeholder={props.placeholder}
                onChange={onChange} 
                onPressEnter={onSubmit}
                >
            </Input>
            <button 
            className='add-btn'
            onClick={onSubmit}
            >
            Add
        </button>
     </div>
        );
};