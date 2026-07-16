// Blog list shared by the "Latest Blogs" section (BlogList.jsx) and the
// individual post pages (BlogPost.jsx), keyed off its slug (#/blog/<slug>).
//
// To write a post, fill in `content` as an array of blocks, in the order
// they should appear on the page. Two block types:
//
//   { type: "p", text: "..." }
//     A paragraph. Use one block per paragraph.
//
//   { type: "image", src: "...", alt: "...", caption: "..." }
//     An image. Drop the file in public/assets/blog/ and point `src` at
//     `${process.env.PUBLIC_URL}/assets/blog/your-file.webp`. `alt` is
//     required (accessibility); `caption` is optional and shown under
//     the image.
//
// Leave `content` as an empty array to keep showing the "draft in
// progress" placeholder for that post.
export const blogs = [
  {
    slug: "jamhacks-10",
    title: "judging @ jamhacks 10",
    kicker: "judging",
    blurb: "judging at canada's largest high school hackathon.",
    author: "Hreem Pandya",
    updated: "Jul 16, 2026",
    readTime: "4 min read",
    content: [],
  },
  {
    slug: "hack-canada-26",
    title: "organizing hack canada '26",
    kicker: "organizing",
    blurb: "helping run hack canada 2026.",
    author: "Hreem Pandya",
    updated: "Jul 16, 2026",
    readTime: "6 min read",
    content: [],
  },
  {
    slug: "environics-analytics",
    title: "intern exp @ environics analytics",
    kicker: "internship",
    blurb: "ai internship at environics analytics.",
    author: "Hreem Pandya",
    updated: "Jul 16, 2026",
    readTime: "4 min read",
    content: [],
  },
  {
    slug: "uw-comp-eng",
    title: "exp with uw comp eng",
    kicker: "school",
    blurb: "studying computer engineering at waterloo.",
    author: "Hreem Pandya",
    updated: "Jul 16, 2026",
    readTime: "5 min read",
    content: [],
  },
  {
    slug: "yc-ai-startup-school-2025",
    title: "yc ai startup school 2025",
    kicker: "startup school",
    blurb: "part of the first ever cohort of y combinator's ai startup school.",
    content: [],
  },
];

export const getBlog = (slug) => blogs.find((b) => b.slug === slug);
