import React from "react";
export const Results = ({searchResults})=>{
    return (
        <div>
            {searchResults.map((drug)=>{
                <li key={drug.name}>
                    {drug.name}
                </li>
            })}
        </div>
    )
}
