const controllerPromisse = new AbortController();
const promisseStarted = document.querySelector('#promisse-started');
const promisseAborted = document.querySelector('#promisse-aborted');
const promisseStatus = document.querySelector('#promisse-status');
const dummyPromisses = signal => {
  return new Promise((resolve, reject) => {
    promisseStatus.innerHTML = 'Promessa iniciada';
    const response = window.setTimeout(resolve, 5000, 'Promessa resolvida');
    signal.addEventListener('abort', () => {
      window.clearTimeout(response)
      return reject('Promessa rejeitada');
    });
  });
};
promisseStarted.addEventListener('click', () => {
  dummyPromisses(controllerPromisse.signal)
    .then(response => {
      promisseStatus.innerHTML = response;
    }).catch(error => {
      promisseStatus.innerHTML = error;
    });
});
promisseAborted.addEventListener('click', () => {
  controllerPromisse.abort();
});
