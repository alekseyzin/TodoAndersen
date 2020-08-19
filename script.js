import {Todo} from "./todo.js";
import {Modal} from './modal.js'
import {Filter} from './filter.js'
import {Sort} from './sort.js'

const sort = new Sort()
const filter = new Filter()
const todo = new Todo()
const modal = new Modal()

function sendModalData() {
    const modalElems = {
        modal: modal,
        todoInput: modalInputText,
        startDateInput: modalInputStartDate,
        endDateInput: modalInputEndDate
    }

    todo.addTodoWithOptions(modalElems)
}

function hasNotSpecialSymbols(e) {
    const regex = new RegExp(/[\w\s]/);

    if (!regex.test(e.key)) {
        e.preventDefault()
    }
}

function sendTodoDataWhenPressEnter(e) {
    if (e.key === "Enter") {
        todo.addTodoItem(addTodo)
        addTodo.value = ''
    }
}

function handlerSetTodoItemDataToEditModal(e) {
    modal.setTodoItemDataToEditModal(todo, e)
}

function toggleSortButtons () {
    document.body.querySelector('.sort-filter-sections').classList.toggle('open')
}

function handlerSortByText (e) {
    const data = {
        parentElement: todoList,
        eventElem: e.target,
        todoItemTag: 'li',
        textItemClass: '.todo-text'
    }

    sort.sortByText(data)
}

function handlerSortByData (e) {
    const data = {
        parentElement: todoList,
        eventElem: e.target,
        todoItemTag: 'li',
        textItemClass: '.end-date'
    }

    sort.sortByDate(data)
}

function handlerSortByTextAndDate () {
    const data = {
        todoItemTag: 'li',
        textInputElem: filterByTextInput,
        textItemClass: '.todo-text',
        dateInputElem: filterByDateInput,
        dateItemClass: '.end-date'
    }

    filter.filterByTextAndDate(data)
}

addTodo.addEventListener('keydown', hasNotSpecialSymbols)
addTodo.addEventListener('keydown', sendTodoDataWhenPressEnter)
modalInputText.addEventListener('keydown', hasNotSpecialSymbols)
document.addEventListener('keydown', modal.closeModalWhenPressEscape)
openModalButton.addEventListener('click', modal.toggleModal)
closeModal.addEventListener('click', modal.toggleModal)
saveModal.addEventListener('click', sendModalData)
todoList.addEventListener('click', todo.findAndMarkTodo)
todoList.addEventListener('click', todo.deleteTodoItem)
todoList.addEventListener('click', handlerSetTodoItemDataToEditModal)
editModalCancel.addEventListener('click', modal.toggleEditModal)
activeTodoButton.addEventListener('click', todo.getActiveTodos)
allTodoButton.addEventListener('click', todo.getAllTodos)
completedTodoButton.addEventListener('click', todo.getCompletedTodos)
clearCompletedTodoButton.addEventListener('click', todo.clearCompletedTodos)
sortButtons.addEventListener('click', toggleSortButtons)
sortByTextButton.addEventListener('click', handlerSortByText)
sortByDateButton.addEventListener('click', handlerSortByData)
filterByDateInput.addEventListener('change', handlerSortByTextAndDate)
filterByTextInput.addEventListener('keyup', handlerSortByTextAndDate)
