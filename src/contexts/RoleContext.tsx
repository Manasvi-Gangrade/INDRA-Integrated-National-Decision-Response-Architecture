import React, { createContext, useContext, useState } from 'react';

export type Role = 'National Admin' | 'State CM (UP)' | 'District Admin (Lucknow)' | 'Citizen';

interface RoleContextType {
    currentRole: Role;
    isAuthenticated: boolean;
    login: (role: Role) => void;
    logout: () => void;
    getJurisdiction: () => string;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: { children: React.ReactNode }) {
    const [currentRole, setCurrentRole] = useState<Role>('Citizen');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = (role: Role) => {
        setCurrentRole(role);
        setIsAuthenticated(true);
    };

    const logout = () => {
        setIsAuthenticated(false);
        setCurrentRole('Citizen');
    };

    const getJurisdiction = () => {
        switch (currentRole) {
            case 'National Admin': return 'India (National)';
            case 'State CM (UP)': return 'Uttar Pradesh';
            case 'District Admin (Lucknow)': return 'Lucknow District';
            case 'Citizen': return 'Public Access';
            default: return 'Unknown';
        }
    };

    return (
        <RoleContext.Provider value={{ currentRole, isAuthenticated, login, logout, getJurisdiction }}>
            {children}
        </RoleContext.Provider>
    );
}

export function useRole() {
    const context = useContext(RoleContext);
    if (context === undefined) {
        throw new Error('useRole must be used within a RoleProvider');
    }
    return context;
}
