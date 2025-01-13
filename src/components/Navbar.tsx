import {Link} from "react-router";

const Navbar = () =>{
    return(
        <div className="navbar bg-base-200">
        <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">IRacing Buy Planner</Link>
            </div>
            <div className="flex-none">
                <div className="dropdown dropdown-end dropdown-bottom">
                    <div tabIndex={0} role="button" className="btn btn-ghost rounded-btn">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="inline-block h-5 w-5 stroke-current">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path>
                        </svg>
                        <ul
                            tabIndex={0}
                            className="menu dropdown-content bg-base-100 rounded-box z-[1] mt-4 w-52 p-2 shadow">
                            <li><Link to="/Options">Options</Link></li>
                            <li><Link to="/Info">Info</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
);
}

export default Navbar;