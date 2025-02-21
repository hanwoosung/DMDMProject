import {useLocation} from "react-router-dom";
import {useEffect} from "react";

const usePageLeave = (handleNavigation) => {
    const location = useLocation()

    useEffect(() => {
        // 새로고침 감지용 변수
        const navigationEntries = performance.getEntriesByType("navigation")
        const isReload = performance.getEntriesByType("navigation")[0]?.type === "reload"
        console.log(navigationEntries)
        const onBeforeUnload = () => {
            if (isReload) {
                console.log("새로고침 작동")
                return
            }
            handleNavigation()
        }

        window.addEventListener("beforeunload", onBeforeUnload)

        return () => {
            window.removeEventListener("beforeunload", onBeforeUnload)
        }
    }, [])

    useEffect(() => {
        return () => {
            console.log("주소 변경 감지", location.pathname)
            // React Router로 인해 페이지가 변경될 때 실행
            handleNavigation()
        }
    }, [location])
}

export default usePageLeave
