import { useEffect, useState, useMemo, useCallback } from '@wordpress/element';
// import { useSelect, useDispatch } from '@wordpress/data';




import PropTypes from 'prop-types';
import { makeStyles, createStyles, easing } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import GraphicsEditor from './graphics-editor';




SbcMainTabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
}

function SbcMainTabPanel( props ) {

	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={ value !== index }
			id={ `sbc-main-tabpanel-${index}` }
			aria-labelledby={ `sbc-main-tabpanel-${index}` }
			{...other}
			className="sbc-tab__pane"
		>
			{ value === index && (
				<Box className="tab-content" >
					{ children }
				</Box>
			)}
		</div>
	)
}



function sbcMainProps( index ) {
	return{
		id: `sbc-studio-main-tabpanel-${index}`,
		'aria-controls': `sbc-studio-main-tabpanel-${index}`
		
	};
}



const Studio = () => {
	const [ currentMainMenuOptionsPage, setCurrentMainMenuOptionsPage ] = useState("Dashboard");

    const [mainMenuTabValue, setMainMenuTabValue] = useState(0);
	
	const mainMenuHandleChange = (event, newValue) => {
		setMainMenuTabValue(newValue);
	  };

    function mainMenuLinksHandle (e) {
    
    e.persist();
    const { MainMenuValue } = e.target.textContent;
    // console.log( "value:" + MainMenuValue );
    setCurrentMainMenuOptionsPage(e.target.textContent);
    // console.log(currentMainMenuOptionsPage, e.target.textContent );
    
    
    }

    const useStyles = makeStyles( (theme) => ({
		// root: {
		// 	flexGrow: 1,
		// 	backgroundColor: theme.palette.background.paper,
		// },
		// AppBar: {
		// 	minHeight: 30,
		// },
		// "sbc-header__outline-menu__button": {
		// 	minHeight: 30,
		// 	height: "100%",
		// 	borderRadius: 0,
		// 	border: "none",
		// 	background: "#3f51b5",
		// },
		// "sbc-header__main-menu": {
		// 	display: "flex",
		// 	justifyContent: "space-around",
		// 	height: currentOutlineOptionsPage == "Design" ? 30 : 50,
		// 	position: "relative",
		// 	transition: "1s",
		// },
		// "sbc-header__main-menu__brand": {
		// 	width: "max-content",
		// 	marginLeft: "auto",
		// },
		// "sbc-header__main-menu__brand__title": {
		// 	display: "flex",
		// 	fontWeight: currentMainMenuOptionsPage == "Outlines" && currentOutlineOptionsPage == "Design" ? 600 :  
		// 				currentMainMenuOptionsPage == "Outlines" && currentOutlineOptionsPage !== "Design" ? 700 : currentMainMenuOptionsPage !== "Outlines" ? 700 : 700,
		// 	fontSize: currentMainMenuOptionsPage == "Outlines" && currentOutlineOptionsPage == "Design" ? 15 :  
		// 			  currentMainMenuOptionsPage == "Outlines" && currentOutlineOptionsPage !== "Design" ? 20 : currentMainMenuOptionsPage !== "Outlines" ? 20 : 20,
		// 	transition:  "1s ease-in-out()",
		// },
		// "sbc-header__main-menu__theme": {
		// 	width: "max-content",
		// 	marginLeft: "auto",
		// },
		// "sbc-header__main-menu__theme__title": {
		// 	display: "inline-flex",
		// 	fontWeight: currentMainMenuOptionsPage == "Outlines" && currentOutlineOptionsPage == "Design" ? 600 :  
		// 				currentMainMenuOptionsPage == "Outlines" && currentOutlineOptionsPage !== "Design" ? 700 : 700,
		// 	fontSize: currentMainMenuOptionsPage == "Outlines" && currentOutlineOptionsPage == "Design" ? 15 :  
		// 			  currentMainMenuOptionsPage == "Outlines" && currentOutlineOptionsPage !== "Design" ? 20  : 20,
		// 	transition:  "1s ease-in-out()",
		// },
		// "sbc-header__main-menu__container": {
		// 	width: "max-content",
		// 	marginLeft: "auto",
		// 	height: "100%",
		// },
		// "sbc-header__main-menu__menu-bar": {
		// 	height: "100%",
		// 	backgroundColor: "none",
		// 	color: "rgba(111, 12, 193, 0.8)",
		// },
		// "sbc-tabs__main-menu_nav": {
		// 	display: "flex",
		// 	border: "none",
		// 	height: "100%",
		// 	marginRight: "2rem",
		// },
		// "sbc-header__main-menu__button":{
		// 	gap: "1px",
		// 	border: "none",
		// 	width: "3rem",
		// 	height: "100%",
		// }


		
	}) );
	const classes = useStyles();

	function handleDragStart(e) {

	}

	function handleDragEnd(e) {

	}

    return (
        <div className="sbc-studio" >
            
            <header>
                <AppBar position="static" className={ classes['sbc-header__main-menu__menu-bar'] }  >
                    <Tabs value={mainMenuTabValue} onChange={mainMenuHandleChange} aria-label="main-menu tabs" className={ classes['sbc-tabs__main-menu_nav'] } >
                        <Tab onClick={ mainMenuLinksHandle } className={ " sbc-nav__item sbc-nav__item--main " + classes['sbc-header__main-menu__button'] } label="Dashboard" {...sbcMainProps(0)} />
                        <Tab onClick={ mainMenuLinksHandle } className={ " sbc-nav__item sbc-nav__item--main " + classes['sbc-header__main-menu__button'] } label="Graphics Editor" {...sbcMainProps(1)} />
                        <Tab onClick={ mainMenuLinksHandle } className={ " sbc-nav__item sbc-nav__item--main " + classes['sbc-header__main-menu__button'] } label="Sliders Editor" {...sbcMainProps(2)} />
                        <Tab onClick={ mainMenuLinksHandle } className={ " sbc-nav__item sbc-nav__item--main " + classes['sbc-header__main-menu__button'] } label="Library" {...sbcMainProps(3)} />
                    </Tabs>
                </AppBar>
            </header>
            <main className="sbc-studio__main" >         

                <SbcMainTabPanel value={mainMenuTabValue} index={ 0 }  >
                    <h2>Dashboard</h2>
                </SbcMainTabPanel>

                <SbcMainTabPanel value={mainMenuTabValue} index={ 1 }  >
                    <div className="sbc-studio__graphics-editor" >
                        
						
						<GraphicsEditor />

                    </div>
                  
                </SbcMainTabPanel>

                <SbcMainTabPanel value={mainMenuTabValue} index={ 2 }  >
                    <h2>Sliders Editor</h2>
                </SbcMainTabPanel>

                <SbcMainTabPanel value={mainMenuTabValue} index={ 3 }  >
                    
                </SbcMainTabPanel>

            </main>

        </div>
    )
}

export default Studio