CREATE OR REPLACE VIEW messages_view AS
SELECT
  m1.message_room_id,
  profile.name,
  (
    SELECT content
    FROM messages
    WHERE message_room_id = m1.message_room_id
    ORDER BY message_id DESC
    LIMIT 1
  ) AS last_message,
  m1.profile_id AS profile_id,
  m2.profile_id AS other_profile_id,
  profile.avatar
FROM message_room_members m1
INNER JOIN message_room_members m2 ON m1.message_room_id = m2.message_room_id
INNER JOIN profile ON profile.profile_id = m2.profile_id;