import {
  buildCMSConfig,
  wpRestApiClient,
  registerCloakWPMethods,
  type BlocksConfig,
  type SingleBlockConfig,
  type HttpUrl,
  type HttpsUrl,
  RestApiClientConfig,
} from 'cloakwp';
import { type DeepPartial } from 'ts-essentials';
import { WPReactBlockRenderer } from '@cloakwp/react';
import { CoreBlocksConfig } from '@cloakwp/blocks-react';
import { CoreBlocksConfig as NextJSCoreBlocksConfig } from '@cloakwp/blocks-nextjs';

import {
  heroDataRouter,
  cardsDataRouter,
  heroWithImageDataRouter,
  postsDataRouter,
  testimonialsDataRouter,
  testimonialsCarouselDataRouter,
  genericStylesDataRouter,
  faqsDataRouter,
} from '@/lib/data-routers';

import { cx } from '@/lib/utils/cva';
import { container } from '@/lib/styles/container';

import { Button } from '@/components/UI/Button';
import { Link } from '@cloakui/nextjs-primitives';
import { Hero, HeroWithBgImage, HeroWithImageRight } from '@/components/Hero';
import { TestimonialGrid, TestimonialCarousel } from '@/components/Testimonial';
import { GenericCardGrid, PostGrid } from '@/components/Cards';
import { ProtectedContactForm } from '@/components/Forms/ProtectedContactForm';
import { FAQAccordions } from '@/components/FAQ/FAQAccordions';

export const config = await buildCMSConfig({
  instances: [
    {
      url: process.env.NEXT_PUBLIC_WP_URL as HttpUrl | HttpsUrl,
      adminPath: '/wp/wp-admin',
      contentPath: '/app',
      blockRenderer: new WPReactBlockRenderer({
        // * Customize how your blocks get dynamically rendered:
        render: (components, options) => {
          const { parent = null, customProps } = options ?? {};

          let blockNumber = -1;

          // define a reusable component for rendering blocks dynamically:
          const RenderBlocks = ({
            blocks,
            keyPrefix,
          }: {
            blocks: typeof components;
            keyPrefix?: any;
          }) => (
            <>
              {blocks.map(({ Component, props }, idx: number) => {
                blockNumber++;
                return (
                  <Component
                    key={keyPrefix ? `${keyPrefix}_${idx}` : idx}
                    // while in dev, we render a `data-block-index` attr to each block's HTML -- helps with looking up that block's data in large REST responses:
                    {...(process.env.NODE_ENV == 'development'
                      ? { 'data-block-index': blockNumber }
                      : {})}
                    {...props}
                  />
                );
              })}
            </>
          );

          // nested blocks are rendered without surrounding container:
          if (parent) return <RenderBlocks blocks={components} />;

          // Group top-level/parent block components into containers, based on their Gutenberg "align" property (more efficient than individual containers around each block):
          const containerGroups = [];
          let currentGroup = null;
          for (const component of components) {
            const currentWidth = component?.block?.attrs?.align ?? 'default';

            if (!currentGroup || currentGroup.width !== currentWidth) {
              // create new container group:
              currentGroup = { width: currentWidth, components: [] };
              containerGroups.push(currentGroup);
            }

            currentGroup.components.push(component);
          }

          // Render container-grouped parent block components:
          return containerGroups.map(({ width, components }, i) => (
            <div
              key={`group_${i}`}
              className={container({
                width,
                padding: customProps?.isIframePreview ? 'none' : 'default', // disable container padding while previewing blocks in WP Editor (ensures visual alignment w/ core blocks)
              })}
            >
              <RenderBlocks blocks={components} keyPrefix={i} />
            </div>
          ));
        },

        // * Hook into the block rendering lifecycle to customize things at a global level
        hooks: {
          filters: {
            dataRouterResult: (props, { block }) => {
              if (
                block.name == 'core/columns' &&
                block?.attrs?.align == 'full'
              ) {
                // apply container classes to inner contents of full-width Columns
                return {
                  ...props,
                  className: cx(props.className, 'p-4 sm:p-6 lg:p-9'),
                };
              }

              return props;
            },
          },
        },

        /**
         * * ==================== Blocks ====================
         *  Map all Gutenberg blocks to your React components.
         */
        blocks: [
          CoreBlocksConfig,
          NextJSCoreBlocksConfig,
          {
            /**
             * You can override certain parts of core blocks that were defined above (configs will get deep merged)
             * eg. below we use our own Button + Link components to apply our own styling and leverage the special Next.js Link component:
             */
            'core/button': {
              variants: {
                default: {
                  component: Button,
                },
                link: {
                  component: ({ href, children, ...rest }) => (
                    <Button asChild {...rest}>
                      <Link href={href}>{children}</Link>
                    </Button>
                  ),
                },
              },
            } as DeepPartial<SingleBlockConfig>, // type assert the use of a partial config (we know it will get merged with "core/button" from `CoreBlocksConfig` to become a complete config)
            /** Now we map our custom ACF Blocks to our custom components: */
            'acf/hero': {
              variantsRouter: ({ data }) => data.hero_style,
              variants: {
                no_image: {
                  dataRouter: heroDataRouter,
                  component: Hero,
                },
                bg_image: {
                  dataRouter: heroWithImageDataRouter,
                  component: HeroWithBgImage,
                },
                image_right: {
                  dataRouter: heroWithImageDataRouter,
                  component: HeroWithImageRight,
                },
              },
            },
            'acf/cards': {
              dataRouter: cardsDataRouter,
              component: GenericCardGrid,
            },
            'acf/posts': {
              variantsRouter: ({ data }) =>
                data.post_type == 'Testimonial' ? 'testimonials' : 'default',
              variants: {
                default: {
                  dataRouter: postsDataRouter,
                  component: PostGrid,
                },
                testimonials: {
                  dataRouter: testimonialsDataRouter,
                  component: () => <>TODO testimonials block</>,
                },
              },
            },
            'acf/testimonial': {
              variantsRouter: ({ data }) =>
                data.display_type == 'masonry'
                  ? 'grid'
                  : data.display_type ?? 'grid',
              variants: {
                grid: {
                  dataRouter: testimonialsDataRouter,
                  component: TestimonialGrid,
                },
                carousel: {
                  dataRouter: testimonialsCarouselDataRouter,
                  component: TestimonialCarousel,
                },
              },
            },
            'acf/faqs': {
              dataRouter: faqsDataRouter,
              component: FAQAccordions,
            },
            'acf/contact-form': {
              dataRouter: genericStylesDataRouter,
              component: ProtectedContactForm,
            },
            // 'acf/faq': {
            //   component: blocks.faqs,
            // },
          } as BlocksConfig,
        ],
      }),

      /**
       * * ==================== Plugins ====================
       * Each plugin is simply a function that receives the current CMS instance config and returns a modified
       * version for the next plugin to consume, until the final plugin returns the final config. Plugins allow
       * you to package up reusable config, or build better APIs for setting the CMS instnace config.
       */
      plugins: [
        // The `wpRestApiClient` plugin assigns the "Node WP API" as the `client` for interacting with this WP instance.
        wpRestApiClient({
          auth: {
            jwt: process.env.WP_JWT,
          },
          /**
           * This plugin itself allows nested plugins; here the `registerCloakWPMethods` plugin adds extra
           * methods to the Node WP API client for interacting with CloakWP's custom WP REST endpoints
           */
          plugins: [
            registerCloakWPMethods,
            // custom wpRestApiClient plugin that registers custom client methods/routes for our CPTs:
            (incomingConfig: RestApiClientConfig) => {
              return {
                ...incomingConfig,
                clientMutations: [
                  ...(incomingConfig.clientMutations ?? []),
                  ({ client }) => {
                    if (!client) return;

                    // register method to interact with Form Submission CPTs:
                    client.formSubmissions = client.registerRoute(
                      'wp/v2',
                      '/form-submission/(?P<id>)'
                    );

                    return client;
                  },
                ],
              };
            },
          ],
        }),
      ],
    },
  ],
});
