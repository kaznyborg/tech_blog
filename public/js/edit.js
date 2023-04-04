var editFormHandler = async function (event) {
    event.preventDefault();
    const titleEl = document.getElementById("post-title");
    const bodyEl = document.getElementById("post-body");
  
    fetch(`/api/post/${event.target.dataset.postid}`, {
      method: "PUT",
      body: JSON.stringify({
        title: titleEl.value,
        body: bodyEl.value,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then(function () {
        document.location.replace("/dashboard");
      })
      .catch((err) => console.log(err));
  };
  
  document
    .querySelector("#edit-post-form")
    .addEventListener("submit", editFormHandler);