let state;
let id;
let title;
let dueDate;
let category;
let description;
let assignedImg;
let assignedTo;
let urgency;
let collaborators;
let currentDraggedElement;
let taskBoard;


/**
 * This function filters the elements of the array with attribute "position" set under "board".
 * The sub-array is rendered in four different columns depending on whether the state is regulate to "toDotask", 
 * "progressTask", "testingTask" and "doneTask".
 */
function renderHTML() {
    let boardArray = allTasks.filter(t => t['position'] == 'board');
    filterToDoTask(boardArray);
    filterProgressTask(boardArray);
    filterTestingTask(boardArray);
    filterDoneTask(boardArray);
}


/**
 * Cards are generated in the column "to Do". A new array is generated when the state is set to "toDoTask".
 * @param {array} boardArray - it is the sub-array generated from the main array "allTasks", when the attribute state is set to "board". 
 */
function filterToDoTask(boardArray) {
    let array = boardArray.filter(t => t['state'] == 'toDoTask');
    let toDoTask = document.getElementById('toDoTask');
    toDoTask.innerHTML = '';
    for (let i = 0; i < array.length; i++) {
        renderTaskTypology(toDoTask, i, array);
        colorUserStory(i, array);
    }
}


/**
 * Cards are generated in the column "In progress". A new array is generated when the state is set to "progressTask".
 * @param {array} boardArray - it is the sub-array generated from the main array "allTasks", when the attribute state is set to "board". 
 */
function filterProgressTask(boardArray) {
    let array = boardArray.filter(t => t['state'] == 'progressTask');
    let progressTask = document.getElementById('progressTask');
    progressTask.innerHTML = '';
    for (let i = 0; i < array.length; i++) {
        renderTaskTypology(progressTask, i, array);
        colorUserStory(i, array);
    }
}


/**
 * Cards are generated in the column "testing". A new array is generated when the state is set to "testingtask".
 * @param {array} boardArray - it is the sub-array generated from the main array "allTasks", when the attribute state is set to "board". 
 */
function filterTestingTask(boardArray) {
    let array = boardArray.filter(t => t['state'] == 'testingTask');
    let testingTask = document.getElementById('testingTask');
    testingTask.innerHTML = '';
    for (let i = 0; i < array.length; i++) {
        renderTaskTypology(testingTask, i, array);
        colorUserStory(i, array);
    }
}


/**
 * Cards are generated in the column "done". A new array is generated when the state is set to "doneTask".
 * @param {array} boardArray - it is the sub-array generated from the main array "allTasks", when the attribute state is set to "board". 
 */
function filterDoneTask(boardArray) {
    let array = boardArray.filter(t => t['state'] == 'doneTask');
    let doneTask = document.getElementById('doneTask');
    doneTask.innerHTML = '';
    for (let i = 0; i < array.length; i++) {
        renderTaskTypology(doneTask, i, array);
        colorUserStory(i, array);
    }
}


/**
 * For each of the four generated array: toDo column, inProgress column, testing column and done column. A card is compiled with the informations
 * from the objects inside the array. The informations are: id, title, dueDate, category and collaborators.
 * @param {string} taskTypology - It is the id of the div (the column) where the cards are rendered. 
 * The four ids are toDoTask, progressTask, testingTask and doneTask
 * @param {number} i - It is the index of the array. 
 * @param {*} array - The sub-array with "position" set to 'board' and the "state" set to the related id.
 */
function renderTaskTypology(taskTypology, i, array) {

    taskBoard = array[i];
    id = array[i]['id'];
    title = array[i]['title'];
    dueDate = array[i]['dueDate'];
    category = array[i]['category'];
    collaborators = array[i]['assignedTo'];
    taskTypology.innerHTML += templateTaskTypology();
    colorBoardCategory(category);
    displayContributors(taskBoard, id);
}



function displayContributors(taskBoard, id){
    if(taskBoard['assignedImg'][0] === undefined){
        document.getElementById(`contributor1-${id}`).classList.add('d-none');
    }
    if(taskBoard['assignedImg'][1] === undefined){
        document.getElementById(`contributor2-${id}`).classList.add('d-none');
    }
    if(taskBoard['assignedImg'][2] === undefined){
        document.getElementById(`contributor3-${id}`).classList.add('d-none');
    }
    if(taskBoard['assignedImg'][3] === undefined){
        document.getElementById(`contributor4-${id}`).classList.add('d-none');
    } 
}

function showTicketBoard (id) {
    document.getElementById("popupBackground").classList.remove('d-none');
    let array = allTasks.filter( task => task['id'] == id);
    getArrayParamaters(array);
    document.getElementById("ticket_popup").innerHTML = templateTicketPopup();
    showPopupCollaborators(id, assignedImg);
    colorUrgencyPopup(urgency);                        
}

function getArrayParamaters(array){
    state = array[0].state;
    id = array[0].id;
    title = array[0].title;
    dueDate = array[0].dueDate;
    category = array[0].category;
    description = array[0].description;
    assignedImg = array[0].assignedImg;
    assignedTo = array[0].assignedTo;
    urgency = array[0].urgency;
}
                        
function checkStatus(state, id){
    document.getElementById(state + '_popup').selected; 
    console.log('option is: ', option);
    showTicketBoard(id);
   
}

function showPopupCollaborators(id, assignedImg) {
    if(assignedImg[0] === undefined){
        document.getElementById(`contributor11-${id}`).classList.add('d-none');
    }
    if(assignedImg[1] === undefined){
        document.getElementById(`contributor22-${id}`).classList.add('d-none');
    }
    if(assignedImg[2] === undefined){
        document.getElementById(`contributor33-${id}`).classList.add('d-none');
    }
    if(assignedImg[3] === undefined){
        document.getElementById(`contributor44-${id}`).classList.add('d-none');
    }
}

function colorUrgencyPopup(urgency){
    if(urgency == 'High'){
        document.getElementById('urgency_icon').src = './assets/images/important.png';
    } else if(urgency == 'Intermediate'){
        document.getElementById('urgency_icon').src = './assets/images/intermediate.png';
    } else {
        document.getElementById('urgency_icon').src = './assets/images/low.png';
    }
}

function colorBoardCategory(category) {
    let categorycolor;
    if (category == "Management") {
        categorycolor = '#E26EFF';
    }
    if (category == "Software Development") {
        categorycolor = '#FFAF6E';
    }
    if (category == "UX/UI Design") {
        categorycolor = '#55AE66';
    }
    if (category == "Human Ressources") {
        categorycolor = '#66A2DB';
    }
    document.getElementById(`board_category_color${id}`).style.backgroundColor = categorycolor;
}

/**
 * After that the cards are compiled. They are coloured corresponding whether the urgency is regulated to "high", "intermediate" or "low".
 * @param {number} i - index of the array
 * @param {*} array - The sub-array with "position" set to 'board' and the "state" set to : "toDoTask", "progressTask", "testingTask", "doneTask"
 */
function colorUserStory(i, array) {
    let id = array[i]['id'];
    let urgency = array[i]['urgency'];
    let card = document.getElementById(`userStory${id}`);
    if (urgency == 'High') {
        card.style = 'background-color: rgba(200, 23, 23, 1);'
    } else if (urgency == 'Intermediate') {
        card.style = 'background-color: yellow;'
    } else {
        card.style = 'background-color: rgba(23, 200, 23, 1);'
    }
}


/**
 * When a card is dragged, its id is saved in a global variable named "currentDraggedElement".
 * @param {number} id - Number generated with the function (Math.random * 1000). When a new task is constitute.
 */
function startDragging(id) {
    currentDraggedElement = id;
}


function allowDrop(ev) {
    ev.preventDefault();
}


/**
 * When a card is dragged over a column and dropped into it. This column call a function that fabricate a fictitious array with 
 * the id equal to the number saved in the "currentDraggedElement" variable. This array always consist of only one element, because each card
 * always have an unique id.
 * When the element is dropped to the destination its "state" property changes according to the column-id where it is moved. That causes that 
 * the element is immediately rendered in that new column generating the effect of the drag and drop.
 * 
 * @param {string} taskTypology - Id of the div, respresenting the column where the cards are rendered.
 */
function moveTo(taskTypology) {
    let array = allTasks.filter(t => t['id'] == currentDraggedElement);
    array[0]['state'] = taskTypology;
    saveAllTasks();
    renderHTML();
}


/**
 * By clicking the button delete on the card. This card is deleted from the main-array "allTask" according to its unique id.
 * After that the changes are saved in the backend and all the cards are newly rendered, to show the modifications
 * @param {number} id 
 */
function deleteTask(id) {
    document.getElementById("popupBackground").classList.add('d-none');
    let array = allTasks.filter(t => t['id'] == id);
    let index = allTasks.indexOf(array[0]);
    allTasks.splice(index, 1);
    saveAllTasks();
    renderHTML();
}

function closePopup(id) {
    let taskvalue = document.getElementById('change_status').value;
    if(taskvalue){
        currentDraggedElement = id;
   
       moveTo(taskvalue);
    }   
        
    document.getElementById("popupBackground").classList.add('d-none');

}

function templateTaskTypology() {
    return `
    <div draggable="true" ondragstart="startDragging(${id})" class = "user-story" >
        <div id = "board_category_color${id}" class = "board_category_color"></div>
        <div class = "ticket_container">
            <div id="userStory${id}" class = "board_urgency"></div>
            <span class = "ticket_date">${dueDate}</span> <br> 
            <p class = "ticket_title">${title}</p>
            <p class = "ticket_category">${category}</p>
            <div class = "board_btn_img">
                <button onclick="showTicketBoard(${id})">Show Ticket</button>
                <div class = "board_img">
                <img class="board_profil_img"  id="contributor1-${id}" src="${taskBoard['assignedImg'][0]}" style = "margin-left: 0px;">
                <img class="board_profil_img" id="contributor2-${id}" src="${taskBoard['assignedImg'][1]}" style = "margin-left: -25px;">
                <img class="board_profil_img" id="contributor3-${id}" src="${taskBoard['assignedImg'][2]}" style = "margin-left: -25px;">
                <img class="board_profil_img" id="contributor4-${id}" src="${taskBoard['assignedImg'][3]}" style = "margin-left: -25px;">
                </div>
            </div>
                
        </div>
    </div>`;
}

function templateTicketPopup() {
    return `  
    <div class = "ticket_container">

        <div class="top_popup">
            <span class = "ticket_date">${dueDate}</span>
            <img onclick="closePopup(${id})" src="./assets/images/close.png" style="margin-right:20px">
        </div>
        <p class = "ticket_title">${title}</p>
        <p class = "ticket_description_label"><b>Description:</b></p>
        <p class = "ticket_description">${description}</p>

        <div class="middle_popup">
            <div class="middle_leftbox">
                <p class = "ticket_category"><b>Category: </b>${category}</p> 
                <span><b>Assigned to:</b> ${assignedTo}</span>
                <div class = "board_img">
                    <img class="popup_profil_img"  id="contributor11-${id}" src="${assignedImg[0]}" >
                    <img class="popup_profil_img" id="contributor22-${id}" src="${assignedImg[1]}" >
                    <img class="popup_profil_img" id="contributor33-${id}" src="${assignedImg[2]}" >
                    <img class="popup_profil_img" id="contributor44-${id}" src="${assignedImg[3]}" >
                </div>
            </div>
        </div>
    </div>

    <div class = "ticket_popup_footer">
        <div class="middle_rightbox">
            <span>Urgency:</span><img id="urgency_icon" src=""><p>${urgency}</p>
        </div>
        <select id="change_status">
            <option value ="" style="display: none">Select state</option>
            <option  value="toDoTask" >To do</option>
            <option value="progressTask">In progress</option>
            <option value="testingTask" >Testing</option>
            <option value="doneTask">Done</option>
        </select>
        <img class="trash-icon"  src= "assets/images/trash.png" onclick = "deleteTask(${id})">
    </div>         
`;
}