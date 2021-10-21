

import { Rect } from "react-konva";
import GraphicsLayer from "./components/GraphicsLayer";
import Workspace from "./components/WorkSpace";
import Interface from "./interface";


const GraphicsEditor = ( props ) => {
    return (
        <Interface>
            <Workspace>
                <GraphicsLayer>
                    <Rect width={300} height={300} fill="red" className="test"  draggable />
                </GraphicsLayer>
            </Workspace>
        </Interface>

    )
}

export default GraphicsEditor