// Imports
import React, { useState } from "react";
import { Divider } from "antd";
import GUN from "gun";
// Components
import TitleSegment from "./components/TitleSegment";
import Viewer from "./components/Viewer";
import SVGUploadForm from "./components/SVGUploadForm";

export default function App() {

    //initialize GUN 
    const gun = GUN();

    // default SVG to display
    const [svg, setSVG] = useState({
        // default state
        title: "Ethereum Logo",
        // Ethereum Logo
        svg: `
            <svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="100%" height="100%" version="1.1" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 784.37 1277.39" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xodm="http://www.corel.com/coreldraw/odm/2003">
                <g id="Layer_x0020_1">
                    <metadata id="CorelCorpID_0Corel-Layer"/>
                    <g id="_1421394342400">
                        <g>
                            <polygon fill="#343434" fill-rule="nonzero" points="392.07,0 383.5,29.11 383.5,873.74 392.07,882.29 784.13,650.54 "/>
                            <polygon fill="#8C8C8C" fill-rule="nonzero" points="392.07,0 -0,650.54 392.07,882.29 392.07,472.33 "/>
                            <polygon fill="#3C3C3B" fill-rule="nonzero" points="392.07,956.52 387.24,962.41 387.24,1263.28 392.07,1277.38 784.37,724.89 "/>
                            <polygon fill="#8C8C8C" fill-rule="nonzero" points="392.07,1277.38 392.07,956.52 -0,724.89 "/>
                            <polygon fill="#141414" fill-rule="nonzero" points="392.07,882.29 784.13,650.54 392.07,472.33 "/>
                            <polygon fill="#393939" fill-rule="nonzero" points="0,650.54 392.07,882.29 392.07,472.33 "/>
                        </g>
                    </g>
                </g>
            </svg>`,
    });

    // list of default SVGs
    const [svgNameList, setSVGNameList] = useState([
        
        "Ethereum Logo",
    ]);

    // callback func to change SVG based on selected option
    const changeCurrentSVG = (selectionTitle) => {
        // verify that previously selected SVG has been pushed to GUN
        gun.get(svg.title).put({
            title: svg.title,
            svg: svg.svg,
        });

        // get new SVG from GUN and update
        gun.get(selectionTitle).on((data, key) => {
            setSVG({
                title: data.title,
                svg: data.svg,
            });
        });
    };

    // callback func to update the SVG within a child component
    const updateSVG = (newSVG) => {
        // Update the GUN database with the new SVG
        gun.get(newSVG.title).put({
            title: newSVG.title,
            svg: newSVG.svg,
        });
        // update the SVG list
        setSVGNameList(svgNameList.concat(newSVG.title));
    };

    // return component for general application
    return (
        <div
            style={{
                textAlign: "center", // How in the hell does this work
            }}
        >
            <TitleSegment
                svgTitle={svg.title}
                svgNameList={svgNameList}
                changeCurrentSVG={changeCurrentSVG}
            />
            <Divider />
            <Viewer svgData={svg.svg} />
            <Divider />
            <SVGUploadForm updateSVG={updateSVG} />
        </div>
    );

}