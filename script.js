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
    var regex = new RegExp("^(?=.*[A-Za-z0-9])[A-Za-z0-9 _]*$");
    if (!regex.test(e.key)) {
        e.preventDefault()
        return false
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





