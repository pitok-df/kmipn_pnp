export default function Loading() {
    return (
        <div className="grid grid-cols-12 gap-6">
            {[...Array(4)].map((_, index) => (
                <div key={index} className="lg:col-span-3 col-span-12">
                    <div className="border border-l-4 border-l-warning p-4 shadow-sm rounded-sm animate-pulse bg-gray-200">
                        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                    </div>
                </div>
            ))}
            <div className="col-span-12">
                <div className="border border-l-4 border-l-warning p-4 shadow-sm rounded-sm animate-pulse bg-gray-200">
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-4 h-4 bg-gray-300 rounded mb-2"></div>
                        <div className="col-span-3 h-4 bg-gray-300 rounded mb-2"></div>
                        <div className="col-span-2 h-4 bg-gray-300 rounded mb-2"></div>
                    </div>
                    <div className="h-4 bg-gray-300 rounded w-full"></div>
                </div>
            </div>
        </div>
    )
}
