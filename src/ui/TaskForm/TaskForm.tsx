import { Button } from '../buttons/Button';
import './taskform.scss';

export const TaskForm = () => {
    return (
        <form className='taskForm'>
            <label className='field'>
                <span className='field__placeholder'>Название задачи</span>
                <input className='field__input' type="text" />
            </label>
            <Button>
                Добавить
            </Button>
        </form>
    )
}