document.getElementById('addNamesButton').addEventListener('click', addNames);
document.getElementById('clearSearchButton').addEventListener('click', clearSearch);
document.getElementById('deleteAllButton').addEventListener('click', deleteAllNames);
document.getElementById('scrollTopButton').addEventListener('click', scrollToTop);
document.getElementById('searchInput').addEventListener('input', searchNames);

function addNames() {
const nameInput = document.getElementById('nameInput').value.trim();
if (nameInput) {
const names = nameInput.split('\n').map(name => name.trim()).filter(name => name);
const nameListContainer = document.getElementById('nameListContainer');
names.forEach(name => {
const nameList = document.createElement('ul');
nameList.className = 'nameList';
const listItem = document.createElement('li');
listItem.textContent = name;
const deleteButton = document.createElement('button');
deleteButton.textContent = 'Excluir';
deleteButton.addEventListener('click', () => {
if (confirm('Você tem certeza que deseja excluir esse contato?')) {
nameList.remove();
sortNames();
}
});
const editButton = document.createElement('button');
editButton.textContent = 'Editar';
editButton.addEventListener('click', () => {
const newName = prompt('Editar contato:', name);
if (newName) {
listItem.textContent = newName;
sortNames();
}
});
nameList.appendChild(listItem);
nameList.appendChild(deleteButton);
nameList.appendChild(editButton);
nameListContainer.appendChild(nameList);
});
document.getElementById('nameInput').value = '';
sortNames();
}
}

function clearSearch() {
document.getElementById('searchInput').value = '';
searchNames();
}

function deleteAllNames() {
if (confirm('Você tem certeza que deseja excluir todos os contatos?')) {
document.getElementById('nameListContainer').innerHTML = '';
}
}

function scrollToTop() {
window.scrollTo({ top: 0, behavior: 'smooth' });
}

function sortNames() {
const nameListContainer = document.getElementById('nameListContainer');
const nameLists = Array.from(nameListContainer.getElementsByClassName('nameList'));
nameLists.sort((a, b) => a.textContent.localeCompare(b.textContent));
nameListContainer.innerHTML = '';
nameLists.forEach(nameList => nameListContainer.appendChild(nameList));
}

function searchNames() {
const searchInput = document.getElementById('searchInput').value.toLowerCase();
const nameLists = document.getElementsByClassName('nameList');
Array.from(nameLists).forEach(nameList => {
const name = nameList.textContent.toLowerCase();
if (name.includes(searchInput)) {
nameList.style.display = '';
} else {
nameList.style.display = 'none';
}
});
}