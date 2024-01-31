import { useSelector } from "react-redux"
import '../index.css'

const Notification = () => {
    const { goodnotification, error } = useSelector((state) => state.notification)

    if (goodnotification) {
        return (
            <div className='good'>
                {goodnotification}
            </div>
        )
    }
    if (error) {
        return (
            <div className='error'>
                {error}
            </div>
        )
    }
}


export default Notification