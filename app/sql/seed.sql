-- Seed file for database tables
-- Note: profile table is not seeded as requested
-- Using profile_id '1f75d123-89ab-4215-aab6-a48e1cf2f79a' for all foreign key references

-- Seed categories (5 rows)
INSERT INTO "categories" ("name", "description") VALUES
('Web Development', 'Tools and platforms for building web applications'),
('Mobile Apps', 'Mobile application development tools and frameworks'),
('Design Tools', 'Design software and UI/UX tools'),
('Productivity', 'Tools to boost productivity and workflow'),
('AI & Machine Learning', 'Artificial intelligence and machine learning platforms');

-- Seed jobs (5 rows)
INSERT INTO "jobs" ("position", "overview", "responsibilities", "qualifications", "benefits", "skills", "company_name", "company_logo", "company_location", "job_type", "location", "salary_range", "apply_url") VALUES
('Senior Full Stack Developer', 'We are looking for an experienced full stack developer to join our team', 'Develop and maintain web applications, collaborate with team members', '5+ years experience, React, Node.js', 'Health insurance, remote work, stock options', 'React, Node.js, TypeScript, PostgreSQL', 'TechCorp Inc', 'https://example.com/logo1.png', 'San Francisco, CA', 'full-time', 'remote', '$120,000 - $150,000', 'https://example.com/apply/1'),
('Product Designer', 'Join our design team to create beautiful user experiences', 'Design user interfaces, conduct user research, create prototypes', '3+ years design experience, Figma, Sketch', 'Flexible hours, design budget, conference tickets', 'Figma, Sketch, Adobe XD, User Research', 'DesignStudio', 'https://example.com/logo2.png', 'New York, NY', 'full-time', 'hybrid', '$100,000 - $120,000', 'https://example.com/apply/2'),
('Frontend Developer', 'Build amazing user interfaces with modern technologies', 'Implement UI components, optimize performance, write tests', '2+ years experience, React, CSS', 'Remote work, learning budget, gym membership', 'React, JavaScript, CSS, HTML', 'StartupXYZ', 'https://example.com/logo3.png', 'Austin, TX', 'full-time', 'remote', '$70,000 - $100,000', 'https://example.com/apply/3'),
('Backend Engineer', 'Design and implement scalable backend systems', 'Build APIs, optimize databases, ensure system reliability', '4+ years experience, Python, Django, PostgreSQL', '401k, health insurance, unlimited PTO', 'Python, Django, PostgreSQL, Docker', 'BackendPro', 'https://example.com/logo4.png', 'Seattle, WA', 'full-time', 'in-person', '$150,000 - $250,000', 'https://example.com/apply/4'),
('Part-time UI Designer', 'Help us create beautiful interfaces on a flexible schedule', 'Design mockups, create design systems, collaborate with developers', '1+ years experience, design portfolio', 'Flexible schedule, project-based pay', 'Figma, Adobe Creative Suite, Design Principles', 'FlexDesign', 'https://example.com/logo5.png', 'Los Angeles, CA', 'part-time', 'remote', '$50,000 - $70,000', 'https://example.com/apply/5');

-- Seed topics (5 rows)
INSERT INTO "topics" ("name", "slug") VALUES
('Web Development', 'web-development'),
('Design', 'design'),
('Startups', 'startups'),
('Productivity', 'productivity'),
('Tech News', 'tech-news');

-- Seed products (5 rows)
INSERT INTO "products" ("name", "tagline", "description", "how_it_works", "icon", "url", "stats", "profile_id", "category_id") VALUES
('Notion', 'All-in-one workspace for notes, docs, and collaboration', 'Notion is a powerful workspace that combines notes, docs, wikis, and databases in one place', 'Create pages, add content blocks, organize with databases, collaborate in real-time', 'https://example.com/notion-icon.png', 'https://notion.so', '{"views": 1000, "reviews": 45}'::jsonb, '1f75d123-89ab-4215-aab6-a48e1cf2f79a', 1),
('Figma', 'The collaborative interface design tool', 'Figma is a web-based design tool that enables teams to design, prototype, and collaborate in real-time', 'Create designs in the browser, share with team, get feedback, export assets', 'https://example.com/figma-icon.png', 'https://figma.com', '{"views": 2000, "reviews": 120}'::jsonb, '1f75d123-89ab-4215-aab6-a48e1cf2f79a', 3),
('Linear', 'The issue tracking tool you''ll enjoy using', 'Linear helps software teams build better products by providing a fast, beautiful issue tracking experience', 'Create issues, organize in projects, track progress, ship faster', 'https://example.com/linear-icon.png', 'https://linear.app', '{"views": 1500, "reviews": 89}'::jsonb, '1f75d123-89ab-4215-aab6-a48e1cf2f79a', 4),
('Vercel', 'Develop. Preview. Ship.', 'Vercel is the platform for frontend developers, providing the tools you need to build the web', 'Deploy your code, get instant previews, scale automatically', 'https://example.com/vercel-icon.png', 'https://vercel.com', '{"views": 3000, "reviews": 200}'::jsonb, '1f75d123-89ab-4215-aab6-a48e1cf2f79a', 1),
('Midjourney', 'AI-powered image generation', 'Create stunning images from text descriptions using advanced AI', 'Describe your image, AI generates it, refine and iterate', 'https://example.com/midjourney-icon.png', 'https://midjourney.com', '{"views": 5000, "reviews": 350}'::jsonb, '1f75d123-89ab-4215-aab6-a48e1cf2f79a', 5);

-- Seed product_upvotes (1 row with composite primary key)
INSERT INTO "product_upvotes" ("product_id", "profile_id") VALUES
(1, '1f75d123-89ab-4215-aab6-a48e1cf2f79a');

-- Seed reviews (5 rows)
INSERT INTO "reviews" ("product_id", "profile_id", "rating", "review") VALUES
(1, '1f75d123-89ab-4215-aab6-a48e1cf2f79a', 5, 'Notion has completely transformed how I organize my work. The flexibility is unmatched!'),
(2, '1f75d123-89ab-4215-aab6-a48e1cf2f79a', 5, 'Figma is the best design tool I''ve used. The collaboration features are incredible.'),
(3, '1f75d123-89ab-4215-aab6-a48e1cf2f79a', 4, 'Linear makes issue tracking actually enjoyable. The UI is beautiful and fast.'),
(4, '1f75d123-89ab-4215-aab6-a48e1cf2f79a', 5, 'Vercel has simplified our deployment process. Zero-config deployments are amazing.'),
(5, '1f75d123-89ab-4215-aab6-a48e1cf2f79a', 4, 'Midjourney produces stunning AI art. The quality is impressive, though it can be slow at times.');

-- Seed posts (5 rows)
INSERT INTO "posts" ("title", "content", "topic_id", "profile_id") VALUES
('Getting Started with React Hooks', 'React Hooks revolutionized how we write React components. Here''s a comprehensive guide to get you started...', 1, '1f75d123-89ab-4215-aab6-a48e1cf2f79a'),
('Design Systems: Building for Scale', 'Creating a design system that scales with your product is crucial. Let me share some lessons learned...', 2, '1f75d123-89ab-4215-aab6-a48e1cf2f79a'),
('My Startup Journey: Lessons Learned', 'After 2 years of building my startup, here are the most important lessons I''ve learned along the way...', 3, '1f75d123-89ab-4215-aab6-a48e1cf2f79a'),
('10 Productivity Tools Every Developer Needs', 'These tools have saved me countless hours and made my workflow so much more efficient...', 4, '1f75d123-89ab-4215-aab6-a48e1cf2f79a'),
('The Future of AI in Web Development', 'AI is changing how we build web applications. Here''s what to expect in the coming years...', 5, '1f75d123-89ab-4215-aab6-a48e1cf2f79a');

-- Seed post_upvotes (1 row with composite primary key)
INSERT INTO "post_upvotes" ("post_id", "profile_id") VALUES
(1, '1f75d123-89ab-4215-aab6-a48e1cf2f79a');

-- Seed post_replies (5 rows)
INSERT INTO "post_replies" ("post_id", "parent_id", "profile_id", "reply") VALUES
(1, NULL, '1f75d123-89ab-4215-aab6-a48e1cf2f79a', 'Great introduction to React Hooks! This really helped me understand the basics.'),
(2, NULL, '1f75d123-89ab-4215-aab6-a48e1cf2f79a', 'Design systems are so important. Thanks for sharing your experience.'),
(3, NULL, '1f75d123-89ab-4215-aab6-a48e1cf2f79a', 'Your startup journey is inspiring. Keep up the great work!'),
(4, NULL, '1f75d123-89ab-4215-aab6-a48e1cf2f79a', 'I use most of these tools daily. They''re game-changers!'),
(5, NULL, '1f75d123-89ab-4215-aab6-a48e1cf2f79a', 'AI in web development is fascinating. Excited to see where this goes.');

-- Seed gpt_ideas (5 rows)
INSERT INTO "gpt_ideas" ("idea", "views", "claimed_at", "claimed_by") VALUES
('A platform that connects freelance designers with startups looking for quick design work', 150, NULL, NULL),
('An AI-powered code review tool that learns from your team''s coding standards', 230, NULL, NULL),
('A social network specifically for indie game developers to share progress and get feedback', 89, NOW(), '1f75d123-89ab-4215-aab6-a48e1cf2f79a'),
('A tool that automatically generates API documentation from your codebase', 312, NULL, NULL),
('A marketplace for buying and selling side projects', 445, NULL, NULL);

-- Seed gpt_ideas_likes (1 row with composite primary key)
INSERT INTO "gpt_ideas_likes" ("gpt_idea_id", "profile_id") VALUES
(1, '1f75d123-89ab-4215-aab6-a48e1cf2f79a');

-- Seed team (5 rows)
INSERT INTO "team" ("product_name", "team_size", "equity_split", "product_stage", "roles", "product_description") VALUES
('EcoTracker', 3, 33, 'mvp', 'Full-stack developer, UI/UX designer, Marketing specialist', 'An app that helps users track their carbon footprint and suggests eco-friendly alternatives'),
('TaskFlow', 2, 50, 'prototype', 'Backend developer, Frontend developer', 'A project management tool with AI-powered task prioritization'),
('SocialConnect', 4, 25, 'product', 'Full-stack developer, Designer, Product manager, Marketing lead', 'A professional networking platform for remote workers'),
('HealthHub', 5, 20, 'idea', 'Mobile developer, Backend developer, Designer, Data scientist, Marketing', 'A comprehensive health tracking app with personalized insights'),
('LearnSpace', 3, 33, 'mvp', 'Full-stack developer, Content creator, Designer', 'An online learning platform for coding bootcamps');

-- Seed message_rooms (5 rows)
INSERT INTO "message_rooms" DEFAULT VALUES;
INSERT INTO "message_rooms" DEFAULT VALUES;
INSERT INTO "message_rooms" DEFAULT VALUES;
INSERT INTO "message_rooms" DEFAULT VALUES;
INSERT INTO "message_rooms" DEFAULT VALUES;

-- Seed message_room_members (1 row with composite primary key)
INSERT INTO "message_room_members" ("message_room_id", "profile_id") VALUES
(1, '1f75d123-89ab-4215-aab6-a48e1cf2f79a');

-- Seed messages (5 rows)
INSERT INTO "messages" ("message_room_id", "sender_id", "content") VALUES
(1, '1f75d123-89ab-4215-aab6-a48e1cf2f79a', 'Hey! I saw your product and I''m really interested in learning more.'),
(2, '1f75d123-89ab-4215-aab6-a48e1cf2f79a', 'Thanks for the review! Would love to get your feedback on our latest update.'),
(3, '1f75d123-89ab-4215-aab6-a48e1cf2f79a', 'Great post! I have some questions about the implementation details.'),
(4, '1f75d123-89ab-4215-aab6-a48e1cf2f79a', 'Are you still looking for a co-founder? I''d love to discuss this opportunity.'),
(5, '1f75d123-89ab-4215-aab6-a48e1cf2f79a', 'Congratulations on launching! The product looks amazing.');

-- Seed notifications (5 rows)
INSERT INTO "notifications" ("source_id", "product_id", "post_id", "target_id", "type") VALUES
('1f75d123-89ab-4215-aab6-a48e1cf2f79a', 1, NULL, '1f75d123-89ab-4215-aab6-a48e1cf2f79a', 'review'),
('1f75d123-89ab-4215-aab6-a48e1cf2f79a', NULL, 1, '1f75d123-89ab-4215-aab6-a48e1cf2f79a', 'reply'),
('1f75d123-89ab-4215-aab6-a48e1cf2f79a', NULL, NULL, '1f75d123-89ab-4215-aab6-a48e1cf2f79a', 'follow'),
('1f75d123-89ab-4215-aab6-a48e1cf2f79a', 2, NULL, '1f75d123-89ab-4215-aab6-a48e1cf2f79a', 'review'),
('1f75d123-89ab-4215-aab6-a48e1cf2f79a', NULL, 2, '1f75d123-89ab-4215-aab6-a48e1cf2f79a', 'mention');

-- Seed follows (5 rows)
INSERT INTO "follows" ("follower_id", "following_id") VALUES
('1f75d123-89ab-4215-aab6-a48e1cf2f79a', '6eb25061-b60f-4c22-ab7a-4fa9accd7b95'),
('6eb25061-b60f-4c22-ab7a-4fa9accd7b95', '1f75d123-89ab-4215-aab6-a48e1cf2f79a'),
('1f75d123-89ab-4215-aab6-a48e1cf2f79a', '6eb25061-b60f-4c22-ab7a-4fa9accd7b95'),
('6eb25061-b60f-4c22-ab7a-4fa9accd7b95', '1f75d123-89ab-4215-aab6-a48e1cf2f79a'),
('1f75d123-89ab-4215-aab6-a48e1cf2f79a', '6eb25061-b60f-4c22-ab7a-4fa9accd7b95');
