
import { Stage, Layer, Rect, Circle } from 'react-konva';

const Workspace = ( props ) => {

    const { children } = props;
    return (
        <div className="sbc-studio__graphics-editor__workspace" >
            <Stage className="sbc-studio__graphics-editor__workspace__stage" >
               { children }
            </Stage>
        </div>
    )
}

export default Workspace