THE EXAMPLE WET-ETCH DATA
=========================

These are the sample rows that were used to build and review the
machine-documentation page layout (timeline, bill of materials,
contributors, references).

They are NOT real. The part numbers, costs, dates, and contributor
names were made up to have something to design against.

They've been moved out of data/sheets/ so nothing invented shows on
the live site. Nothing here is read by Hugo.

WHAT THEY'RE STILL GOOD FOR
    Seeing what a fully documented machine page looks like without
    setting up the Google Sheet first. To preview it:

        cp scripts/sample-data/*.json data/sheets/
        hugo server

    Every section will show an amber "Example data" notice while
    these rows are in place. To go back to empty:

        for f in specs timeline bom contributors references; do
          printf '[]\n' > "data/sheets/$f.json"
        done

Once the real Google Sheet is connected, the sync overwrites
data/sheets/ with real rows and you can delete this folder.
