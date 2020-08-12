class Todo {

    static todoToHTML (todoItemText, dateCreate, dateEnd) {
        const todoListBlock = document.querySelector('.todo-list')
        const li = document.createElement('li')
        li.innerHTML = `
            <span class="todo-text">${todoItemText}</span>
            <div class="data-holder">
                <span>Start: ${dateCreate}</span>
                <span>Finish: ${dateEnd}</span>
            </div>
        `
        todoListBlock.appendChild(li)
    }

    static add (todoItemText) {
        if (todoItemText.trim().length > 0) {
            const dateNow = new Date()
            const dateCreate = dateNow.toLocaleDateString()
            const dateClone = new Date(dateNow)
            const dateEnd = new Date(dateClone.setDate(dateNow.getDate() + 1)).toLocaleDateString()
            Todo.todoToHTML(todoItemText, dateCreate, dateEnd)
        }
    }

    static addTodoWithOptions (todoItemText, dateCreate, dateEnd) {
        const todoItemTextVal = todoItemText.value
        const dateCreateVal = dateCreate.value
        const dateEndVal = dateEnd.value
        const timeForTodo = new Date(dateEndVal) - new Date(dateCreateVal);
        if ((!dateCreateVal || !dateEndVal) || timeForTodo <= 0 || todoItemTextVal.trim.length < 0) {
            return false
        }
        Todo.todoToHTML(todoItemTextVal, dateCreateVal, dateEndVal)
        todoItemText.value = ''
        dateCreate.value = ''
        dateEnd.value = ''
        return true
    }
}

function toggleModal () {
    const modal = document.querySelector(".modal-holder")
    modal.classList.toggle('open')
}

addTodo.onkeydown = (e) => {
    // const specialSymbols = ["/", "<", ">"]
    var regex = new RegExp("^(?=.*[A-Za-z0-9])[A-Za-z0-9 _]*$");
    if (!regex.test(e.key)) return false
    if (e.key === "Enter") {
        const todoItemText = addTodo.value
        Todo.add(todoItemText)
        addTodo.value = ''
    }
}

openModalInput.onclick = toggleModal
closeModal.onclick = toggleModal

saveModal.onclick = () => {
    const validation = Todo.addTodoWithOptions(modalInputText, modalInputStartDate, modalInputEndDate)
    if (validation) toggleModal()
}




