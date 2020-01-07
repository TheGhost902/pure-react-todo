import React from 'react'
import ReactDOM from 'react-dom'

import './style.less'

import TopBar from './TopBar'
import MainBoard from './MainBoard'
import LeftMenu from './LeftMenu'
import AddNoteForm from './AddNoteForm'
import AddCategoryForm from './AddCategoryForm'

class App extends React.Component {
    constructor() {
        super()

        // если что либо есть в хранилище то берём от туда, если нет, создаём всё с нуля
        if (localStorage.getItem('state')) {
            this.state = JSON.parse(localStorage.getItem('state'))
        } else {

            const defaultCategory = {
                text: 'Common',
                color: '#fff9c7',
                id: 1
            }
            
            this.state = {
                notes: [],
                categories: [defaultCategory],
                isShowAddNoteForm: false,
                isShowAddCategoryForm: false,
                filterSettings: {
                    isFiltered: false,
                    lastCategory: null
                }
            }
        }

        this.createNote                 = this.createNote.bind(this)
        this.removeNote                 = this.removeNote.bind(this)
        this.showHideAddNoteForm        = this.showHideAddNoteForm.bind(this)
        this.filterNotes                = this.filterNotes.bind(this)
        this.createCategory             = this.createCategory.bind(this)
        this.removeCategory             = this.removeCategory.bind(this)
        this.filterNotesByCategory      = this.filterNotesByCategory.bind(this)
        this.showHideAddCategoryForm    = this.showHideAddCategoryForm.bind(this)
    }

    // ЗАМЕТКИ
    createNote(obj) {
        const { text, categoryID } = obj
        const category = this.state.categories.find(category => category.id === categoryID)

        const note = {
            id: Math.floor(Math.random() * new Date().getTime()),
            isShow: true,
            text,
            category
        }

        this.setState(prevState => ({
            notes: [...prevState.notes, note]
        }))
    }

    removeNote(id) {
        // оставляем заметки у которых id не подходит
        const updatedNotes = this.state.notes.filter(note => note.id !== id)

        this.setState({
            notes: updatedNotes
        })
    }

    showHideAddNoteForm() {
        // показывает/прячет форму для добавления заметок(инвертирует текущее состояние при вызове)
        this.setState(prevState => ({
            isShowAddNoteForm: !prevState.isShowAddNoteForm
        }))
    }

    filterNotes(text) {
        this.setState(prevState => ({
            notes: prevState.notes.map(note => {
                // если найдёт подстроку в строке, то нужно показать
                if (note.text.indexOf(text) !== -1) {
                    note.isShow = true
                    return note
                } else {
                    note.isShow = false
                    return note
                }
            })
        }))
    }

    // КАТЕГОРИИ
    createCategory(text, color) {
        const category = {
            text,
            color,
            id: Math.floor(Math.random() * new Date().getTime())
        }

        this.setState(prevState => ({
            categories: [...prevState.categories, category]
        }))
    }

    removeCategory(id) {
        if (id === 1) return alert('You can\'t delete Common Category')

        // если категория содержит заметки, то её нельзя удалить
        // (проходтся по заметкам, и если есть заметка у которой удаляемая категория, выводит сообщение)
        for (let note of this.state.notes) {
            if (note.category.id === id) return alert('Category must be empty!')
        }

        const updatedCategories = this.state.categories.filter(
            category => {
                if (category.id !== id) return true
                else {
                    // побочно, если удаляем категорию по которой были отфильтрованы заметки,
                    // то перед удалением отменяем фильтрацию(вызвав повторно метод filterNotesByCategory) 
                    if (this.state.filterSettings.lastCategory === category) {
                        this.filterNotesByCategory(category)
                    }

                    return false
                }
            }
        )

        this.setState({
            categories: updatedCategories
        })
    }

    filterNotesByCategory(category) {
        // если не отфильтровано, или отфильтровано но категория не совпадает с предыдущей
        if (this.state.filterSettings.isFiltered === false ||
            ((this.state.filterSettings.lastCategory.id !== category.id) &&
            (this.state.filterSettings.isFiltered === true))
        ) {
            this.setState(prevState => ({
                notes: prevState.notes.map(note => {
                    // показать те у которых совпадает категория
                    if (note.category.id === category.id) {
                        note.isShow = true
                        return note
                    } else {
                        note.isShow = false
                        return note
                    }
                }),
                filterSettings: {
                    isFiltered: true,
                    lastCategory: category
                }
            }))
        } else { // если категория совпадает то показываем все заметки
                 // (повторный клик на ту же категорию, отменяет фильтрацию)
            if (this.state.filterSettings.lastCategory.id === category.id) {
                this.setState(prevState => ({
                    notes: prevState.notes.map(note => {
                        note.isShow = true
                        return note
                    }),
                    filterSettings: {
                        isFiltered: false,
                        lastCategory: null
                    }
                }))
            }
        }
        
    }

    showHideAddCategoryForm() {
        this.setState(prevState => ({
            isShowAddCategoryForm: !prevState.isShowAddCategoryForm
        }))
    }

    render() {
        // обновление данных в хранилище
        localStorage.setItem('state', JSON.stringify(this.state))

        return (
            <div>

                <TopBar
                    showHideAddNoteForm={this.showHideAddNoteForm}
                    notes={this.state.notes}
                    filterNotes={this.filterNotes}
                />

                <div className="central-container">
                    <LeftMenu
                        categories={this.state.categories}
                        showHideAddCategoryForm={this.showHideAddCategoryForm}
                        removeCategory={this.removeCategory}
                        filterNotesByCategory={this.filterNotesByCategory}
                        filterSettings={this.state.filterSettings}
                    />

                    <MainBoard notes={this.state.notes} removeNote={this.removeNote}/>
                </div>

                <AddNoteForm 
                    createNote={this.createNote}
                    isShow={this.state.isShowAddNoteForm}
                    showHide={this.showHideAddNoteForm}
                    categories={this.state.categories}
                />

                <AddCategoryForm
                    createCategory={this.createCategory}
                    isShow={this.state.isShowAddCategoryForm}
                    showHide={this.showHideAddCategoryForm}
                />

            </div>
        ) 
    }
}

ReactDOM.render(<App/>, document.getElementById('root'))