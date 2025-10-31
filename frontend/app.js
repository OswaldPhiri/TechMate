const API_BASE_URL = (localStorage.getItem('techmate-api') || 'http://localhost:4000');

// Theme handling
(function initTheme() {
  const root = document.documentElement;
  const toggle = document.getElementById('themeToggle');
  const pref = localStorage.getItem('techmate-theme') || 'light';
  root.setAttribute('data-theme', pref);
  if (toggle) {
    toggle.checked = pref === 'dark';
    toggle.addEventListener('change', () => {
      const theme = toggle.checked ? 'dark' : 'light';
      root.setAttribute('data-theme', theme);
      localStorage.setItem('techmate-theme', theme);
    });
  }
})();

const elList = document.getElementById('symptomList');
const elResults = document.getElementById('results');
const elDiagnose = document.getElementById('diagnoseBtn');
const elClear = document.getElementById('clearBtn');

let symptoms = [];

function createSymptomItem(symptom) {
  const wrap = document.createElement('label');
  wrap.className = 'symptom-item';
  const chk = document.createElement('input');
  chk.type = 'checkbox';
  chk.value = String(symptom.id);
  const name = document.createElement('div');
  name.style.fontWeight = '600';
  name.textContent = symptom.name;
  const desc = document.createElement('div');
  desc.style.color = 'var(--muted)';
  desc.style.fontSize = '13px';
  desc.textContent = symptom.description || '';
  const right = document.createElement('div');
  right.style.display = 'grid';
  right.appendChild(name);
  right.appendChild(desc);
  wrap.appendChild(chk);
  wrap.appendChild(right);
  return wrap;
}

async function loadSymptoms() {
  elList.textContent = 'Loading symptoms...';
  try {
    const res = await fetch(`${API_BASE_URL}/api/symptoms`);
    const data = await res.json();
    symptoms = Array.isArray(data) ? data : [];
    elList.innerHTML = '';
    symptoms.forEach(s => elList.appendChild(createSymptomItem(s)));
  } catch (e) {
    elList.textContent = 'Failed to load symptoms. Check backend server.';
  }
}

function getSelectedSymptomIds() {
  return Array.from(elList.querySelectorAll('input[type="checkbox"]:checked')).map(i => Number(i.value));
}

function renderResults(payload) {
  elResults.innerHTML = '';
  if (!payload || !Array.isArray(payload.results) || payload.results.length === 0) {
    const empty = document.createElement('div');
    empty.textContent = 'No probable problems found. Try selecting more symptoms.';
    elResults.appendChild(empty);
    return;
  }
  payload.results.forEach(r => {
    const card = document.createElement('div');
    card.className = 'result-item';
    const title = document.createElement('h4');
    title.textContent = `${r.name} (${r.type})`;
    const meta = document.createElement('div');
    meta.className = 'result-meta';
    meta.textContent = `Likelihood score: ${Number(r.likelihoodScore).toFixed(2)} • Matched symptoms: ${r.matchedSymptoms}`;
    const desc = document.createElement('div');
    desc.style.margin = '6px 0 8px';
    desc.textContent = r.description || '';
    const steps = document.createElement('ol');
    (r.solutionSteps || []).forEach(step => {
      const li = document.createElement('li');
      li.textContent = step;
      steps.appendChild(li);
    });
    card.appendChild(title);
    card.appendChild(meta);
    card.appendChild(desc);
    if ((r.solutionSteps || []).length) {
      const stepsHdr = document.createElement('div');
      stepsHdr.style.fontWeight = '600';
      stepsHdr.style.marginTop = '6px';
      stepsHdr.textContent = 'Steps:';
      card.appendChild(stepsHdr);
      card.appendChild(steps);
    }
    elResults.appendChild(card);
  });
}

async function diagnose() {
  const ids = getSelectedSymptomIds();
  if (ids.length === 0) {
    alert('Please select at least one symptom.');
    return;
  }
  elResults.textContent = 'Analyzing...';
  try {
    const res = await fetch(`${API_BASE_URL}/api/diagnose`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ symptomIds: ids }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Request failed');
    renderResults(data);
  } catch (e) {
    elResults.textContent = 'Failed to retrieve results. Ensure API is running.';
  }
}

elDiagnose.addEventListener('click', diagnose);
elClear.addEventListener('click', () => {
  elResults.innerHTML = '';
  Array.from(elList.querySelectorAll('input[type="checkbox"]')).forEach(i => (i.checked = false));
});

loadSymptoms();


