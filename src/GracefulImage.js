import React, { Component } from "react";
import Image from "react-graceful-image";

export default class GracefulImage extends Component {
    render() {
      return (
        <Image
          src="path_to_image"
          width="250"
          height="250"
          style={{ padding: "20px" }}
          alt="My awesome image"
          retry={{ count: 10, delay: 2 }}
        />
      );
    }
  }
