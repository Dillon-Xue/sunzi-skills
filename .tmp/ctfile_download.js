const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    viewport: { width: 1280, height: 800 }
  });
  const page = await context.newPage();

  const ctfileUrl = 'https://url89.ctfile.com/f/31084289-1357659521-e75f95?pwd=8866';

  console.log('Navigating to ctfile URL...');
  await page.goto(ctfileUrl, { waitUntil: 'networkidle', timeout: 30000 });

  // Take screenshot to see what's on the page
  await page.screenshot({ path: 'D:/forworkbuddy/2026-08-11-22-06-03/.tmp/ctfile_screenshot1.png' });
  console.log('Screenshot 1 saved');

  // Wait a bit for JS to render
  await page.waitForTimeout(3000);

  // Check if there's a password input
  const pageContent = await page.content();
  console.log('Page title:', await page.title());
  console.log('Page URL:', page.url());

  // Try to find password input and fill it
  try {
    const passwordInput = await page.$('input[type="password"], input#password, input[name="password"]');
    if (passwordInput) {
      console.log('Found password input, filling with 8866...');
      await passwordInput.fill('8866');

      // Click decrypt/submit button
      const decryptBtn = await page.$('button:has-text("解密"), button:has-text("确定"), button:has-text("提交"), input[type="submit"], a:has-text("解密")');
      if (decryptBtn) {
        console.log('Found decrypt button, clicking...');
        await decryptBtn.click();
        await page.waitForTimeout(5000);
      }
    } else {
      console.log('No password input found. Page might have auto-decrypted or has different layout.');
    }
  } catch (e) {
    console.log('Error during password fill:', e.message);
  }

  // Take another screenshot
  await page.screenshot({ path: 'D:/forworkbuddy/2026-08-11-22-06-03/.tmp/ctfile_screenshot2.png' });
  console.log('Screenshot 2 saved');

  // Extract JavaScript variables from the page
  const vars = await page.evaluate(() => {
    return {
      api_server: typeof api_server !== 'undefined' ? api_server : null,
      userid: typeof userid !== 'undefined' ? userid : null,
      file_id: typeof file_id !== 'undefined' ? file_id : null,
      share_id: typeof share_id !== 'undefined' ? share_id : null,
      file_chk: typeof file_chk !== 'undefined' ? file_chk : null,
      start_time: typeof start_time !== 'undefined' ? start_time : null,
      wait_seconds: typeof wait_seconds !== 'undefined' ? wait_seconds : null,
      verifycode: typeof verifycode !== 'undefined' ? verifycode : null,
      // Also check for file_name and other useful vars
      file_name: typeof file_name !== 'undefined' ? file_name : null,
      file_size: typeof file_size !== 'undefined' ? file_size : null,
      // Check if there's a download button
      bodyText: document.body ? document.body.innerText.substring(0, 2000) : 'no body'
    };
  });

  console.log('Extracted variables:', JSON.stringify(vars, null, 2));

  // If we have the necessary variables, call the download API
  if (vars.api_server && vars.userid && vars.file_id) {
    console.log('\nCalling download API...');

    const apiUrl = vars.api_server + '/get_file_url.php?uid=' + vars.userid
      + '&fid=' + vars.file_id + '&folder_id=0&share_id=' + (vars.share_id || '')
      + '&file_chk=' + vars.file_chk + '&start_time=' + vars.start_time
      + '&wait_seconds=' + vars.wait_seconds + '&mb=0&app=0&acheck=0'
      + '&verifycode=' + (vars.verifycode || '') + '&rd=' + Math.random();

    console.log('API URL:', apiUrl);

    const apiResult = await page.evaluate(async (url) => {
      try {
        const headers = typeof getAjaxHeaders === 'function' ? getAjaxHeaders() : {};
        const resp = await fetch(url, { headers: headers });
        const data = await resp.json();
        return JSON.stringify(data);
      } catch(e) {
        return 'Error: ' + e.message;
      }
    }, apiUrl);

    console.log('API result:', apiResult);
  } else {
    console.log('Missing required variables for API call');
    // Try to find any download links on the page
    const links = await page.evaluate(() => {
      const anchors = Array.from(document.querySelectorAll('a'));
      return anchors.map(a => ({
        text: a.innerText.trim(),
        href: a.href
      })).filter(l => l.href && (l.href.includes('download') || l.href.includes('getfile') || l.text.includes('下载')));
    });
    console.log('Download links found:', JSON.stringify(links, null, 2));
  }

  await browser.close();
  console.log('\nDone!');
})();
