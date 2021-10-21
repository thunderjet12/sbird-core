/**
 * WordPress dependencies
 */
import { useEffect, useState, useMemo, useCallback } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';

import { motion } from "framer-motion";

const TabsContent = ( props ) => {

    const TabsContent = () => {
        switch ( props.currentOutlineOptionsPage ) {
            case "Theme" :
                return (
                    <h1>Theme</h1>
                )
                break;
            case "Appearance" :
                return (
                    <h1>Appearance</h1>
                )
                break;    
        
            default:
            return (
                <h1>Theme</h1>
            )
                break;
        }
    }
    return(
       <TabsContent />
    )
}

export default TabsContent