import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-transparent text-center py-3">
            <div className="px-4 text-sm container mx-auto">
                <p>
                    Made with <span className="text-primary">❤️</span> by {" "}
                    <span className="relative">
                        <Link href="https://github.com/clarkpy">Cigan</Link>
                    </span>
                </p>
            </div>
        </footer>
    )
}