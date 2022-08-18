let backlogArray;
let backlogStories;
let task;
let id_task;
let categorycolor;
let profileImg;


/**
 * The backlog tasks are rendered according to their belong to "backlog" category. 
 * In other words when the attribute "position" inside the main array "allTasks" is set to "backlog".
 */
async function renderBacklogTasks() {
    await loadAllTasks();
    backlogStories = document.getElementById('backlogStories-container');
    backlogArray = allTasks.filter(t => t['position'] == 'backlog');
    backlogStories.innerHTML = '';
    generateTasks(backlogArray, backlogStories);
    
}

function generateTasks(backlogArray, backlogStories) {
    for (let i = 0; i < backlogArray.length; i++) {
        task = backlogArray[i];
        id_task = task['id'];
        
        categoryColor(task);
        backlogStories.innerHTML += templateBacklogTasks(categorycolor , id_task, task);
        displayCollaborators(id_task, task);
    } 
}

function categoryColor(task) {

    if (task['category'] == "Management") {
        categorycolor = '#E26EFF';
    }
    if (task['category'] == "Software Development") {
        categorycolor = '#FFAF6E';
    }
    if (task['category'] == "UX/UI Design") {
        categorycolor = '#55AE66';
    }
    if (task['category'] == "Human Ressources") {
        categorycolor = '#66A2DB';
    }
}

function displayCollaborators(id_task, task){



    if(task['assignedImg'][0] === undefined){
        document.getElementById(`collaborator1-${id_task}`).classList.add('d-none');
    }
    if(task['assignedImg'][1] === undefined){
        document.getElementById(`collaborator2-${id_task}`).classList.add('d-none');
    }
    if(task['assignedImg'][2] === undefined){
        document.getElementById(`collaborator3-${id_task}`).classList.add('d-none');
    }
    if(task['assignedImg'][3] === undefined){
        document.getElementById(`collaborator4-${id_task}`).classList.add('d-none');
    }

}




function templateBacklogTasks(categorycolor, id_task, task) {

    return /*html*/`
    <div onclick = "addBoard(${id_task})" class = "backlog-table-tasks" style = "border-left: 8px solid ${categorycolor};">

        <div class = "assigned_to" >
            <div class = backlog_profile_placeholder>
                <img id="collaborator1-${id_task}" class="backlog_profil_img" src="${task['assignedImg'][0]}" alt="" style = "margin-left: 0px">
                <img id="collaborator2-${id_task}" class="backlog_profil_img" src="${task['assignedImg'][1]}" alt="" style = "margin-left: -30px">
                <img id="collaborator3-${id_task}" class="backlog_profil_img" src="${task['assignedImg'][2]}" alt="" style = "margin-left: -30px">
                <img id="collaborator4-${id_task}" class="backlog_profil_img" src="${task['assignedImg'][3]}" alt="" style = "margin-left: -30px">
            </div>
            <p>${task['assignedTo']}</p>            
        </div>

        <div class="category">
            <p>${task['category']}</p>
        </div>
    
        <div class= "backlog_description">
            <p>${task['description']}</p>
        </div>
    </div>
`;
}


/**
 * On click the related element inside the main array "allTasks", changes the attribute "position" to "board".
 * Then after 2 seconds the BacklogTasks are newly rendered. That causes the disappearing of the element, because
 * the attribute "position" is no more set on "backlog".
 */
function addBoard(id_task) {
    
    let array = allTasks.filter(t => t['id'] == id_task);
    array[0].position = 'board';
    saveAllTasks();
    callDialog();

    setTimeout(() => {
        renderBacklogTasks();
    }, 2000);
}


/**
 * A dialog window is open, when a task in backlog is clicked. After 2 seconds the window is automatically close.
 */
function callDialog() {
    let dialog = document.getElementById('dialogBacklog');
    dialog.classList.remove('d-none');

    setTimeout(() => {
        dialog.classList.add('d-none');
    }, 2000);
}