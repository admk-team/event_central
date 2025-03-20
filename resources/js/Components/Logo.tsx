import { Link } from "@inertiajs/react";
import logoSm from "../../images/logo-sm.png";
import logoDark from "../../images/logo.png";
import logoLight from "../../images/logo-white.png";

export default function Logo() {
    return (
        <>
            <Link href="/" className={`logo logo-dark`}>
                <span className="logo-sm">
                    <img src={logoSm} alt="" height="22" />
                </span>
                <span className="logo-lg">
                    <img src={logoDark} alt="" height="50" />
                </span>
            </Link>
            <Link href="/" className="logo logo-light">
                <span className="logo-sm">
                    <img src={logoSm} alt="" height="22" />
                </span>
                <span className="logo-lg">
                    <img src={logoLight} alt="" height="17" />
                </span>
            </Link>
        </>
    )
}
