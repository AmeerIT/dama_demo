export default function CastHero() {
    return (
        <>
            <div className="flex flex-col w-full h-screen text-start space-y-10">
                <div className="m-h-2xl overflow-x-auto">
                    <p className="text-2xl ">Latest Releases</p>
                </div>
                <div className="m-h-2xl overflow-x-auto ">
                    <p className="text-2xl ">Featured</p>
                </div>
                <div className="m-h-2xl overflow-x-auto ">
                    <p className="text-2xl ">Coming soon</p>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-linear-to-t from-background to-transparent" />
            <div className="absolute top-0 left-0 right-0 h-20 bg-linear-to-b from-background to-transparent" />
        </>
    )
}
