import { TypographyP } from '@cloakui/react-primitives';
import { NextPageContext } from 'next';

function Error({ statusCode }: { statusCode: string | number }) {
  return (
    <TypographyP>
      {statusCode
        ? `An error ${statusCode} occurred on server`
        : 'An error occurred on client'}
    </TypographyP>
  );
}

Error.getInitialProps = (ctx: NextPageContext) => {
  const { res, err } = ctx;
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
