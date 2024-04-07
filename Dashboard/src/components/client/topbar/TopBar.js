import React from 'react'

const TopBar = () => {
    return (
        <section class="fp__topbar">
            <div class="container">
                <div class="row">
                    <div class="col-xl-6 col-md-8">
                        <ul class="fp__topbar_info d-flex flex-wrap">
                            <li><a href="mailto:example@gmail.com"><i class="fas fa-envelope"></i> Norsindark@gmail.com</a>
                            </li>
                            <li><a href="callto:123456789"><i class="fas fa-phone-alt"></i> +84376985***</a></li>
                        </ul>
                    </div>
                    <div class="col-xl-6 col-md-4 d-none d-md-block">
                        <ul class="topbar_icon d-flex flex-wrap">
                            <li><a href="https://facebook.com/norsindark"><i class="fab fa-facebook-f"></i></a> </li>
                            <li><a href="https://github.com/norsindark"><i class="fab fa-github"></i></a> </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default TopBar