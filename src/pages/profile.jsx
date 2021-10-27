import {url} from '../app';
import React, {useState, useEffect} from 'react';


function Profile(){
    const [userInfo, setUserInfo] = useState({})
    useEffect( () => {
        const id = localStorage.getItem("id")
    
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
    }, [])



    var ReactS3Uploader = require('react-s3-uploader');

    var headers;
    var query_params;
    return(
        <div>
            <img src={userInfo?.user?.icon_url}
                alt={userInfo?.user?.icon_url} width="193" height="130" />
            <pre>{JSON.stringify(userInfo, null, 2)} </pre>
            
        <ReactS3Uploader
            signingUrl="/s3/sign"
            signingUrlMethod="GET"
            accept="image/*"
            s3path="/uploads/"
            // preprocess={this.onUploadStart}
            // onSignedUrl={this.onSignedUrl}
            // onProgress={this.onUploadProgress}
            // onError={this.onUploadError}
            // onFinish={this.onUploadFinish}
            // signingUrlHeaders={{ additional: headers }}
            // signingUrlQueryParams={{ additional: query_params }}
            signingUrlWithCredentials={ false }      // in case when need to pass authentication credentials via CORS
            uploadRequestHeaders={{ 'x-amz-acl': 'public-read' }}  // this is the default
            contentDisposition="auto"
            scrubFilename={(filename) => filename.replace(/[^\w\d_\-.]+/ig, '')}
            server={url}
            // inputRef={cmp => this.uploadInput = cmp}
            autoUpload={true}
            />
        </div>
    )
}

export default Profile;

