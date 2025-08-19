// autoFeed.js

// --- Data Pools ---

const AUTHORS = [
  { name: "Jane Doe", avatar: "https://i.pravatar.cc/50?img=1" },
  { name: "John Smith", avatar: "https://i.pravatar.cc/50?img=2" },
  { name: "Alex Lee", avatar: "https://i.pravatar.cc/50?img=3" },
  { name: "Maria Rodriguez", avatar: "https://i.pravatar.cc/50?img=4" },
  { name: "Chen Wei", avatar: "https://i.pravatar.cc/50?img=5" },
  { name: "Liam O'Connor", avatar: "https://i.pravatar.cc/50?img=6" },
  { name: "Aisha Khan", avatar: "https://i.pravatar.cc/50?img=7" },
  { name: "Noah Kim", avatar: "https://i.pravatar.cc/50?img=8" },
  { name: "Sofia Petrova", avatar: "https://i.pravatar.cc/50?img=9" },
  { name: "Carlos Mendes", avatar: "https://i.pravatar.cc/50?img=10" },
  { name: "Emily Nguyen", avatar: "https://i.pravatar.cc/50?img=11" },
  { name: "Mohammed Al-Farsi", avatar: "https://i.pravatar.cc/50?img=12" },
  { name: "Grace Thompson", avatar: "https://i.pravatar.cc/50?img=13" },
  { name: "Yuki Tanaka", avatar: "https://i.pravatar.cc/50?img=14" },
  { name: "Oliver Green", avatar: "https://i.pravatar.cc/50?img=15" }
];

const TEXTS = [
  "Just finished a great book and my mind is blown! 📚",
  "Coffee is life — especially on Monday mornings ☕",
  "Strolling through downtown and loving the street art 🏙️",
  "Counting my blessings today and feeling so grateful 🙏",
  "Throwback to last summer by the beach 🌊",
  "Tried a new pasta recipe—absolutely delicious 🍝",
  "Caught an epic sunset tonight 🌅",
  "Weekend vibes: lazy brunch and a good movie 😎",
  "Movie night in with popcorn 🍿🎥",
  "Made my first “Hello World” in JavaScript—small wins! 💻",
  "Rainy day reads and warm tea 🍵📖",
  "Hiking trail was muddy but worth it 🥾🌲",
  "New sketchbook arrived—time to create 🎨",
  "Baked banana bread and it smells divine 🍌🍞",
  "First time trying yoga—feeling zen 🧘‍♀️",
  "Game night with friends was a blast 🎲",
  "Planted herbs on the balcony 🌿",
  "Watched the stars for hours tonight ✨",
  "Discovered a new indie band 🎶",
  "Learning to code—slow but steady 🧠💡"
];

const IMAGES = [
  "https://source.unsplash.com/random/400x250?nature",
  "https://source.unsplash.com/random/400x250?city",
  "https://source.unsplash.com/random/400x250?food",
  "https://source.unsplash.com/random/400x250?travel",
  "https://source.unsplash.com/random/400x250?books",
  "https://source.unsplash.com/random/400x250?sunset",
  "https://source.unsplash.com/random/400x250?coffee",
  "https://source.unsplash.com/random/400x250?art",
  "https://source.unsplash.com/random/400x250?technology",
  null, null, null  // ~30% chance of no image
];

const STORIES = [
  {
    title: "My Weekend Escape",
    paragraphs: [
      "I took a short trip to the mountains this weekend and it was absolutely breathtaking. The air was crisp, and the trails were calling my name.",
      "Camping under the stars was a dream—woke up to a sunrise that painted the sky in pinks and oranges."
    ],
    images: [
      "https://source.unsplash.com/random/400x250?mountains",
      "https://source.unsplash.com/random/400x250?camping"
    ]
  },
  {
    title: "Homemade Pizza Night",
    paragraphs: [
      "Tonight I experimented with a new pizza dough recipe—crust turned out perfectly chewy!",
      "Topped it with fresh basil, mozzarella, and cherry tomatoes straight from the garden."
    ],
    images: [
      "https://source.unsplash.com/random/400x250?pizza",
      "https://source.unsplash.com/random/400x250?cooking"
    ]
  },
  {
    title: "City Exploration: Hidden Cafés",
    paragraphs: [
      "Discovered three adorable cafés in the old town today. Each had its own quirky charm and amazing latte art.",
      "My favorite was a tiny spot with live acoustic music and hand-painted tiles."
    ],
    images: [
      "https://source.unsplash.com/random/400x250?coffee",
      "https://source.unsplash.com/random/400x250?cafe"
    ]
  },
  {
    title: "Rainy Day Reflections",
    paragraphs: [
      "The rain kept me indoors today, but it gave me time to reflect and journal.",
      "Sometimes the quiet moments are the most powerful."
    ],
    images: [
      "https://source.unsplash.com/random/400x250?rain",
      "https://source.unsplash.com/random/400x250?journal"
    ]
  },
  {
    title: "Sketching in the Park",
    paragraphs: [
      "I spent the afternoon sketching people and trees in the park. It felt good to unplug and just observe.",
      "A little girl asked to see my drawings—her smile made my day."
    ],
    images: [
      "https://source.unsplash.com/random/400x250?sketch",
      "https://source.unsplash.com/random/400x250?park"
    ]
  },
  {
    title: "Coding Breakthrough",
    paragraphs: [
      "After hours of debugging, I finally got my app to run. The feeling of solving something is unmatched.",
      "Now I just need to figure out how to deploy it!"
    ],
    images: [
      "https://source.unsplash.com/random/400x250?code",
      "https://source.unsplash.com/random/400x250?developer"
    ]
  }
];


// --- Helpers ---

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// --- Post Creation ---

function createPostElement() {
  const author    = pick(AUTHORS);
  const isStory   = Math.random() < 0.9;   // 30% chance for a story
  const timestamp = new Date().toLocaleString();
  const likes     = randomInt(0, 200);
  const comments  = randomInt(0, 50);

  const article = document.createElement("article");
  article.className = "post";

  // Header
  let html = `
    <div class="post-header">
      <img src="${author.avatar}" alt="${author.name}" class="avatar">
      <div>
        <strong>${author.name}</strong><br>
        <small class="timestamp">${timestamp}</small>
      </div>
    </div>
  `;

  if (isStory) {
    // Story post
    const story = pick(STORIES);
    html += `<h3 class="story-title">${story.title}</h3>`;
    story.paragraphs.forEach(p => {
      html += `<p class="story-paragraph">${p}</p>`;
    });
    story.images.forEach(src => {
      html += `<img src="${src}" alt="" class="story-image">`;
    });
  } else {
    // Regular post
    const text     = pick(TEXTS);
    const imageUrl = Math.random() < 0.9 ? pick(IMAGES) : null; // 80% chance image
    html += `<p class="post-text">${text}</p>`;
    if (imageUrl) {
      html += `<img src="${imageUrl}" alt="" class="post-image">`;
    }
  }

  // Reactions
  html += `
    <div class="reactions">
      <span>👍 ${likes}</span>
      <span>💬 ${comments}</span>
    </div>
    <div class="post-actions">
      <button>Like</button>
      <button>Comment</button>
      <button>Share</button>
    </div>
  `;

  article.innerHTML = html;
  return article;
}

function addPostToFeed() {
  const feed   = document.getElementById("feed");
  const postEl = createPostElement();
  feed.insertBefore(postEl, feed.firstChild);
}

function initFeed(count = 5) {
  for (let i = 0; i < count; i++) {
    addPostToFeed();
  }
}

// --- Initialization ---

document.addEventListener("DOMContentLoaded", () => {
  initFeed(5);
  setInterval(addPostToFeed, 11000);
});
