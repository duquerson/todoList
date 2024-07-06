import { ReactNode, useContext } from "react"
import { appContext } from '../../Hooks/Context/appContext'
//h-[100svh]
interface providerProps {
    children: ReactNode;
}
export const Layout:React.FC<providerProps> = ({ children }) => {
    const {theme} = useContext(appContext);
    return (
        <main className={`${(theme === 'dark' ? 'darkMode' : 'lightMode')} h-lvh w-[100dvw] `}>
            {children}
        </main>
    )
}
