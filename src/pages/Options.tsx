import Navbar from "../components/Navbar.tsx";
import ResetStore from "../components/Options/ResetStore.tsx";
import UpdateData from "../components/Options/UpdateData.tsx";

const Options = () => {
    return(
        <div>
            <Navbar />
            <ResetStore />
            <UpdateData />
        </div>
    )
}

export default Options;