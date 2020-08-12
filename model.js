export class Todo {

    isTodoInputValid (todoItemText) {
        const todoItemTextVal = todoItemText.value
        if (todoItemTextVal.trim().length <= 0) {
            todoItemText.classList.add('invalid')
            return false
        } else {
            todoItemText.classList.remove('invalid')
            return true
        }
    }

    isFormModalValid (todoItemText, dateCreate, dateEnd) {
        const [todoItemTextVal, dateCreateVal, dateEndVal] = [todoItemText.value, dateCreate.value, dateEnd.value]
        const timeForTodo = new Date(dateEndVal) - new Date(dateCreateVal);

        let isError = false
        if (!dateCreateVal) {
            dateCreate.classList.add('invalid')
            isError = true
        } else {
            dateCreate.classList.remove('invalid')
        }

        if (!dateEndVal) {
            dateEnd.classList.add('invalid')
            isError = true
        } else {
            dateEnd.classList.remove('invalid')
        }

        if (!isError) {
            if (!timeForTodo || timeForTodo <= 0) {
                dateEnd.classList.add('invalid')
                dateCreate.classList.add('invalid')
                isError = true
            } else {
                dateCreate.classList.remove('invalid')
                dateEnd.classList.remove('invalid')
            }
        }

        if (todoItemTextVal.trim().length <= 0) {
            todoItemText.classList.add('invalid')
            isError = true
        } else {
            todoItemText.classList.remove('invalid')
        }

        return isError ? false : true
    }

    todoToHTML (todoItemText, dateCreate, dateEnd) {
        const todoListBlock = document.querySelector('.todo-list')
        const li = document.createElement('li')
        li.innerHTML = `
            <span class="todo-text">${todoItemText}</span>
            <div class="data-holder">
                <span>Start: ${dateCreate}</span>
                <span>Finish: ${dateEnd}</span>
            </div>
        `
        todoListBlock.appendChild(li)
    }

    getDateObject () {
        const dateNow = new Date()
        const dateCreate = dateNow.toLocaleDateString()
        const dateClone = new Date(dateNow)
        const dateEnd = new Date(dateClone.setDate(dateNow.getDate() + 1)).toLocaleDateString()
        return {dateCreate, dateEnd}
    }

    addTodoItem (todoItemText) {
        const todoItemTextVal = todoItemText.value
        if (this.isTodoInputValid (todoItemText)) {
            const {dateCreate, dateEnd} = this.getDateObject()
            this.todoToHTML(todoItemTextVal, dateCreate, dateEnd)
        }
    }

    isAddTodoWithOptions (todoItemText, dateCreate, dateEnd) {
        let [todoItemTextVal, dateCreateVal, dateEndVal] = [todoItemText.value, dateCreate.value, dateEnd.value]
        dateCreateVal = dateCreateVal.split("-").reverse().join(".")
        dateEndVal = dateEndVal.split("-").reverse().join(".")
        if (this.isFormModalValid (todoItemText, dateCreate, dateEnd)) {
            this.todoToHTML(todoItemTextVal, dateCreateVal, dateEndVal)
            todoItemText.value = ''
            dateCreate.value = ''
            dateEnd.value = ''
            return true
        } else {
            return false
        }

    }
}