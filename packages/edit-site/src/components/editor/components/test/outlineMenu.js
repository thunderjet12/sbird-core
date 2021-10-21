import { TabPanel } from '@wordpress/components';


function outlineMenu () { 
    const onSelect = ( tabName ) => {
        console.log( 'Selecting tab', tabName );
    };
    {
        ( tab ) => <p>{ tab.title }</p>
    }
    const MyTabPanel = () => (
        <TabPanel className="my-tab-panel"
            activeClass="active-tab"
            onSelect={ onSelect }
            tabs={ [
                {
                    name: 'tab1',
                    title: 'Tab 1',
                    className: 'tab-one',
                },
                {
                    name: 'tab2',
                    title: 'Tab 2',
                    className: 'tab-two',
                },
            ] }>

        </TabPanel>
        
    );

     return <MyTabPanel />    

}

export default outlineMenu