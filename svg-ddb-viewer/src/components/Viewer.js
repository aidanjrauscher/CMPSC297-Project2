import React from "react";

// Viewer segment container
export default function Viewer({ svgData }) {

    // return component for SVG to display
    return (
        <>
            <img
                src={`data:image/svg+xml;utf8,${encodeURIComponent(svgData)}`}
                alt="SVG currently being displayed"
                style={{maxWidth: 420,}} // limit SVG expansion
            />
        </>
    );
}