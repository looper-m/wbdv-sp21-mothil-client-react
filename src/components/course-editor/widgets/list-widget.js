import {useState} from "react";

const ListWidget = (
    {
        editing,
        widget,
        editType,
        setWidget
    }) => {
    const [listType, setListType] = useState(widget.ordered)
    const [listText, setListText] = useState(widget.text)

    const handleListTypeChange = (e) => {
        setListType(e.target.checked)
        setWidget({...widget, type: editType, text: listText, ordered: e.target.checked})
    }

    const handleListChange = (e) => {
        setListText(e.target.value)
        setWidget({...widget, type: editType, text: e.target.value, ordered: listType})
    }

    return (
        <>
            {
                editing ?
                    editType === "LIST" &&
                    <>
                        <input defaultChecked={widget.ordered}
                               type="checkbox"
                               onChange={handleListTypeChange}/>
                        <label>
                            <strong>&nbsp;&nbsp;Ordered</strong>
                        </label>
                        <br/>
                        <textarea defaultValue={widget.text}
                                  rows={7}
                                  onChange={handleListChange}
                                  className="form-control"/>
                    </>
                    :
                    widget.type === "LIST" && (
                        widget.ordered ?
                            <ol>
                                {
                                    widget.text.split("\n").map((item, index) =>
                                        <li key={index}>
                                            {item}
                                        </li>
                                    )
                                }
                            </ol>
                            :
                            <ul>
                                {
                                    widget.text.split("\n").map((item, index) =>
                                        <li key={index}>
                                            {item}
                                        </li>
                                    )
                                }
                            </ul>
                    )
            }
        </>
    )
}

export default ListWidget