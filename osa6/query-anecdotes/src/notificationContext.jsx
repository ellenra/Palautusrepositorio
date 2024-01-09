import { createContext, useReducer, useContext, useEffect } from "react"

const nofiticationReducer = (state, action) => {
    switch (action.type) {
        case "SHOW":
            return action.payload
        case "HIDE":
            return null
        default:
            return state
    }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(nofiticationReducer, null)

    useEffect(() => {
        if (notification) {
          const time = setTimeout(() => {
            notificationDispatch({ type: 'HIDE' })
          }, 5000)
    
          return () => clearTimeout(time)
        }
      }, [notification])

    return (
        <NotificationContext.Provider value={[notification, notificationDispatch]}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export const useNotificationState = () => {
    const text = useContext(NotificationContext)
    return text[0]
}

export const useNotificationDispatch = () => {
    const text = useContext(NotificationContext)
    return text[1]
}

export default NotificationContext