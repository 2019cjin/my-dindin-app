import React, {Component} from 'react';
import FacebookLogin from 'react-facebook-login';

//var provider = new firebase.auth.FacebookAuthProvider();

export default class LogInAccount extends Component {
    state = {
        isLoggedIn: false,
        userID: '',
        name: '',
        email: '',
        picture: ''

    }
    
    responseFacebook = response => {
        //console.log(response);
        this.setState({
            isLoggedIn:true,
            userID: response.name,
            email: response.email,
            picture: response.picture.data.url
        });
    }

    componentClicked = () => console.log('clicked');
    
    render() {
        let fbContent;

        if(this.state.isLoggedIn){
            fbContent = null;
            //if they are logged in then navigate to the Home Screen
            //Example
            //fbContent = {
                //<div style = {{
                   // width: 400,
                    //margin: auto,
                    //background: "white",
                   // padding: 20

                //}}>

                    //<img src={this.state.picture} alt={this.state.name} />
                    //<h2>Welcome {this.state.name}</h2>
            
                //</div>
            //}
        } else {
            /*fbContent = (<FacebookLogin
                appId = "394003008066360"
                autoLoad = {true}
                fields = "name,email,picture"
                onClick={this.componentClicked}
                callback={this.responseFacebook}    
                />);*/
                fbContent = null;
                //call the next page
        }


        return (
            <div>
                {fbContent}
            </div>
        )
    }
}