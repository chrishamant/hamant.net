+++
date = "2011-05-27T00:08:00Z"
title= "Significant Whitespace Has Made Me An Asshole"
description= "Really a bad quirk to have..."
aliases = [
  "/2011/11/23/whitespace-makes-me-an-ass/"
]
+++

I've been programming for a good period of my life and had exposure to a whole variety of different programming languages and styles of coding. It started with simple stuff such as Basic, Logo et al - and through the years I've had exposure to the whole slew of mainstream \*nix scripting languages (Perl, Python, Ruby, PHP) and systems languages (C,C++,C#,Java). Lately I've found myself in a position where I work primarily alone doing prototyping using HTML, CSS, and Javascript (with sprinkled with various 'backend' tools). So I feel pretty comfortable reading code written in whole variety of paradigms and styles...

However, in the last couple years I've been doing quite a bit more python than ever before along with using various tools that cross-compile to html, javascript and css (Haml, SASS,Jade, SCSS, Stylus, Coffeescript et al). I recently realized that I pretty much have surrounded myself with a set of tools that require me to author code in a fashion where whitespace means something...

Python is widely regarded for it's 'readability' - some of which is attributed to its syntax surely, but I think a large part of it is due to the requirements of the interpreter on consistent whitespace. Classes, functions and nearly everything is always well formatted - as enforced by the interpreter.

Haml and Jade (and their ilk) have allowed me to strip away the unnecessary visual distractions from authoring HTML, allowing me to focus solely on the hierarchy, structure and semantics of the HTML tree itself. Sass/Scss/Stylus/Less are the perfect compliment to such HTML authoring tools as I'm already cleanly utilizing the selectors when authoring the Haml/Jade. These CSS tools don't necessarily always require adherence to whitespace utilization, but the hierarchy does mean something and one will typically keep things nicely nested and indented out of habit (at least I do).

## The Problem

Because of my own little self-inflicted bubble when I need to collaborate with other people - most of whom aren't aware of such toolings, nor can the be expected to considering it isn't what they typically do - I'm constantly reformatting other people's code to fit my worldview... It is somewhat of a compulsion that I can't help.
When I'm handed a complex set php/jsp pages - something even the author will readily admit is spaghetti - its almost as if my brain can't even make heads or tails of it anymore. It is almost as if I've lost the ability to understand or read this code anymore. The compulsion to refactor and reformat is greater than my need to "get the shit done".

It's almost as if significant whitespace has made me an asshole... I leave on the display of whitespace characters in every editor I use and freak out when someone checks in code that violates whatever convention the rest of the file uses (whatever that may be).

OCD is a bitch.









