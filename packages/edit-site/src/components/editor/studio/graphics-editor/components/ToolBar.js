
import { Stage, Layer, Rect, Circle } from 'react-konva';

const ToolBar = () => {

    return (

            <div className="sbc-studio__graphics-editor__tools-side-bar" >
                <div className="sbc-studio__graphics-editor_tools-side-bar__container" >
                    <span className="sbc-studio__graphics-editor__tools__selection" ></span>
                    <span className="sbc-studio__graphics-editor__tools__gradiant" ></span>
                    <span className="sbc-studio__graphics-editor__tools__shapes" ></span>
                </div>
            </div>

    )
}

export default ToolBar