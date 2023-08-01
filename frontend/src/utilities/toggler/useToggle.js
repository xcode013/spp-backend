import {useState} from 'react'

export const useToggle = (initialValue = false) => {
    const [toggle, setToggle] = useState(initialValue)
    const setToggleHandler = () => setToggle(prevValue => !prevValue)
    return [toggle, setToggleHandler]
}

export const useShowPass = () => {
    const [showpass, setShowpass] = useToggle(true);
    const [inputType, setInputType] = useState("password");

    const checklistHandler = () => {
        if(showpass) setInputType("text");
        else setInputType("password")
        
        setShowpass();
    }

    return [inputType, checklistHandler]
}
