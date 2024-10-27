export default function unauthorized() {
    return (
        <>
            <div className="h-screen flex items-center justify-center bg-white dark:bg-darkgray">
                <div className="text-center flex items-center">
                    <h1 className="text-ld text-4xl">403</h1>
                    <h2 className="font-bold mx-2 text-2xl">|</h2>
                    <h6 className="text-xl text-ld">
                        Unauthorized.
                    </h6>
                </div>
            </div>
        </>
    );
}