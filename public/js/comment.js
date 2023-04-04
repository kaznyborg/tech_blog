const commentFormHandler = async (event) => {
    event.preventDefault();
  const postId = document.querySelector('input[name="post-id"]').value;
  
  console.log("testing");
  console.log(event);
  console.log(postId);
    const commentContent = document.querySelector('textarea[name="comment-body"]').value;
    console.log(commentContent);
  
    if(commentContent) {
      const response = await fetch('/api/comment', {
        method: 'POST',
        body: JSON.stringify({
          postId,
          commentContent
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    };
  }
  
  document.querySelector('#new-comment-form')?.addEventListener('submit', commentFormHandler);
  