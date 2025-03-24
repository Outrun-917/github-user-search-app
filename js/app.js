const $userSearchInput = document.querySelector(".user-search-input");
const $userSearchSubmit = document.querySelector(".user-search-submit");

const $userCardProfilePicture = document.querySelector(
  ".user-card-profile-picture"
);
const $userName = document.querySelector(".user-name");
const $userJoinDate = document.querySelector(".user-join-date");
const $userProfileLink = document.querySelector(".user-profile-link");
const $userBio = document.querySelector(".user-bio");
const $userInfoListElements = document.querySelectorAll(
  ".user-info-list-element"
);
const $userInfoListNumber = document.querySelectorAll(".user-info-list-number");
const $userSecondaryInfoListElementContent = document.querySelectorAll(
  ".user-info-list-element-content"
);

function getUser(userName) {
  fetch(`https://api.github.com/users/${userName}`, {
    headers: {
      Authorization: `token ${TOKEN}`,
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      updateProfileCard(data);
    })
    .catch((err) => {
      console.log(`Une erreur est survenue: ${err}`);
    });
}

function updateProfileCard(data) {
  if (data.status !== "404") {
    $userCardProfilePicture.setAttribute("src", data.avatar_url);
    $userName.textContent = data.name;
    $userJoinDate.textContent = `Joined ${new Date(
      data.created_at
    ).toLocaleDateString()}`;
    $userProfileLink.textContent = data.login;
    $userProfileLink.setAttribute("href", data.html_url);

    if (data.bio !== null) {
      $userBio.textContent = data.bio;
    } else {
      $userBio.textContent = "This profile has no bio";
    }

    $userInfoListNumber[0].textContent = data.public_repos;
    $userInfoListNumber[1].textContent = data.followers;
    $userInfoListNumber[2].textContent = data.following;

    if (data.location !== null) {
      $userSecondaryInfoListElementContent[0].textContent = data.location;
    } else {
      $userSecondaryInfoListElementContent[0].textContent = "Not Available";
    }

    if (data.twitter_username !== null) {
      $userSecondaryInfoListElementContent[1].textContent =
        data.twitter_username;
    } else {
      $userSecondaryInfoListElementContent[1].textContent = "Not Available";
    }

    if (data.blog !== "") {
      $userSecondaryInfoListElementContent[2].textContent = data.blog;
    } else {
      $userSecondaryInfoListElementContent[2].textContent = "Not Available";
    }

    if (data.company !== null) {
      $userSecondaryInfoListElementContent[3].textContent = data.company;
    } else {
      $userSecondaryInfoListElementContent[3].textContent = "Not Available";
    }
  } else {
    $userSearchInput.value = "User not found";
  }
}

$userSearchSubmit.addEventListener("click", (e) => {
  e.preventDefault();

  getUser($userSearchInput.value);
});

$userSearchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();

    getUser($userSearchInput.value);
  }
});
