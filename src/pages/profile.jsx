import {api_url} from '../app'
import React, {useState, useEffect} from 'react';
import {
    Gif,
  } from "@giphy/react-components";
  import { GiphyFetch } from "@giphy/js-fetch-api";
// import { useAsync } from "react-async-hook";
//import { IGif } from "@giphy/js-types";

const apikey = process.env.REACT_APP_GIPHY_API_KEY
const giphyFetch = new GiphyFetch(apikey);

function RenderUser(props){
    const width=193
    const height=130
    let img
    // if(props.ui) debugger
    if(props.ui?.user.icon_gif){
        img = <Gif gif={props.ui.user.icon_gif} width={300}/>     
    } 
    else{
        img=<img src={props.icon_url}
            alt={props.icon_url} width={width} height={height} />
    }
    
    return(
        <div>
            {img}
            <pre>{JSON.stringify(props.ui, null, 2)} </pre>
        </div>
        
    )
}


function Profile(){
    const [dataStale, setDataStale] = useState(true)
    const [usersInfo, setUsersInfo] = useState([])
    
    const getUserData = (id) => {   
        let userData = {} 
        return fetch(api_url + 'users/' + id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
            userData = data;
            //get giphy data if present
            // if(id==4) debugger
            if(userData.user.icon_url && !(userData.user.icon_url?.toLowerCase().startsWith('http'))){
                // debugger
                return giphyFetch.gif(userData.user.icon_url)
                .then( gdata => {
                    userData.user.icon_gif = gdata.data
                    return userData
                })
            }
            else{
                //not sure if this works because are we going to return immediately if we go into the promise chain above?
                //seems like we are returning either a promise or data here
                return userData
            }

        })

    }
    const getUsersData = () => {
        //Get a list of user IDs
        const id = localStorage.getItem("id")
    
        return fetch(api_url + 'users', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
        .then(resp => resp.json())
    }
        
    useEffect( () => {
        getUsersData()
        .then( usersData =>{
            //just extract the ids
            const userIDs = usersData.users.map( u => u.id )
            
            //have list of user ids, now fill in info for each one
            const totalInfo = userIDs.map( id => getUserData(id))

            Promise.all(totalInfo)
            .then(result => setUsersInfo(result))
        })

    } , [])

    var ReactS3Uploader = require('react-s3-uploader');

    var headers;
    var query_params;

    return(
        <div>
            {usersInfo.map( u => <RenderUser ui={u} /> )}
            <ReactS3Uploader
                signingUrl="/s3/sign"
                signingUrlMethod="GET"
                accept="image/*"
                s3path="/uploads/"
                // preprocess={(file, next) => {}}
                // onSignedUrl={this.onSignedUrl}
                // onProgress={this.onUploadProgress}
                // onError={this.onUploadError}
                onFinish={(signResult: { publicUrl: string; }) => {
                    //need upload to the server by modifying user info
                    const id = localStorage.getItem("id")
                    // user.name = params['user'].key?('name') ? params['user']['name'] : user.name
                    // user.icon_url = params['user'].key?('icon_url') ? params['user']['icon_url'] : user.icon_url
                    return fetch(api_url + 'users/' + id , {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json"
                        },
                        body: JSON.stringify(
                            {"user": {"icon_url":
                                "https://votionapi.s3.us-west-1.amazonaws.com/"+signResult.publicUrl}}
                        )
                    })
                    .then(resp => resp.json())
                    .then(data => {
                        console.log(data)
                        setDataStale(true)
                    })
                }}
                // signingUrlHeaders={{ additional: headers }}
                // signingUrlQueryParams={{ additional: query_params }}
                signingUrlWithCredentials={ false }      // in case when need to pass authentication credentials via CORS
                uploadRequestHeaders={{ 'x-amz-acl': 'public-read' }}  // this is the default
                contentDisposition="auto"
                scrubFilename={(filename: string) => {
                    let newfn=filename.replace(/[^\w\d_\-.]+/ig, '')
                    // debugger
                    // console.log(newfn)
                    return newfn
                }}
                server={api_url}
                // inputRef={cmp => this.uploadInput = cmp}
                autoUpload={true}
            />
        <hr></hr>
        </div>
    )
}

export default Profile;

