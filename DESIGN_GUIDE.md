# Portfolio Design Guide: TUI Direction

A reference for building out and maintaining the terminal-UI style portfolio. Written so you can hand this to yourself in three months, or to anyone else touching the code, and the reasoning survives even if the memory of this conversation doesn't.

## The core idea, in one sentence

The site should look like a real tool a backend developer would actually use, not like a costume borrowed from a hacker movie.

That distinction is the whole design system. A terminal emulator is set dressing, green text on black, blinking cursor, fake typing animation. A TUI is a real, still-evolving interface language with its own rules, the same one behind htop, lazygit, k9s, btop. Every decision below exists to keep the site on the TUI side of that line, not the costume side.

## Color system

Palette is Gruvbox, a real, widely used terminal color scheme, not invented for this project.

| Token | Hex | Used for |
|---|---|---|
| `--bg` | `#1d2021` | Page background |
| `--bg1` | `#282828` | Hover states, active row backgrounds |
| `--bg2` | `#32302f` | Reserved for a third background layer if one is ever needed |
| `--border` | `#504945` | All panel borders, dividers, inactive states |
| `--border-active` | `#fe8019` | Focus outlines, active panel edge |
| `--fg` | `#ebdbb2` | Primary text |
| `--fg-dim` | `#a89984` | Secondary text, descriptions, summaries |
| `--orange` | `#fe8019` | Primary accent: active nav item, buttons, key numbers |
| `--yellow` | `#fabd2f` | Labels, field names, section headers |
| `--aqua` | `#8ec07c` | Links, status dots, tech pills |
| `--red` | `#fb4934` | Placeholder warnings only, nothing else |
| `--gray` | `#665c54` | Pane titles, disabled/inactive text |

Rules for using it:

- Never add blue or purple. That was the constraint that started this whole direction, and Gruvbox doesn't lean on either, which is part of why it was chosen.
- Orange is the single primary accent. If you're tempted to add a second bright color for emphasis, use yellow or aqua from this table instead of introducing a new one.
- Red is reserved for the placeholder warning style specifically (the bracketed `[ADD YOUR REAL NUMBERS]` tags). Don't use it for anything else, or the placeholder warnings stop standing out.
- No gradients. Every color in this palette is a flat fill. A gradient anywhere is an instant tell that a template got dropped in on top of this system instead of someone actually working inside it.

## Typography

One typeface, JetBrains Mono, used for everything: headers, body, labels, buttons, form fields. No second display font.

This matters more than it sounds like it should. The moment a nicer-looking sans-serif shows up for headlines, the site stops reading as a real interface and starts reading as a design portfolio wearing a terminal skin. Monospace throughout is what makes the neofetch block, the pane titles, and the status bar all feel like they belong to the same actual tool instead of decorated separately.

## Layout rules

**Sharp corners, always.** No `border-radius` anywhere in this system. Rounded corners are the fastest way to make a terminal-styled site look like a SaaS dashboard that got a dark mode toggle.

**Every panel gets a title.** The `[ 2:projects ]` style label at the top of each panel isn't decoration, it's doing the same job a pane title does in tmux or lazygit, telling you what you're looking at and which number jumps you there. If a new section gets added, it needs this label in the same format, number colon name, lowercase.

**Persistent structure over scroll reveal.** The sidebar and the current panel are both on screen at all times. Nothing fades in as you scroll. This was a deliberate structural choice, not just a style, it's part of why a recruiter can find Projects or Resume in one glance instead of scrolling to discover them.

**List plus detail, not accordion.** The projects tab uses a list on the left and a detail pane on the right that updates live, matching how lazygit and k9s actually work. Don't collapse this into an accordion or a modal popup if new sections get added with a similar list-of-things shape, keep using this same pattern so the whole site stays internally consistent.

## Do

- Keep every accent color tied to a specific, repeatable meaning (orange = active/primary, yellow = label, aqua = link/status). Once a color means something specific, don't reuse it for something unrelated three sections later.
- Make every interactive element a real `button` or `a` tag, not a styled `div` with a click handler. This is why Tab and Enter already work correctly without extra code, and it's not optional if the site needs to stay usable by keyboard and screen reader.
- Let mouse and keyboard reach the exact same state. If a keyboard shortcut can do something a click can't (or the reverse), that's a bug, not a feature.
- Mark unverified numbers visibly, in the box with the dashed red border, rather than leaving a vague sentence in their place. A visible placeholder gets fixed. A vague sentence gets shipped by accident.
- Reuse real tool behavior as inspiration before inventing new interaction patterns. If you're unsure how a new piece of UI should behave, go look at how htop or lazygit or ranger handles that same kind of decision first.

## Avoid

- Green text on black. It's the single most predictable terminal cliché that exists, and using it undoes the entire point of choosing an unusual direction in the first place.
- macOS-style traffic light window dots, or any other borrowed GUI chrome. A real TUI doesn't have those. If a design element doesn't have an equivalent in an actual terminal tool, it doesn't belong here.
- A second display font "for personality." One typeface is the personality.
- Icon grids or logo clouds for the tech stack. That's a SaaS landing page pattern, not a terminal one. Tech pills as inline tags, like the ones on the project cards, are the correct version of this idea.
- Fake boot sequences that don't do anything structural. An animated "loading modules" intro that just sits above an otherwise ordinary page is decoration wearing the idea's clothes. If a loading state exists, it should be doing real work, like reflecting an actual state change, not running once for effect.
- Generic bio copy. "I care about clean code and solving problems that matter" could belong to anyone. The real, specific story, no degree, bootcamp, built ExamExpert solo, is what actually moves a hiring decision. Never let a design pass quietly strip the specific facts back out in favor of something smoother-sounding.
- A missing resume link. This has already gone wrong once on the original site. Every future version of this page gets checked for one thing before anything else ships: can a visitor find the resume in one click from the homepage.

## Accessibility and technical baseline

- Every custom keyboard shortcut (`1`–`5`, `j`/`k`, `Enter`) is an addition on top of normal keyboard access, never a replacement for it. Tab order and Enter-to-activate must work with zero custom JavaScript, using real interactive elements, before any shortcut layer gets added.
- Keyboard shortcuts must not fire while focus is inside a text input or textarea. Check `document.activeElement` before handling a keydown, the way the contact form currently does, or typing "j" into the message field will instead jump you to a different project.
- Respect `prefers-reduced-motion` for the status dot pulse and any future animation. It already does this, keep it that way for anything new.
- Maintain real contrast. `--fg-dim` on `--bg` and `--gray` on `--bg` are both intentionally lower contrast for de-emphasis, but should never be used for anything a visitor actually needs to read to use the site, like button labels or form field names.

## Extending this system

Before adding a new section, panel, or component, run it through these three questions in order:

1. Does an equivalent already exist in a real TUI tool (htop, lazygit, k9s, ranger, tig)? If yes, copy that tool's actual behavior rather than improvising.
2. Does it use only colors already in the palette table above, with their existing meanings intact?
3. Does it work completely by mouse and completely by keyboard, independently, with nothing available in only one mode?

If any answer is no, that's the point to stop and reconsider, not the point to make an exception.
