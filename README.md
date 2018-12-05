# advent-of-code-2018

In the spirit of the holiday season, @topaz has made a nifty [advent calendar](https://adventofcode.com) with new coding challenges each day.  This repo contains my solutions to the problems from the advent of code calendar.

I'm using this opportunity to learn some new programming languages and brush up on skills from languages I already know.  If anyone happens to stumble across this repo, feel free to take a look / provide feedback via PR :).

I am pretty new to Python and Rust, so please keep in mind I might be doing funky things.  (Please let me know so I can learn!)

## Usage

The challenges are listed as &lt;daynumber&gt;&lt;first/second&gt;.  Within each challenge directory, you'll find a solution listed by language.


## Progress

| | Ruby | Rust | Python | Javascript |
|------|-----|-----|-----|-----|
| Day 1a | x | x | x |   |
| Day 1b |   |   |   |   |
| Day 2a |   |   |   |   |
| Day 2b |   |   |   |   |
| Day 3a |   |   |   |   |
| Day 3b |   |   |   |   |
| Day 4a |   |   |   |   |
| Day 4b |   |   |   |   |

# Random Thoughts / First Impressions

### Rust
- Really nice integration with VSCode, documentation, code completion, debugging
- Cargo / toml is interesting way to configure project, feels more sophisticated than Makefile for low-level language
- Documentation was really friendly to help get started
- Question: common practice for writing tests -- should they go into implementation file, or separate tests directory?
- Question: how to modularize program -- does everything really go into lib.rs, or is that more of an include index?
- Question: Working with std::io::Result
	- Is there an implicit Err returned if it's not defined?
	- When to return an io::Error versus String versus other type?
	- What happens when you call unwrap() on an errored result?
- Question: When should you use & in method arguments? (understanding copy semantics)
- Question: working between array and Vec types / str and String types -- seems like they should be interchangable, but aren't.  Are array and str types literals - only?
- Question: Is it common to create a new() method that returns a Struct of a custom "class"?  To get "class-like" behavior, do you use `impl` to define methods for the Struct?


### Python
- Really nice integration with VSCode, documentation, code completion, debugging
- It was difficult for me to understand how to get started due to intermixed guides from python2 / python 3
- pyenv had issues compiling python 3.7.1 on MacOS mojave due to missing system headers -- had to run this command to get it installed: `sudo installer -pkg /Library/Developer/CommandLineTools/Packages/macOS_SDK_headers_for_macOS_10.14.pkg -target /`
- pyenv setup & documentation was confusing to me
- No "initialization" command to generate a new project directory (manually created setup.py, README.md, LICENSE, etc)...  This seems like it would be useful in some sort of `pip init` command
- It took me a while to understand how __init__.py works with respect to module resolution, and since it's typically a blank file, it was hard to find examples of when you might populate it with information.
- Question: When would you put anything inside of  __init__.py?
- Testing doesn't feel as integrated as it does in Rust / other languages, but `python -m unittest discover` helps
- Documentation was confusing on how to set up program for command line execution
- The language itself is very simple to work with 
