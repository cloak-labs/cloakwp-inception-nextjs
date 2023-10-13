import { Fragment } from 'react';
import { Card } from './Card';
import { classNames } from 'cloakwp/dist';
import { getObjValueByString } from '../../utils/getObjValueByString';
import formatDate from '../../utils/formatDate';

export default function PostCard({ data: post, postMeta, ...props }) {
  return (
    <Card
      {...props}
      renderBottom={({ themeName, theme }) => {
        const metaTextColor = {
          whiteBg: 'text-gray-500',
          lightBg: 'text-gray-500',
          darkBg: 'text-gray-300',
          blackBg: 'text-gray-400',
          blueBg: 'text-blue-100/80',
          darkBlueBg: 'text-blue-100/70',
        }[themeName];
      
        return (
          <>
            {postMeta?.length > 0 && (
              <div
                className={classNames(
                  'flex items-center gap-3 border-t px-4 py-2.5 text-sm font-medium',
                  metaTextColor,
                  theme.metaBorderColor
                )}
              >
                {postMeta.map((meta, i) => {
                  let value = getObjValueByString(post, meta); // supports cases where meta is a nested property, eg. meta == 'author.display_name'
                  if (meta == 'date' || meta == 'last_modified') value = formatDate(value)
                  return (
                    <>
                      {value && (
                        <Fragment key={i}>
                          <figcaption>{value}</figcaption>
                          {i < postMeta.length - 1 && <span>|</span>}
                        </Fragment>
                      )}
                    </>
                  );
                })}
              </div>
            )}
          </>
        );
      }}
    />
  );
}
