
import  Toolbar  from './components/ToolBar';
import { Stage, Layer, Rect, Circle } from 'react-konva';
import Workspace from './components/WorkSpace'; 
const Interface = () => {

    return (
        <div className="sbc-studio__graphics-editor__interface" >
            <Toolbar />
            <Workspace/>
        </div>
    )
}

export default Interface