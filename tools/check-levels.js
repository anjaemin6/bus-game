// 모든 단계를 컴퓨터로 끝까지 풀어 보고, 아슬아슬한지도 확인한다.
// 쓰는 법: node tools/check-levels.js
// index.html 안의 단계 만드는 코드("/* Level data." 부터)를 그대로 꺼내서 쓴다.
const fs = require('fs'), path = require('path'), vm = require('vm');
const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const a = html.indexOf('/* Level data.'), b = html.indexOf('let tunnels = [');
if (a < 0 || b < 0) { console.error('index.html에서 단계 코드를 못 찾았어요'); process.exit(1); }
const ctx = {}; vm.createContext(ctx);
vm.runInContext(html.slice(a, b) + '\n;this.M = {makeLevel, solvesCleanly, greedyWins, LEVEL_COUNT};', ctx);
const { makeLevel, solvesCleanly, greedyWins, LEVEL_COUNT } = ctx.M;
let bad = 0;
for (const md of ['easy', 'hard']) {
  const out = []; let worst = 0, tight = 0;
  for (let k = 1; k <= LEVEL_COUNT; k++) {
    const t = Date.now(), L = makeLevel(k, md), ms = Date.now() - t; worst = Math.max(worst, ms);
    const rec = {}, ok = L && solvesCleanly(L, rec), easy = L && greedyWins(L);
    if (!ok) bad++; if (ok && !easy) tight++;
    out.push(`${k}:${ok ? '' : '못깸!'}${L ? L.n + 'x' + L.n + '/' + L.vehicles.length + '대' : ''}${easy ? '' : '(빠듯)'}`);
  }
  console.log(`${md === 'easy' ? '보통' : '어려움'}: ${out.join(' ')}\n  → 빠듯한 판 ${tight}/${LEVEL_COUNT}, 가장 오래 걸린 판 ${worst}ms`);
}
console.log(bad ? `못 깨는 단계 ${bad}개!` : '모든 단계를 깰 수 있어요.');
process.exit(bad ? 1 : 0);
