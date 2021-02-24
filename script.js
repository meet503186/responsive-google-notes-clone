const addButton = document.getElementById('add');

// updating data in local storage
const updateLSData = () => {
    const textAreaData = document.querySelectorAll('textarea');
    
    // creating an empty array to store the data
    const notes = [];

    // storing the data in notes array
    textAreaData.forEach((note) => {
        return notes.push(note.value);
    });

    // storing data in local storage
    localStorage.setItem('notes', JSON.stringify(notes));
}
const addNewNote = (text = '') => {
    const note = document.createElement('div');
    note.classList.add('note');
    
    const htmlData = `
    <div class="operation">
        <button class="edit"><i class="fas fa-edit"></i></button>&nbsp;
        <button class="delete"><i class="fas fa-trash-alt"></i></button>
    </div>

    <div class="main ${text ? "" : "hidden"}"></div>
        <textarea class="${text ? "hidden" : ""}"></textarea>
    `;

    note.insertAdjacentHTML('afterbegin',htmlData);


    // getting the References

    const editButton = note.querySelector('.edit');
    const deleteButton = note.querySelector('.delete');
    const mainDiv = note.querySelector('.main');
    const textArea = note.querySelector('textarea');

    // deleting the note
    deleteButton.addEventListener('click', () => {
        note.remove();
       updateLSData();
    });


    // toggle using edit button
    textArea.value = text;
    mainDiv.innerHTML = text;
    editButton.addEventListener('click', () => {
        mainDiv.classList.toggle('hidden');
        textArea.classList.toggle('hidden');
    });

    textArea.addEventListener('change', (event) => {
        const value = event.target.value;
        mainDiv.innerHTML = value;

        updateLSData();
    });


    // adding note div in body
    document.body.appendChild(note);
}

// getting data back from localStorage
const notes = JSON.parse(localStorage.getItem('notes'));
if(notes){ notes.forEach((note) => addNewNote(note))};

addButton.addEventListener('click', () => addNewNote() );