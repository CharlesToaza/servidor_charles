const API_URL = '/api/tasks';

const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const filterInput = document.getElementById('filter-input');
const list = document.getElementById('task-list');
const status = document.getElementById('status');

let tasks = [];

async function fetchTasks() {
  status.textContent = 'Cargando...';
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('Error al obtener tareas');
    tasks = await res.json();
    render();
    status.textContent = '';
  } catch (err) {
    status.textContent = 'No se pudo conectar con el servidor.';
  }
}

function render() {
  const query = filterInput.value.trim().toLowerCase();
  const filtered = query
    ? tasks.filter(t => t.title.toLowerCase().includes(query))
    : tasks;

  list.innerHTML = '';
  if (filtered.length === 0) {
    list.innerHTML = '<li class="task-item"><span class="task-title">Sin tareas para mostrar.</span></li>';
    return;
  }

  filtered.forEach(task => {
    const li = document.createElement('li');
    li.className = 'task-item' + (task.done ? ' done' : '');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.done;
    checkbox.addEventListener('change', () => toggleDone(task));

    const title = document.createElement('span');
    title.className = 'task-title';
    title.textContent = task.title;
    title.addEventListener('dblclick', () => editTask(task));

    const delBtn = document.createElement('button');
    delBtn.className = 'btn-delete';
    delBtn.textContent = 'Eliminar';
    delBtn.addEventListener('click', () => deleteTask(task.id));

    li.append(checkbox, title, delBtn);
    list.appendChild(li);
  });
}

// INSERTAR
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = input.value.trim();
  if (!title) return;
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title })
    });
    if (!res.ok) throw new Error();
    const newTask = await res.json();
    tasks.unshift(newTask);
    input.value = '';
    render();
  } catch {
    status.textContent = 'Error al agregar la tarea.';
  }
});

// ACTUALIZAR - estado (done)
async function toggleDone(task) {
  try {
    const res = await fetch(`${API_URL}/${task.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ done: !task.done })
    });
    if (!res.ok) throw new Error();
    const updated = await res.json();
    tasks = tasks.map(t => (t.id === updated.id ? updated : t));
    render();
  } catch {
    status.textContent = 'Error al actualizar la tarea.';
  }
}

// ACTUALIZAR - título
async function editTask(task) {
  const newTitle = prompt('Editar tarea:', task.title);
  if (newTitle === null || !newTitle.trim() || newTitle.trim() === task.title) return;
  try {
    const res = await fetch(`${API_URL}/${task.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTitle.trim() })
    });
    if (!res.ok) throw new Error();
    const updated = await res.json();
    tasks = tasks.map(t => (t.id === updated.id ? updated : t));
    render();
  } catch {
    status.textContent = 'Error al editar la tarea.';
  }
}

// ELIMINAR
async function deleteTask(id) {
  if (!confirm('¿Eliminar esta tarea?')) return;
  try {
    const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (!res.ok && res.status !== 204) throw new Error();
    tasks = tasks.filter(t => t.id !== id);
    render();
  } catch {
    status.textContent = 'Error al eliminar la tarea.';
  }
}

// FILTRO en tiempo real
filterInput.addEventListener('input', render);

fetchTasks();
