const test = require('node:test');
const assert = require('node:assert/strict');
const { validateResponse } = require('./app.js');

test('必须选择有效回应', () => {
  for (const response of ['', 'invalid']) assert.ok(validateResponse(response, '').error);
});
test('答应时不接受空白时间', () => {
  for (const time of ['', '   ']) assert.ok(validateResponse('yes', time).error);
});
test('时间支持自然语言并去除两端空格', () => {
  assert.deepEqual(validateResponse('yes', ' 周六下午 '), { response: 'yes', time: '周六下午' });
  assert.deepEqual(validateResponse('yes', '时间再商量'), { response: 'yes', time: '时间再商量' });
});
test('婉拒不携带之前的时间', () => {
  assert.deepEqual(validateResponse('no', '周六下午'), { response: 'no', time: '' });
  assert.deepEqual(validateResponse('no', ''), { response: 'no', time: '' });
});
test('限制时间字段长度', () => {
  assert.ok(validateResponse('yes', '天'.repeat(101)).error);
  assert.equal(validateResponse('yes', '天'.repeat(100)).time.length, 100);
});
