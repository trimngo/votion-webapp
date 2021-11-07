import {api_url} from '../app'
import React, {useState, useEffect} from 'react';
import {
    Gif,
  } from "@giphy/react-components";
  import { GiphyFetch } from "@giphy/js-fetch-api";

const apikey = process.env.REACT_APP_GIPHY_API_KEY
const giphyFetch = new GiphyFetch(apikey);

function RenderUser(props){
    const width=193
    const height=130
    var img

    if(props.ui?.user?.icon_gif){
        img = <Gif gif={props.ui?.user?.icon_gif} width={width}/>     
    } 
    else{
        img=<img src={props.ui?.user?.icon_url}
            alt={props.ui?.user?.icon_url} width={width} height={height} />
    }
    
    return(
        <div>
            {img}
            <pre>{JSON.stringify(props.ui, null, 2)} </pre>
        </div>
        
    )
}

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
        if(userData.user.icon_url && !(userData.user.icon_url?.toLowerCase().startsWith('http'))){
            return giphyFetch.gif(userData.user.icon_url)
            .then( gdata => {
                userData.user.icon_gif = gdata.data
                return userData
            })
        }
        else{
            return userData
        }

    })

}

function RenderUserExample(){
    const [userInfo, setUsersInfo] = useState({})
    var userID = 4;
    useEffect( () => {
        getUserData(userID)
        .then( result =>setUsersInfo(result))
    } , [])

    return(
        <div>
            <RenderUser ui={userInfo} />
        </div>
    )
}

export default RenderUserExample;

