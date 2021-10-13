import {url} from '../app';
import React, {useState, useEffect} from 'react';

function Proposals(props) {
    let temp
    //get proposals
    const [proposals, setProposals] = useState("")
    useEffect( () => {
        const token = localStorage.getItem("token")
        return fetch(url + 'proposals' , {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        .then(resp => resp.json())
        .then(data => {
            setProposals(JSON.stringify(data.proposals))
            console.log(data)
        })
    }, [])
    return(
        <div>{proposals}</div>
    )
}

export default Proposals;