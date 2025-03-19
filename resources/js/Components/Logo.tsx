import { Link } from "@inertiajs/react";
import logoSm from "../../images/logo-sm.png";
import logoDark from "../../images/logo-dark.png";
import logoLight from "../../images/logo-light.png";

export default function Logo() {
    return (
        <>
            <Link href="/" className={`logo logo-dark`}>
                <span className="logo-sm">
                    <img src={logoSm} alt="" height="22" />
                </span>
                <span className="logo-lg">
                    <img src={logoDark} alt="" height="17" />
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
