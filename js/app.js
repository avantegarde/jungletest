/**
 * Define Loading Icon
 */
const loader = document.getElementById('loader');
/**
 * Fetch blog post items from Jungle Scout WP api endpoint
 */
async function getPosts() {
  let url = 'https://www.junglescout.com/wp-json/wp/v2/posts?_embed';
  let options = {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
      let res = await fetch(url,options);
      return await res.json();
  } catch (error) {
      console.log(error);
  }
}
/**
 * Render posts on page
 */
async function renderPosts() {
  let posts = await getPosts();
  let html = '';
  posts.forEach(post => {
      let img = post._embedded["wp:featuredmedia"][0];
      let postDate = new Date(post.date).toLocaleDateString('en-us', { year:"numeric", month:"long", day:"numeric"});
      let htmlSegment = `
        <div class="post" data-reveal="animate__fadeInUp">
            <a class="featured-img" href="${post.link}" style="background-image:url(${img.source_url})"><img src="${img.source_url}" alt="${img.alt_text}" width="${img.media_details.width}" height="${img.media_details.height}" style="opacity:0;"></a>
            <p class="date">${postDate}</p>
            <h2 class="title"><a href="${post.link}">${post.title.rendered}</a></h2>
        </div>
      `;

      html += htmlSegment;
  });
  let container = document.getElementById('blog');
  container.innerHTML = html;
  loader.style.display = 'none';
}
renderPosts();