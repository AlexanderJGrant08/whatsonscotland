function createPost() {
  if (!canPost) {
    alert("Please wait 20 seconds before posting again.");
    return;
  }

  const postText = document.getElementById('newPostText').value.trim();
  const imageInput = document.getElementById('postImage');
  const imageFile = imageInput.files[0];

  if (!postText && !imageFile) {
    alert("Please write something or upload an image.");
    return;
  }

  const postContainer = document.createElement('div');
  postContainer.className = 'post';

  // Text content
  if (postText) {
    const postContent = document.createElement('p');
    postContent.textContent = postText;
    postContainer.appendChild(postContent);
  }

  // Image content
  if (imageFile) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = document.createElement('img');
      img.src = e.target.result;
      img.style.maxWidth = '100%';
      img.style.borderRadius = '8px';
      img.style.marginTop = '10px';
      postContainer.appendChild(img);
    };
    reader.readAsDataURL(imageFile);
  }

  // Post actions
  const postActions = document.createElement('div');
  postActions.className = 'post-actions';

  const likeBtn = document.createElement('span');
  likeBtn.innerHTML = '👍 Like (<span class="like-count">0</span>)';
  likeBtn.style.cursor = 'pointer';

  let liked = false;
  likeBtn.onclick = function () {
    if (!liked) {
      const countSpan = likeBtn.querySelector('.like-count');
      countSpan.textContent = parseInt(countSpan.textContent) + 1;
      liked = true;
    } else {
      alert("You already liked this post.");
    }
  };

  const commentBtn = document.createElement('span');
  commentBtn.textContent = '💬 Comment';

  postActions.appendChild(likeBtn);
  postActions.appendChild(commentBtn);
  postContainer.appendChild(postActions);

  document.getElementById('posts').prepend(postContainer);
  document.getElementById('newPostText').value = '';
  imageInput.value = '';

  canPost = false;
  setTimeout(() => {
    canPost = true;
  }, 20000);
}
function createPost() {
  if (!canPost) {
    alert("Please wait 20 seconds before posting again.");
    return;
  }

  const postText = document.getElementById('newPostText').value.trim();
  const imageInput = document.getElementById('postImage');
  const imageFile = imageInput.files[0];

  if (!postText && !imageFile) {
    alert("Please write something or upload an image.");
    return;
  }

  const post = {
    text: postText,
    image: null,
    timestamp: new Date().toISOString(),
    likes: 0
  };

  if (imageFile) {
    const reader = new FileReader();
    reader.onload = function (e) {
      post.image = e.target.result;
      savePostToProfile(post);
      renderPost(post);
    };
    reader.readAsDataURL(imageFile);
  } else {
    savePostToProfile(post);
    renderPost(post);
  }

  document.getElementById('newPostText').value = '';
  imageInput.value = '';
  canPost = false;
  setTimeout(() => {
    canPost = true;
  }, 20000);
}
