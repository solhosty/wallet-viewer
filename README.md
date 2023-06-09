# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```
## What is used?

Here are the endpoints used from Helius to make this work: 
* **Balance** - `https://api.helius.xyz/v0/addresses/{address}/balances`
* **Compression** - `getAsset()`
    * w/ examples from Helius - `https://github.com/helius-labs/compression-examples`
## Result

<img width="1440" alt="Screenshot 2023-05-01 at 1 09 33 AM" src="https://user-images.githubusercontent.com/104146303/235409884-41bd78c1-8be1-4c1a-874c-c15d9da9937d.png">
