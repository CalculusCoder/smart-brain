import React from "react";
import './Rank.css';

const Rank = ( {name, entries} ) => {
    return (
        <div>
            <div className="text">
                {name}, your current entry count is
            </div>
            <div className="rank">
                {entries}
            </div>
        </div>
    );
}

export default Rank;