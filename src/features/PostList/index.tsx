import { useInfiniteQuery } from "@tanstack/react-query";
import { produce } from "immer";
import { useState } from "react";
import { getPostListApi } from "../../apis";
import Button from "../../components/Button";
import Card from "../../components/Card";
import List from "../../components/List";
import ListItem from "../../components/ListItem";
import Loading from "../../components/Loading";
import { PostType } from "../../types";

export default function PostList() {
  const [posts, setPosts] = useState<{
    current: PostType[];
    buffer: PostType[];
  }>({
    current: [],
    buffer: [],
  });

  const { isError, isLoading, fetchNextPage } = useInfiniteQuery({
    queryKey: ["getPostList"],
    queryFn: ({ pageParam = 1 }) => getPostListApi((pageParam - 1) * 20, 20),
    getNextPageParam(_lastPage, allPages) {
      return allPages.length + 1;
    },
    onSuccess(data) {
      const newPosts = data.pages.at(-1)?.data.posts;
      if (posts.current.length === 0) {
        // setPosts(newPosts.slice(0, 10));
        // setPostBuffer(newPosts.slice(10));
        setPosts(
          produce((draft) => {
            draft.current = newPosts.slice(0, 10);
            draft.buffer = newPosts.slice(10);
          })
        );
      } else {
        setPosts(
          produce((draft) => {
            const [first, ...remains] = newPosts;
            draft.current.push(first);
            draft.buffer = remains;
          })
        );
        // setPostBuffer(newPosts.slice(1));
      }
    },
  });

  const clickHandler = (id: number) => {
    if (posts.buffer.length > 0) {
      setPosts(
        produce((draft) => {
          const index = draft.current.findIndex((post) => post.id === id);
          draft.current.splice(index, 1);
          draft.current.push(draft.buffer.shift()!);
        })
      );
    } else {
      setPosts(
        produce((draft) => {
          const index = draft.current.findIndex((post) => post.id === id);
          draft.current.splice(index, 1);
        })
      );
      fetchNextPage();
    }
  };

  if (isError) throw new Error("get post list error");
  if (isLoading) return <Loading />;
  return (
    <Card>
      <List>
        {posts.current.map((post) => (
          <ListItem key={post.id}>
            <span>{post.title}</span>
            <Button onClick={() => clickHandler(post.id)}>x</Button>
          </ListItem>
        ))}
      </List>
    </Card>
  );
}
