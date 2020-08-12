export class Todo {

    isDataEmpty (dateInput) {
        if (!dateInput.value) {
            dateInput.classList.add('invalid')
            return  true
        } else {
            dateInput.classList.remove('invalid')
            return false
        }
    }

    isDataPeriodInvalid (startDateInput, endDateInput) {
        const timeForTodo = new Date(endDateInput.value) - new Date(startDateInput.value)

        if (!timeForTodo || timeForTodo <= 0) {
            startDateInput.classList.add('invalid')
            endDateInput.classList.add('invalid')
            return true
        } else {
            startDateInput.classList.remove('invalid')
            endDateInput.classList.remove('invalid')
            return false
        }
    }

    isTodoInputEmpty (todoInput) {
        if (todoInput.value.trim().length <= 0) {
            todoInput.classList.add('invalid')
            return true
        } else {
            todoInput.classList.remove('invalid')
        }
    }

    isFormModalValid(todoInput, startDateInput, endDateInput) {
        const errorArray = []

        errorArray.push(this.isDataEmpty(startDateInput))
        errorArray.push(this.isDataEmpty(endDateInput))
        if (!errorArray.includes(true)) {
            errorArray.push(this.isDataPeriodInvalid(startDateInput, endDateInput))
        }
        errorArray.push(this.isTodoInputEmpty(todoInput))
        return errorArray.includes(true) ? false : true
    }

    todoToHTML(todoItemText, dateCreate, dateEnd) {
        const todoListBlock = document.querySelector('.todo-list')
        const li = document.createElement('li')

        li.innerHTML = `
            <input type="checkbox">
            <div>
                <span class="todo-text">${todoItemText}</span>
                <div class="data-holder">
                    <span>Start: ${dateCreate}</span>
                    <span>Finish: ${dateEnd}</span>
                </div>
            </div>
        `
        todoListBlock.appendChild(li)
    }

    getDateObject() {
        const dateCreate = new Date().toLocaleDateString()
        const dateEnd = new Date(new Date().setDate(new Date().getDate() + 1)).toLocaleDateString()

        return {dateCreate, dateEnd}
    }

    addTodoItem(todoItemText) {
        const todoItemTextVal = todoItemText.value

        if (!this.isTodoInputEmpty(todoItemText)) {
            const {dateCreate, dateEnd} = this.getDateObject()
            this.todoToHTML(todoItemTextVal, dateCreate, dateEnd)
        }
    }

    isAddTodoWithOptions(todoItemText, dateCreate, dateEnd) {
        let [todoItemTextVal, dateCreateVal, dateEndVal] = [todoItemText.value, dateCreate.value, dateEnd.value]

        dateCreateVal = dateCreateVal.split("-").reverse().join(".")
        dateEndVal = dateEndVal.split("-").reverse().join(".")
        if (this.isFormModalValid(todoItemText, dateCreate, dateEnd)) {
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