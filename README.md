# wiki-next
The in-dev upgrade to the existing wiki build on a new framework that is more maintainable and much cleaner. Currently, the consideration is on using vue and vuepress

# Current plan
The current system is a mess. As the demand for more complex page structure increases, it becomes harder and harder for non-programmers to contriube.

There are solutions for creating rich content in markdown files, so we need to do that. Here is the idea:


# Part 1: Split up the repos
All page files will be in their own repository. This repository will contain no code, only a file strucutre of the wiki pages

## Writing:
The rule for this is simple: No matter what, **no include statements**. Frontmatter is fine. Instead we can use the ::: syntax which is more common anyway and looks way nicer.
Additionally, it means that writers don't need to worry about nested includes and all that hell

When new pages are merged onto the main brach in the writing repo, the pages will be transpiled into the equivalent include statements using the existing wiki setup.

# Part 2: Make the wiki nicer
Right now, the wiki is locked into an old and outdated framework. While it works now, the features we are missing in newer version of bootstrap and font awesome makes it worth upgrading eventually.

To do this, a full wiki styling rewrite will be necessary. This is not a light task and will not be a high priority. This repo will eventually hold the source files for this component of the rewrite