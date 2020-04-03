class Restaurant extends React.Component {

  printItem(item) {
    let idPattern = /\d+/g;
    let id = item.match(idPattern) - 1;
    let items = window.data.restaurant.active_menu.menu.items;
    let data = items[id].item;
    let img;
    if (data.images.length > 0) {
      img = data.images[0]["100"];
    }
    else img = "";

    return (
      <div className="col-12 col-lg-6 col-xl-4">
        <div className="card mb-2 mt-2">
          <div className="d-flex">
            <div className="flex-shrink-1 pl-3 pt-3">
              <img className="rounded" src={img} />
            </div>
            <div className="card-body d-flex flex-row">
              <div className="d-flex flex-column">
                <h5>{data["name"]}</h5>
                <small className="mb-1">{data["ingredients"].join(", ")}</small>
              </div>
              <div className="d-flex flex-column ml-auto">
                <p className="text-success font-weight-bold text-monospace">{data["price"]} TL</p>
                <button type="button" className="btn btn-outline-secondary">
                  <img src="./images/heart.png" className="mr-2" width="20" height="20" />
                  Favorilere ekle
                </button>
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
        <div className="row">
          {item.items.map(i => (this.printItem(i)))}
        </div>
      </div>
    )
  }

  getItemLists() {
    let sections = window.data.restaurant.active_menu.menu.item_order;

    return sections.map(section => (this.printSections(section)))
  }

  getThemeButtons() {
    return (
      <div className="row">
        <div className="col-3" />
        <div className="btn-group btn-group-toggle col-6" data-toggle="buttons">
          <label className="btn btn-secondary active">
            List
          </label>
          <label className="btn btn-secondary">
            Grid
          </label>
        </div>
        <div className="col-3" />
      </div>
    )
  }
  render() {
    const restaurant = window.data.restaurant;
    console.log(window.data);
    return (
      <div className="w-100">
        {this.getThemeButtons()}
        {this.getItemLists()}
      </div>
    )
  }
}


$(function () {
  ReactDOM.render(
    <Restaurant />,
    document.getElementById('react-root')
  );

})
