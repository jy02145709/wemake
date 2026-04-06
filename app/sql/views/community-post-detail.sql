CREATE OR REPLACE VIEW community_post_detail AS
SELECT
    posts.post_id,
    posts.title,
    posts.content,
    posts.upvotes,
    posts.created_at,
    topics.topic_id,
    topics.name as topic_name,
    topics.slug as topic_slug,
    COUNT(post_replies.post_reply_id) as replies,
    profile.name as author_name,
    profile.avatar as author_avatar,
    profile.role as author_role,
    profile.created_at as author_created_at,
    (SELECT COUNT(*) FROM products WHERE products.profile_id = profile.profile_id) as products,
    (SELECT EXISTS (SELECT 1 FROM public.post_upvotes WHERE post_upvotes.post_id =
     posts.post_id AND post_upvotes.profile_id = auth.uid())) AS is_upvoted
FROM posts
INNER JOIN topics USING (topic_id)
LEFT JOIN post_replies USING (post_id)
INNER JOIN profile ON (profile.profile_id = posts.profile_id)
GROUP BY posts.post_id, topics.topic_id, topics.name, topics.slug, profile.name, profile.avatar, profile.role, profile.created_at, profile.profile_id;