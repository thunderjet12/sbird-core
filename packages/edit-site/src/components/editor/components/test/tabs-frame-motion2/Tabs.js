import React, { useRef, useState } from "react";
import { useMeasure } from "./use-measure";

import { motion } from "framer-motion";
import { Pager } from "./Pager";

const TabsContainer = ({ children }) => {

    return (
        <div className="sbc-tabs__container">
            { children }
        </div>
    )
}

const TabsList = ({ children }) => {

    return (
        <div className="sbc-tabs__list">
            { children }
        </div>
    )
}

const TabsItemButton = ({ children }) => {

    return (
        <motion.button className="sbc-tabs__item-button">
            { children }
        </motion.button>
    )
}

const TabsSliderBar = ({ children }) => {

    return (
        <motion.div className="sbc-tabs__slider-bar">
            { children }
        </motion.div>
    )
}

const tabs = ["Theme", "Appearance", "Content Settings", "Layout", "Design", "Assignments"];

export function TabsComponent () {
    const [value, setValue] = useState(1);
    const childRefs = useRef(new Map());
    const tabListRef = useRef();
    const [slider, setSlider] = useState({ left: 0, right: 0 });
    const { bounds, ref } = useMeasure();


  // measure our elements
  React.useEffect(() => {
    const target = childRefs.current.get(value);
    const container = tabListRef.current;
    if (target) {
      const cRect = container.getBoundingClientRect();

      // when container is `display: none`, width === 0.
      // ignore this case
      if (cRect.width === 0) {
        return;
      }

      const tRect = target.getBoundingClientRect();
      const left = tRect.left - cRect.left;
      const right = cRect.right - tRect.right;

      setSlider({
        hasValue: true,
        left: left + 8,
        right: right + 8
      });
    }
  }, [value, bounds]);

  return (
      <>
        <TabsContainer ref={ref}>
        <TabsList ref={tabListRef}>
          {tabs.map((tab, i) => (
            <TabsItemButton
              key={tab}
              isActive={i === value}
              whileHover={{ backgroundColor: "#f1f3f5" }}
              transition={{ duration: 0.1 }}
              whileTap={{ backgroundColor: "#e9ecef" }}
              ref={el => childRefs.current.set(i, el)}
              onClick={() => setValue(i)}
            >
              {tab}
            </TabsItemButton>
          ))}
          {slider.hasValue && (
            <TabsSliderBar
              positionTransition={{
                bounceDamping: 3
              }}
              initial={false}
              style={{
                left: slider.left,
                right: slider.right
              }}
            />
          )}
        </TabsList>
      </TabsContainer>
        { 
          ReactDOM.createPortal( 
            <Pager value={value} >
                {tabs.map(tab => (
                <div
                    key={tab}
                    style={{
                    width: "100%",
                    height: "300px",
                    padding: "16px"
                    }}
                >  
                </div>
                ))}
            </Pager>  
            , document.querySelector(".interface-interface-skeleton__content")
            )
        }
        </>

            )




}

