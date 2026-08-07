import { baseUrl } from "./constants";

export async function checkResponse(response) {
  if (response.ok) {
    return response.json();
  }

  const errorData = await response.json().catch(() => ({}));
  return Promise.reject(
    new Error(
      errorData.message || `Request failed with status ${response.status}`,
    ),
  );
}

function getAuthorizationHeaders(token) {
  return {
    "Content-Type": "application/json",
    authorization: `Bearer ${token}`,
  };
}

export function getItems() {
  return fetch(`${baseUrl}/items`).then(checkResponse);
}

export function addItem({ name, imageUrl, weather }, token) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: getAuthorizationHeaders(token),
    body: JSON.stringify({ name, imageUrl, weather }),
  }).then(checkResponse);
}

export function deleteItem(itemId, token) {
  return fetch(`${baseUrl}/items/${itemId}`, {
    method: "DELETE",
    headers: getAuthorizationHeaders(token),
  }).then(checkResponse);
}

export function addCardLike(itemId, token) {
  return fetch(`${baseUrl}/items/${itemId}/likes`, {
    method: "PUT",
    headers: getAuthorizationHeaders(token),
  }).then(checkResponse);
}

export function removeCardLike(itemId, token) {
  return fetch(`${baseUrl}/items/${itemId}/likes`, {
    method: "DELETE",
    headers: getAuthorizationHeaders(token),
  }).then(checkResponse);
}
