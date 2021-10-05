import _ from 'lodash';

export default function getPagesFromArray(pages = [], pageArray = []) {
  return pageArray.flatMap ? pageArray.flatMap(({ urlPath }) => {
    return pages.filter(page => {
      return page?.__metadata?.urlPath === urlPath
    });
  }) : [];
}
