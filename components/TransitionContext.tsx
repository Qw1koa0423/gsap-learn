import React, { createContext } from 'react'
import { useState } from 'react'

type TransitionContextType = {
    completed: boolean
    toggleCompleted: (value: boolean) => void
}
const TransitionContext = createContext<TransitionContextType>(
    {} as TransitionContextType
)

export const TransitionProvider = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const [completed, setCompleted] = useState<boolean>(false)

    const toggleCompleted = (value: boolean) => {
        setCompleted(value)
    }

    return (
        <TransitionContext.Provider
            value={{
                toggleCompleted,
                completed,
            }}
        >
            {children}
        </TransitionContext.Provider>
    )
}

export default TransitionContext
