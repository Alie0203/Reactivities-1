import { useEffect } from "react";
import { withRouter } from "react-router-dom";

const ScrollToTop = ({ children, location: { pathname } }:any) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return children;
};

export default withRouter(ScrollToTop);
  


//when navigate to a new page, the view will be the to top of the page 
//If user navigates from one page and back to the previous page, the page will be open and the view will
//be where the user left previously. when the application is wrapped by this file, whenever a new page is open
//it will take the user to the top of the page. 