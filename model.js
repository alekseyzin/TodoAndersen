export class Todo {

    isDataEmpty (dateInput) {
        return !dateInput.value ? true : false
    }

    isDataPeriodInvalid (startDateInput, endDateInput) {
        const timeForTodo = new Date(endDateInput.value) - new Date(startDateInput.value)

        return timeForTodo <= 0 ? true : false
    }

    isTodoInputEmpty (todoInput) {
        return todoInput.value.trim().length <= 0 ? true : false
    }

    toggleErrorHighlightingForInputs (isError, ...elems) {
        elems.forEach(element => {
            if (isError) {
                element.classList.add('invalid')
            } else {
                element.classList.remove('invalid')
            }
        })
    }

    isFormModalValid(todoInput, startDateInput, endDateInput) {
        const errors = {}

        errors.isStartDataEmpty = this.isDataEmpty(startDateInput)
        this.toggleErrorHighlightingForInputs(errors.isStartDataEmpty, startDateInput)

        errors.isEndDataEmpty = this.isDataEmpty(endDateInput)
        this.toggleErrorHighlightingForInputs(errors.isEndDataEmpty, endDateInput)

        if (!Object.values(errors).includes(true)){
            errors.isDataPeriodInvalid = this.isDataPeriodInvalid(startDateInput, endDateInput)
            this.toggleErrorHighlightingForInputs(errors.isDataPeriodInvalid, startDateInput, endDateInput)
        }

        errors.isTodoInputEmpty = this.isTodoInputEmpty(todoInput)
        this.toggleErrorHighlightingForInputs(errors.isTodoInputEmpty, todoInput)

        return Object.values(errors).includes(true) ? false : true
    }

    formatDate (date) {
        return date.split("-").reverse().join(".")
    }

    todoToHTML(todoItemText, dateCreate, dateEnd) {
        const todoListBlock = document.querySelector('.todo-list')
        const li = document.createElement('li')

        li.innerHTML = `
            <input type="checkbox">
            <div class="todo-content-holder">
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

        return {
            dateCreate: new Date().toLocaleDateString(),
            dateEnd: new Date(new Date().setDate(new Date().getDate() + 1)).toLocaleDateString()
        }
    }

    addTodoItem(todoItemText) {
        const todoItemTextVal = todoItemText.value
        const isTodoInputEmpty = this.isTodoInputEmpty(todoItemText)

        this.toggleErrorHighlightingForInputs(isTodoInputEmpty, todoItemText)
        if (!isTodoInputEmpty) {
            const {dateCreate, dateEnd} = this.getDateObject()
            this.todoToHTML(todoItemTextVal, dateCreate, dateEnd)
        }
    }

    isAddTodoWithOptions(todoItemText, dateCreate, dateEnd) {
        let [todoItemTextVal, dateCreateVal, dateEndVal] = [todoItemText.value, dateCreate.value, dateEnd.value]

        dateCreateVal = this.formatDate(dateCreateVal)
        dateEndVal = this.formatDate(dateEndVal)
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

    findAndMarkTodo (e) {
        if (e.target.type === "checkbox") {
            const textBlock = e.target.parentElement.querySelector('.todo-text')

            textBlock.classList.toggle('mark')
        }
    }

}