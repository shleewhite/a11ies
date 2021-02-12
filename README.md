# A11ies.info (round 2)

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Scripts
- `npm install`: initialize project
- `npm run dev`: development server

## File Structure
```
  /components - reusable stuff
  /functions - firebase functions that run when documents are created
  /lib - where make paths, extract data from files, etc.
  /pages - actual pages users see
    /resources
      [id].js - dynamic page for any resource markdown file
  /public - static stuff like images/icons
  /resources - resource markdown files
  /styles - global css stuff (component level css is in the component itself)
```
