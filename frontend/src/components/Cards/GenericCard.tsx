import React from 'react';
import { Link } from '@cloakui/nextjs-primitives';
import { ImageOptions } from '@/lib/types/sharedTypes';
import {
  Card,
  type CardProps,
  CardDescription,
  CardHeader,
  CardImage,
  CardTitle,
  CardCTA,
  CardContent,
} from '.';

export type GenericCardProps = {
  image?: ImageOptions;
  title: string;
  description?: string;
  cta?: string;
  href?: string;
};

export const GenericCard: React.FC<CardProps & GenericCardProps> = ({
  image,
  title,
  description,
  cta,
  href,
  variants,
  ...props
}) => {
  return (
    <Link href={href}>
      <Card {...props} variants={variants}>
        {image?.src && <CardImage {...image} />}
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        {cta && href && (
          <CardContent>
            <CardCTA>{cta}</CardCTA>
          </CardContent>
        )}
      </Card>
    </Link>
  );
};
