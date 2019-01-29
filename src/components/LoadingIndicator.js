import React, { Component } from 'react';
import Image from 'react-graceful-image';


export default class LoadingIndicator extends React.Component {
    render(){
        const {isLoading} = this.props;
        return(
            isLoading ? <Image src="https://loading.io/spinners/typing/lg.-text-entering-comment-loader.gif" /> : null
        )
    }
}
