import Search from "@/components/Search"
import Link from "next/link"

const HomePage = () => {
    return (
        <div>
            <div className={"home-container"}>
                <p className={"text-white center"}>
                    Hello World! This is High-Vis, a novel, data-centered fantasy football analytics platform.
                </p>
            </div>
            <div className="mt-4 mb-4 flex items-center justify-between gap-2 md:mt-8 md:mb-8">
                <Search/>
            </div>
        </div>
    )
}

export default HomePage