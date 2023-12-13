import { useState } from 'react'


const AddTask = ({ onAddTask }) => {

    const [text, setText] = useState('')
    const [day, setDay] = useState('')
    const [reminder, setReminder] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault()
        if (!text) {
            alert('please add text')
            return
        }
        onAddTask({text, day, reminder})
        setText('')
        setDay('')
        setReminder(false)
    }

    return (
        <form className='add-form' onSubmit={onSubmit}>
            <div className='form-control'>
                <label>Task</label>
                <input type='text' placeholder='Add Task' value={text} onChange={(e) => setText(e.target.value)}></input>
            </div>
            <div className='form-control'>
                <label>Day & time</label>
                <input type='text' placeholder='Add day and time' value={day} onChange={(e) => setDay(e.target.value)} ></input>
            </div>
            <div className='form-control form-control-check'>
                <label>set reminder</label>
                <input type='checkbox' 
                value={reminder} 
                onChange={(e) => setReminder(e.currentTarget.checked)} 
                checked={reminder ? 'checked' : ''} ></input>
            </div>
            <input type="submit" value='Save Task' className='btn btn-block' />
        </form>
    )
}

export default AddTask