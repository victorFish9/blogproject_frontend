import { useState, forwardRef, useImperativeHandle } from "react"


const Togglable = forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisibile = { display: visible ? 'none' : '' }
    const showWhenVisibile = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(ref, () => {
        return {
            toggleVisibility
        }
    })

    return (
        <div>
            <div style={hideWhenVisibile}>
                <button onClick={toggleVisibility}>
                    {props.buttonlabel}
                </button>
            </div>
            <div style={showWhenVisibile}>
                {props.children}
                <button onClick={toggleVisibility}>Cancel</button>
            </div>
        </div>
    )
})

export default Togglable