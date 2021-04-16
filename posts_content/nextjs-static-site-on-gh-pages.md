---
title: 'Hosting a static Next.js site on GitHub Pages'
date: '2021-04-16'
---

Instead of using Vercel or Netlify I wanted to try out hosting my site on GitHub Pages.
Since it's a fully static site right now (it only uses `gitStaticProps` and `getStaticPaths`)
this should be possible.

While following this [great article](https://blog.sallai.me/deploy-next-site-to-github-pages) by József Sallai I got it up and running with just a few steps:


## Updating the build script

Change the **build script** in your `package.json` file to
```
"scripts": {
  "build": "next build && next export"
}
```
The output told me that `next export` isn't necessary. I didn't test it yet, but maybe `next build`
is all that is needed.

The build command creates the folders `.next` and `out`. You don't have to commit these folders to
the main branch because we want a GitHub Action to build and commit these folders automatically to
a `gh-pages` branch.

Add these folders to the `.gitignore` if you created these folders on your local machine.


## Setting up the GitHub Action

The first step is to generate a **personal access token** for the action to be able to commit and push. 

Go to _GitHub Settings_ -> _Developer settings_ -> _Personal access tokens_ and generate a new token
with **repo** scope.

With this token go to the repository and under _Settings_ -> _Secrets_ create a new secret named
`ACCESS_TOKEN`.

To create a GitHub Action you need a directory in your repository called `.github/workflows`. In
that folder create a `.yaml` file with the following contents:

```
name: Build and Deploy
on:
  push:
    branches:
      - main
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2.3.1
        with:
          persist-credentials: false

      - name: Build
        run: |
          npm ci
          npm run build

      - name: Deploy to GitHub Pages
        uses: Cecilapp/GitHub-Pages-deploy@v3
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          email: username@domain.tld
          build_dir: out
          branch: gh-pages
          cname: websitedomain.tld # optional
          jekyll: no
```
On each push to the `main` branch the action runs `npm run build` and pushes the folder `out` to
the `gh-pages` branch using our token `secrets.ACCESS_TOKEN`.


## Enable GitHub Pages

Make shure that GitHub Pages is active in your repository. In your repository go to _Settings_ ->
_Pages_ and `gh-pages` is the source for the page.

Because GitHub uses **Jekyll** under the hood to host and render sites, this could create some problems. To disable Jekyll, create an empty file in the `gh-pages` branch called `.nojekyll`.
Because of the `CLEAN` property our GitHub Action, this file will not be deleted.


## Update root level in Next.js

Next.js assumes that the site is under the root level of your domain. But with GitHub Pages it will
be served under `username.github.io/repository`. If you **don't** have a custom domain, this will become a problem. 

We can change the base path in `next.config.js` depending if we're developing locally or building
for production:

```
const basePath = process.env.NODE_ENV === 'production' ? '/repository' : '';

module.exports = {
  basePath,
  assetPrefix: `${basePath}/`
};
```
`basePath` specifies the root for `<Link>` components, `assetPrefix` the root for all assets.


## Conclusion

I didn't think it was too bad setting things up. This was the first time I took the time to configure GitHub Actions and it felt straightforward to me. Józsefs Article really helped a lot and saved me from some serious headaches!