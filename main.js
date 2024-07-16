
const input = document.querySelector('#search-input');
const movieList = document.querySelector('#movie-list')
const form = document.querySelector('.movie__search')
let tasks = []

if (localStorage.getItem('tasks')) {
	tasks = JSON.parse(localStorage.getItem('tasks'));
	tasks.forEach((task) => renderItem(task));
}

checkEmptyItem()

form.addEventListener('submit',addTaskHandler)
movieList.addEventListener('click',doneTaskHandler)
movieList.addEventListener('click',deleteTaskHandler)

function addTaskHandler(event){
    event.preventDefault();

    const taskText = input.value

    const newTask = {
		id: Date.now(),
		text: taskText,
        done:false
	};

	tasks.push(newTask);

    saveToLocalStorage()

    renderItem(newTask)

    clearInput()

    checkEmptyItem()
}
function doneTaskHandler(event){

    if(event.target.dataset.action !== 'done') return;
    
    const parentNode = event.target.closest('.movie__item');
    const checkButton = parentNode.querySelector('#checkButton');
    const filmName = parentNode.querySelector('#filmName');

    const id = Number(parentNode.id);
 	const task = tasks.find((task)=> task.id === id);
    task.done = !task.done;

    checkButton.classList.toggle('check-active')
    filmName.classList.toggle('film-active')
    parentNode.classList.toggle('item-active')

    saveToLocalStorage()
}
function deleteTaskHandler(event){

    if(event.target.dataset.action !== 'delete') return;
	// находим тег li(closest ищет среди родителей )
	const parenNode = event.target.closest('.movie__item');
     //ID задачи
    const id = Number(parenNode.id)

    //  //Удаляем задачу из массива с задачами tasks = []
    tasks = tasks.filter((task)=> task.id !== id);

    saveToLocalStorage()

    parenNode.remove();
	
    checkEmptyItem()

}
function saveToLocalStorage(){
     localStorage.setItem('tasks',JSON.stringify(tasks))
}
function clearInput(){
    input.value = ''
    input.focus()
}
function checkEmptyItem(){ 
    if (tasks.length === 0){
        const emptyListHTML = `<li id="emptyList" class="movie__item-empty">
                                <p class="movie__empty">Добавь фильм, красавчик</p>
                            </li>
                `
        movieList.insertAdjacentHTML('afterbegin',emptyListHTML)

     }else{
        const emptyListEl = document.querySelector('#emptyList')
        emptyListEl ? emptyListEl.remove() : null;
    }
   
}
function renderItem(task){
    

    const cssClassTitle =  task.done ? 'movie__item-film film-active' : 'movie__item-film'
    const cssClassAdd = task.done ?  'movie__item-check check-active' : 'movie__item-check'
    const cssClassItem = task.done ?  'movie__item item-active' : 'movie__item'


        const movieItem = `<li id = '${task.id}' class="${cssClassItem}">
                        <button id="checkButton" data-action="done" class="${cssClassAdd}"></button>
                        <span id="filmName" class="${cssClassTitle}">${task.text}</span>
                        <button type='button' id="deleteButton" data-action="delete" class="movie__item-delete">
                            <img src="./icons/delete.svg" alt="">
                        </button>
                    </li>`

        movieList.insertAdjacentHTML('beforeend',movieItem)

}


