# Diffuse

Modular and open source runtime for raycast plugins

## Why

[Raycast](https://www.raycast.com/developers) has a gigantic number of MIT licensed plugins (909 as of 2/4/23), implemented in a well documented API. Unfortunately, raycast is only available for MacOS (which, ironically, is the OS I currently use), and I prefer to support the open source community wherever possible (*especially* when an app is built upon it).

## What

Diffuse exports a raycast compatible interface definition for backend and frontend components, so different platforms can use it as building blocks. It also plans to export code building blocks:

- backend modules for windows, linux, macos, and the web
- frontend modules for react and solid
- utilities for running preexisting plugins