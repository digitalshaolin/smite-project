import Link from 'next/link'

export default function Footer() {
    return (
        <footer>
            <div className="container">
                <Link href="/">
                    <a>SmiteNexus</a>
                </Link>
                <p>© 2021 Copyright Smite Nexus. All rights reserved.</p>
            </div>
        </footer>
    )
}