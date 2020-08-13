export class Todo {

    isDataEmpty(dateInput) {
        return !dateInput.value
    }

    isDataPeriodInvalid(startDateInput, endDateInput) {
        const timeForTodo = new Date(endDateInput.value) - new Date(startDateInput.value)

        return timeForTodo <= 0
    }

    isTodoInputEmpty(todoInput) {
        return !todoInput.value.trim().length
    }

    highlightingForInputs(isError, ...elems) {
        elems.forEach(element => {

            if (isError) {
                element.classList.add('invalid')
            } else {
                element.classList.remove('invalid')
            }
        })
    }

    isFormModalValid({todoInput, startDateInput, endDateInput}) {
        const errors = {}

        errors.isStartDataEmpty = this.isDataEmpty(startDateInput)
        this.highlightingForInputs(errors.isStartDataEmpty, startDateInput)

        errors.isEndDataEmpty = this.isDataEmpty(endDateInput)
        this.highlightingForInputs(errors.isEndDataEmpty, endDateInput)

        if (!Object.values(errors).includes(true)) {
            errors.isDataPeriodInvalid = this.isDataPeriodInvalid(startDateInput, endDateInput)
            this.highlightingForInputs(errors.isDataPeriodInvalid, startDateInput, endDateInput)
        }

        errors.isTodoInputEmpty = this.isTodoInputEmpty(todoInput)
        this.highlightingForInputs(errors.isTodoInputEmpty, todoInput)

        return !Object.values(errors).includes(true)
    }

    formatDate(date) {
        return date.split("-").reverse().join(".")
    }

    todoToHTML({todoInputVal, startDateInputVal, endDateInputVal}) {
        const todoListBlock = document.querySelector('.todo-list')
        const li = document.createElement('li')

        li.innerHTML = `
            <input type="checkbox">
            <div class="todo-content-holder">
                <span class="todo-text">${todoInputVal}</span>
                <div class="data-holder">
                    <span>Start: ${startDateInputVal}</span>
                    <span>Finish: ${endDateInputVal}</span>
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

    addTodoItem(todoInput) {
        const todoInputVal = todoInput.value
        const isTodoInputEmpty = this.isTodoInputEmpty(todoInput)

        this.highlightingForInputs(isTodoInputEmpty, todoInput)

        if (!isTodoInputEmpty) {
            const {startDateInputVal, endDateInputVal} = this.getDateObject()
            const modalData = {todoInputVal, startDateInputVal, endDateInputVal}

            this.todoToHTML(modalData)
        }
    }

    addTodoWithOptions({todoInput, startDateInput, endDateInput}) {
        let [
            todoInputVal,
            startDateInputVal,
            endDateInputVal
        ] = [todoInput.value, startDateInput.value, endDateInput.value]

        startDateInputVal = this.formatDate(startDateInputVal)
        endDateInputVal = this.formatDate(endDateInputVal)

        const modalData = {todoInputVal, startDateInputVal, endDateInputVal}

        this.todoToHTML(modalData)
        todoInput.value = ''
        startDateInput.value = ''
        endDateInput.value = ''
    }

    findAndMarkTodo(e) {

        if (e.target.type === "checkbox") {
            const textBlock = e.target.parentElement.querySelector('.todo-text')

            textBlock.classList.toggle('mark')
        }
    }

}
