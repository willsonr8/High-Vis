import {Image} from "@nextui-org/react";
import React from "react";
import Link from "next/link";
import {faXTwitter, faInstagram, faGithub} from '@fortawesome/free-brands-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {transformWithEsbuild} from "vite";
function NavBar() {
    return (
            <nav className={"global-navbar"}>
                <div className={"home-header"}>
                    <div className={"title-header"}>
                        <p className={"title-text"}>{"BEACON"}</p>
                    </div>
                    <ul className={"navbar-tabs"}>
                        <li className={"navbar-item active"}><a href={"/"}>Player Search</a></li>
                        <li className={"navbar-item"}><a href={"#"}>About Us</a></li>
                    </ul>
                    <ul className={"social-icons"}>
                        <li className={"icon"}>
                            <Link href="https://github.com/willsonr8/High-Vis/" target="_blank">
                                <FontAwesomeIcon icon={faGithub} size="2x" />
                            </Link>
                        </li>
                        <li>
                            <Link href="https://x.com" target="_blank">
                                <FontAwesomeIcon icon={faXTwitter} size="2x" />
                            </Link>
                        </li>
                        <li>
                            <Link href="https://instagram.com" target="_blank">
                                <FontAwesomeIcon icon={faInstagram} size="2x" />
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
    )
}

export default NavBar