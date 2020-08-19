export class Modal {

    constructor() {
        this.setTodoItemDataToEditModal = this.setTodoItemDataToEditModal.bind(this)
        this.toggleEditModal = this.toggleEditModal.bind(this)
        this.toggleModal = this.toggleModal.bind(this)
        this.closeModalWhenPressEscape = this.closeModalWhenPressEscape(this)
    }

    deleteHighlightingModalInputs(elemsArray) {
        elemsArray.forEach(element => {
            element.classList.remove('invalid')
        })
    }

    toggleModal() {
        const modal = document.querySelector(".modal-holder")
        const elemsArray = [modalInputText, modalInputStartDate, modalInputEndDate]

        modal.classList.toggle('open')
        this.deleteHighlightingModalInputs(elemsArray)
    }

    closeModalWhenPressEscape(e) {
        if (e.key === "Escape") {
            const modal = document.querySelector(".modal-holder")
            const editModal = document.querySelector(".edit-modal-holder")

            modal.classList.remove('open')
            editModal.classList.remove('open')
            this.deleteHighlightingModalInputs()
        }
    }

    toggleEditModal() {
        const modal = document.querySelector(".edit-modal-holder")
        const elemsArray = [editModalInput, editModalStartDate, editModalEndDate]

        editModalSave.removeEventListener('click', this.handlerEdit)
        this.deleteHighlightingModalInputs(elemsArray)
        modal.classList.toggle('open')
    }

    formatDateToInput(date) {
        return date.textContent.split('.').reverse().join('-')
    }

    setTodoItemDataToEditModal(todo, e) {
        if (e.target.name === "edit") {
            const textElement = e.target.closest('.todo-item').querySelector('.todo-text')
            const starDateElement = e.target.closest('.todo-item').querySelector('.start-date')
            const endDateElement = e.target.closest('.todo-item').querySelector('.end-date')

            editModalInput.value = textElement.innerText
            editModalStartDate.value = this.formatDateToInput(starDateElement)
            editModalEndDate.value = this.formatDateToInput(endDateElement)

            const editElements = {
                modal: this,
                todoInput: editModalInput,
                textElement,
                startDateInput: editModalStartDate,
                starDateElement,
                endDateInput: editModalEndDate,
                endDateElement,
            }

            function closureTodoItemData() {
                todo.saveEditedTodoItemData(editElements)
            }

            this.handlerEdit = closureTodoItemData
            this.toggleEditModal()
            editModalSave.addEventListener('click', this.handlerEdit)
        }
    }
}
