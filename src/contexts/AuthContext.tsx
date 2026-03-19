import { createContext, useContext, useState, ReactNode } from "react";
import { createCustomer } from "../api/customer";

interface AuthContextType {
    signup: (data: any) => Promise<void>;
    isLoggedIn: boolean; // Keep for compatibility but always false or based on nothing
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const signup = async (data) => {
        const { customerUserErrors } = await createCustomer(data.email, data.password, data.firstName, data.lastName);

        if (customerUserErrors && customerUserErrors.length > 0) {
            throw new Error(customerUserErrors[0].message);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                signup,
                isLoggedIn: false, // Login is now handled by Shopify
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
