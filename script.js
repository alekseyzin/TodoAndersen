import {Todo} from "./model.js";

const todo = new Todo()

function deleteHighlightingModalInputs () {
    modalInputText.classList.remove('invalid')
    modalInputStartDate.classList.remove('invalid')
    modalInputEndDate.classList.remove('invalid')
}

function toggleModal () {
    const modal = document.querySelector(".modal-holder")

    modal.classList.toggle('open')
    deleteHighlightingModalInputs()
}

function  saveModalData () {
    const validation = todo.isAddTodoWithOptions(modalInputText, modalInputStartDate, modalInputEndDate)

    if (validation) toggleModal()
}

function closeModalWhenPressEscape (e) {
    if (e.key === "Escape") {
        const modal = document.querySelector(".modal-holder")

        modal.classList.remove('open')
        deleteHighlightingModalInputs()
    }
}

function hasNotSpecialSymbols (e) {
    const regex = new RegExp("^[а-яА-ЯёЁa-zA-Z0-9 _]+$");

    if (!regex.test(e.key)) {
        e.preventDefault()
    }
}

function sendTodoDataWhenPressEnter (e) {
    if (e.key === "Enter") {
        todo.addTodoItem(addTodo)
        addTodo.value = ''
    }
}

addTodo.addEventListener('keydown', hasNotSpecialSymbols)
addTodo.addEventListener('keydown', sendTodoDataWhenPressEnter)
modalInputText.addEventListener('keydown', hasNotSpecialSymbols)
document.addEventListener('keydown', closeModalWhenPressEscape)
openModalButton.addEventListener('click', toggleModal)
closeModal.addEventListener('click', toggleModal)
saveModal.addEventListener('click', saveModalData)
todoList.addEventListener('click', todo.findAndMarkTodo)





