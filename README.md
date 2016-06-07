# Render NativeScript views on the web

## Virtual Insanity with NativeScript Views: Blurred lines with {N} + Angular 2

![Jamiroquai](https://cdn.filestackcontent.com/79pxU05WSNmhndb0CEVv?v=0)

> Futures made of virtual insanity now   
> Always seem to, be governed by this love we have   
> For useless, twisting, our new technology   
> Oh, now there is no sound for we all live underground

- *Jamiroquai*

We all love to twist our technology, sometimes motivated by useful objectives and other times for useless fun. But what if that useless fun led to something useful?

Unless you truly have been living underground where there may be no sound, you have probably heard of [NativeScript](https://www.nativescript.org/), the open source cross-platform framework for building native apps using JavaScript, CSS, and XML.

Blah, blah, blah, right?
Lets twist things up a bit.

What if we could use NativeScript views to build web apps? Wait, huh?

What if you had invested resources and time into building that beautiful *native* mobile app your clients love with NativeScript and find yourself scratching your head thinking "How could we get this awesome app on the web to help with reachability?"

### Welcome to "futures made of virtual insanity"

![Snapshot](https://cdn.filestackcontent.com/XzLOjgRUQOWILEP0f9ht?v=0)

That right there ^ is 1 view file using NativeScript XML which can be rendered in a NativeScript app **AS WELL AS** on the web.

No magic here, this project will allow your NativeScript views to be used directly on the web with [Angular 2](https://angular.io/). 

This creates a few opportunities to name a few:
* Quickly prototype a web app from your NativeScript app
* Ability to statically render web templates from a NativeScript (only) app
  * Say you have a NativeScript *only* mobile app but now want to build a web app based on it's features?   
    * In the future, you could run your views through a compiler which would spit out html equivalents to begin developing your complimentary web app quickly
* Interop/Reusability between NativeScript and web templates.
* The ability to invert the rendering: Statically generate NativeScript view templates from HTML web templates to quickly bring a web app into the NativeScript world.

Some motivations behind this effort are explained [here](https://github.com/NativeScript/NativeScript/issues/1612).

You can get involved with this effort and help shape it's direction by contributing, start with the issues listed [here](https://github.com/NathanWalker/nativescript-angular-web-components/issues).

The jury is out on the insanity of it all.

![Action](https://cdn.filestackcontent.com/9tyAoce6SYa50cbxX7AU?v=0)

## Goals

Interop/Reusability between NativeScript and web templates.

## Why

* Ability to statically render a web app from a NativeScript (only) app
  * Say you have a NativeScript only mobile app but now want to build a web app based on it's features
    * In the future, you could run your views through a compiler which would spit out html equivalents to begin developing your complimentary web app quickly
* Expand platform delivery options for NativeScript apps
* Broaden the horizons for what may be possible with NativeScript views

## Current Status

**Experimental**.

## What's next

* Build out remaning NativeScript components as web components. [See Issues](https://github.com/NathanWalker/nativescript-angular-web-components/issues).
* Ability to render the inverse direction: Statically generate NativeScript view templates from HTML web templates to quickly bring a web app into the NativeScript world.

## Background

https://github.com/NativeScript/NativeScript/issues/1612


