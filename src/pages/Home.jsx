import { useEffect } from "react";
import PostsList from "../components/PostsList";
import AddButton from "../components/Buttons/AddButton";
import PostModal from "../components/PostModal";
import usePostStore from "../store/usePostStore";
import PostSkeleton from "../components/PostSkeleton";
import useAuthStore from "../store/useAuthStore";
import { Link } from "react-router";
import GuestWarning from "../components/GuestWarning";

function Home() {
  const { posts, loading, fetchAllPosts } = usePostStore();
  const currentUser = useAuthStore((s) => s.currentUser);
  const userLoading = useAuthStore((s) => s.loading);

  useEffect(() => {
    fetchAllPosts();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-8 px-4 max-w-xl justify-center items-center ">
        {!userLoading && !currentUser?.uid && <GuestWarning />}

        {!loading ? (
          <PostsList fetchAllPosts={fetchAllPosts} posts={posts} />
        ) : (
          Array(4)
            .fill(1)
            .map((el, i) => <PostSkeleton key={i} />)
        )}

        {!userLoading && currentUser?.uid && <AddButton />}
        <PostModal fetchAllPosts={fetchAllPosts} />
      </div>
    </>
  );
}

export default Home;
