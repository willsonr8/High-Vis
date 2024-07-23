function NavBar() {
    return (
            <nav className={"global-navbar"}>
                <div className={"home-header"}>
                    <div className={"header-left"}>
                        <a className={"title-text text-xl font-bold navbar-item"}>{"High-Vis"}</a>
                        <a className={"text-xl font-bold navbar-item"}>Line Item 1</a>
                        <a className={"text-xl font-bold navbar-item"}>About Us</a>
                    </div>
                    <div className={"header-right"}>
                        <h2 className={"title-text text-xl text-white font-bold"}>{"Buttons"}</h2>
                    </div>
                </div>
            </nav>
    )
}

export default NavBar