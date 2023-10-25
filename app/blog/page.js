import { getSession } from "next-auth/react";

function Blog({ data }) {
  return <div>Blog page - {data}</div>;
}

// export async function getServerSideProps(context) {
//   const session = await getSession(context);
  
//   return {
//     props: {
//       data: session ? "List of 100 personalized blogs" : "List of free blogs",
//     },
//   };
// }

export default Blog;