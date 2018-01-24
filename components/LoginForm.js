import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import t from 'tcomb-form-native'; // 0.6.9
import crypto from 'react-native-crypto';
import OAuth from 'oauth-1.0a';
//import '../shim.js';

const Form = t.form.Form;

const User = t.struct({
  username: t.String,
  password: t.String,
});

export default class LoginForm extends React.Component {

    handleSubmit = () => {
        const value = this._form.getValue(); // use that ref to get the form value
        let username = value["username"];
        //let password = value["password"];
        //const url = 'http://auth-test-site.azurewebsites.net/wp-json/wp/v2/posts/1?title=title%20xxx9';
        const url = 'http://auth-test-site.azurewebsites.net/oauth1/request';
        const auth = 'Basic ' + new Buffer(username + ':' + password).toString('base64');
        const oauth_consumer_key = "ieQCM48wXWuW";
        const oauth_signature_method =  "HMAC-SHA1";
        const oauth_timestamp = "1516762327"
        const oauth_nonce = "ocGXzGIsQF6";
        const oauth_signature = "M78YCC0twlDClb1mrQVO0b%2BwrgM%3D"
        console.log("hii");
        console.log(url);
        fetch(url, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/x-www-form-urlencoded",
                //"Authorization": auth,
                "Authorization": "OAuth oauth_consumer_key=\\\"ieQCM48wXWuW\\\",oauth_signature_method=\\\"HMAC-SHA1\\\",oauth_timestamp=\\\"1516762327\\\",oauth_nonce=\\\"ocGXzGIsQF6\\\",oauth_version=\\\"1.0\\\",oauth_signature=\\\"M78YCC0twlDClb1mrQVO0b%2BwrgM%3D\\\"",
                //"Cache-Control": "no-cache",
                //"Postman-Token": "4a77afe7-f9e9-c5bb-46f5-719ce89ced2e"
            },
            credentials: "same-origin"
        }).then(function(response) {
            console.log("hi");
            //response.status     //=> number 100–599
            //response.statusText //=> String
            //response.headers    //=> Headers
            //response.url        //=> String
            //if(response.status < 400) this.setState({success: 1});
            console.log(response.text());
            return response.text();
        }, function(error) {
            console.error(error.message) //=> String
        });
    }

    componentDidMount() {
        const url = 'http://auth-test-site.azurewebsites.net/oauth1/request';
        const oauth = OAuth({
            consumer: {
                key: "ieQCM48wXWuW",
                secret: "9Yf0HG8RWrk0a4IKxwnkK2LUvd15NNF0b98jZwpOmQhoO7vv"
            },
            signature_method: 'HMAC-SHA1',
            hash_function: function(base_string, key) {
                return crypto.createHmac('sha1', key).update(base_string).digest('base64');
            }
        });
    }

    render() {
        return (
            <View>
                <Form 
                    ref={c => this._form = c} // assign a ref
                    type={User}
                />
                <Button 
                    title = 'Submit'
                    onPress = {this.handleSubmit}
                />
            </View>
        );
    }
}