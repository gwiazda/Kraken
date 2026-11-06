const app = document.querySelector<HTMLElement>('#app');
if (!app) {
  throw new Error('Missing #app element in index.html');
}

const heading = document.createElement('h1');
heading.textContent = 'Kraken';

const note = document.createElement('p');
note.className = 'muted';
note.textContent = 'Setup works. Google sign-in comes next.';

app.replaceChildren(heading, note);
