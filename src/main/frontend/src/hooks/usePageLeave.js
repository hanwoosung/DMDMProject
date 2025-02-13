import {useLocation} from "react-router-dom";
import {useEffect} from "react";

const usePageLeave = (handleNavigation) => {
    const location = useLocation();

    useEffect(() => {
        window.addEventListener("beforeunload", handleNavigation);

        return () => {
            handleNavigation();
            window.removeEventListener("beforeunload", handleNavigation);
        };
    }, [location])
}

export default usePageLeave