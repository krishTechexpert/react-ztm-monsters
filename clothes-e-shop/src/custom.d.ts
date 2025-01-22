declare module "*.svg"{
  import React = require("react");

    // This allows you to use `.svg` as a React component
  export const ReactComponent:React.FC<React.SVGProps<SVGSVGElement>>;
    //import { ReactComponent as Logo } from './logo.svg';
    //<Logo width={100} height={100} />

    // This allows you to use `.svg` as a string (URL)
    //<img src={logoSrc} alt="Logo" />

  const src:string;
  export default src;
}