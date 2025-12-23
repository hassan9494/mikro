const puppeteer = require('puppeteer');
const fs = require('fs');
(async () => {
  try {
    console.log('Launching Chromium...');
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();

    // Emulate iPhone X-like viewport and userAgent
    await page.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true });
    await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.2 Mobile/15E148 Safari/604.1');

    const consoleMsgs = [];
    page.on('console', (msg) => {
      consoleMsgs.push({ type: msg.type(), text: msg.text() });
      console.log('PAGE_CONSOLE', msg.type(), msg.text());
    });
    page.on('pageerror', (err) => {
      consoleMsgs.push({ type: 'pageerror', text: err && err.message ? err.message : String(err) });
      console.error('PAGE_ERROR', err && err.message ? err.message : String(err));
    });

    // Allow overriding the target URL for cross-site diagnostics
    const targetUrl = process.env.TARGET_URL;
    const port = process.env.PORT || 3004;
    const url = targetUrl ? targetUrl : `http://localhost:${port}/`;
    console.log('Navigating to', url);
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 45000 });
    // Fallback wait to be compatible with any puppeteer version
    await new Promise((res) => setTimeout(res, 1500));

    const html = await page.content();
    fs.writeFileSync('reports/homepage_mobile.html', html, 'utf8');

    // collect list of images and their alt attributes (diagnostic)
    try {
      const images = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('img')).map(img => ({ alt: img.getAttribute('alt'), src: img.getAttribute('src'), width: img.width, height: img.height }));
      });
      consoleMsgs.push({ type: 'info', text: `images:${JSON.stringify(images)}` });
    } catch (e) {
      consoleMsgs.push({ type: 'error', text: `image-list failed: ${e.message}` });
    }

    // wait for logo element (if present) and capture detailed diagnostics
    let logoInfo = null;
    try {
      await page.waitForSelector("img[alt='Shop Logo'], img[alt='shop logo']", { timeout: 10000 });
      // capture initial metrics
      const pre = await page.evaluate(() => {
        const img = document.querySelector("img[alt='Shop Logo'], img[alt='shop logo']");
        if (!img) return null;
        const r = img.getBoundingClientRect();
        const style = window.getComputedStyle(img);
        return {
          width: r.width,
          height: r.height,
          top: r.top,
          left: r.left,
          offsetWidth: img.offsetWidth,
          offsetHeight: img.offsetHeight,
          display: style.display,
          visibility: style.visibility,
          widthStyle: style.width,
          heightStyle: style.height,
          src: img.getAttribute('src'),
          loading: img.getAttribute('loading'),
          fetchpriority: img.getAttribute('fetchpriority') || img.getAttribute('fetchPriority') || img.fetchPriority || null
        };
      });

      // if the logo appears collapsed, try forcing inline size for diagnostic purposes
      if (pre && (pre.width === 0 || pre.offsetWidth === 0 || pre.height === 0 || pre.offsetHeight === 0)) {
        consoleMsgs.push({ type: 'warn', text: `logo collapsed (pre): ${JSON.stringify(pre)} - forcing inline styles as diagnostic` });
        await page.evaluate(() => {
          const img = document.querySelector("img[alt='Shop Logo'], img[alt='shop logo']");
          if (!img) return null;
          img.style.setProperty('display', 'inline-block', 'important');
          img.style.setProperty('width', '200px', 'important');
          img.style.setProperty('height', '40px', 'important');
          img.style.setProperty('max-width', '200px', 'important');
          img.style.setProperty('min-width', '40px', 'important');
          return true;
        });
        // give the layout a moment to update
        await new Promise(res => setTimeout(res, 300));
      }

      // capture post-forcing metrics
      const post = await page.evaluate(() => {
        const img = document.querySelector("img[alt='Shop Logo'], img[alt='shop logo']");
        if (!img) return null;
        const r = img.getBoundingClientRect();
        const style = window.getComputedStyle(img);
        // also capture parent chain for potential stacking context issues
        const parents = [];
        let p = img.parentElement;
        for (let i = 0; i < 6 && p; i++) {
          const ps = window.getComputedStyle(p);
          parents.push({ tag: p.tagName, position: ps.position, zIndex: ps.zIndex, overflow: ps.overflow });
          p = p.parentElement;
        }
        return {
          width: r.width,
          height: r.height,
          offsetWidth: img.offsetWidth,
          offsetHeight: img.offsetHeight,
          display: style.display,
          visibility: style.visibility,
          widthStyle: style.width,
          heightStyle: style.height,
          src: img.getAttribute('src'),
          loading: img.getAttribute('loading'),
          fetchpriority: img.getAttribute('fetchpriority') || img.getAttribute('fetchPriority') || img.fetchPriority || null,
          parents
        };
      });

      logoInfo = { pre, post };
    } catch (e) {
      consoleMsgs.push({ type: 'error', text: `logo diagnostics failed: ${e.message}` });
    }

    if (logoInfo) {
      consoleMsgs.push({ type: 'info', text: `logoInfo:${JSON.stringify(logoInfo)}` });
    } else {
      consoleMsgs.push({ type: 'info', text: 'logoInfo: not found' });
    }

    // take a full page screenshot (default view)
    try { await page.screenshot({ path: 'reports/homepage_mobile.png', fullPage: true }); } catch(e) { consoleMsgs.push({ type: 'screenshot-error', text: e.message }); console.error('SCREENSHOT_ERR', e.message); }

    // Attempt to open the mobile drawer by clicking its handler and capture diagnostics
    try {
      const handler = await page.$('.drawer__handler');
      if (handler) {
        await handler.click();
        // give animations and layout time to settle
        await new Promise(res => setTimeout(res, 600));

        // also test opening the search modal to verify it's aligned to top on mobile
        try {
          const searchIcon = await page.$('.searchIconWrapper');
          if (searchIcon) {
            await searchIcon.click();
            await new Promise(res => setTimeout(res, 600));

            // capture search modal diagnostics
            const searchDiag = await page.evaluate(() => {
              const overlayCustom = document.querySelector('.search-modal-mobile-overlay');
              const overlays = Array.from(document.querySelectorAll('.modal-overlay'));
              const overlay = overlays[0] || null;
              const box = document.querySelector('.search-modal-mobile');
              const sOverlay = overlay ? window.getComputedStyle(overlay) : null;
              const sCustom = overlayCustom ? window.getComputedStyle(overlayCustom) : null;
              const sBox = box ? window.getComputedStyle(box) : null;
              return {
                modalOverlayCount: overlays.length,
                modalOverlayClassNames: overlay ? overlay.className : null,
                overlayComputed: sOverlay ? { display: sOverlay.display, alignItems: sOverlay.alignItems, justifyContent: sOverlay.justifyContent, zIndex: sOverlay.zIndex } : null,
                overlayCustomExists: !!overlayCustom,
                customOverlayComputed: sCustom ? { display: sCustom.display, alignItems: sCustom.alignItems, justifyContent: sCustom.justifyContent, zIndex: sCustom.zIndex } : null,
                boxComputed: sBox ? { display: sBox.display, width: sBox.width, height: sBox.height, background: sBox.background, top: sBox.top, left: sBox.left, className: box.className } : null
              };
            });
            consoleMsgs.push({ type: 'info', text: `searchDiag:${JSON.stringify(searchDiag)}` });
            try { await page.screenshot({ path: 'reports/homepage_mobile_search.png', fullPage: false }); } catch(e) { consoleMsgs.push({ type: 'screenshot-error', text: `search screenshot failed: ${e.message}` }); }

            // close the modal
            await page.evaluate(() => { const closeBtn = document.querySelector('.search-modal-mobile button'); if (closeBtn) closeBtn.click(); });
            await new Promise(res => setTimeout(res, 300));
          } else {
            consoleMsgs.push({ type: 'info', text: 'search icon not found' });
          }
        } catch(e) {
          consoleMsgs.push({ type: 'error', text: `search diag failed: ${e.message}` });
        }

        // attempt to open the cart popup and capture its position
        try {
          const cartBtn = await page.$('.fixedCartPopup');
          if (cartBtn) {
            await cartBtn.click();
            await new Promise(res => setTimeout(res, 600));

            const cartDiag = await page.evaluate(() => {
              const overlays = Array.from(document.querySelectorAll('.modal-overlay'));
              const overlay = overlays[0] || null;
              const box = document.querySelector('.cartPopup');
              const sOverlay = overlay ? window.getComputedStyle(overlay) : null;
              const sBox = box ? window.getComputedStyle(box) : null;
              return {
                modalOverlayCount: overlays.length,
                modalOverlayClassNames: overlay ? overlay.className : null,
                overlayComputed: sOverlay ? { display: sOverlay.display, alignItems: sOverlay.alignItems, justifyContent: sOverlay.justifyContent, zIndex: sOverlay.zIndex } : null,
                boxComputed: sBox ? { display: sBox.display, width: sBox.width, height: sBox.height, background: sBox.background, top: sBox.top, left: sBox.left, bottom: sBox.bottom, right: sBox.right, className: box.className } : null
              };
            });
            consoleMsgs.push({ type: 'info', text: `cartDiag:${JSON.stringify(cartDiag)}` });
            try { await page.screenshot({ path: 'reports/homepage_mobile_cart.png', fullPage: true }); } catch(e) { consoleMsgs.push({ type: 'screenshot-error', text: `cart screenshot failed: ${e.message}` }); }

            // close the cart modal
            await page.evaluate(() => { const closeBtn = document.querySelector('.cartPopup button'); if (closeBtn) closeBtn.click(); });
            await new Promise(res => setTimeout(res, 300));
          } else {
            consoleMsgs.push({ type: 'info', text: 'cart button not found' });
          }
        } catch(e) {
          consoleMsgs.push({ type: 'error', text: `cart diag failed: ${e.message}` });
        }
        // inspect mask presence before opening
        const maskBefore = await page.evaluate(() => {
          const masks = Array.from(document.querySelectorAll('.rc-drawer-mask'));
          return masks.map(m => {
            const s = window.getComputedStyle(m);
            return { display: s.display, visibility: s.visibility, opacity: s.opacity, pointerEvents: s.pointerEvents, zIndex: s.zIndex };
          });
        });
        consoleMsgs.push({ type: 'info', text: `drawerMaskBefore:${JSON.stringify(maskBefore)}` });

        // inspect handler before open
        const handlerBefore = await page.evaluate(() => {
          const h = document.querySelector('.drawer__handler');
          if (!h) return null;
          const s = window.getComputedStyle(h);
          return { display: s.display, visibility: s.visibility, pointerEvents: s.pointerEvents, zIndex: s.zIndex };
        });
        consoleMsgs.push({ type: 'info', text: `drawerHandlerBefore:${JSON.stringify(handlerBefore)}` });

        const drawerDiag = await page.evaluate(() => {
          const d = document.querySelector('.rc-drawer, .drawer');
          const footer = document.querySelector('footer');
          if (!d) return { found: false };
          const dr = d.getBoundingClientRect();
          const ds = window.getComputedStyle(d);
          const fr = footer ? footer.getBoundingClientRect() : null;
          return {
            found: true,
            top: dr.top,
            left: dr.left,
            width: dr.width,
            height: dr.height,
            display: ds.display,
            position: ds.position,
            zIndex: ds.zIndex,
            footerTop: fr ? fr.top : null
          };
        });
        consoleMsgs.push({ type: 'info', text: `drawerDiag:${JSON.stringify(drawerDiag)}` });
        try { await page.screenshot({ path: 'reports/homepage_mobile_drawer.png', fullPage: true }); } catch(e) { consoleMsgs.push({ type: 'screenshot-error', text: `drawer screenshot failed: ${e.message}` }); }

        // check mask after opening
        const maskAfterOpen = await page.evaluate(() => {
          const masks = Array.from(document.querySelectorAll('.rc-drawer-mask'));
          return masks.map(m => {
            const s = window.getComputedStyle(m);
            return { display: s.display, visibility: s.visibility, opacity: s.opacity, pointerEvents: s.pointerEvents, zIndex: s.zIndex };
          });
        });
        consoleMsgs.push({ type: 'info', text: `drawerMaskAfterOpen:${JSON.stringify(maskAfterOpen)}` });

        // close drawer
        await handler.click();
        await new Promise(res => setTimeout(res, 400));

        // check mask after close
        const maskAfterClose = await page.evaluate(() => {
          const masks = Array.from(document.querySelectorAll('.rc-drawer-mask'));
          return masks.map(m => {
            const s = window.getComputedStyle(m);
            return { display: s.display, visibility: s.visibility, opacity: s.opacity, pointerEvents: s.pointerEvents, zIndex: s.zIndex };
          });
        });
        consoleMsgs.push({ type: 'info', text: `drawerMaskAfterClose:${JSON.stringify(maskAfterClose)}` });

        // inspect handler after close
        const handlerAfterClose = await page.evaluate(() => {
          const h = document.querySelector('.drawer__handler');
          if (!h) return null;
          const s = window.getComputedStyle(h);
          return { display: s.display, visibility: s.visibility, pointerEvents: s.pointerEvents, zIndex: s.zIndex };
        });
        consoleMsgs.push({ type: 'info', text: `drawerHandlerAfterClose:${JSON.stringify(handlerAfterClose)}` });

        // small delay after close so DOM settles
        await new Promise(res => setTimeout(res, 300));

        // attempt to reopen by clicking the handler again
        try {
          await handler.click();
          await new Promise(res => setTimeout(res, 600));

          const maskAfterReopen = await page.evaluate(() => {
            const masks = Array.from(document.querySelectorAll('.rc-drawer-mask'));
            return masks.map(m => {
              const s = window.getComputedStyle(m);
              return { display: s.display, visibility: s.visibility, opacity: s.opacity, pointerEvents: s.pointerEvents, zIndex: s.zIndex };
            });
          });
          consoleMsgs.push({ type: 'info', text: `drawerMaskAfterReopen:${JSON.stringify(maskAfterReopen)}` });

          const drawerDiagAfterReopen = await page.evaluate(() => {
            const d = document.querySelector('.rc-drawer, .drawer');
            if (!d) return { found: false };
            const dr = d.getBoundingClientRect();
            const ds = window.getComputedStyle(d);
            return {
              found: true,
              top: dr.top,
              left: dr.left,
              width: dr.width,
              height: dr.height,
              display: ds.display,
              position: ds.position,
              zIndex: ds.zIndex,
            };
          });
          consoleMsgs.push({ type: 'info', text: `drawerDiagAfterReopen:${JSON.stringify(drawerDiagAfterReopen)}` });
          try { await page.screenshot({ path: 'reports/homepage_mobile_drawer_after_reopen.png', fullPage: true }); } catch(e) { consoleMsgs.push({ type: 'screenshot-error', text: `drawer reopen screenshot failed: ${e.message}` }); }

        } catch (e) {
          consoleMsgs.push({ type: 'error', text: `drawer reopen attempt failed: ${e.message}` });
        }

      } else {
        consoleMsgs.push({ type: 'info', text: 'drawer handler not found' });
      }
    } catch (e) {
      consoleMsgs.push({ type: 'error', text: `drawer diag failed: ${e.message}` });
    }

    fs.writeFileSync('reports/homepage_mobile_console.json', JSON.stringify(consoleMsgs, null, 2));

    console.log('DONE', { htmlLength: html.length, consoleCount: consoleMsgs.length });

    await browser.close();
  } catch (err) {
    console.error('ERR', err && err.message ? err.message : err);
    process.exit(1);
  }
})();