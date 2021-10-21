import {useState} from "@wordpress/element";
import { motion } from "framer-motion";

 /**
  * Internal dependencies
  */
  import {
    useGlobalStylesContext,
    useGlobalStylesReset,
} from '../global-styles-provider';
import DefaultSidebar from './elements/default-sidebar';
import {
    default as TypographyPanel,
    useHasTypographyPanel,
} from './elements/typography-panel';
import { default as BorderPanel, useHasBorderPanel } from './elements/border-panel';
import { default as ColorPanel, useHasColorPanel } from './elements/color-panel';
import { default as SpacingPanel, useHasSpacingPanel } from './elements/spacing-panel';


function GlobalStylesPanel( {
   wrapperPanelTitle,
   context,
   getStyle,
   setStyle,
   getSetting,
   setSetting,
} ) {
   const hasBorderPanel = useHasBorderPanel( context );
   const hasColorPanel = useHasColorPanel( context );
   const hasTypographyPanel = useHasTypographyPanel( context );
   const hasSpacingPanel = useHasSpacingPanel( context );

   if ( ! hasColorPanel && ! hasTypographyPanel && ! hasSpacingPanel ) {
       return null;
   }

   const content = (
       <div className="sbc-tabs__global-styles" >
           { hasTypographyPanel && (
               
               <div className="sbc-tabs__panel" > 
                    <div className="sbc-tabs__panel__body" >
                        <TypographyPanel
                            context={ context }
                            getStyle={ getStyle }
                            setStyle={ setStyle }
                        />
                    </div>
               </div>
           ) }
           { hasColorPanel && (
               <div className="sbc-tabs__panel" > 
                    <div className="sbc-tabs__panel__body" >
                        <ColorPanel
                            context={ context }
                            getStyle={ getStyle }
                            setStyle={ setStyle }
                            getSetting={ getSetting }
                            setSetting={ setSetting }
                        />
                    </div>
               </div>
           ) }
           { hasSpacingPanel && (
               <div className="sbc-tabs__panel" >
                   <div className="sbc-tabs__panel__body" >
                        <SpacingPanel
                            context={ context }
                            getStyle={ getStyle }
                            setStyle={ setStyle }
                        />
                    </div>
               </div>
           ) }
           { hasBorderPanel && (
               <div className="sbc-tabs__panel" >
                   <div className="sbc-tabs__panel__body" >
                        <BorderPanel
                            context={ context }
                            getStyle={ getStyle }
                            setStyle={ setStyle }
                        />
                    </div>
                </div>
           ) }
       </div>
   );
   if ( ! wrapperPanelTitle ) {
       return content;
   }
   return (
       <div className="sbc-tabs__global-styles" >
           { content }
       </div>
   );
}


function getPanelTitle( blockName ) {
   const blockType = getBlockType( blockName );

   // Protect against blocks that aren't registered
   // eg: widget-area
   if ( blockType === undefined ) {
       return blockName;
   }

   return blockType.title;
}

function GlobalStylesBlockPanels( {
   blocks,
   getStyle,
   setStyle,
   getSetting,
   setSetting,
} ) {
   const panels = useMemo(
       () =>
           sortBy(
               map( blocks, ( block, name ) => {
                   return {
                       block,
                       name,
                       wrapperPanelTitle: getPanelTitle( name ),
                   };
               } ),
               ( { wrapperPanelTitle } ) => wrapperPanelTitle
           ),
       [ blocks ]
   );

   return map( panels, ( { block, name, wrapperPanelTitle } ) => {
       return (
           <GlobalStylesPanel
               key={ 'panel-' + name }
               wrapperPanelTitle={ wrapperPanelTitle }
               context={ block }
               getStyle={ getStyle }
               setStyle={ setStyle }
               getSetting={ getSetting }
               setSetting={ setSetting }
           />
       );
   } );
}


export  function GlobalStylesSidebar( {
   identifier,
   title,
   icon,
   closeLabel,
} ) {
   const {
       root,
       blocks,
       getStyle,
       setStyle,
       getSetting,
       setSetting,
   } = useGlobalStylesContext();
   const [ canRestart, onReset ] = useGlobalStylesReset();

   if ( typeof blocks !== 'object' || ! root ) {
       // No sidebar is shown.
       return null;
   }

   return (
       <DefaultSidebar
           className="edit-site-global-styles-sidebar"
           identifier={ identifier }
           title={ title }
           icon={ icon }
           closeLabel={ closeLabel }
           header={
               <>
                   <strong>{ title }</strong>
                   <Button
                       className="edit-site-global-styles-sidebar__reset-button"
                       isSmall
                       variant="tertiary"
                       disabled={ ! canRestart }
                       onClick={ onReset }
                   >
                       { __( 'Reset to defaults' ) }
                   </Button>
               </>
           }
       >
           <TabPanel
               tabs={ [
                   { name: 'root', title: __( 'Root' ) },
                   { name: 'block', title: __( 'By Block Type' ) },
               ] }
           >
               { ( tab ) => {
                   /* Per Block Context */
                   if ( 'block' === tab.name ) {
                       return (
                           <GlobalStylesBlockPanels
                               blocks={ blocks }
                               getStyle={ getStyle }
                               setStyle={ setStyle }
                               getSetting={ getSetting }
                               setSetting={ setSetting }
                           />
                       );
                   }
                   return (
                       <GlobalStylesPanel
                           hasWrapper={ false }
                           context={ root }
                           getStyle={ getStyle }
                           setStyle={ setStyle }
                           getSetting={ getSetting }
                           setSetting={ setSetting }
                       />
                   );
               } }
           </TabPanel>
       </DefaultSidebar>
   );
}


const Style = ( props ) => {
    const [ active, setActive ] = useState( false );


    const {
		root,
		blocks,
		getStyle,
		setStyle,
		getSetting,
		setSetting,
	} = useGlobalStylesContext();
	const [ canRestart, onReset ] = useGlobalStylesReset();

	if ( typeof blocks !== 'object' || ! root ) {
		// No sidebar is shown.
		return null;
	}
    return ( 
        <div className="sbc-tabs__styles-tab">
        {/* // <ul className="sbc-tabs__navigation-container" >


        // </ul> */}
            
                                                   
            <GlobalStylesPanel
                hasWrapper={ true }
                context={ root }
                getStyle={ getStyle }
                setStyle={ setStyle }
                getSetting={ getSetting }
                setSetting={ setSetting }
            />
        </div>
     )
   


    };

export default Style;    



