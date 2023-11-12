import Link from "next/link";

export default function Home() {
    return (
        <div className="w-screen h-screen bg-black flex justify-center items-center text-white">
            <div className="w-full max-w-[600px]">
                <h1 className="text-6xl mb-4">My Super Amazing Journal App</h1>
                <p className="text-white/60 text-2xl mb-4">
                    App for tracking mood with every journal entry.
                </p>
                <div>
                    <Link href="/journal">
                        <button className="bg-blue-600 px-4 py-2 capitalize rounded-lg text-lg">
                            get started
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
