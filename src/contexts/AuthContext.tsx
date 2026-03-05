import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { createCustomer, createCustomerAccessToken, getCustomer } from "../api/customer";

interface Customer {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
}

interface AuthContextType {
    customer: Customer | null;
    isLoggedIn: boolean;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    signup: (data: any) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = "maze_customer_token";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [customer, setCustomer] = useState<Customer | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const restoreSession = async () => {
            const stored = localStorage.getItem(TOKEN_KEY);
            if (stored) {
                try {
                    const { accessToken, expiresAt } = JSON.parse(stored);
                    if (new Date(expiresAt) > new Date()) {
                        const data = await getCustomer(accessToken);
                        if (data) {
                            setCustomer(data);
                        } else {
                            localStorage.removeItem(TOKEN_KEY);
                        }
                    } else {
                        localStorage.removeItem(TOKEN_KEY);
                    }
                } catch (error) {
                    console.error("Failed to restore session:", error);
                    localStorage.removeItem(TOKEN_KEY);
                }
            }
            setLoading(false);
        };

        restoreSession();
    }, []);

    const login = async (email, password) => {
        const { customerAccessToken, customerUserErrors } = await createCustomerAccessToken(email, password);

        if (customerUserErrors && customerUserErrors.length > 0) {
            throw new Error(customerUserErrors[0].message);
        }

        if (customerAccessToken) {
            localStorage.setItem(TOKEN_KEY, JSON.stringify(customerAccessToken));
            const data = await getCustomer(customerAccessToken.accessToken);
            setCustomer(data);
        }
    };

    const signup = async (data) => {
        const { customerUserErrors } = await createCustomer(data.email, data.password, data.firstName, data.lastName);

        if (customerUserErrors && customerUserErrors.length > 0) {
            throw new Error(customerUserErrors[0].message);
        }

        // Auto login after signup
        await login(data.email, data.password);
    };

    const logout = () => {
        localStorage.removeItem(TOKEN_KEY);
        setCustomer(null);
    };

    return (
        <AuthContext.Provider
            value={{
                customer,
                isLoggedIn: !!customer,
                loading,
                login,
                signup,
                logout,
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
