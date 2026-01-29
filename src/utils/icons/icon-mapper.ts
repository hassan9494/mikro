// src/utils/icons/icon-mapper.ts
import React from 'react';
import {
    Home,
    School,
    Build,
    OndemandVideo,
    Info,
    Person,
    LocalOffer,
    Help,
    ShoppingCart, // For Order
    ContactMail, // Optional: for contact if needed
    Whatshot, // Optional: could be used for hot deals
    Update, // Optional: could be used for updates
} from '@mui/icons-material';

// Define the icon map
const iconMap: Record<string, React.ComponentType> = {
    'Home': Home,
    'Course': School, // Using School for Course
    'Service': Build, // Using Build for Service
    'Tutorial': OndemandVideo, // Using OndemandVideo for Tutorial
    'About': Info, // Using Info for About
    'Profile': Person, // Using Person for Profile
    'Order': ShoppingCart, // Using ShoppingCart for Order
    'Offer': LocalOffer, // Using LocalOffer for Offer
    'Help': Help, // Using Help for Help
};

export const getIconComponent = (iconName: string) => {
    const IconComponent = iconMap[iconName];
    
    if (!IconComponent) {
        console.warn(`Icon "${iconName}" not found. Using Home icon as fallback.`);
        return Home;
    }
    
    return IconComponent;
};

// Hook version for React components
export const useIcon = (iconName: string) => {
    return React.useMemo(() => getIconComponent(iconName), [iconName]);
};