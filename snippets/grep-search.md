---
title: Grep Search
description: Find a string in all files within a directory
logo: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM2Yjc0ODEiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48Y2lyY2xlIGN4PSIxMSIgY3k9IjExIiByPSI4Ii8+PHBhdGggZD0ibTIxIDIxLTQuMzUtNC4zNSIvPjwvc3ZnPg=="
tags: ["terminal"]
---

Search for a specific string in all files within a directory and its subdirectories.

## Bash/Linux/macOS

### Basic Search

```bash
grep -r "search_string" /path/to/directory
```

### Case Insensitive Search

```bash
grep -ri "search_string" /path/to/directory
```

### Search with Line Numbers

```bash
grep -rn "search_string" /path/to/directory
```

### Search in Current Directory

```bash
grep -r "search_string" .
```

### Search with File Extension Filter

```bash
grep -r --include="*.js" "function" .
```

## PowerShell/Windows

### Basic Search

```powershell
Get-ChildItem -Path "C:\path\to\directory" -Recurse | Select-String "search_string"
```

### Case Insensitive Search (default in PowerShell)

```powershell
Get-ChildItem -Path "C:\path\to\directory" -Recurse | Select-String "search_string"
```

### Search with Line Numbers

```powershell
Get-ChildItem -Path "C:\path\to\directory" -Recurse | Select-String "search_string" | Select-Object Filename, LineNumber, Line
```

### Search in Current Directory

```powershell
Get-ChildItem -Recurse | Select-String "search_string"
```

### Search with File Extension Filter

```powershell
Get-ChildItem -Path "." -Filter "*.js" -Recurse | Select-String "function"
```
