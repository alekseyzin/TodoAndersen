
export class Sort {

    getAllTodoItems(tag) {
        return document.querySelectorAll(tag)
    }

    unFormatDate(date) {
        return date.split(".").reverse().join("-")
    }

    getTextFromTodo (todoItemTag, textItemClass) {
        return todoItemTag.querySelector(textItemClass).textContent
    }

    getEndDateFromTodo (elem, textItemClass) {
        return this.unFormatDate(elem.querySelector(textItemClass).textContent)
    }

    sortByText = ({parentElement, eventElem, todoItemTag, textItemClass}) => {
        eventElem.sortedByText = !eventElem.sortedByText
        const sortItems = Array.from(this.getAllTodoItems(todoItemTag)).sort((a, b) => {

            if (this.getTextFromTodo(a, textItemClass) > this.getTextFromTodo(b, textItemClass)) {
                return eventElem.sortedByText ? 1 : -1
            }

            if (this.getTextFromTodo(a, textItemClass) < this.getTextFromTodo(b, textItemClass)) {
                return eventElem.sortedByText ? -1 : 1
            }
            return  0
        })

        sortItems.forEach(element => {
            parentElement.appendChild(element)
        })
    }

    sortByDate = ({parentElement, eventElem, todoItemTag, textItemClass}) => {
        eventElem.sortedByDate = !eventElem.sortedByDate
        const sortItems = Array.from(this.getAllTodoItems(todoItemTag)).sort((a, b) => {

            if (this.getEndDateFromTodo(a, textItemClass) > this.getEndDateFromTodo(b, textItemClass)) {
                return eventElem.sortedByDate ? 1 : -1
            }

            if (this.getEndDateFromTodo(a, textItemClass) < this.getEndDateFromTodo(b, textItemClass)) {
                return eventElem.sortedByDate ? -1 : 1
            }
            return  0
        })

        sortItems.forEach(element => {
            parentElement.appendChild(element)
        })
    }
}
