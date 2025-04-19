
async function fetchAndDisplayUsers() {
  const userList = document.getElementById('userDetails');
  const message = document.getElementById('message');
  
  try {
    
    message.textContent = 'Loading users...';

    
    const response = await fetch('https://jsonplaceholder.typicode.com/users');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const users = await response.json();

    
    userDetails.textContent = '';

    
    users.forEach(user => {
      const li = document.createElement('li');
      li.innerHTML =
       `<h2>${user.name}</h2>
      <P>User Email>: ${user.email} </P>
      <P> user Address ${user.address.city} </P>
       <P> User num ${user.phone}</P
      <P>user Acompany  ${user.company.name} </P>
       `;
       
      userList.appendChild(li);
    });
  } catch (error) {
    
    message.textContent = `Error fetching users: ${error.message}`;
  }
}

// Call the function
fetchAndDisplayUsers();
