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

function ProfileImage(props){
    const width=193
    const height=130
    const [giphyData, setGiphyData] = useState(null)
    
    const getGiphyData = async () => {
        if(props.icon_url && !(props.icon_url?.toLowerCase().startsWith('http'))){
            const gdata = await giphyFetch.gif(props.icon_url);
            setGiphyData(gdata)
            //console.log(JSON.stringify(gdata));
        }

    }
    useEffect( () => {getGiphyData()} )

    return(
        <div>
            {(giphyData)? 
                <Gif gif={giphyData.data} width={300}/>:
                <img src={props.icon_url}
                        alt={props.icon_url} width={width} height={height} />
            }
        </div>
    )
}

function RenderUser(props){
    debugger
    return(
        <div>
            <ProfileImage icon_url={props.userInfo.user.icon_url}/>
            <pre>{JSON.stringify(props.userInfo, null, 2)} </pre>
        </div>
        
    )
}


function Profile(){
    const [dataStale, setDataStale] = useState(true)
    const [usersInfo, setUsersInfo] = useState({users:[]})
    
    const getUsersData = async () => {
        const id = localStorage.getItem("id")
    
        const resp = await fetch(api_url + 'users', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        });
        const data = await resp.json();
        console.log(data);
        setUsersInfo(data);
        setDataStale(false);
    }
        
    useEffect( () => {getUsersData()} , [])

    var ReactS3Uploader = require('react-s3-uploader');

    var headers;
    var query_params;
    // debugger
    const renderUsers = usersInfo?.users.map((userInfo) =>
        <RenderUser userInfo={userInfo} />
    )

    return(
        <div>
            {renderUsers}
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

