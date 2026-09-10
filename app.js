function validateResponse(response, time) {
  if (!['yes', 'no'].includes(response)) return { error: '先选一个回应吧。' };
  const value = time.trim();
  if (response === 'yes' && !value) return { error: '写下方便的时间，或填写“时间再商量”。' };
  if (response === 'yes' && value.length > 100) return { error: '时间请控制在 100 字以内。' };
  return { response, time: response === 'yes' ? value : '' };
}

if (typeof module !== 'undefined') module.exports = { validateResponse };

if (typeof document !== 'undefined') {
  const form = document.querySelector('#invite-form');
  const time = document.querySelector('#time');
  const error = document.querySelector('#error');
  const formView = document.querySelector('#form-view');
  const resultView = document.querySelector('#result-view');
  form.addEventListener('change', () => {
    const accepted = form.elements.response.value === 'yes';
    document.querySelector('#time-field').hidden = !accepted;
    time.required = accepted;
    if (!accepted) time.value = '';
    error.textContent = '';
  });
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const result = validateResponse(form.elements.response.value, time.value);
    error.textContent = result.error || '';
    if (result.error) return;
    document.querySelector('#result-title').textContent = result.response === 'yes' ? '收到，已经开始期待了！' : '收到，谢谢你的回应。';
    document.querySelector('#result-detail').textContent = result.response === 'yes' ? `一起吃点好吃的 · ${result.time}` : '没关系，希望你今天也有好心情。';
    formView.hidden = true;
    resultView.hidden = false;
    resultView.focus();
  });
  document.querySelector('#restart').addEventListener('click', () => {
    form.reset();
    time.required = false;
    document.querySelector('#time-field').hidden = true;
    error.textContent = '';
    resultView.hidden = true;
    formView.hidden = false;
    form.querySelector('input').focus();
  });
}
