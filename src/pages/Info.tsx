import Navbar from "../components/Navbar.tsx";

const Info = () => {
    return(
        <div className="min-h-screen">
            <Navbar/>
            <div className="py-4 divider divider-start text-3xl underline underline-offset-1">Disclaimer</div>
            <div className="w-4/5 text-xl py-3">
                This is an unofficial, community-created application and is not affiliated with or endorsed by
                iRacing.com Motorsport Simulations, LLC. While we strive for accuracy, we cannot guarantee the
                completeness or correctness of the data. Prices and content availability may change without notice.
            </div>

            <div className="w-4/5 text-xl py-3">
                <div className="py-4 divider divider-start text-3xl underline underline-offset-1">Overview</div>
                This application provides up-to-date pricing information for iRacing content as of Season 1, 2025. It includes all cars and tracks, including their variants, along with accurate pricing that factors in bulk and loyalty discounts. The app works completely offline, allowing you to plan your purchases anywhere.
            </div>
            <footer className="footer sm:footer-horizontal footer-center bg-base-200 text-base-content p-4">
                <aside>
                    <p>Copyright © {new Date().getFullYear()} - All right reserved by Connor Molz</p>
                </aside>
            </footer>
        </div>
    )
}

export default Info;