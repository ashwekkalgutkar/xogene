import React,{useState,useEffect} from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner";

const Search = () =>{
    const [searchTerm, setSearchTerm] = useState("");
    const[searchResults,setsearchResults]= useState([]);
    const[isLoading,setIsLoading] =useState(false);
    const[isError,setIsError]= useState(null);
    const navigate = useNavigate();

    const handleSearch = async(e) =>{
        e.preventDefault();
        setIsLoading(true);
        
        try {
            const res = await axios.get(`https://rxnav.nlm.nih.gov/REST/drugs.json?name=${searchTerm}`);
            if(res.data.drugGroup.conceptGroup){
                setsearchResults(res.data.drugGroup.conceptGroup.flatMap(
                    (group)=>group.conceptProperties || []
                ));
                setIsError(null);
            }
            else{
                getSuggestions();
            }
        } catch (error) {
            console.log(error);
            setIsError("Error occured");
        }
        
    }

    const getSuggestions = async() =>{
        
        try {
            const res = await axios.get(`https://rxnav.nlm.nih.gov/REST/spellingsuggestion.json?name=${searchTerm}`);
            if(res.data.suggestionGroup.suggestionList){
                setsearchResults(res.data.suggestionGroup.suggestionList.suggestion || [] 
                );
                setIsError("Did you mean");
            }
            else{
                setIsError('No results found')
                setsearchResults([]);
            }
        } catch (error) {
            console.log(error);
            setIsError("Error occured");
            setsearchResults([]);
        }
        
    }
    const handleTermChange =(e)=>{
        setSearchTerm(e.target.value);
    }
    const handleDrugClick = (drugName) =>{
        
    }

    return (
        <div className="container">
            <h1>Drug Search</h1>
             <div className="search-container">
                <input type="text"
            value={searchTerm} 
            onChange={(e)=>setSearchTerm(e.target.value)}
            onKeyPress={handleDrugClick}
            placeholder="Search for a drug"/>
            <button onClick={handleSearch} type="submit" disabled={isLoading}>{isLoading?'Searhing...':'Search'}</button>
             </div>
             {isLoading && <Oval height={80} width={80} color="green" />}
             {isError && <p className="error">{isError}</p>}
             <div className="results">
                <ul>
                    {searchResults.map((result,index)=>{
                        <li key={index} onClick={()=>navigate(`/drug/$(result.name)`)}>
                            {typeof result === "string" ? result : result.name}
                        </li>
                    })}
                </ul>
             </div>
        </div>
        // <div>
        // <form onSubmit={handleSearch}>
           
        // </form>
        // {isError && !isLoading && <p>No results found. Try diffrent term</p>}
        // {isError && !isLoading && searchResults.length > 0 &&(
        //     <p>Did you mean:{searchResults[0].name}?</p>
        // )}
        // {searchResults.length>0 && !isLoading &&!isError &&(
        //     <ul>
        //         {searchResults.map((drug)=>{
        //             <li key={drug.name}>
        //             <button onClick={()=>handleDrugClick(drug.name)}>{drug.name}</button>
        //             </li>
        //         })}
        //     </ul>
        // )}
        // </div>
    )
}
export default Search;