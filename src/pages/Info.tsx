import Navbar from "../components/Navbar.tsx";

const Info = () => {
    return(
        <div>
            <Navbar/>
            <div className="py-4 divider divider-start text-3xl underline underline-offset-1">Disclaimer</div>
            <div className="w-4/5 text-xl">
                This is an unofficial, community-created application and is not affiliated with or endorsed by
                iRacing.com Motorsport Simulations, LLC. While we strive for accuracy, we cannot guarantee the
                completeness or correctness of the data. Prices and content availability may change without notice.
            </div>
        </div>
    )
}

export default Info;