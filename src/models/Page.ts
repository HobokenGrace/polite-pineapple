type Page = {
  frontmatter: {
    date: string,
    image: string,
    image_alt: string, 
    title: string,
  }
  markdown: string,
};

export default Page;