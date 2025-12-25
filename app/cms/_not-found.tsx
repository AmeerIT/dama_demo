export default function CMSNotFoundPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex-1 flex flex-col items-center justify-center p-6">
                <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
                <p className="text-lg text-gray-600">
                    The page you are looking for does not exist.
                </p>
            </div>
        </div>
    );
}
