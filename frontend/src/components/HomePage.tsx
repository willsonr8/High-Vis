import Search from "@/components/Search"

function HomePage() {
    return (
        <div className="w-full">
            <div className="mt-4 mb-4 flex items-center justify-between gap-2 md:mt-8 md:mb-8">
                <Search placeholder="Search invoices..."/>
            </div>
        </div>
    )
}

export default HomePage