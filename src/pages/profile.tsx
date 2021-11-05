import {url} from '../app'
import React, {useState, useEffect} from 'react';
import {
    Gif,
  } from "@giphy/react-components";
  import { GiphyFetch } from "@giphy/js-fetch-api";
import { useAsync } from "react-async-hook";
import { IGif } from "@giphy/js-types";

const apikey = "sXpGFDGZs0Dv1mmNFvYaGUvYwKX0PWIh"
const giphyFetch = new GiphyFetch(apikey);


function GifDemo() {
    const [gif, setGif] = useState<IGif | null>(null);
    useAsync(async () => {
        const { data } = await giphyFetch.gif("fpXxIjftmkk9y");
        setGif(data);
    }, []);

    return gif && <Gif gif={gif} width={200} />;
}


function Profile(){
    const [userInfo, setUserInfo] = useState({user:{icon_url:""}})
    const getUserData = async () => {
        const id = localStorage.getItem("id")
    
        const resp = await fetch(url + 'users/' + id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        });
        const data = await resp.json();
        console.log(data);
        setUserInfo(data);
    }
    
    useEffect( () => {getUserData()} , [])


    var ReactS3Uploader = require('react-s3-uploader');

    var headers;
    var query_params;
    return(
        <div>
            <GifDemo />
            <img src={userInfo?.user?.icon_url}
                alt={userInfo?.user?.icon_url} width="193" height="130" />
            <pre>{JSON.stringify(userInfo, null, 2)} </pre>
            
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
                return fetch(url + 'users/' + id , {
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
                    setUserInfo(data)
                })
                .then( data => {
                    return fetch(url + 'users/' + id , {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json"
                        }
                    })
                    .then(resp => resp.json())
                    .then(data => {
                        console.log(data)
                        setUserInfo(data)
                    })
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
            server={url}
            // inputRef={cmp => this.uploadInput = cmp}
            autoUpload={true}
            />
        </div>
    )
}

export default Profile;

