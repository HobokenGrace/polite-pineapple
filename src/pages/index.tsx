import { sourcebitDataClient } from 'sourcebit-target-next';
import fs from '../utils/fs';

/**
 * In next.js we can't use `src/pages/[...slug].js` for root site page `/`.
 * Instead, we import and export the [...slug].js while overriding its getStaticProps.
 */

import Page from './[...slug]';

export async function getStaticProps({ params }) {  
  const props = await sourcebitDataClient.getStaticPropsForPageAtPath('/');
  return { props };
}

export default Page;
