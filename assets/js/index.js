const input = document.getElementById("input");
const submitBtn = document.getElementById("btn");
const wrapper = document.getElementById("wrapper");
const resolutions = document.getElementById("resolutions");
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const videoLink = urlParams.get("link");

const downloadVideo = async (data) => {
  try {
    const response = await fetch(data.url);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const html = `
        <a href=${url} class='button link' target='_blank' download='video${data.quality}.mp4' onclick="clearArea()">${data.quality}</a>
        `;
    resolutions.insertAdjacentHTML("beforeend", html);
  } catch (error) {
    alert("Failed to download video");
  }
};

const clearArea = () => {
  window.location.assign('/')
};

const fetchData = (url) => {
  fetch(`https://inthistweet.app/api/twitter?url=${url}`)
    .then((resp) => resp.json())
    .then((data) => {
      data[0].variants.forEach((item) => {
        downloadVideo(item);
      });
      wrapper.classList.add("active");
    });
};

submitBtn.addEventListener("click", () => {
  resolutions.innerHTML = "";
  fetchData(input.value);
});

if (videoLink) {
  fetchData(videoLink);
}
