#!/usr/bin/env python3
"""
Pull the club's machine-documentation Google Sheet into data/sheets/.

WHAT THIS IS FOR
    The website is static: it's built once and served as plain files,
    so it can't read Google Drive live. This script copies the Sheet
    into the repo as JSON, and the site is built from that copy.

    Keeping a committed copy (rather than fetching while the site
    builds) means two things:
      * if Google is unreachable during a deploy, the last good data
        is still there and the site builds fine;
      * every change to a BOM or timeline shows up as a git diff.

HOW TO POINT IT AT YOUR SHEET
    1. Open the Sheet, Share -> General access -> "Anyone with the
       link" -> Viewer.
    2. Copy the long ID out of the URL:
         docs.google.com/spreadsheets/d/<THIS PART>/edit
    3. Put it in hugo.toml under [params]:
         docsSheetId = "<THIS PART>"

    Tabs are looked up BY NAME, so there are no gids to copy. The tab
    names have to match TABS below exactly.

    Leave docsSheetId empty and this script does nothing at all —
    the site just uses whatever is already in data/sheets/.

RUN IT
    python3 scripts/sync-sheets.py

    It also runs automatically on every deploy; see
    .github/workflows/deploy.yml.
"""

import csv
import io
import json
import pathlib
import re
import sys
import urllib.error
import urllib.parse
import urllib.request

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT_DIR = ROOT / "data" / "sheets"
MACHINE_DIR = ROOT / "content" / "machines"

# Tab name in the Sheet -> the file written into data/sheets/.
# Every tab needs a "machine" column holding the machine's slug.
TABS = ["specs", "timeline", "bom", "contributors", "references"]

TIMEOUT = 30


def sheet_id() -> str:
    """Read docsSheetId out of hugo.toml without needing a TOML parser."""
    text = (ROOT / "hugo.toml").read_text(encoding="utf-8")
    m = re.search(r'^\s*docsSheetId\s*=\s*"([^"]*)"', text, re.M)
    return m.group(1).strip() if m else ""


def known_slugs() -> set:
    """Machine slugs that actually exist, for validating the Sheet."""
    return {
        p.stem for p in MACHINE_DIR.glob("*.md")
        if p.stem != "_index"
    }


def fetch_tab(sid: str, tab: str) -> str:
    """CSV text for one tab, via Google's gviz endpoint (tab by name)."""
    url = (
        f"https://docs.google.com/spreadsheets/d/{sid}/gviz/tq"
        f"?tqx=out:csv&sheet={urllib.parse.quote(tab)}"
    )
    req = urllib.request.Request(url, headers={"User-Agent": "umn-nanofab-site/1.0"})
    with urllib.request.urlopen(req, timeout=TIMEOUT) as r:
        return r.read().decode("utf-8-sig")


def parse(text: str) -> list:
    """CSV -> list of dicts, trimmed, with blank and unlabelled rows dropped."""
    rows = []
    for raw in csv.DictReader(io.StringIO(text)):
        row = {
            (k or "").strip(): (v or "").strip()
            for k, v in raw.items()
            if k and k.strip()
        }
        if not any(row.values()):
            continue                      # entirely blank line
        if not row.get("machine"):
            continue                      # no machine -> nothing to attach it to
        row["machine"] = row["machine"].strip().lower()
        rows.append(row)
    return rows


def main() -> int:
    sid = sheet_id()
    if not sid:
        print("docsSheetId is empty in hugo.toml — nothing to sync.")
        print("See the comment at the top of this file to set it up.")
        return 0

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    slugs = known_slugs()
    failures, updated = [], []

    for tab in TABS:
        dest = OUT_DIR / f"{tab}.json"
        try:
            rows = parse(fetch_tab(sid, tab))
        except (urllib.error.URLError, urllib.error.HTTPError, OSError) as e:
            # Leave the committed copy untouched so the site keeps working.
            failures.append(f"{tab}: {e}")
            continue

        # Flag rows pointing at a machine that doesn't exist. Almost always
        # a typo in the slug, and it would silently show up nowhere.
        bad = sorted({r["machine"] for r in rows if r["machine"] not in slugs})
        for b in bad:
            print(f"  WARNING  [{tab}] no machine named '{b}' — those rows "
                  f"will not appear on the site")

        new = json.dumps(rows, indent=2, ensure_ascii=False) + "\n"
        old = dest.read_text(encoding="utf-8") if dest.exists() else ""
        if new != old:
            dest.write_text(new, encoding="utf-8")
            updated.append(f"{tab} ({len(rows)} rows)")
        else:
            print(f"  {tab}: unchanged ({len(rows)} rows)")

    for u in updated:
        print(f"  updated {u}")

    if failures:
        print("\nCouldn't reach some tabs; their existing data was kept:")
        for f in failures:
            print(f"  {f}")
        print("Check that the Sheet is shared with 'Anyone with the link'")
        print("and that the tab names match:", ", ".join(TABS))

    # Never fail the build over this — a stale page beats no page.
    return 0


if __name__ == "__main__":
    sys.exit(main())
