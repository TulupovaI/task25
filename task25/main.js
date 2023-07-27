const users = JSON.parse(localStorage.getItem('users')) || [
  {
    id: 'user1',
    name: 'Viktor',
    surname: 'Petrov',
    age: '28',
    city: 'Kharkiv',
    tel: '+380667895612',
  },
  {
    id: 'user2',
    name: 'Oleh',
    surname: 'Demchenko',
    age: '30',
    city: 'Kyiv',
    tel: '+380969955618',
  },
  {
    id: 'user3',
    name: 'Anna',
    surname: 'Belova',
    age: '25',
    city: 'Odesa',
    tel: '+380997895600',
  },
];

const userList = document.querySelector('.users__list');
const btnAdd = document.getElementById('add-users');
const userForm = document.getElementById('add-user-form');

const userDetails = document.querySelector('.user-details');
const userName = document.getElementById('user-name');
const userSurname = document.getElementById('user-surname');
const userAge = document.getElementById('user-age');
const userCity = document.getElementById('user-city');
const userTel = document.getElementById('user-tel');
const editUserButton = document.getElementById('edit-user');
const removeUserButton = document.getElementById('remove-user');
const closeDetailsButton = document.getElementById('close-details');
const addUserForm = document.getElementById('add-user-form');

let isFormVisible = false;

function renderUsers() {
  userList.innerHTML = '';
  users.forEach(user => {
    const listItem = document.createElement('li');
    listItem.textContent = `${user.name} ${user.surname}`;

    const viewButton = document.createElement('button');
    viewButton.textContent = 'View';
    viewButton.addEventListener('click', () => {
      displayUserDetails(user);
    });

    listItem.appendChild(viewButton);
    userList.appendChild(listItem);
  });
  // Рендерінг користувачів
}

function displayUserDetails(user) {
  userName.textContent = user.name;
  userSurname.textContent = user.surname;
  userAge.textContent = user.age;
  userCity.textContent = user.city;
  userTel.textContent = user.tel;

  userDetails.style.display = 'block';

  editUserButton.addEventListener('click', () => {
    // Виконуємо дії при редагуванні користувача
    const newName = prompt('Enter new name:', user.name);
    const newSurname = prompt('Enter new surname:', user.surname);
    const newAge = prompt('Enter new age:', user.age);
    const newCity = prompt('Enter new city:', user.city);
    const newTel = prompt('Enter new phone:', user.tel);

    if (newName && newSurname && newAge && newCity && newTel) {
      user.name = newName;
      user.surname = newSurname;
      user.age = newAge;
      user.city = newCity;
      user.tel = newTel;
      renderUsers();
      displayUserDetails(user);
      saveUsersToLocalStorage();
    }
  });

  removeUserButton.addEventListener('click', () => {
    // Виконуємо дії при видаленні користувача
    const confirmDelete = confirm('Are you sure you want to remove this user?');
    if (confirmDelete) {
      const index = users.indexOf(user);
      if (index !== -1) {
        users.splice(index, 1);
        renderUsers();
        userDetails.style.display = 'none';
        saveUsersToLocalStorage();
      }
    }
  });

  closeDetailsButton.addEventListener('click', () => {
    // Закриваємо блок з деталями користувача
    userDetails.style.display = 'none';
  });
}

addUserForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const surname = document.getElementById('surname').value;
  const age = document.getElementById('age').value;
  const city = document.getElementById('city').value;
  const tel = document.getElementById('tel').value;

  if (name && surname && age && city && tel) {
    const newUser = {
      id: `user${users.length + 1}`,
      name,
      surname,
      age,
      city,
      tel,
    };

    users.push(newUser);
    renderUsers();
    addUserForm.reset();
    saveUsersToLocalStorage();
  }
});

function saveUsersToLocalStorage() {
  localStorage.setItem('users', JSON.stringify(users));
}

renderUsers();

btnAdd.addEventListener('click', () => {
  if (isFormVisible) {
    addUserForm.style.display = 'none';
  } else {
    addUserForm.style.display = 'block';
  }
  isFormVisible = !isFormVisible;
});
