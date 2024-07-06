import React from 'react'
import { appContext } from '../../Hooks/Context/appContext'
import Skeleton from 'react-loading-skeleton';
import { ButtonActions } from './ButtonActions';
export const TodoActions: React.FC = () => {
    const {theme, load, totalItems, actions} = React.useContext(appContext);
    const themeInputClasses = theme === 'dark' ? ' inputDark' : ' inputLight';

    return (
        <>
            <section className={`max-w-[550px] container rounded-lg rounded-t-none transition-colors ease-in-out delay-150 ${themeInputClasses} shadow-2xl`}>
                {load ? (<>
                    <Skeleton count={5} height={10} className={`mb-2 transition-colors ease-in-out  animate-pulse
            ${theme === 'dark' ? 'bg-[#353b48]' : 'bg-[#e8f0fe]'}`} />
                </>) : (
                    <div className='p-6 flex justify-between'>
                        <span>{totalItems > 1 ? `${totalItems}  items left` : `${totalItems}  item left`}  </span>
                        <div className=' hidden md:block'>
                            <ButtonActions />
                        </div>
                        <button onClick={actions.clearComplete}>
									Clear Completed
                        </button>
                    </div>
                )}
            </section>
            <section className={`max-w-[550px] md:mt-24 p-6 mt-12 container flex  justify-center md:hidden rounded-lg transition-colors ease-in-out delay-150 ${themeInputClasses} shadow-2xl`}>
                <ButtonActions />
            </section>
        </>
    )
}
