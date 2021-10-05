import React from "react";
import { sourcebitDataClient } from "sourcebit-target-next";
import { withRemoteDataUpdates } from "sourcebit-target-next/with-remote-data-updates";

import pageLayouts from "../layouts";

import _ from "lodash";

const Page = (props) => {
  // every page can have different layout, pick the layout based
  // on the model of the page (_type in Sanity CMS)
  const componentName = props?.page?.__metadata.modelName;
  const PageLayout = pageLayouts[componentName];
  return <PageLayout {...props} />;
};

export async function getStaticPaths() {
  const paths = await sourcebitDataClient.getStaticPaths();
  // filter out the root page as it has its own page file `src/pages/index.js`
  return { paths: paths.filter(path => path !== "/"), fallback: false };
}

const createTagMap = allPages => {
  const tagMap = {};
  allPages.forEach(page => {
    const {
      date,
      featured,
      tags: tagsOfCurrentPage,
      title,
      urlPath,
    } = page || {};
    if (!tagsOfCurrentPage?.length) return;
    tagsOfCurrentPage?.forEach(({ tag }) => {
      if (!tag) return [];
      // Retrieve map entry if entry exists, else create an empty entry
      const relatedPages = tagMap[tag] ? tagMap[tag] : [];
      if (relatedPages.some(p => p?.urlPath === urlPath)) {
        return;
      }
      const pageEntry = {
        urlPath,
        title,
        date,
        sortId: featured ? '0' : date,
      };
      tagMap[tag] = [...relatedPages, pageEntry];
    });
  });
  return tagMap;
}

function getRelatedPagesFromPath(path, tagMap) {
  let result = [];
  Object.values(tagMap).forEach((pagesWithTag) => {
    if (pagesWithTag.find(p => p?.urlPath === path)) {
      const sortedPages = pagesWithTag.sort(
        (a, b) => (a.sortId ? a.sortId : '').localeCompare(b?.sortId)
      ).filter(p => p?.urlPath !== path);
      result = [ ...result, ...sortedPages];
    }
  });
  return result;
}

export async function getStaticProps({ params }) {
  const pagePath = "/" + params.slug.join("/");
  const paths = await sourcebitDataClient.getStaticPaths();
  const data = await sourcebitDataClient.getData();
  const props = await sourcebitDataClient.getStaticPropsForPageAtPath(pagePath);
  const allPagesFromData = _.uniq(_.map(data.pages, 'page'));
  const allPages = allPagesFromData.map(page => {
    const {
      date = "1970-01-01",
      featured = false,
      tags = [],
      title = null,
    } = page.frontmatter || {};
    const urlPath = page.__metadata?.urlPath;
    return { date, featured, tags, title, urlPath };
  });
  const tagMap = createTagMap(allPages);
  const relatedPages = getRelatedPagesFromPath(pagePath, tagMap);
  return { props: { ...props, relatedPages, tagMap }};
}

export default withRemoteDataUpdates(Page);
