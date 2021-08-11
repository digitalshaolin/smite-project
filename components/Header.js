import Link from 'next/link'

export default function Header() {
    return (
        <header>
            <div className="container">
                <div className="logo-wrapper">
                    <Link href="/">
                        <a>SmiteNexus</a>
                    </Link>
                </div>
                <div className="navbar">
                    <div className="navlink">
                        <span className="link-wrapper">
                            <Link href="/">
                                <a className="main-link">Home</a>
                            </Link>
                        </span>
                    </div>
                    <div className="navlink">
                        <span className="link-wrapper">
                            <Link href="/builds">
                                <a className="main-link">Builds</a>
                            </Link>
                        </span>
                    </div>
                </div>               
            </div>
        </header>
    )
}