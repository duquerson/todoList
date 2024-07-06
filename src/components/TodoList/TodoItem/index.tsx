
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React from 'react';
import {appContext} from '../../../Hooks/Context/appContext';
import { todo } from '../../../types/type';
interface ItemProps {
    todo: todo;
}
export const Item: React.FC<ItemProps> = ({todo}) => {
    const { id, description, completed } = todo;
    const {theme, actions} = React.useContext(appContext);
    const [fade, setfade] = React.useState(false);
    const themeBorderClasses = theme === 'dark' ? ' border-current' : ' border-inherit';
    const themeThrough = theme === 'dark' ? 'text-[--VeryDarkGrayishBlue]' : 'text-[--LightGrayishBlue]';
    const background = completed ? 'bg-gradient-to-r from-hsl-192 to-hsl-280' : '';
    const lineThrough = completed ? `line-through ${themeThrough}`:'';
    const handleCheck = ()=>{
        actions.completarTodo(id);
    }
    const handleCross = ()=>{
        setfade(true);
        setTimeout(
            () => {
                actions.eliminarTodo(id);
            },
            700
        )
    }
    const {attributes, listeners, setNodeRef, transform, transition, } = useSortable({
        id: id
    })
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }
    return (
        <li style={style} {...attributes}  ref={setNodeRef} className={`h-[44px] flex items-center content-center p-4 border-b-[1px] ${themeBorderClasses} transition-colors duration-500 ease-in-out   rounded-lg rounded-b-none hover:${theme === 'dark' ? 'rounded-lg rounded-b-none inputDark' : ' rounded-lg rounded-b-none inputLight'} ${fade? 'animate-fade-out' : 'animate-fade-in'}`}>

            <button className={`w-8 h-8 border-2 rounded-full delay-75  ${background} hover:scale-150 ${completed? 'border-green-500': '${themeBorderClasses}'} animate-fade-in`} onClick={()=>handleCheck()}>
                {completed? (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={`size-7 scale-75 ${completed? 'text-green-500': ''}`}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>) : ''}
            </button>


            <label {...listeners}  className={`flex items-center w-full h-full pl-4  ${lineThrough} hover:cursor-pointer `} >{description}</label>


            <button className=' hover:scale-150  ' onClick={()=>handleCross()} >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={`size-7 scale-75 hover:text-red-500 ${completed? 'text-red-500': ''}`}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>

            </button>

        </li>
    )
}


