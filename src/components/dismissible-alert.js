export const alertType = {
    WARNING: "alert-warning",
    ERROR: "alert-danger",
    SUCCESS: "alert-success",
    INFO: "alert-info"
}

const DismissibleAlert = (props) => {
    const alertClass = "alert " + (props.type)
    return (
        <div className={alertClass}>
            <button className="close" onClick={props.dismiss}>&times;</button>
            {props.message}
        </div>
    )
}

export default DismissibleAlert