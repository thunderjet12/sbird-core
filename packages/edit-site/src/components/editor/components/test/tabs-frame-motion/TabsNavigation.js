import {useState} from "@wordpress/element";
import { motion } from "framer-motion";



const tabContentVariant = {
    active: {
      display: "block",
      transition: {
        staggerChildren: 0.2
      }
    },
    inactive: {
      display: "none"
    }
  };
  
  const cardVariant = {
    active: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    },
    inactive: {
      opacity: 0,
      y: 10,
      transition: {
        duration: 0.5
      }
    }
  };
  
  const TabsLabels = ["Theme", "Appearance"];
//   , "Content Settings", "Layout", "Design", "Assignments"

  const TabsNavigation = ( props ) => {
    const [ active, setActive ] = useState( false );
    return ( 
        <ul className="sbc-tabs__navigation-container" >
            
        </ul>
     )
   


    };

export default TabsNavigation;    

