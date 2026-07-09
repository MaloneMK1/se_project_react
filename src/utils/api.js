const baseUrl = "http://localhost:3001";

function checkResponse(response) {
  if (response.ok) {
    return response.json();
  }

  return Promise.reject(`Error: ${response.status}`);
}

export function getItems() {
  return fetch(`${baseUrl}/items`).then(checkResponse);
}

export function addItem({ name, imageUrl, weather }) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, imageUrl, weather }),
  }).then(checkResponse);
}

export function deleteItem(itemId) {
  return fetch(`${baseUrl}/items/${itemId}`, {
    method: "DELETE",
  }).then(checkResponse);
}
