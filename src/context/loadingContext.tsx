import React, { createContext, useContext, useState } from 'react'

interface LoadingContextType {
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

function LoadingProvider({ children }: { children: React.ReactNode }) {

    const [isLoading, setIsLoading] = useState(true);

    return (
        <LoadingContext value={{ isLoading, setIsLoading }} >
            {children}
        </LoadingContext>
    )
}

export default LoadingProvider

export const useLoading = () => {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error("useLoading debe ser usando dentro de LoadingProvider");
    }
    
    return context;
}