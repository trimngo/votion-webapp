import {url} from '../app';
import React, {useState, useEffect} from 'react';


function RenderProposals(props) {
    const proposals = props.p;
    // const out = proposals.map((i) =>
    //         <div key={i.id.toString()}>
    //             Title: {i.title !== null? i.title.toString():"null"}
    //         </div>
    //     );
    return (
        <div>        
            <pre>{JSON.stringify(proposals, null, 2)}</pre>
        </div>
    );
  }

function Proposals(props) {
    let temp
    //get proposals
    const [proposals, setProposals] = useState([])
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
            setProposals(data.proposals)
            console.log(data)
        })
    }, [])

    const [singleProposal, setSingleProposal] = useState([])
    useEffect( () => {
        const token = localStorage.getItem("token")
        return fetch(url + 'proposals/262' , {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        .then(resp => resp.json())
        .then(data => {
            setSingleProposal(data.proposal)
            console.log(data)
        })
    }, [])

    const [votes, setVotes] = useState([])
    useEffect( () => {
        const token = localStorage.getItem("token")
        return fetch(url + 'proposals/262/votes' , {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        .then(resp => resp.json())
        .then(data => {
            setVotes(data.votes)
            console.log(data)
        })
    }, [])

    return(
        
        <div>
            <h1>One Proposal</h1>
            <pre>{JSON.stringify(singleProposal, null, 2)}</pre>
            <hr></hr>
            <h1>Votes</h1>
            <pre>{JSON.stringify(votes, null, 2)}</pre>
            <hr></hr>

            <h1>All Proposals</h1>
            <RenderProposals p={proposals} />
        </div>
    )
}

export default Proposals;