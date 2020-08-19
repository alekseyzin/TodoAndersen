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

        li.classList.add('todo-item')
        li.innerHTML = `
            <input type="checkbox">
            <div class="todo-content-holder">
                <span class="todo-text">${todoInputVal}</span>
                <div class="data-holder">
                    <sapn>Start: 
                        <span class="start-date">${startDateInputVal}</span>
                    </sapn>
                    <span>Finish: 
                        <span class="end-date">${endDateInputVal}</span>
                    </span>
                </div>
            </div>
            <div class="buttons-holder">
                <button class="delete-todo" name="delete"></button>
                <button id="openEditModal" class="edit-todo far fa-edit" name="edit"></button>
            </div>
        `
        todoListBlock.appendChild(li)
    }

    getDateObject() {

        return {
            startDateInputVal: new Date().toLocaleDateString(),
            endDateInputVal: new Date(new Date().setDate(new Date().getDate() + 1)).toLocaleDateString()
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

    cleaningInputs(elems) {
        elems.forEach(element => {
            element.value = ""
        })
    }

    addTodoWithOptions({modal, todoInput, startDateInput, endDateInput}) {
        const elemsObj = {todoInput, startDateInput, endDateInput}

        if (this.isFormModalValid(elemsObj)) {
            let [
                todoInputVal,
                startDateInputVal,
                endDateInputVal
            ] = [todoInput.value, startDateInput.value, endDateInput.value]

            startDateInputVal = this.formatDate(startDateInputVal)
            endDateInputVal = this.formatDate(endDateInputVal)

            const modalData = {todoInputVal, startDateInputVal, endDateInputVal}
            const elemsArray = [todoInput, startDateInput, endDateInput]

            this.todoToHTML(modalData)
            this.cleaningInputs(elemsArray)
            modal.toggleModal()
        }

    }

    findAndMarkTodo(e) {
        if (e.target.type === "checkbox") {
            const todoItem = e.target.parentElement
            const textBlock = todoItem.querySelector('.todo-text')

            textBlock.classList.toggle('mark');
            activeTodoButton.name === 'active' && (todoItem.style.display = "none")
        }
    }

    deleteTodoItem(e) {
        if (e.target.name === "delete") {
            e.target.closest('.todo-item').remove()
        }
    }

    saveEditedTodoItemData({
                               modal, todoInput, textElement, startDateInput,
                               starDateElement, endDateInput, endDateElement
                           }) {
        const editElements = {todoInput, startDateInput, endDateInput}

        if (this.isFormModalValid(editElements)) {
            textElement.innerText = todoInput.value
            starDateElement.innerText = this.formatDate(startDateInput.value)
            endDateElement.innerText = this.formatDate(endDateInput.value)
            modal.toggleEditModal()
        }
    }

    isCheckboxChecked(elem) {
        return elem.querySelector('input[type="checkbox"]').checked
    }

    getAllLi() {
        return document.querySelectorAll('li')
    }

    getAllTodos = () => {
        activeTodoButton.name = ""
        this.getAllLi().forEach(elem => {
            elem.style.display = ""
        })
    }

    getActiveTodos = (e) => {
        e.target.name = "active"
        this.getAllLi().forEach(elem => {

            if (this.isCheckboxChecked(elem)) {
                elem.style.display = "none"
            } else {
                elem.style.display = ""
            }
        })
    }

    getCompletedTodos = () => {
        activeTodoButton.name = ""
        this.getAllLi().forEach(elem => {

            if (this.isCheckboxChecked(elem)) {
                elem.style.display = ""
            } else {
                elem.style.display = "none"
            }
        })
    }

    clearCompletedTodos = () => {
        this.getAllLi().forEach(elem => {

            if (this.isCheckboxChecked(elem)) {
                elem.remove()
            }
        })
    }
}
