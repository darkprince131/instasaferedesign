// InstaSafe Content Review — inline commenting layer.
// Vanilla JS, no deps. Loaded on every generated page. Comments save to
// localStorage (per browser) and, if configured, POST to a Google Form so
// they collect centrally in a Sheet. If the form is not configured yet the
// widget still works fully local-only.
(function () {
  "use strict";

  // ==== CONFIG — set after creating the Google Form ====
  const FORM_ACTION = "https://docs.google.com/forms/d/e/1FAIpQLSdzptqSn7ubnP3XAiUboFfCSOAFqqpRwH2sEy1R7gluh7w6Cw/formResponse";
  const FIELD_IDS = { page: "entry.1347920383", section: "entry.1743009236", comment: "entry.613168385", reviewer: "entry.2128701935" };
  // =====================================================

  const LS_COMMENTS = "cr-comments";
  const LS_REVIEWER = "cr-reviewer";
  const PAGE_KEY = location.pathname; // stable per generated file
  const PAGE_TITLE = (document.title || "").replace(/\s+—\s+InstaSafe Content Review$/, "").trim();
  const configured = !!FORM_ACTION;

  // ---- storage helpers ----
  function loadAll() {
    try { return JSON.parse(localStorage.getItem(LS_COMMENTS) || "[]"); }
    catch (e) { return []; }
  }
  function saveAll(list) {
    try { localStorage.setItem(LS_COMMENTS, JSON.stringify(list)); } catch (e) {}
  }
  function getReviewer() { try { return localStorage.getItem(LS_REVIEWER) || ""; } catch (e) { return ""; } }
  function setReviewer(v) { try { localStorage.setItem(LS_REVIEWER, v); } catch (e) {} }

  function forPage(list) { return list.filter((c) => c.pageKey === PAGE_KEY); }
  function forBlock(list, cb) { return forPage(list).filter((c) => c.cb === cb); }

  function blockText(el) {
    return (el.textContent || "").replace(/\s+/g, " ").trim();
  }
  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function fmtTime(ts) {
    try { return new Date(ts).toLocaleString(); } catch (e) { return ""; }
  }

  // ---- central sync (Google Form) ----
  function postToForm(c) {
    if (!configured) return;
    const fd = new FormData();
    if (FIELD_IDS.page)     fd.append(FIELD_IDS.page, PAGE_KEY + " — " + PAGE_TITLE);
    if (FIELD_IDS.section)  fd.append(FIELD_IDS.section, c.cb + " — " + c.sectionText);
    if (FIELD_IDS.comment)  fd.append(FIELD_IDS.comment, c.text);
    if (FIELD_IDS.reviewer) fd.append(FIELD_IDS.reviewer, c.reviewer);
    fetch(FORM_ACTION, { method: "POST", mode: "no-cors", body: fd }).catch(function () {});
  }

  // ---- counter chip ----
  function updateCount() {
    const chip = document.querySelector("[data-cr-count]");
    if (!chip) return;
    const all = loadAll();
    let n;
    if (document.body.classList.contains("index")) {
      n = all.length; // index shows total across pages
    } else {
      n = forPage(all).length;
    }
    chip.textContent = "💬 " + n;
    chip.hidden = false;
    chip.classList.toggle("has", n > 0);
  }

  // ---- render comment cards under a block ----
  function renderCards(el, cb) {
    // remove old card container
    const old = el.parentNode.querySelector('.cr-cards[data-for="' + cb + '"]');
    if (old) old.remove();

    const mine = forBlock(loadAll(), cb);
    el.classList.toggle("cr-has", mine.length > 0);
    if (!mine.length) return;

    const box = document.createElement("div");
    box.className = "cr-cards";
    box.setAttribute("data-for", cb);
    box.innerHTML = mine.map(function (c) {
      return '<div class="cr-card">' +
        '<div class="cr-card-head">' +
          '<span class="cr-card-who">' + esc(c.reviewer || "You") + "</span>" +
          '<span>' + esc(fmtTime(c.ts)) + "</span>" +
          '<button class="cr-card-del" data-del="' + c.id + '" type="button">delete</button>' +
        "</div>" +
        '<div class="cr-card-body">' + esc(c.text) + "</div>" +
      "</div>";
    }).join("");

    // insert right after the block
    el.parentNode.insertBefore(box, el.nextSibling);

    box.querySelectorAll("[data-del]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        const id = btn.getAttribute("data-del");
        saveAll(loadAll().filter(function (c) { return c.id !== id; }));
        renderCards(el, cb);
        updateCount();
      });
    });
  }

  // ---- popover ----
  let openPop = null;
  function closePop() {
    if (openPop) { openPop.remove(); openPop = null; }
    document.querySelectorAll(".cr-btn.open").forEach(function (b) { b.classList.remove("open"); });
  }

  function openPopover(el, cb, btn) {
    closePop();
    btn.classList.add("open");
    const pop = document.createElement("div");
    pop.className = "cr-pop";
    const note = configured ? "" :
      '<span class="cr-pop-note">Saved locally — central sync not configured yet.</span>';
    pop.innerHTML =
      '<label class="cr-pop-lab">Comment on this section</label>' +
      '<textarea placeholder="Comment on this section…"></textarea>' +
      '<input type="text" class="cr-name" placeholder="Your name" value="' + esc(getReviewer()) + '">' +
      note +
      '<div class="cr-pop-row">' +
        '<button class="cr-pill ghost" data-cancel type="button">Cancel</button>' +
        '<button class="cr-pill pri" data-submit type="button">Submit</button>' +
      "</div>";

    el.appendChild(pop);
    openPop = pop;
    // position: sits below the trigger, clamped into the block
    pop.style.top = (btn.offsetTop + btn.offsetHeight + 4) + "px";
    pop.style.right = "0px";

    const ta = pop.querySelector("textarea");
    const nameInput = pop.querySelector(".cr-name");
    const submit = pop.querySelector("[data-submit]");
    ta.focus();

    function refreshDisabled() { submit.disabled = ta.value.trim() === ""; }
    refreshDisabled();
    ta.addEventListener("input", refreshDisabled);

    pop.querySelector("[data-cancel]").addEventListener("click", closePop);
    pop.addEventListener("click", function (e) { e.stopPropagation(); });

    submit.addEventListener("click", function () {
      const text = ta.value.trim();
      if (!text) return;
      const reviewer = nameInput.value.trim();
      if (reviewer) setReviewer(reviewer);
      const c = {
        id: "c" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
        pageKey: PAGE_KEY,
        pageTitle: PAGE_TITLE,
        cb: cb,
        sectionText: blockText(el).slice(0, 90),
        text: text,
        reviewer: reviewer,
        ts: Date.now(),
      };
      const all = loadAll();
      all.push(c);
      saveAll(all);
      postToForm(c);
      closePop();
      renderCards(el, cb);
      updateCount();
    });
  }

  // ---- wire up each commentable block ----
  function initBlocks() {
    document.querySelectorAll("[data-cb]").forEach(function (el) {
      const cb = el.getAttribute("data-cb");
      const btn = document.createElement("button");
      btn.className = "cr-btn";
      btn.type = "button";
      btn.title = "Comment on this section";
      btn.textContent = "💬";
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        if (openPop && btn.classList.contains("open")) { closePop(); return; }
        openPopover(el, cb, btn);
      });
      el.appendChild(btn);
      renderCards(el, cb);
    });
  }

  // ---- export ----
  function exportTxt() {
    const all = loadAll();
    if (!all.length) { alert("No comments saved in this browser yet."); return; }
    const lines = all.map(function (c) {
      const page = (c.pageKey || "") + " (" + (c.pageTitle || "") + ")";
      const section = c.cb + ": " + (c.sectionText || "");
      return [page, section, c.reviewer || "(no name)", c.text].join(" — ");
    });
    const blob = new Blob([lines.join("\n") + "\n"], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "instasafe-review-comments.txt";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
  }

  // ---- boot ----
  function boot() {
    initBlocks();
    updateCount();
    const exp = document.querySelector("[data-cr-export]");
    if (exp) exp.addEventListener("click", function (e) { e.preventDefault(); exportTxt(); });
    document.addEventListener("click", closePop);
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closePop(); });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
