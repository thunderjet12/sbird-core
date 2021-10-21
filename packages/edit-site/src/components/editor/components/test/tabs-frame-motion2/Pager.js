import React from "react";
import { motion } from "framer-motion";

const TabContentContainer = ({ children }) => {

    return(
        <div className="tw-bg-red-400 sbc-tabs__tab-content__container" >
            { children }
        </div>
    )
}

const TabContentAnimatedContainer = ({ children }) => {

    return(
        <motion.div className="tw-bg-red-400 sbc-tabs__tab-content__animated-container" >
            { children }
        </motion.div>
    )
}

const TabContent = ({ children }) => {

    return(
        <div className="tw-bg-red-400 sbc-tabs__tab-content__content" >
            { children }
        </div>
    )
}

export function Pager({ children, value }) {
    return (
        <TabContentContainer>
            <TabContentAnimatedContainer
                transition={{
                    tension: 190,
                    friction: 70,
                    mass: 0.4
                    }}
                    initial={false}
                    animate={{ x: value * -100 + "%" }}
            >
                    {React.Children.map(children, (child, i) => (
                    <TabContent
                        key={i}
                        aria-hidden={value !== i}
                        tabIndex={value === i ? 0 : -1}
                    >
                        {child}
                    </TabContent>
                    ))}
            </TabContentAnimatedContainer>
        </TabContentContainer>
    )

}

