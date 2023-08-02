You have a couple options to bootstrap a WordPress backend that integrates with your decoupled frontend.

- **Option #1 (recommended):** use CloakWP Bedrock to speed up the process of bootstrapping your headless WordPress instance, while also modernizing and improving your WordPress development workflow. To get started, follow the simple [CloakWP Bedrock installation steps outlined here](https://github.com/cloak-labs/cloakwp-bedrock) from the root of this project -- the installation command will install WordPress in a subdirectory `/cloakwp-bedrock` (which you can rename to `/backend` or whatever you'd like) along with all the typical headless plugins you'll need pre-installed. It comes with the Inception child theme installed, so your WordPress instance will integrate with this frontend out-of-the-box -- you can immediately start building/editing decoupled pages & posts using Gutenberg & ACF blocks.
- **Option #2:** do the same as option #1 but within a separate/standalone repo, if you'd prefer not to manage your WP installation and decoupled frontend as a monorepo.
- **Option #3:** create your own WordPress installation separate from this project/repo, however you're used to doing so, and delete this `/backend` folder. Unlike options 1 and 2, you'll need to spend considerable time configuring WordPress, including the installation of the CloakWP Plugin, to integrate with this frontend.

The following WordPress configuration steps assume you went with **Option #1** above:

## Configuration

- Activate all plugins
- Purchase + [install ACF Pro via Composer](https://www.advancedcustomfields.com/resources/installing-acf-pro-with-composer/)

- Create a header menu under Appearance > Menus, and either name it "Header Nav" or change the menu slug used in the frontend when fetching the menu data to match your custom menu name.
- Start by creating a test page, utilizing the built-in blocks available to you.
- Child theme config steps... 