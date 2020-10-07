function sendMove(query, callback) {
  return fetch(`api/chess?q=${query}`)
    .then(checkStatus)
    .then((res) => res.json())
    .then((result) => callback(result));
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(`HTTP Error ${response.statusText}`);
  error.status = response.statusText;
  error.response = response;
  console.log(error); // eslint-disable-line no-console
  throw error;
}

const Client = { sendMove };
export default Client;
