
function HomePage() {
    return (
        <div className={"all-container"}>
            <header className={"title-container"}>
                <div className={"home-header bg-black"}>
                    <div className={"header-left"}>
                        <h2 className={"title-text text-xl text-white font-bold"}>{"High-Vis"}</h2>
                    </div>
                    <div className={"header-right"}>
                        <h2 className={"title-text text-xl text-white font-bold"}>{"Buttons"}</h2>
                    </div>
                </div>
                <div className={"navbar bg-black"}>
                    <div className={"navbar-items"}>
                        <a className={"navbar-text text-white"}>{"Line Item 1"}</a>
                        <a className={"navbar-text text-white"}>{"Line Item 2"}</a>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default HomePage