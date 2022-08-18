let generateId = 0;
let dropdown = false;
let allTasks = [];
let selectedUsers = [];
let selectImages = [];
let selected = {
    'Kevin': false,
    'Feros': false,
    'Norbert': false,
    'Daniel': false
}


class CompleteTask {
    constructor(id, title, dueDate, category, urgency, description, assignedTo, assignedImg, createdAt, position, state){
        this.id = id;
        this.title = title;
        this.dueDate = dueDate;
        this.category = category;
        this.urgency = urgency;
        this.description = description;
        this.assignedTo = assignedTo;
        this.assignedImg = assignedImg;
        this.createdAt = createdAt;
        this.position = position;
        this.state = state;
    };
}


/**
 * A dialog window is open to permit the selection of the collaborators responsible for the new task.
 * The id of this dialog window is "avatarPicker".
 */
function openDropdown() {
    if (dropdown == false) {
        removeAnimation('fade-out-animation');
        fadeInAvatar();
            
       
    } else if (dropdown == true) {
        removeAnimation('fade-in-animation');
        fadeOutAvatar();
    }
    
}

function removeAnimation(animation) {
    document.getElementsByClassName('columnname')[0].classList.remove(animation);
    document.getElementsByClassName('columnname')[1].classList.remove(animation);
    document.getElementsByClassName('columnname')[2].classList.remove(animation);
    document.getElementsByClassName('columnname')[3].classList.remove(animation);
}

function addAnimation(animation) {
    document.getElementsByClassName('columnname')[0].classList.add(animation);
    document.getElementsByClassName('columnname')[1].classList.add(animation);
    document.getElementsByClassName('columnname')[2].classList.add(animation);
    document.getElementsByClassName('columnname')[3].classList.add(animation);   
}

function fadeInAvatar() {
    setTimeout(()=>{
        addAnimation('fade-in-animation');
        setTimeout(() => {
            removeAnimation('d-none');
            document.getElementById('avatarPicker').classList.remove('d-none');
            dropdown = true;
        }, 225)

    },225)
}

function fadeOutAvatar() {
    setTimeout(()=>{
        addAnimation('fade-out-animation');
        setTimeout(()=>{
            addAnimation('d-none');
            document.getElementById('avatarPicker').classList.add('d-none');

            dropdown = false;

        },225)

    }, 250)
}


/**
 * Check of at least one collaborator's been selected. When not, a dialog window with id "dialogAdTask" is open and
 * a warn message is shown. That invites you to add at least one collaborator to the task otherwise is not possible
 * creating a new task.
 */
function requestForm() {
    event.preventDefault();
    if (selectedUsers.length > 0) {
        document.getElementById('button-form').disabled = true;
        document.getElementById('button-form').style = 'opacity: 0.6';
        createTask();
    } else {
        document.getElementById('dialogAdTask').classList.add('d-none');
        document.getElementById('avatarPicker').classList.remove('d-none');
        removeAnimation('d-none');
        document.getElementById('dialogAdTask').classList.remove('d-none');
        dropdown = true;
    }
}


/**
 * A new task is generated with the values of the form inputs, using the model of the class
 * "CompleteTask". 
 */
function createTask() {
    generateId = Math.round(Math.random()*10000);
    let task_title = document.getElementById('title-input');
    let task_due_date = document.getElementById('date-input');
    let task_category = document.getElementById('category-input');
    let task_urgency = document.getElementById('urgency-input');
    let task_description = document.getElementById('description-input');
    let completeTask = new CompleteTask( generateId, task_title.value, task_due_date.value, task_category.value, 
    task_urgency.value, task_description.value, selectedUsers, selectImages, new Date().getTime(), 'backlog', 'toDoTask');   
    refreshCreateTaskInputs(task_title.value, task_due_date.value, task_category.value,
    task_urgency.value, task_description.value);
    updateAllTasks(completeTask); 
}


/**
 * The values of the inputs are reset.
 * @param {string} title - The value from the input with id "title-input"
 * @param {*} dueDate  - The value from the input with id "date-input"
 * @param {string} category  - The value from the input with id "category-input"
 * @param {string} urgency  - The value from the input with id "urgency-input"
 * @param {string} description  - The value from the input with id "description-input"
 */
function refreshCreateTaskInputs(title, dueDate, category, urgency, description){
    title = '';
    dueDate = '';
    category = '';
    urgency = '';
    description = '';
}

function cancelCompilation() {
    document.getElementById('title-input').value = '';
    document.getElementById('date-input').value = '';
    document.getElementById('category-input').value = '';
    document.getElementById('urgency-input').value = '';
    document.getElementById('description-input').value = '';
}


/**
 * The new task created by the function "createTask" is pushed into the array "allTasks"
 * @param {JSON} completeTask - object created with data source from the input fields. The model of this 
 * object is based on the class "CompleteTask"
 */
function updateAllTasks(completeTask){
    dropdown = false;
    allTasks.push(completeTask);
    saveAllTasks();
    
    setTimeout( () => {
        window.location = './backlog.html'
    }, 2000)
}


/**
 * With this function we can save the tasks in the backend.
 */
setURL('http://gruppe-252.developerakademie.net/smallest_backend_ever');

function saveAllTasks() {
    backend.setItem('allTasks', JSON.stringify(allTasks));
}


/**
 * With this function we can reload the saved tasks from the backend.
 */
async function loadAllTasks() {
    await downloadFromServer();
    allTasks = JSON.parse(backend.getItem('allTasks')) || [];
}


/**
 * It allows the toggle of the collaborators.
 * @param {string} id - The name of the collaborator.
 */
function selectAvatar(id) {
    if (selected[id] == false) {
        selected[id] = true;
        document.getElementById(id).classList.add('selected-picture');
        document.getElementById('dialogAdTask').classList.add('d-none')
        let path = './assets/images/'+ document.getElementById(id).id + '.jpg';
        selectImages.push(path);
        selectedUsers.push((' '+id + ' '));
        
    } else if (selected[id] == true) {
        selected[id] = false;
        document.getElementById(id).classList.remove('selected-picture');
        let indexAvatar = selectedUsers.indexOf(id);
        selectedUsers.splice(indexAvatar, 1);
    }
}

function today() {
    var today = new Date();
    today = new Date(today.setDate(today.getDate())).toISOString().split('T')[0];
    document.getElementById('date-input').setAttribute('min', today);
    
}