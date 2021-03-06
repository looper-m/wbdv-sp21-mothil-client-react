import {useState} from "react";

const HeadingWidget = (
    {
        editing,
        widget,
        editType,
        setWidget
    }) => {
    const [headingText, setHeadingText] = useState(widget.text)
    const [headingSize, setHeadingSize] = useState(parseInt(widget.size))

    const handleHeadingTextChange = (e) => {
        setHeadingText(e.target.value)
        setWidget({...widget, type: editType, size: headingSize, text: e.target.value})
    }

    const handleHeadingSizeChange = (e) => {
        setHeadingSize(parseInt(e.target.value))
        setWidget({...widget, type: editType, size: parseInt(e.target.value), text: headingText})
    }

    return (
        <>
            {
                editing ?
                    editType === "HEADING" &&
                    <>
                        <input type="text"
                               value={headingText}
                               onChange={handleHeadingTextChange}
                               className="form-control mb-3"/>
                        <select value={headingSize}
                                onChange={handleHeadingSizeChange}
                                className="form-control">
                            <option value={1}>Heading 1</option>
                            <option value={2}>Heading 2</option>
                            <option value={3}>Heading 3</option>
                            <option value={4}>Heading 4</option>
                            <option value={5}>Heading 5</option>
                            <option value={6}>Heading 6</option>
                        </select>
                    </>
                    :
                    widget.type === "HEADING" &&
                    <>
                        {widget.size === 1 && <h1>{widget.text}</h1>}
                        {widget.size === 2 && <h2>{widget.text}</h2>}
                        {widget.size === 3 && <h3>{widget.text}</h3>}
                        {widget.size === 4 && <h4>{widget.text}</h4>}
                        {widget.size === 5 && <h5>{widget.text}</h5>}
                        {widget.size === 6 && <h6>{widget.text}</h6>}
                    </>
            }
        </>
    )
}

export default HeadingWidget