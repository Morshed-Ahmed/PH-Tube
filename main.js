const categoryDataLoad = () => {
  fetch("https://openapi.programming-hero.com/api/videos/categories")
    .then((res) => res.json())
    .then((data) => displayButton(data.data));
};

const displayButton = (data) => {
  // console.log(data);
  const btnContainer = document.getElementById("btn-container");

  data.forEach((category) => {
    // console.log(category);
    const card = document.createElement("div");
    card.innerHTML = `
        <button onclick="dataLoad('${category?.category_id}')"  class="btn-style" >${category?.category}</button>
        
     `;
    btnContainer.appendChild(card);
  });
};

categoryDataLoad();

let datas = [];

function dataLoad(id) {
  fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      datas = data.data;
      displayCard();
    })
    .catch((error) => {
      console.error(error);
    });
}

function displayCard() {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";

  if (datas.length == 0) {
    const card = document.createElement("div");
    card.innerHTML = `
            <div
                style="height: 100dvh"
                class="d-flex justify-content-center align-items-center flex-column text-center"
                >
                <img src="images/Icon.png" alt="" />
                <h4 >Oops!! Sorry, There is no content here</h4>
            </div>
              `;
    cardContainer.appendChild(card);
  } else {
    datas.forEach((info) => {
      //   console.log(info.verified);

      info.authors.forEach((profile) => {
        const card = document.createElement("div");
        card.innerHTML = `
                        <div class="col">
                           <div class="card h-100">
                                <img
                                src=${info?.thumbnail}
                                class="card-img-top"
                                alt="..."
                                />
                                <div class="card-body">
                                    <div class="d-flex gap-2">
                                        <img src=${
                                          profile?.profile_picture
                                        } alt="Avatar" class="img-fluid rounded-circle mb-3" style="width: 50px; height: 50px;">
                                        <h5 class="card-title fs-5">${
                                          info?.title
                                        }</h5>
                                    </div>

                                    <div class="d-flex align-items-center gap-3 ">
                                        <p class="mt-3">${
                                          profile?.profile_name
                                        }</p>

                                     ${
                                       profile?.verified
                                         ? '<i class="fa-solid fa-certificate fs-6 text-primary"></i>'
                                         : ""
                                     }

                                    </div>
                                    <div>
                                        <p >${info?.others?.views} Views</p>
                                    </div>

                                </div>
                            </div>
                        </div>
        `;
        cardContainer.appendChild(card);
      });
    });
  }
}

function sortData() {
  datas.sort((a, b) => {
    const viewsA = parseInt(a.others.views.slice(0, -1));
    const viewsB = parseInt(b.others.views.slice(0, -1));

    return viewsB - viewsA;
  });

  displayCard();
}

dataLoad("1000");
