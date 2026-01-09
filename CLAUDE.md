# Development Notes for Claude

This file contains important reminders and guidelines for making changes to the WazeMY codebase.

## Version Updates and Changelog

When updating the version and changelog, remember to update **all** of the following files:

1. **package.json** - Update the `version` field
2. **CHANGELOG.md** - Add a new entry with the version and changes
3. **src/index.ts** - Update the `updateMessage` variable with the new version and a brief description of the changes

### Example:
```typescript
const updateMessage: string = `Version 2025.11.05.1: Fixed map tooltip crash when hovering over places without complete address information.`;
```

This ensures users see the correct update notification when the script loads in their browser.

## Waze Map Editor SDK

When interfacing with the Waze Map Editor, always refer to the **WME SDK** (Waze Map Editor Software Development Kit). The SDK provides the official APIs and interfaces for interacting with the editor.

**SDK Documentation:** https://web-assets.waze.com/wme_sdk_docs/production/latest/index.html

Use this documentation as the primary reference for:
- Available APIs and their usage
- Event handling and lifecycle hooks
- Type definitions and interfaces
- Best practices for WME script development

## Other Reminders

- Run `npm run dev` during development to rebuild the script
- Run `npm run build` for production builds
- The tooltip feature uses WME SDK for event handling
- All plugins extend the `IPlugin` interface
