import {Todo} from "./model.js";

const todo = new Todo()

function toggleModal () {
    const modal = document.querySelector(".modal-holder")

    modal.classList.toggle('open')
}

function  saveModalData () {
    const validation = todo.isAddTodoWithOptions(modalInputText, modalInputStartDate, modalInputEndDate)

    if (validation) toggleModal()
}

function closeModalWhenPressEscape (e) {
    if (e.key === "Escape") {
        const modal = document.querySelector(".modal-holder")

        modal.classList.remove('open')
    }
}

function hasNotSpecialSymbols (e) {
    const regex = new RegExp("^(?=.*[A-Za-z0-9 _])[A-Za-z0-9 _]*$");

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

function findAndMarkTodo (e) {
    if (e.target.type === "checkbox") {
        const textBlock = e.target.parentElement.querySelector('.todo-text')

        textBlock.classList.toggle('mark')
    }
}

addTodo.addEventListener('keydown', hasNotSpecialSymbols)
addTodo.addEventListener('keydown', sendTodoDataWhenPressEnter)
modalInputText.addEventListener('keydown', hasNotSpecialSymbols)
document.addEventListener('keydown', closeModalWhenPressEscape)
openModalButton.addEventListener('click', toggleModal)
closeModal.addEventListener('click', toggleModal)
saveModal.addEventListener('click', saveModalData)
todoList.addEventListener('click', findAndMarkTodo)





