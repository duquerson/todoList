import React from 'react'
import {appContext} from '../../Hooks/Context/appContext';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Item} from './TodoItem/index'
import Skeleton from 'react-loading-skeleton';
export const TodoList: React.FC = () => {
    const {theme, todos, error, load, actions} = React.useContext(appContext);

    return (
        <ul className={`max-w-[550px] mx-auto md:mt-5 mt-5 container rounded-lg rounded-b-none transition-colors duration-500 ease-in-out shadow-2xl ${theme === 'dark' ? ' inputDark' : ' inputLight'} `}>
            <DndContext collisionDetection={closestCenter} onDragEnd={actions.handleDragEnd} >
                <SortableContext items={todos} strategy={verticalListSortingStrategy}>
                    {load ? (
                        // Mostrar Skeleton mientras se cargan los TODOs
                        <>
                            <Skeleton count={6} height={180} className={`mb-2 transition-colors ease-in-out  animate-pulse
            ${theme === 'dark' ? 'bg-[#353b48]' : 'bg-[#e8f0fe]'}`} />
                        </>
                    ) : (
                        // Mostrar TODOs reales una vez cargados
                        <>
                            {error && <p className="p-5 border-b-[1px]">Ups, Error!! I cannot Found TODOs</p>}
                            {todos.map(todo => (
                                <Item key={todo.id} todo={todo} />
                            ))}
                        </>
                    )}
                </SortableContext>
            </DndContext>
        </ul>
    )
}
