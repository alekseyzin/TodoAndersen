export class Filter {

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

    isTextAndDate ({element, textInputElem, textItemClass, dateInputElem, dateItemClass}) {
        return this.getTextFromTodo(element, textItemClass).includes(textInputElem.value)
            && (this.getEndDateFromTodo(element, dateItemClass) === dateInputElem.value)
    }

    isTextAndIsntDate ({element, textInputElem, textItemClass, dateInputElem}) {
        return (textInputElem.value && !dateInputElem.value)
            && this.getTextFromTodo(element, textItemClass).includes(textInputElem.value)
    }

    isntTextAndIsDate ({element, textInputElem, dateInputElem, dateItemClass}) {
        return (!textInputElem.value && dateInputElem.value)
            && (this.getEndDateFromTodo(element, dateItemClass) === dateInputElem.value)
    }

    filterByTextAndDate = ({todoItemTag, textInputElem, textItemClass, dateInputElem, dateItemClass}) => {
        this.getAllTodoItems(todoItemTag).forEach(element => {
            const data = {element, textInputElem, textItemClass, dateInputElem, dateItemClass}

            if (this.isTextAndDate(data)) {
                element.style.display = ""
            } else if (this.isTextAndIsntDate(data)) {
                element.style.display = ""
            } else if (this.isntTextAndIsDate(data)) {
                element.style.display = ""
            } else if (!textInputElem.value && !dateInputElem.value) {
                element.style.display = ""
            }
            else {
                element.style.display = "none"
            }
        })
    }
}
