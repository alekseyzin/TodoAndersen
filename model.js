export class Todo {
    constructor() {
        this.setTodoItemTextToEditModal = this.setTodoItemTextToEditModal.bind(this)
        this.toggleEditModal = this.toggleEditModal.bind(this)
    }

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

    cleaningInputs (elems) {
        elems.forEach(element => {
            element.value = ""
        })
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
        const elemsArray = [todoInput, startDateInput, endDateInput]

        this.todoToHTML(modalData)
        this.cleaningInputs(elemsArray)
    }

    findAndMarkTodo(e) {
        if (e.target.type === "checkbox") {
            const textBlock = e.target.parentElement.querySelector('.todo-text')

            textBlock.classList.toggle('mark')
        }
    }

    deleteTodoItem(e) {

        if (e.target.name === "delete") {
            e.target.closest('.todo-item').remove()
        }
    }

    toggleEditModal() {
        const modal = document.querySelector(".edit-modal-holder")

        editModalSave.removeEventListener('click', this.handlerEdit)
        modal.classList.toggle('open')
    }

    saveEditedTodoItemText ({todoInput, textElement,  startDateInput,
                                starDateElement,  endDateInput, endDateElement}) {
        const editElements = {todoInput, startDateInput, endDateInput}

        if(this.isFormModalValid(editElements)) {
            textElement.innerText = todoInput.value
            starDateElement.innerText = this.formatDate(startDateInput.value)
            endDateElement.innerText = this.formatDate(endDateInput.value)
            this.toggleEditModal()
        }
    }

    formatDateToInput (date) {
        return date.textContent.split('.').reverse().join('-')
    }

    setTodoItemTextToEditModal(e) {
        if (e.target.name === "edit") {
            const textElement = e.target.closest('.todo-item').querySelector('.todo-text')
            const starDateElement = e.target.closest('.todo-item').querySelector('.start-date')
            const endDateElement = e.target.closest('.todo-item').querySelector('.end-date')

            editModalInput.value = textElement.innerText
            editModalStartDate.value = this.formatDateToInput(starDateElement)
            editModalEndDate.value = this.formatDateToInput(endDateElement)

            const editElements = {
                todoInput: editModalInput,
                textElement,
                startDateInput: editModalStartDate,
                starDateElement,
                endDateInput: editModalEndDate,
                endDateElement,
            }

            function closureTodoItemData () {
                this.saveEditedTodoItemText(editElements)
            }
            this.handlerEdit = closureTodoItemData.bind(this)
            this.toggleEditModal()
            editModalSave.addEventListener('click', this.handlerEdit)
        }
    }
}
