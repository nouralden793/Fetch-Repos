let reposInput = document.querySelector(".fetchCont input"),
  reposBtn = document.querySelector(".fetchCont button"),
  ReposData = document.querySelector(".fetchText");

reposBtn.onclick = function () {
  if (reposInput.value == "") {
    ReposData.textContent = "";
    let span = document.createElement("span");
    span.textContent = "Please Write Github Username";
    span.style.cssText =
      "color: red; transform: translateX(-267px); display: block; transition: .5s;";
    setTimeout(() => {
      span.style.cssText =
        "color: red; transform: translateX(0); display: block; transition: .5s;";
    }, 0);
    span.className = "wrongSpan";
    document.querySelector(".fetch-repos").style.border = "2px solid red";
    ReposData.appendChild(span);
  } else {
    fetch(`https://api.github.com/users/${reposInput.value}/repos`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        ReposData.textContent = "";
        data.forEach((repo) => {
          let div = document.createElement("div");
          let name = document.createElement("div");
          name.appendChild(document.createTextNode(repo.name));
          div.appendChild(name);
          let divCont = document.createElement("div");
          let Url = document.createElement("a");
          Url.appendChild(document.createTextNode("Visit"));
          Url.href = `https://github.com/${reposInput.value}/${repo.name}`;
          Url.setAttribute("target", "_blank");
          let span = document.createElement("span");
          span.appendChild(
            document.createTextNode(`Stars: ${repo.stargazers_count}`)
          );
          let id = document.createElement("span");
          id.appendChild(document.createTextNode(`Id: ${repo.id}`));
          id.className = "id";
          divCont.appendChild(id);
          divCont.appendChild(span);
          divCont.appendChild(Url);
          div.appendChild(divCont);
          ReposData.appendChild(div);
        });
      });
    setTimeout(() => {
      if (ReposData.textContent == "") {
        document.querySelector(".fetch-repos").style.border = "2px solid red";
        let spoun = document.createElement("div");
        spoun.appendChild(
          document.createTextNode("This Username Isn't In Github")
        );
        spoun.className = "wrongUser";
        ReposData.appendChild(spoun);
      } else {
        document.querySelector(".fetch-repos").style.border = "2px solid green";
      }
    }, 500);
  }
};
