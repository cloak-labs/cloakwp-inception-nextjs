import { getWpInstance } from 'cloakwp';
import { Button } from '@/components/Button';

export function ButtonBlock({ block }) {
  const wpUrl = getWpInstance().getUrl();
  let { backgroundColor, className, text, url } = block.attrs;

  let color = 'navy';
  if (backgroundColor.includes('gray')) color = 'gray';
  else if (backgroundColor.includes('blue')) color = 'baby';
  else if (backgroundColor == 'blue-900') color = 'black';

  let variant = 'outline';
  if (className.includes('is-style-fill')) variant = 'solid';

  if (url.includes(wpUrl)) url = url.replace(wpUrl, '/');

  return (
    <Button href={url} color={color} variant={variant}>
      {text}
    </Button>
  );
}
