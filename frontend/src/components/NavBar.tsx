function NavBar() {
    return (
            <nav className={"global-navbar"}>
                <div className={"home-header"}>
                    <div className={"header-left"}>
                        <h2 className={"title-text text-xl text-white font-bold"}>{"High-Vis"}</h2>
                        <a className={"navbar-item"}>Line Item 1</a>
                        <a className={"navbar-item"}>About Us</a>
                    </div>
                    <div className={"header-right"}>
                        <h2 className={"title-text text-xl text-white font-bold"}>{"Buttons"}</h2>
                    </div>
                </div>
            </nav>
    )
}

export default NavBar