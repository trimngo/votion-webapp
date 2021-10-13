import {url} from '../app';
import React, {useState, useEffect} from 'react';

function Proposals(props) {

    //get proposals
    const [proposals, setProposals] = useState(null)
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
            setProposals(data)
            console.log(data)
            return JSON.stringify(data)
        })
    }, [])

    return(
        <div>{proposals.proposals}</div>
    )
}

export default Proposals;