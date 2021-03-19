const ParagraphWidget = (
    {
        widget,
        editType,
        editing,
        setWidget
    }) => {
    const handleParagraphChange = (e) => {
        setWidget({...widget, type: editType, text: e.target.value})
    }

    return (
        <>
            {
                editing ?
                    editType === "PARAGRAPH" &&
                    <>
                        <textarea defaultValue={widget.text}
                                  onChange={handleParagraphChange}
                                  className="form-control"/>
                    </>
                    :
                    widget.type === "PARAGRAPH" &&
                    <p>
                        {widget.text}
                    </p>
            }
        </>
    )
}

export default ParagraphWidget