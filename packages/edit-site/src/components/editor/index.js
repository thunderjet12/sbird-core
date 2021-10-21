/**
 * WordPress dependencies
 */
import { useEffect, useState, useMemo, useCallback } from '@wordpress/element';
import { AsyncModeProvider, useSelect, useDispatch } from '@wordpress/data';
import {
	SlotFillProvider,
	Popover,
	Button,
	Notice,
	TabPanel
} from '@wordpress/components';
import { EntityProvider, store as coreStore } from '@wordpress/core-data';
import { BlockContextProvider, BlockBreadcrumb } from '@wordpress/block-editor';
import {
	FullscreenMode,
	InterfaceSkeleton,
	ComplementaryArea,
	store as interfaceStore,
} from '@wordpress/interface';
import {
	EditorNotices,
	EditorSnackbars,
	EntitiesSavedStates,
	UnsavedChangesWarning,
	store as editorStore,
} from '@wordpress/editor';
import { __ } from '@wordpress/i18n';
import { PluginArea } from '@wordpress/plugins';

/**
 * Internal dependencies
 */
import Header from '../header';
import { SidebarComplementaryAreaFills } from '../sidebar';
import BlockEditor from '../block-editor';
import KeyboardShortcuts from '../keyboard-shortcuts';
import GlobalStylesProvider from './global-styles-provider';
import NavigationSidebar from '../navigation-sidebar';
import URLQueryController from '../url-query-controller';
import InserterSidebar from '../secondary-sidebar/inserter-sidebar';
import ListViewSidebar from '../secondary-sidebar/list-view-sidebar';
import { store as editSiteStore } from '../../store';

import PropTypes from 'prop-types';
import Theme from './outline-options-pages/Theme';
import Style from './outline-options-pages/Style';
import Studio from './studio/studio';



// ============== sbird core ==============

// function SbcMainTabPanel( props ) {

// 	const { children, value, index, ...other } = props;

// 	return (
// 		<div
// 			role="tabpanel"
// 			hidden={ value !== index }
// 			id={ `sbc-main-tabpanel-${index}` }
// 			aria-labelledby={ `sbc-main-tabpanel-${index}` }
// 			{...other}
// 			className="sbc-tab__pane"
// 		>
// 			{ value === index && (
// 				<Box className="tab-content" >
// 					{ children }
// 				</Box>
// 			)}
// 		</div>
// 	)
// }

// function SbcOutlinesTabPanel( props ) {

// 	const { children, value, index, ...other } = props;

// 	return (
// 		<div
// 			role="tabpanel"
// 			hidden={ value !== index }
// 			id={ `sbc-outline-tabpanel-${index}` }
// 			aria-labelledby={ `sbc-outline-tabpanel-${index}` }
// 			{...other}
// 			className="sbc-tab__pane"
// 		>
// 			{ value === index && (
// 				<Box className="tab-content" >
// 					{ children }
// 				</Box>
// 			)}
// 		</div>
// 	)
// }

// SbcOutlinesTabPanel.propTypes = {
// 	children: PropTypes.node,
// 	index: PropTypes.any.isRequired,
// 	value: PropTypes.any.isRequired,
// }

// function sbcMainProps( index ) {
// 	return{
// 		id: `sbc-main-tabpanel-${index}`,
// 		'aria-controls': `sbc-main-tabpanel-${index}`
		
// 	};
// }

// function sbcOutlineProps( index ) {
// 	return{
// 		id: `sbc-outline-tabpanel-${index}`,
// 		'aria-controls': `sbc-outline-tabpanel-${index}`
		
// 	};
// }

// function MainOnNavigate( index, target ) {
// 	console.log( `Navigates to ${ index }`, target );
// }

// function OutlineOnNavigate( index, target ) {
// 	console.log( `Navigates to ${ index }`, target );
// }




// ============== sbird core End ==============




const interfaceLabels = {
	secondarySidebar: __( 'Block Library' ),
	drawer: __( 'Navigation Sidebar' ),
};

function Editor( { initialSettings } ) {



	const {
		isInserterOpen,
		isListViewOpen,
		sidebarIsOpened,
		settings,
		entityId,
		templateType,
		page,
		template,
		isNavigationOpen,
	} = useSelect( ( select ) => {
		const {
			isInserterOpened,
			isListViewOpened,
			getSettings,
			getEditedPostType,
			getEditedPostId,
			getPage,
			isNavigationOpened,
		} = select( editSiteStore );
		const postType = getEditedPostType();
		const postId = getEditedPostId();

		// The currently selected entity to display. Typically template or template part.
		return {
			isInserterOpen: isInserterOpened(),
			isListViewOpen: isListViewOpened(),
			sidebarIsOpened: !! select(
				interfaceStore
			).getActiveComplementaryArea( editSiteStore.name ),
			settings: getSettings(),
			templateType: postType,
			page: getPage(),
			template: postId
				? select( coreStore ).getEntityRecord(
						'postType',
						postType,
						postId
				  )
				: null,
			entityId: postId,
			isNavigationOpen: isNavigationOpened(),
		};
	}, [] );
	const { updateEditorSettings } = useDispatch( editorStore );
	const { setPage, setIsInserterOpened, updateSettings } = useDispatch(
		editSiteStore
	);
	useEffect( () => {
		updateSettings( initialSettings );
	}, [] );

	// Keep the defaultTemplateTypes in the core/editor settings too,
	// so that they can be selected with core/editor selectors in any editor.
	// This is needed because edit-site doesn't initialize with EditorProvider,
	// which internally uses updateEditorSettings as well.
	const { defaultTemplateTypes, defaultTemplatePartAreas } = settings;
	useEffect( () => {
		updateEditorSettings( {
			defaultTemplateTypes,
			defaultTemplatePartAreas,
		} );
	}, [ defaultTemplateTypes, defaultTemplatePartAreas ] );

	const [
		isEntitiesSavedStatesOpen,
		setIsEntitiesSavedStatesOpen,
	] = useState( false );
	//================================================= sbird core =================================================

	const [ currentMainMenuOptionsPage, setCurrentMainMenuOptionsPage ] = useState("outlines");
	const [ currentOutlineOptionsPage, setCurrentOutlineOptionsPage ] = useState("theme");
	// ================================================= Sbird Core End =================================================

	const openEntitiesSavedStates = useCallback(
		() => setIsEntitiesSavedStatesOpen( true ),
		[]
	);
	const closeEntitiesSavedStates = useCallback( () => {
		setIsEntitiesSavedStatesOpen( false );
	}, [] );

	const blockContext = useMemo(
		() => ( {
			...page?.context,
			queryContext: [
				page?.context.queryContext || { page: 1 },
				( newQueryContext ) =>
					setPage( {
						...page,
						context: {
							...page?.context,
							queryContext: {
								...page?.context.queryContext,
								...newQueryContext,
							},
						},
					} ),
			],
		} ),
		[ page?.context ]
	);




/** ========================== */	

	
const sbcOutlinesPages = useMemo(
	() => [ 
		{
			name: 'theme',
			tabLabel: __( 'Theme' ),
			content: (
				<>
					<Theme/>
				</>	
			)
		},
		{
			name: 'style',
			tabLabel: __( 'Style' ),
			content: (
				<>
					<Style />
				</>	
			)
		},
		{
			name: 'appearance',
			tabLabel: __( 'Appearance' ),
			content: (
				<>
					<Studio />
				</>	
			)
		},		{
			name: 'content settings',
			tabLabel: __( 'Content Settings' ),
			content: (
				<>
					<h1>Content Settings</h1>
				</>	
			)
		},		{
			name: 'layout',
			tabLabel: __( 'Layout' ),
			content: (
				<>
					<h1>Layout</h1>
				</>	
			)
		},		{
			name: 'support',
			tabLabel: __( 'Support' ),
			content: (
				<>
					<h1>Support</h1>
				</>	
			)
		},		{
			name: 'design',
			tabLabel: __( 'Design' ),
			content: (
				<>
					<EditorNotices />
					{ template && (
						<BlockEditor
							setIsInserterOpen={
							setIsInserterOpened
						}
						/>
					) }

					{ ! template &&
						settings?.siteUrl &&
						entityId && (
							<Notice
								status="warning"
								isDismissible={
									false
								}
							>
								{ __(
									"You attempted to edit an item that doesn't exist. Perhaps it was deleted?"
								) }
							</Notice>
						) }
					<KeyboardShortcuts />
				</>	
			)
		},
	],[ template ]
);
const { sbcOutlinesTabs , sbcOutlinesPagesContentMap } = useMemo(
	() => 
	sbcOutlinesPages.reduce(
			( accumulator, { name, tabLabel: title, content } ) => { 
				accumulator.sbcOutlinesTabs.push( { name, title } );
				accumulator.sbcOutlinesPagesContentMap[ name ] = content;

				return accumulator;

			}, { sbcOutlinesTabs:[], sbcOutlinesPagesContentMap: {} }

		),[ sbcOutlinesPages ]
	
);


let sbcCurrentOutlinePage = null;
const getCurrentOutlinePage = useCallback(

	  () => {
		
		let sbcCurrentOutlinePage = sbcOutlinesPagesContentMap[currentOutlineOptionsPage];
	
		console.log( "currentOutlineOptionsPage:" , sbcCurrentOutlinePage, sbcOutlinesPagesContentMap[currentOutlineOptionsPage], currentOutlineOptionsPage);
		return <SbcOutlineTabPanel tab={ sbcCurrentOutlinePage } />   || null
	},
	[ template, currentOutlineOptionsPage ]
	
); 

const SbcOutlineTabPanel = ( props ) => {
	console.log( props, sbcCurrentOutlinePage   )

		// let sbcCurrentMainPage = sbcPagesContentMap[ currentMainMenuOptionsPage] ;
		
		return (
			<div>
				{ props.tab }
			</div>
		)

}

console.log( sbcOutlinesTabs , sbcOutlinesPagesContentMap,  getCurrentOutlinePage )


	const sbcPages = useMemo(
		() => [ 
			{
				name: 'outlines',
				tabLabel: __( 'Outlines' ),
				content: ( getCurrentOutlinePage())
				
			},
			{
				name: 'menus',
				tabLabel: __( 'Menus' ),
				content: (
					<>
						<h1>Menus</h1>
					</>	
				)
			},
			{
				name: 'studio',
				tabLabel: __( 'Studio' ),
				content: (
					<>
						<Studio />
					</>	
				)
			},		{
				name: 'extensions',
				tabLabel: __( 'Extensions' ),
				content: (
					<>
						<h1>extensions</h1>
					</>	
				)
			},		{
				name: 'integrations',
				tabLabel: __( 'Integrations' ),
				content: (
					<>
						<h1>Integrations</h1>
					</>	
				)
			},		{
				name: 'support',
				tabLabel: __( 'Support' ),
				content: (
					<>
						<h1>Support</h1>
					</>	
				)
			},		{
				name: 'extras',
				tabLabel: __( 'Extras' ),
				content: (
					<>
						<h1>Extras</h1>
					</>	
				)
			},
		],[currentOutlineOptionsPage]
	);
	// const [ activeMenu, setActiveMenu ] = useState( "PREFERENCES_MENU" );
	const { sbcTabs , sbcPagesContentMap } = useMemo(
		() => 
			sbcPages.reduce(
				( accumulator, { name, tabLabel: title, content } ) => { 
					accumulator.sbcTabs.push( { name, title } );
					accumulator.sbcPagesContentMap[ name ] = content;
	
					return accumulator;
	
				}, { sbcTabs:[], sbcPagesContentMap: {} }
	
			),[ sbcPages ]
		
	);
	
	
	// const getCurrentPage = useCallback(
	// 	( tab ) => <SbcTabPanel tab={tab} />   || null,
	// 		[ sbcPagesContentMap ]
		
	// ); 
	let sbcCurrentMainPage = null;
	const getCurrentPage = useCallback(

		  () => {
			
			let sbcCurrentMainPage = sbcPagesContentMap[currentMainMenuOptionsPage];
		
			console.log( "sbcCurrentMainPage:" , sbcCurrentMainPage, sbcPagesContentMap[currentMainMenuOptionsPage], currentMainMenuOptionsPage);
			return <SbcTabPanel tab={ sbcCurrentMainPage } />   || null
		},
		[ currentOutlineOptionsPage, currentMainMenuOptionsPage ]
		
	); 

	const SbcTabPanel = ( props ) => {
		console.log( props, sbcCurrentMainPage, sbcCurrentMainPage   )

			// let sbcCurrentMainPage = sbcPagesContentMap[ currentMainMenuOptionsPage] ;
			
			return (
				<div>
					{ props.tab }
				</div>
			)

	}

	console.log( sbcPagesContentMap, sbcTabs,  getCurrentPage )


	useEffect( () => {
		if ( isNavigationOpen ) {
			document.body.classList.add( 'is-navigation-sidebar-open' );
		} else {
			document.body.classList.remove( 'is-navigation-sidebar-open' );
		}
	}, [ isNavigationOpen ] );

	// Don't render the Editor until the settings are set and loaded
	if ( ! settings?.siteUrl ) {
		return null;
	}

	const secondarySidebar = () => {
		if ( isInserterOpen ) {
			return <InserterSidebar />;
		}
		if ( isListViewOpen ) {
			return (
				<AsyncModeProvider value="true">
					<ListViewSidebar />
				</AsyncModeProvider>
			);
		}
		return null;
	};



	/** ==========================================  SBird Core  Start  ==========================================*/


	function mainMenuLinksHandle (passvalue) {
		
		// persist();
		// const { MainMenuValue } = e.target.textContent;
		console.log( "value:" + passvalue );
		setCurrentMainMenuOptionsPage( passvalue );
		// console.log(currentMainMenuOptionsPage, e.target.textContent );
		
		
	}


	function outlineMenuLinksHandle ( passvalue ) {
		
		//  e.persist();
		// const { OutlineValue } = e.target.textContent;
		console.log( "value:" + passvalue );
		setCurrentOutlineOptionsPage( passvalue );
		// console.log(currentOutlineOptionsPage, e.target.textContent );
		
		
	}
	const onSelect = ( tabName ) => {
		console.log( 'Selecting tab', tabName );
	};

	// console.log(currentOutlineOptionsPage);
	
	// const [value, setValue] = useState(0);
	// const [mainMenuTabValue, setMainMenuTabValue] = useState(0);
	
	// const mainMenuHandleChange = (event, newValue) => {
	// 	setMainMenuTabValue(newValue);
	//   };
	// const handleChange = (event, newValue) => {
	//   setValue(newValue);
	// };
	// console.log(value)
	// useEffect( () => {
	// 	if ( value == 6 ) {
	// 		console.log(value)
	// 		document.querySelector(".edit-site-header").classList.add("sbc-edit-site-header")
	// 	} else {
	// 		document.querySelector(".edit-site-header").classList.remove("sbc-edit-site-header")
	// 	}
	// } )
	// const useStyles = makeStyles( (theme) => ({
	// 	root: {
	// 		flexGrow: 1,
	// 		backgroundColor: theme.palette.background.paper,
	// 	},
	// 	AppBar: {
	// 		minHeight: 30,
	// 	},
	// 	"sbc-header__outline-menu__button": {
	// 		minHeight: 30,
	// 		height: "100%",
	// 		borderRadius: 0,
	// 		border: "none",
	// 		background: "#3f51b5",
	// 	},
	// 	"sbc-header__main-menu__brand": {
	// 		width: "max-content",
	// 		marginLeft: "auto",
	// 	},
	// 	"sbc-header__main-menu__brand__title": {
	// 		display: "flex",
	// 		fontWeight: currentMainMenuOptionsPage == "Outlines" && currentOutlineOptionsPage == "Design" ? 600 :  
	// 					currentMainMenuOptionsPage == "Outlines" && currentOutlineOptionsPage !== "Design" ? 700 : currentMainMenuOptionsPage !== "Outlines" ? 700 : 700,
	// 		fontSize: currentMainMenuOptionsPage == "Outlines" && currentOutlineOptionsPage == "Design" ? 15 :  
	// 				  currentMainMenuOptionsPage == "Outlines" && currentOutlineOptionsPage !== "Design" ? 20 : currentMainMenuOptionsPage !== "Outlines" ? 20 : 20,
	// 		transition:  "1s ease-in-out()",
	// 	},
	// 	"sbc-header__main-menu__theme": {
	// 		width: "max-content",
	// 		marginLeft: "auto",
	// 	},
	// 	"sbc-header__main-menu__theme__title": {
	// 		display: "inline-flex",
	// 		fontWeight: currentMainMenuOptionsPage == "Outlines" && currentOutlineOptionsPage == "Design" ? 600 :  
	// 					currentMainMenuOptionsPage == "Outlines" && currentOutlineOptionsPage !== "Design" ? 700 : 700,
	// 		fontSize: currentMainMenuOptionsPage == "Outlines" && currentOutlineOptionsPage == "Design" ? 15 :  
	// 				  currentMainMenuOptionsPage == "Outlines" && currentOutlineOptionsPage !== "Design" ? 20  : 20,
	// 		transition:  "1s ease-in-out()",
	// 	},
	// 	"sbc-header__main-menu__container": {
	// 		width: "max-content",
	// 		marginLeft: "auto",
	// 		height: "100%",
	// 	},
	// 	"sbc-header__main-menu__menu-bar": {
	// 		height: "100%",
	// 		backgroundColor: "unset",
	// 		boxShadow: "unset",
	// 		color: "rgba(111, 12, 193, 0.8)",
	// 	},
	// 	"sbc-tabs__main-menu_nav": {
	// 		display: "flex",
	// 		border: "none",
	// 		height: "100%",
	// 		marginRight: "2rem",
	// 	},
	// 	"sbc-header__main-menu__button":{
	// 		gap: "1px",
	// 		border: "none",
	// 		width: "3rem",
	// 		height: "100%",
	// 	},
	// 	"sbc-tabs__outline-menu": {
	// 		minHeight: 30,
	// 		height: 100 + "%",
	// 		transition:  "1s ease-in-out()",
	// 		// paddingLeft: 100,
	// 	},


		
	// }) );
	// const classes = useStyles();
const classes = {  }
	console.log( isNavigationOpen )
	// useEffect( () => {
	// 	// console.log(document.documentElement.style.setProperty("--interface-interface-skeleton__header--height", currentOutlineOptionsPage == "Design" ? 61 + "px" : 100 + "px" ));
	// 	document.documentElement.style.setProperty("--edit-site__navigation-toggle-button", currentMainMenuOptionsPage !== "Outlines" ? 0 :  isNavigationOpen == true ? 0 : currentOutlineOptionsPage == "Design" && isNavigationOpen == false ?
	// 	 0 : currentOutlineOptionsPage !== "Design" && isNavigationOpen == true ? 0 : 
	// 	 currentOutlineOptionsPage !== "Design" && isNavigationOpen == false ? 40 + "px" : 40 + "px" );
	// 	// document.documentElement.style.setProperty("--edit-site__navigation-toggle-button", isNavigationOpen == true ? 0 :null );
	// 	console.log( currentMainMenuOptionsPage )
	// 	document.documentElement.style.setProperty("--sbc-header__main-menu--height", currentMainMenuOptionsPage !== "Outlines" ? 60 + "px" : currentMainMenuOptionsPage == "Outlines" && currentOutlineOptionsPage == "Design" ? 30 + "px" :  60 + "px" );
	// 	document.documentElement.style.setProperty("--sbc-header__outline-menu--height", currentOutlineOptionsPage == "Design" ? 30 + "px" : 50 + "px" );
	// 	document.documentElement.style.setProperty("--edit-post-menu-height", currentOutlineOptionsPage == "Design" ? 40 + "px" : 0 );
	// 	// document.documentElement.style.setProperty("--interface-interface-skeleton__header--height", currentOutlineOptionsPage == "Design" ? 61 + "px" : 100 + "px" );

	// }, [ isNavigationOpen, currentMainMenuOptionsPage, currentOutlineOptionsPage ] )



/** ==========================================  SBird Core End  ========================================== */


	return (
		<>
			<URLQueryController />
			<FullscreenMode isActive />
			<UnsavedChangesWarning />
			<SlotFillProvider>
				<EntityProvider kind="root" type="site">
					<EntityProvider
						kind="postType"
						type={ templateType }
						id={ entityId }
					>
						<EntityProvider
							kind="postType"
							type="wp_global_styles"
							id={
								settings.__experimentalGlobalStylesUserEntityId
							}
						>
							<BlockContextProvider value={ blockContext }>
								<GlobalStylesProvider
									baseStyles={
										settings.__experimentalGlobalStylesBaseStyles
									}
								>
									<KeyboardShortcuts.Register />
									<SidebarComplementaryAreaFills />
									<InterfaceSkeleton
										labels={ interfaceLabels }
										drawer={ <NavigationSidebar /> }
										secondarySidebar={ secondarySidebar() }
										sidebar={
											sidebarIsOpened && (
												<ComplementaryArea.Slot scope="core/edit-site" />
											)
										}
										header={
											// <Header
											// 	openEntitiesSavedStates={
											// 		openEntitiesSavedStates
											// 	}
											// />

											<div className="sbc-header">
											<div>
												<div>
												
													<div title="Group 1" className="sbc-header__main-menu" >
														<div className="sbc-header__main-menu__brand" >
															<h1 className="sbc-header__main-menu__brand__title" >SBird Core "<span>Gutenberg fork</span>"</h1>
														</div>
														<div className="sbc-header__main-menu__theme" >
															<h1 className="sbc-header__main-menu__theme__title" > Gameplay Theme </h1>
														</div>
													</div>
													
													<div title="Group 2" className="sbc-header__main-menu sbc-header__main-menu__container" >
														{/* <div className={ classes['sbc-header__main-menu__container'] } >
															<div position="static" className={'sbc-header__main-menu__menu-bar' }  > */}
																{/* <NavigableMenu onNavigate={ MainOnNavigate } orientation="horizontal" className="sbc-tabs__main-menu_nav" orientation="horizontal"> */}
																	<Button onClick={ () => { mainMenuLinksHandle( "outlines" ) } } className="sbc-nav__item sbc-nav__item--main sbc-header__main-menu__button" label="Outlines" > Outlines </Button>
																	<Button onClick={ () => { mainMenuLinksHandle( "menus" ) } } className="sbc-nav__item sbc-nav__item--main sbc-header__main-menu__button" label="Menus" > Menus </Button>
																	<Button onClick={ () => { mainMenuLinksHandle( "studio" ) } } className="sbc-nav__item sbc-nav__item--main sbc-header__main-menu__button" label="Studio" > Studio </Button>
																	<Button onClick={ () => { mainMenuLinksHandle( "extensions" ) } } className="sbc-nav__item sbc-nav__item--main sbc-header__main-menu__button" label="Extensions" > Extensions </Button>
																	<Button onClick={ () => { mainMenuLinksHandle( "integrations" ) } } className="sbc-nav__item sbc-nav__item--main sbc-header__main-menu__button" label="Integrations" > Integrations </Button>
																	<Button onClick={ () => { mainMenuLinksHandle( "support" ) } } className="sbc-nav__item sbc-nav__item--main sbc-header__main-menu__button" label="Support" > Support </Button>
																	<Button onClick={ () => { mainMenuLinksHandle( "extras" ) } } className="sbc-nav__item sbc-nav__item--main sbc-header__main-menu__button" label="Extras" > Extras </Button>
																	{/* <NavigationItem  item="item-1" title="Outlines" onClick={ mainMenuLinksHandle } className="sbc-nav__item sbc-nav__item--main sbc-header__main-menu__button" />
																	<NavigationItem  item="item-2" title="Menus" onClick={ mainMenuLinksHandle } className="sbc-nav__item sbc-nav__item--main sbc-header__main-menu__button" />
																	<NavigationItem  item="item-3" title="Studio" onClick={ mainMenuLinksHandle } className="sbc-nav__item sbc-nav__item--main sbc-header__main-menu__button" />
																	<NavigationItem  item="item-4" title="Extensions" onClick={ mainMenuLinksHandle } className="sbc-nav__item sbc-nav__item--main sbc-header__main-menu__button" />
																	<NavigationItem  item="item-6" title="Integrations" onClick={ mainMenuLinksHandle } className="sbc-nav__item sbc-nav__item--main sbc-header__main-menu__button" />
																	<NavigationItem  item="item-7" title="Support" onClick={ mainMenuLinksHandle } className="sbc-nav__item sbc-nav__item--main sbc-header__main-menu__button" />
																	<NavigationItem  item="item-8" title="Extras" onClick={ mainMenuLinksHandle } className="sbc-nav__item sbc-nav__item--main sbc-header__main-menu__button" /> */}
																{/* </NavigableMenu> */}
															{/* </div>
														</div> */}
													</div>

											</div>
											
											{ currentMainMenuOptionsPage === "outlines"  &&(
											<div className="sbc-header__outline-menu" >
											
												
													<div  className="sbc-tabs__outline-menu" >
														<Button onClick={ () => { outlineMenuLinksHandle( "theme" ) } } className="sbc-nav__item sbc-nav__item--outline sbc-header__outline-menu__button" label="Theme"  > Theme </Button>
														<Button onClick={ () => { outlineMenuLinksHandle( "style" ) } } className="sbc-nav__item sbc-nav__item--outline sbc-header__outline-menu__button" label="Style"  > Style </Button>
														<Button onClick={ () => { outlineMenuLinksHandle( "appearance" ) } } className="sbc-nav__item sbc-nav__item--outline sbc-header__outline-menu__button" label="Appearance"  > Appearance </Button>
														<Button onClick={ () => { outlineMenuLinksHandle( "content settings" ) } } className="sbc-nav__item sbc-nav__item--outline sbc-header__outline-menu__button" label="Content Settings" > Content Settings </Button>
														<Button onClick={ () => { outlineMenuLinksHandle( "layout" ) } } className="sbc-nav__item sbc-nav__item--outline sbc-header__outline-menu__button" label="Layout"  > Layout </Button>
														<Button onClick={ () => { outlineMenuLinksHandle( "design" ) } } className="sbc-nav__item sbc-nav__item--outline sbc-header__outline-menu__button" label="Design"  > Design </Button>
														<Button onClick={ () => { outlineMenuLinksHandle( "assignments" ) } } className="sbc-nav__item sbc-nav__item--outline sbc-header__outline-menu__button" label="Assignments" > Assignments </Button>
													</div>


											</div> ) }
											</div>
											{ currentMainMenuOptionsPage === "outlines" && currentOutlineOptionsPage === "design" &&(
												<Header
												openEntitiesSavedStates={
													openEntitiesSavedStates
												}
												/>
											) 
											}

										</div>
										}
										notices={ <EditorSnackbars /> }
										content={
											// <>
											// 	<EditorNotices />
											// 	{ template && (
											// 		<BlockEditor
											// 			setIsInserterOpen={
											// 				setIsInserterOpened
											// 			}
											// 		/>
											// 	) }
											// 	{ ! template &&
											// 		settings?.siteUrl &&
											// 		entityId && (
											// 			<Notice
											// 				status="warning"
											// 				isDismissible={
											// 					false
											// 				}
											// 			>
											// 				{ __(
											// 					"You attempted to edit an item that doesn't exist. Perhaps it was deleted?"
											// 				) }
											// 			</Notice>
											// 		) }
											// 	<KeyboardShortcuts />
											// </>

											<>
												<EditorNotices />
												{ template && (
													 getCurrentPage()
												// <TabPanel
												// 	className="my-tab-panel"
												// 	tabs={ sbcTabs }
												// 	activeClass="active-tab"
												// 	initialTabName= { currentMainMenuOptionsPage }
												// 	onSelect={ setCurrentMainMenuOptionsPage }
													
												// > 
														
												/* { ( tab ) => getCurrentPage(tab) } */
																// <h1>TEST WORKING</h1>
												/* <BlockEditor
														setIsInserterOpen={
															setIsInserterOpened
														}
												/> 
												</TabPanel>  */

												) }
												{ ! template &&
													settings?.siteUrl &&
													entityId && (
														<Notice
															status="warning"
															isDismissible={
																false
															}
														>
															{ __(
																"You attempted to edit an item that doesn't exist. Perhaps it was deleted?"
															) }
														</Notice>
													) }
												<KeyboardShortcuts />
											</>

										}
										actions={
											<>
												{ isEntitiesSavedStatesOpen ? (
													<EntitiesSavedStates
														close={
															closeEntitiesSavedStates
														}
													/>
												) : (
													<div className="edit-site-editor__toggle-save-panel">
														<Button
															variant="secondary"
															className="edit-site-editor__toggle-save-panel-button"
															onClick={
																openEntitiesSavedStates
															}
															aria-expanded={
																false
															}
														>
															{ __(
																'Open save panel'
															) }
														</Button>
													</div>
												) }
											</>
										}
										footer={ <BlockBreadcrumb /> }
									/>
									<Popover.Slot />
									<PluginArea />
								</GlobalStylesProvider>
							</BlockContextProvider>
						</EntityProvider>
					</EntityProvider>
				</EntityProvider>
			</SlotFillProvider>
		</>
	);
}
export default Editor;
