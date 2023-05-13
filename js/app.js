$.ajax("https://reqres.in/api/users", {
  success: function (res) {
    const users = res.data;
    const { total_pages, page } = res;
    usersAll(total_pages, page);
    reRender(users);
  },
});
function reRender(data) {
  $(".qator").html("");
  data.map((item) => {
    const col = `
                <div class="card" style="width: 18rem;">
        <img src="${item.avatar}" class=" py-2 " alt="${item.first_name}">
        <div class="card mb-2 ">
              <button type="button" onclick="getSingleItem(${item.id})" class="btn btn-primary w-100 " data-bs-toggle="modal" data-bs-target="#readMoadal">
                  Read More...
              </button>
        </div>
      </div>
             `;
    $(".qator").append(col);
  });
}

function usersAll(total_pages, page) {
  $(".users_pagination").html("");
  for (let i = 1; i <= total_pages; i++) {
    let list = `
      <li onclick="usersPagination(${i})" class="page-item ${
      page == i && "active"
    }"><a href="#"class="page-link">${i}</a></li>
      `;
    $(".users_pagination").append(list);
  }
}

function getSingleItem(ID) {
  $.ajax(`https://reqres.in/api/users/${ID}`, {
    success: function (res) {
      const item = res.data;
      $(".modal-body").html("");
      let col1 = `
     <div class="d-flex gap-5 align-items-center" style="width: 27rem;">
        <img src="${item.avatar}" class="card-img img-fluid py-2 " alt="${item.first_name}">
        <div class="">
          <h3 class="card-title">${item.id}</h3>
          <h5 class="card-text">${item.first_name} | ${item.last_name}</h5>
          <h5 class="card-text">${item.email}</h5>
        </div>
      </div>`;
      $(".modal-body").append(col1);
    },
  });
}
function usersPagination(page) {
  $.ajax(`https://reqres.in/api/users?page=${page}`, {
    success: function (res) {
      const user = res.data;
      
      reRender(user);
      const { total_pages, page } = res;
      usersAll(total_pages, page);
    },
  });
}
