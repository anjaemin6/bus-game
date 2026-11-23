// 브라우저(Playwright)에서 몇 단계를 실제로 눌러서 끝까지 해 본다.
// 쓰는 법: node tools/play.js easy 5 hard 12   (모드 단계 짝으로, 안 주면 보통 2·어려움 10)
const { chromium } = require('playwright'), path = require('path');
const args = process.argv.slice(2), pairs = [];
for (let i = 0; i + 1 < args.length; i += 2) pairs.push([args[i], +args[i + 1]]);
if (!pairs.length) pairs.push(['easy', 2], ['hard', 10]);
(async () => {
  const b = await chromium.launch(); const pg = await b.newPage({ viewport: { width: 400, height: 900 } });
  const errs = []; pg.on('pageerror', e => errs.push(e.message));
  await pg.goto('file://' + path.join(__dirname, '..', 'index.html'));
  for (const [d, k] of pairs) {
    await pg.evaluate(([d, k]) => { document.getElementById('quest').hidden = true;
      progress.seen = {mystery:true, cover:true, tunnel:true, diag:true, amb:true, flip:true};
      diff = d; levelNo = k; initNow(); }, [d, k]);
    const ids = await pg.evaluate(() => removalOrder(vehicles).map(v => v.id));
    const idle = () => pg.waitForFunction(() => !busy && !ticking && freeBay() >= 0 && !bays.some(s => s && (s.leaving || s.coming)), null, { timeout: 30000 });
    for (const id of ids) { await idle(); await pg.waitForTimeout(400); await idle(); await pg.click('#veh-' + id); }
    await pg.waitForSelector('#overlay:not([hidden])', { timeout: 180000 });
    console.log(`${d === 'easy' ? '보통' : '어려움'} ${k}단계 →`, await pg.evaluate(() => document.getElementById('ovTitle').textContent));
  }
  console.log('오류:', errs.length ? errs : '없음');
  await b.close();
})();
