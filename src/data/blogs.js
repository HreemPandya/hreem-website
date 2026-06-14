// Blog list shared by the "Latest Blogs" section (Writing.jsx) and the
// individual post pages (BlogPost.jsx). Each post currently renders as an
// "under construction" page keyed off its slug (#/blog/<slug>).
export const blogs = [
  {
    slug: "jamhacks-10",
    title: "judging @ jamhacks 10",
    kicker: "judging",
    blurb: "judging at canada's largest high school hackathon.",
  },
  {
    slug: "hack-canada-26",
    title: "organizing hack canada '26",
    kicker: "organizing",
    blurb: "helping run hack canada 2026.",
  },
  {
    slug: "environics-analytics",
    title: "intern exp @ environics analytics",
    kicker: "internship",
    blurb: "ai internship at environics analytics.",
  },
  {
    slug: "uw-comp-eng",
    title: "exp with uw comp eng",
    kicker: "school",
    blurb: "studying computer engineering at waterloo.",
  },
];

export const getBlog = (slug) => blogs.find((b) => b.slug === slug);
