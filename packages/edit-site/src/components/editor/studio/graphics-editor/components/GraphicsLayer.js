import { Component } from '@wordpress/element';
import { Layer } from 'react-konva';
// import PropTypes from 'prop-types';

// GraphicsLayer.propTypes = {
// 	children: PropTypes.node,
// 	index: PropTypes.any.isRequired,
// 	value: PropTypes.any.isRequired,
// }

class GraphicsLayer extends Component {
    constructor (props) {
        super( props );
    }
    componentDidMount () {

    }
    render() {

        const { children } = this.props
        return (
            
                <Layer>
                    { children }
                </Layer>
         
        )
    }

}

export default GraphicsLayer