Drop "your song" here, e.g.:

  our-song.mp3

Then make sure lib/site-config.ts has:

  songSrc: "/audio/our-song.mp3"

That's it — the play/pause button in the navbar will pick it up
automatically. If this folder is empty (or the file is missing),
the button hides itself automatically, so there's no broken UI.

Tip: keep the file reasonably small (a compressed mp3, under
5-8 MB) so the site stays fast to load.
