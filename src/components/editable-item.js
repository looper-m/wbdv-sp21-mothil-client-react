import {useState, useEffect, useRef} from "react";

const EditableItem = (
    {
        item,
        updateItem,
        deleteItem
    }) => {
    const [cachedItem, setCachedItem] = useState(item)
    const [isEditable, setIsEditable] = useState(false)
    const editableRef = useRef(null)

    useEffect(() => {
        document.addEventListener("mousedown", handleClick, false)
        return () => {
            document.removeEventListener("mousedown", handleClick, false)
        }
    })

    const handleClick = (e) => {
        if (editableRef.current.contains(e.target)) return
        setIsEditable(false)
    }

    const handleChangeEditField = (e) => {
        setCachedItem({...cachedItem, title: e.target.value})
    }

    const handleEditField = (e) => {
        e.preventDefault()
        e.stopPropagation()
    }

    const handleUpdate = (e) => {
        e.preventDefault()
        e.stopPropagation()
        updateItem(cachedItem)
        setIsEditable(false)
    }

    const handleDelete = (e) => {
        e.preventDefault()
        e.stopPropagation()
        deleteItem(cachedItem)
        setIsEditable(false)
    }

    const handleSetEdit = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setIsEditable(true)
    }

    return (
        <span className="d-flex justify-content-between"
              ref={editableRef}>
            {
                isEditable ?
                    <>
                        <input type="text"
                               className="form-control wbdv-editable-sm"
                               onChange={handleChangeEditField}
                               value={cachedItem.title}
                               onClick={handleEditField}/>
                        <i className="fas fa-check-circle d-block my-auto mx-3"
                           onClick={handleUpdate}/>
                        <i className="fas fa-times-circle d-block my-auto pl-1"
                           onClick={handleDelete}/>
                    </>
                    :
                    <>
                        <span className="wbdv-text-truncate w-100 h-100 mr-5">{item.title}</span>
                        <i className="fas fa-pencil-alt d-block my-auto"
                           onClick={handleSetEdit}/>
                    </>
            }
        </span>
    )
}

export default EditableItem