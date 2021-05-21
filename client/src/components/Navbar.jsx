
function Navbar() {

    function changeMode(){
        const theme = document.querySelector("#theme-link");
        if (theme.getAttribute("href") === "styles.css") {
            theme.href = "styles_dark.css";
            window.sessionStorage.setItem("mode", "1");
        } else {
            theme.href = "styles.css";
            window.sessionStorage.setItem("mode", "0");
        }
    }

    return ( 
        <div>
            <nav className="navbar navbar-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/"><h4 className="logo">BLOG-IT</h4></a>
                    <div className="d-flex">
                        <button type="button" className="btn btn-outline-primary" onClick={changeMode}>Light/Dark</button>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;