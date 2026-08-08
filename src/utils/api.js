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

export function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

function getAuthorizationHeaders(token) {
  return {
    "Content-Type": "application/json",
    authorization: `Bearer ${token}`,
  };
}

export function getItems() {
  return request(`${baseUrl}/items`);
}

export function addItem({ name, imageUrl, weather }, token) {
  return request(`${baseUrl}/items`, {
    method: "POST",
    headers: getAuthorizationHeaders(token),
    body: JSON.stringify({ name, imageUrl, weather }),
  });
}

export function deleteItem(itemId, token) {
  return request(`${baseUrl}/items/${itemId}`, {
    method: "DELETE",
    headers: getAuthorizationHeaders(token),
  });
}

export function addCardLike(itemId, token) {
  return request(`${baseUrl}/items/${itemId}/likes`, {
    method: "PUT",
    headers: getAuthorizationHeaders(token),
  });
}

export function removeCardLike(itemId, token) {
  return request(`${baseUrl}/items/${itemId}/likes`, {
    method: "DELETE",
    headers: getAuthorizationHeaders(token),
  });
}
