import PostTable from '@/components/admin/PostTable/PostTable';
import { getAllPostsForAdmin } from '@/lib/posts';

export const metadata = { title: 'Posts | Admin' };
export const dynamic = 'force-dynamic';

export default async function AdminPostsPage() {
  const posts = await getAllPostsForAdmin();
  return <PostTable posts={posts} />;
}
