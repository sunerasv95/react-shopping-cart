import "./button.css";

const Button = ({
    children,
    clicked,
    bgColor
}) => {
    console.log("COLOR", bgColor);
    let btnClasses = [];
    
    switch(bgColor){
        case "black":
            btnClasses.push("btn_black");
        break;

        case "warning":
            btnClasses.push("btn_warning");
        break;

        default:
            btnClasses.push("btn_black");
    }   

    console.log("BTN CLASS", btnClasses);

    return(
        <div className="button__container">
            <button 
                onClick={() => clicked()}
                className={btnClasses.join(" ")}
            >
                {children}
            </button>
        </div>
        
    );
    
}

export default Button;