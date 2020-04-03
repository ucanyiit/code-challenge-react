class Restaurant extends React.Component {

  printItem(item) {
    let idPattern = /\d+/g;
    let id = item.match(idPattern) - 1;
    let items = window.data.restaurant.active_menu.menu.items;
    let data = items[id].item;
    let img;
    if (data.images.length > 0){
      img = data.images[0]["100"];
    }
    else img = "";
    return (
      <div class="card mb-2 mt-2">
        <div class="d-flex">
          <div class="flex-shrink-1 pl-3 pt-3">
            <img class="rounded" src={img}/>
          </div>
          <div class="flex-grow-1">
            <div class="card-body">
              <div class="d-flex">
                <div class="flex-grow-1">
                  <h4>{data["name"]}</h4>
                </div>
                <div>
                  <p class="text-success font-weight-bold text-monospace">{data["price"]} TL</p>
                </div>
              </div>
              <div class="d-flex">
                <div>
                  <small class="mb-1">{data["ingredients"].join(", ")}</small>
                </div>
                <div class="ml-auto p-1">
                  <button type="button" class="btn btn-outline-secondary">Favorilere ekle</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  printSections(item) {
    return (
      <div>
        <h2>{item.section}</h2>
        <div class="list-group">
          {item.items.map(i => (this.printItem(i)))}
        </div>
      </div>
    )
  }

  getItemLists() {
    let sections = window.data.restaurant.active_menu.menu.item_order;

    return sections.map(section => (this.printSections(section)))
  }

  render() {
    const restaurant = window.data.restaurant;
    console.log(window.data);
    return this.getItemLists()
  }
}


$(function () {
  ReactDOM.render(
    <Restaurant />,
    document.getElementById('react-root')
  );

})
