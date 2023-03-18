const fieldSelect = document.getElementById('inputType2');
const fetchButton = document.getElementById('fetch-button');
const dataContainer = document.getElementById('data-container');

fetchButton.addEventListener('click', () => {
  const field = fieldSelect.value;
  fetch(`/crd.html?Event=${field}`)
    .then(res => res.json())
    .then(data => {
      let table = `<table>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Event</th>
                        <th>Played</th>
                        <th>Update</th>
                      </tr>
                    </thead>
                    <tbody>`;
      data.forEach(item => {
        table += `<tr>
                    <td>${item.id}</td>
                    <td>${item.event}</td>
                    <td>${item.played}</td>
                    <td>
                      <button onclick="updateData(${item.id})">Update</button>
                    </td>
                  </tr>`;
      });
      table += `</tbody>
                </table>`;
      dataContainer.innerHTML = table;
    })
    .catch(err => console.error(err));
});

function updateData(id) {
  const played = prompt('Enter new played value:');
  fetch(`/crd.html/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ played })
  })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error(err));
}
