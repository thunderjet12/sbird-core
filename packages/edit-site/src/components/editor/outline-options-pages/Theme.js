import {useState, useEffect} from "@wordpress/element";
import { motion } from "framer-motion";
import { makeStyles, withStyles } from '@material-ui/core/styles';

/**
 * External dependencies
 */
 import { map, sortBy } from 'lodash';

 /**
  * WordPress dependencies
  */
 import { Button, PanelBody, TabPanel } from '@wordpress/components';
 import { __ } from '@wordpress/i18n';
 import { getBlockType } from '@wordpress/blocks';
 import { useMemo } from '@wordpress/element';
 import apiFetch from "@wordpress/api-fetch";
//  import PropTypes from 'prop-types';


const Theme = ( props ) => {
    // let sbcConfigData = {};

  const [sbcThemeConfigDataState, setSbcThemeConfigDataState] = useState({});
    // sbcConfigData.PropTypes = {
    //    sbcThemeConfig: PropTypes.any,
    // }
    const sbcThemeConfig = () => {
        apiFetch( { 
            path: 'sbthemes/v1/sbtheme',
            method: "GET",
            headers: { 
                'Content-type': 'application/json',
                'X-WP-Nonce': wpApiSettings.nonce
            },
            'credentials': 'same-origin',
            // data: { blueprint: blueprintData }
        } )       
        .then( res =>  { setSbcThemeConfigDataState( res )}

        ).catch( err => {
            console.log( err );
        } ) 

   }

   useEffect( () => {
    sbcThemeConfig();
   },[setSbcThemeConfigDataState]);

let  sbThemeName = "Theme Title";
    return ( 
        <div className="sbc-tabs__theme-tab" >
                <div className="sbc-tabs__theme-tab__container" >
                    <div className="sbc-tabs__theme-tab__themes" > 
                    <div className="sbc-tabs__theme-tab__main-bar" >
                        <Button  className="sbc-tabs__theme-tab__main-bar__btn" >
                            Site Theme Configrator
                        </Button>
                        <Button  className="sbc-tabs__theme-tab__main-bar__btn" >
                                Edit Active Theme
                        </Button>
                    </div>
                        <div className="sbc-tabs__theme-tab__browse-themes">
                            <div className="sbc-tabs__theme-tab__browse-themes__card" >
                                    <h3>{sbThemeName}</h3>
                                    <div className="sbc-tabs__theme-tab__browse-themes__card__media" >
                                        {/* <img src={} />     */}
                                    </div>
                                    <div className="sbc-tabs__theme-tab__browse-themes__card-actions" >
                                        <Button onClick={ () => console.log( sbcThemeConfigDataState) }  className="sbc-tabs__theme-tab__main-bar__btn" >
                                                preview
                                        </Button>
                                        <Button onClick={ () => sbcThemeConfig() } className="sbc-tabs__theme-tab__browse-themes__card__btn" >
                                                active theme
                                        </Button>
                                    </div>
                                    {/* <TabPanel
                                        tabs={ [
                                            { name: 'root', title: __( 'Root' ) },
                                            { name: 'block', title: __( 'By Block Type' ) },
                                        ] }
                                    > */}
                                        { 
                                                    // <GlobalStylesBlockPanels
                                                    //     blocks={ blocks }
                                                    //     getStyle={ getStyle }
                                                    //     setStyle={ setStyle }
                                                    //     getSetting={ getSetting }
                                                    //     setSetting={ setSetting }
                                                    // />,
                                             
                                            

                                         
                                        } 
                                    {/* </TabPanel> */}
                            </div>
                        </div>
                    </div>
                </div>

 
        </div>
     )
   


    };

export default Theme;    



