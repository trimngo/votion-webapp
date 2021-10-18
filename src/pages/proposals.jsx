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
    return(
        <div>
            <RenderProposals p={proposals} />
        </div>
    )
}

export default Proposals;