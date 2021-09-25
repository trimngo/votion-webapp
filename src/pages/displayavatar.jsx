import {url} from '../app';

function DisplayAvatar(){
    var imageUrl = 'https://votionapi.s3.us-west-1.amazonaws.com/user_uploads/IMG_0289.jpeg';

    return(
        <img src={imageUrl} alt="" />
    )
}

export default DisplayAvatar;

