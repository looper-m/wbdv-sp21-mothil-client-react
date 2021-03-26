import {useState} from "react";

const ImageWidget = (
    {
        editing,
        widget,
        editType,
        setWidget
    }) => {
    const [imageSrc, setImageSrc] = useState(widget.src)
    const [imageWidth, setImageWidth] = useState(widget.width)
    const [imageHeight, setImageHeight] = useState(widget.height)

    const handleImageSrcChange = (e) => {
        setImageSrc(e.target.value)
        setWidget({...widget, type: editType, width: imageWidth, height: imageHeight, src: e.target.value})
    }

    const handleImageWidthChange = (e) => {
        setImageWidth(e.target.value)
        setWidget({...widget, type: editType, width: e.target.value, height: imageHeight, src: imageSrc})
    }

    const handleImageHeightChange = (e) => {
        setImageHeight(e.target.value)
        setWidget({...widget, type: editType, width: imageWidth, height: e.target.value, src: imageSrc})
    }

    return (
        <>
            {
                editing ?
                    editType === "IMAGE" &&
                    <>
                        <label>
                            <strong>Image source</strong>
                        </label>
                        <input type="text"
                               defaultValue={widget.src}
                               onChange={handleImageSrcChange}
                               className="form-control mb-3"/>
                        <label>
                            <strong>Width</strong>
                        </label>
                        <input type="number"
                               defaultValue={widget.width}
                               onChange={handleImageWidthChange}
                               className="form-control mb-3"/>
                        <label>
                            <strong>Height</strong>
                        </label>
                        <input type="number"
                               defaultValue={widget.height}
                               onChange={handleImageHeightChange}
                               className="form-control"/>
                    </>
                    :
                    widget.type === "IMAGE" &&
                    <img width={widget.width}
                         height={widget.height}
                         src={widget.src}
                         alt="No-image-set"/>
            }
        </>
    )
}

export default ImageWidget