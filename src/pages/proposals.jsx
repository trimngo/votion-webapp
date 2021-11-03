import {url} from '../app';
import React, {useState, useEffect} from 'react';


function CreateProposal(props){
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [issueId, setIssueId] = useState("")

    const handleTitleChange = (evt) => {
        setTitle(evt.target.value)
    }
    const handleBodyChange = (evt) => {
        setBody(evt.target.value)
    }
    const handleIssueIdChange = (evt) => {
        setIssueId(evt.target.value)
    }
    const handleSubmit = (evt) => {
        debugger
        const token = localStorage.getItem("token")
        evt.preventDefault() //what is this for?
        fetch(url + 'proposals', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                "title": title,
                "body": body,
                "issue_id":issueId  //_ is confusing
            })
        })
        .then(resp => resp.json())
        // .then(data => {
        //     localStorage.setItem("token", data.auth_token)
        //     localStorage.setItem("id", data.id)
        //     props.handleLogin(data.user)
        //     return data;
        // })
        .then(data => {
            console.log(data)

            props.UpdateProposals()
            // .then(resp => resp.json())
            // .then(data => console.log(data))
        })

        // .then( () => {
        //     if(props.location?.state?.from?.pathname !==undefined && props.location.state.from.pathname ) 
        //     props.history.push(props.location.state.from.pathname)
        //     else
        //     props.history.push("/home")
        // })
  
    }
    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Title
                </label>
                <div className="mt-1">
                    <input
                    id="title"
                    name="title"
                    required
                    value={title}
                    onChange={handleTitleChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
            </div>

            <div>
                <label htmlFor="body" className="block text-sm font-medium text-gray-700">
                    Body
                </label>
                <div className="mt-1">
                    <input
                    id="body"
                    name="body"
                    required
                    value={body}
                    onChange={handleBodyChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
            </div>

            <div>
                <label htmlFor="issueid" className="block text-sm font-medium text-gray-700">
                    Issue ID
                </label>
                <div className="mt-1">
                    <input
                    id="issueid"
                    name="issueid"
                    required
                    value={issueId}
                    onChange={handleIssueIdChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
            </div>

            <div>
                <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                Create Proposal
                </button>
            </div>
        </form>
    )

}

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
    const UpdateProposals = () => {
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
    }

    useEffect( () => UpdateProposals(), [])
    


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

    const handleSubmit = (votetype) => {
        const token = localStorage.getItem("token")
        fetch(url + 'proposals/262/votes', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({"vote": {"value":votetype}})
        })
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
            
            fetch(url + 'proposals/262/votes' , {
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

        })

    }

    return(
        
        <div>
            <h1>Create New Proposal</h1>
            <CreateProposal UpdateProposals={UpdateProposals}/>
            <hr></hr>

            <h1>One Proposal</h1>
            <pre>{JSON.stringify(singleProposal, null, 2)}</pre>
            <hr></hr>
            <h1>Votes</h1>
            <pre>{JSON.stringify(votes, null, 2)}</pre>
            <hr></hr>

            <button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => handleSubmit("Yes")}>
                Yes
            </button>
            <button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => handleSubmit("Abstain")}>
                Abstain
            </button>
            <button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => handleSubmit("No")}>
                No
            </button>


            <h1>All Proposals</h1>
            <RenderProposals p={proposals} />
        </div>
    )
}

export default Proposals;