
function LoadScr(props){
    return(
        <div className="loading" style={{display: props.vis}}>
            <h1 style={{marginTop: "50vh"}}>Please wait ...</h1>
        </div>
    );
}

export default LoadScr