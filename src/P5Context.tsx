import { createContext, useCallback, useMemo, useRef, useState } from "react";

interface P5ContextType {
    p5SaveFunction?: () => void
    setP5SaveFunction?: React.Dispatch<React.SetStateAction<(() => void) | undefined>>
}

export const P5Context = createContext<P5ContextType>({})

// This context is designed to be very stable
export const P5ContextProvider = (props: { children: React.ReactNode }) => {
    const [p5SaveFunctionInner, setP5SaveFunction] = useState<(() => void) | undefined>(undefined)

    const callbackRef = useRef<(() => void) | undefined>(p5SaveFunctionInner)
    callbackRef.current = p5SaveFunctionInner

    const p5SaveFunction = useCallback(() => {
        callbackRef.current?.()
    }, [callbackRef])

    const contextValue = useMemo(() => ({
        p5SaveFunction, setP5SaveFunction
    }), [p5SaveFunction])

    return (
        <P5Context.Provider value={contextValue}>
            {props.children}
        </P5Context.Provider>
    )

}