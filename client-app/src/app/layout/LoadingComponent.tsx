import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";

const LoadingComponent: React.FC<{inverted?: boolean, content?: string}> = ({
    inverted = true,
    content
}) => {
  return (
    <Dimmer active inverted={inverted}>
      <Loader content={content}/>
    </Dimmer>
  );
};

export default LoadingComponent;

// content will be used to add a text to let the user know
// what is the loader is for 
// ? after the elements show that it is optional 